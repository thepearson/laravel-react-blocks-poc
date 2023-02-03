import React from 'react'

export default function Wysiwyg({ content }) {
  return (
    <div dangerouslySetInnerHTML={{__html: content}} />
  )
}
