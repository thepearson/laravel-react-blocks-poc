import React from 'react'

const Edit = ({
  id,
  content,
  handleUpdate
}) => {

  const update = (e) => {
    handleUpdate(id, {
      content: e.target.value
    })
  }

  return (
    <textarea value={content} onChange={update} className="w-full" />
  )
}

const View = ({
  id,
  content
}) => {
  return <div id={id} dangerouslySetInnerHTML={{__html: content}} />
}


export default function Text({
  id,
  content, 
  edit = true,
  handleUpdate = null
}) {
  return (
    <>
      {edit ? 
        <Edit id={id} content={content} handleUpdate={handleUpdate} /> : 
        <View id={id} content={content} />}
    </>
  )
}
