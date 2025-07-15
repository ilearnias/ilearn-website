import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import { getJourneyList } from '@/services/journey.service'
import Image from 'next/image'

type PropType = {
  options?: EmblaOptionsType
}

interface JourneyItem {
  id: string;
  year: string;
  description: string;
  media: string;
  order: number;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [journeyData, setJourneyData] = useState<JourneyItem[]>([])
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        const response = await getJourneyList();
        if (response.status && response.data) {
          setJourneyData(response.data);
        }
      } catch (error) {
        console.error('Error fetching journey data:', error);
      }
    };

    fetchJourneyData();
  }, []);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla-journey">
      <div className="embla-journey__viewport" ref={emblaMainRef}>
        <div className="embla-journey__container">
          {journeyData.map((journey, index) => (
            <div className="embla-journey__slide" key={journey.id}>
              <div className="image-container position-relative" style={{ height: 'min(400px, 50vw)' }}>
                <Image
                  src={journey.media}
                  alt={`Journey milestone ${journey.year}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div 
                className="milestone-overlay position-absolute start-0 bottom-0 p-3 text-white w-100" 
                style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}
              >
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex align-items-center gap-2">
                    <span className="h5 mb-0 pl-4">{journey.year}</span>
                  </div>
                  <p className="small mb-0 px-3">{journey.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-journey-thumbs">
        <div className="embla-journey-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-journey-thumbs__container">
            {journeyData.map((journey, index) => (
              <Thumb
                key={journey.id}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                year={journey.year}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel 