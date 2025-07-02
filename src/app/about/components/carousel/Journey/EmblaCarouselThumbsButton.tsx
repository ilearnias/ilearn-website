import React from 'react'

type PropType = {
  selected: boolean
  index: number
  onClick: () => void
  year: string
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, onClick, year } = props

  return (
    <div
      className={'embla-journey-thumbs__slide'.concat(
        selected ? ' embla-journey-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-journey-thumbs__slide__number"
      >
        {year}
      </button>
    </div>
  )
} 