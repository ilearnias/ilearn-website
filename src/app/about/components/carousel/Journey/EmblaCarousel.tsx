import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import { milestones } from '../../../data/milestones'

type PropType = {
  options?: EmblaOptionsType
}

const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split('?')[0].split('/').pop()
  return `https://www.youtube.com/embed/${videoId}`
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

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
    <div className="embla-journey ">
      <div className="embla-journey__viewport" ref={emblaMainRef}>
        <div className="embla-journey__container">
          {milestones.map((milestone, index) => (
            <div className="embla-journey__slide" key={index}>
              <div className="video-container position-relative" style={{ height: 'min(400px, 50vw)' }}>
                <iframe
                  className="w-100 h-100 position-absolute top-0 start-0"
                  src={getYouTubeEmbedUrl(milestone.videoUrl)}
                  title={`Video for milestone ${milestone.year}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div 
                className="milestone-overlay position-absolute start-0 bottom-0 p-3 text-white w-100" 
                style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}
              >
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex align-items-center gap-2">
                    <span className="h5 mb-0 pl-4">{milestone.year}</span>
                    <h3 className="h6 mb-0 ">{milestone.title}</h3>
                  </div>
                  <p className="small mb-0 px-3">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-journey-thumbs">
        <div className="embla-journey-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-journey-thumbs__container">
            {milestones.map((milestone, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                year={milestone.year}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel 