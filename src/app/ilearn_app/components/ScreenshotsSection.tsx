import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import type { EmblaCarouselType as CarouselType } from "embla-carousel";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from "../../about/components/carousel/EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "../../about/components/carousel/EmblaCarouselDotButton";
import "./styles/embla.scss";
import Container from "@/components/common/Container";

const TWEEN_FACTOR = 0.7;

const learnImages = [
  { src: "/ilearn/test.jpg", alt: "Learn Screenshot 1" },
  { src: "/ilearn/test.jpg", alt: "Learn Screenshot 2" },
  { src: "/ilearn/test.jpg", alt: "Learn Screenshot 3" }
];
const practiceImages = [
  { src: "/ilearn/test2.jpg", alt: "Practice Screenshot 1" },
  { src: "/ilearn/test2.jpg", alt: "Practice Screenshot 2" },
  { src: "/ilearn/test2.jpg", alt: "Practice Screenshot 3" }
];
const trackImages = [
  { src: "/ilearn/test3.jpg", alt: "Track Progress Screenshot 1" },
  { src: "/ilearn/test3.jpg", alt: "Track Progress Screenshot 2" },
  { src: "/ilearn/test3.jpg", alt: "Track Progress Screenshot 3" }
];

const categories = [
  { key: "learn", label: "Learn" },
  { key: "practice", label: "Practice" },
  { key: "track", label: "Track Progress" }
];

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

const ScreenshotsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("learn");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true
  });
  const tweenFactor = useRef(TWEEN_FACTOR);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaApi): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: HTMLElement) => {
      return slideNode.querySelector('.embla__parallax__layer') as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaApi) => {
    tweenFactor.current = TWEEN_FACTOR * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaApi) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();

      emblaApi.scrollSnapList().forEach((scrollSnap: number, snapIndex: number) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex: number) => {
          if (!slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem: { target: () => number; index: number }) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on('reInit', () => {
        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenParallax(emblaApi);
      })
      .on('scroll', () => {
        tweenParallax(emblaApi);
      });

    return () => {
      if (!emblaApi) return;
      emblaApi
        .off('reInit', () => {
          setTweenNodes(emblaApi);
          setTweenFactor(emblaApi);
          tweenParallax(emblaApi);
        })
        .off('scroll', () => {
          tweenParallax(emblaApi);
        });
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax, selectedCategory]);

  let images = learnImages;
  if (selectedCategory === "practice") images = practiceImages;
  if (selectedCategory === "track") images = trackImages;

  return (
    <div className="image-carousel-section">
      <Container>
        <h2 className="section-title text-center">App Screenshots</h2>
        <p className="section-subtitle text-center">Take a look at the intuitive interface and features of the iLearn IAS App.</p>
        <div className="screenshot-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`tab${selectedCategory === cat.key ? ' active' : ''}`}
              style={{
                margin: '0 8px',
                padding: '8px 20px',
                borderRadius: 20,
                border: 'none',
                background: selectedCategory === cat.key ? '#222' : '#eee',
                color: selectedCategory === cat.key ? '#fff' : '#222',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 16
              }}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {images.map((image, index) => (
                <div className="embla__slide" key={index}>
                  <div className="embla__parallax">
                    <div className="embla__parallax__layer">
                      <Image
                        className="embla__slide__img embla__parallax__img"
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={800}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="embla__controls">
            <div className="embla__buttons">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ScreenshotsSection; 