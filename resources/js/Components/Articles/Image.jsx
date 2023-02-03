import React from 'react'

export default function Image({uri, alt}) {
  return (
    <img src={uri} alt={alt} />
  )
}
