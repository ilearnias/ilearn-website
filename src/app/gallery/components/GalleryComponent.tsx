import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import '../styles/embla.scss';
import Container from '@/components/common/Container';

export type GalleryImage = {
  src: string;
  alt?: string;
  title?: string;
};

type GalleryComponentProps = {
  images: GalleryImage[];
  title: string;
  color?: string;
  headingClassName?: string;
  options?: any;
};

const GalleryComponent: React.FC<GalleryComponentProps> = ({
  images,
  title,
  color,
  headingClassName,
  options,
}) => {
  console.log('GalleryComponent title prop:', title);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(images.length);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedSnap(emblaApi.selectedScrollSnap());
    setSnapCount(emblaApi.scrollSnapList().length);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="embla gallery-carousel-section ">
      <Container>

     
      <div className="gallery-carousel-card ">
        {title && (
          <div className="gallery-carousel-heading">
            <h2 className={`gallery-carousel-title ${headingClassName || ''}`.trim()}>{title}</h2>
          </div>
        )}
        <div className="embla__viewport-wrapper" style={{ position: 'relative' }}>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {images.map((img, idx) => (
                <div className="embla__slide" key={idx}>
                  <div className="embla__slide__img-wrapper ">
                    <img
                      className="embla__slide__img "
                      src={img.src}
                      alt={img.alt || `Gallery image ${idx + 1}`}
                      title={img.title || ''}
                      />
                    {img.title && (
                      <div className="embla__slide__overlay">
                        <span className="embla__slide__overlay-title">{img.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Overlay navigation arrows ONCE, absolutely positioned over the viewport */}
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="embla__button embla__button--prev embla__button--overlay"
            />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="embla__button embla__button--next embla__button--overlay"
            />
        </div>
        {/* Progress bar */}
        <div className="embla__progress-bar-wrapper">
          <div
            className="embla__progress-bar"
            style={{ width: `${((selectedSnap + 1) / snapCount) * 100}%` }}
            />
        </div>
        {/* Pagination dots */}
        <div className="embla__dots">
          {Array.from({ length: snapCount }).map((_, idx) => (
            <button
            key={idx}
            className={`embla__dot${selectedSnap === idx ? ' embla__dot--active' : ''}`}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
          </Container>
    </section>
  );
};

export default GalleryComponent;
