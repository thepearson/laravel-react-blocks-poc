import { map } from 'lodash'
import React from 'react'

export default function Accordion({title, items}) {
  return (
    <div>
      <h3>{title}</h3>
      {items.map(item => {
        return <><h4>{item.title}</h4><div>{item.body}</div></>
      })}
    </div>
  )
}
