import React, { useCallback, useEffect, useRef } from 'react';
import Container from "@/components/common/Container";
import { Fade } from "react-awesome-reveal";
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import type { EmblaCarouselType as CarouselType } from 'embla-carousel';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './carousel/EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './carousel/EmblaCarouselDotButton';
import './styles/embla.scss';

const TWEEN_FACTOR = 0.7;

const academyImages = [
  {
    src: "/About/Carousel/img1.jpg",
    alt: "iLearn IAS Academy Image 1",
  },
  {
    src: "/About/Carousel/img2.png",
    alt: "iLearn IAS Academy Image 2",
  },
  {
    src: "/About/Carousel/img3.jpg",
    alt: "iLearn IAS Academy Image 3",
  }
];

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

const ImageCarouselSection = () => {
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
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

  return (
    <div className="image-carousel-section">
      <Container>
        <Fade cascade triggerOnce>
          <h2 className="section-title">Our Academy</h2>
          <p className="section-subtitle text-center mb-2">
            Take a virtual tour of our state-of-the-art facilities
          </p>
        </Fade>
        <Fade cascade triggerOnce delay={300}>
          <div className="embla ">
            <div className="embla__viewport " ref={emblaRef}>
              <div className="embla__container ">
                {academyImages.map((image, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="embla__parallax">
                      <div className="embla__parallax__layer">
                        <img
                          className="embla__slide__img embla__parallax__img"
                          src={image.src}
                          alt={image.alt}
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
                    className={'embla__dot'.concat(
                      index === selectedIndex ? ' embla__dot--selected' : ''
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

export default ImageCarouselSection; 