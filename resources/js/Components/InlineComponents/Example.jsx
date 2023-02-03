import React from 'react'

const Edit = ({
  id,
  handleUpdate,
  value
  // The props you need
}) => {

  const update = (e) => {
    handleUpdate(id, {
      value: e.target.value
    })
  }

  return (
    <input value={value} onChange={update} className="w-full" />
  )
}


const View = ({
  id,
  value
}) => {
  return <div id={id}>{value}</div>
}
  

export default function Example({
  id,
  value, 
  edit = true,
  handleUpdate = null
}) {
  return (
    <>
      {edit ? 
        <Edit id={id} value={value} handleUpdate={handleUpdate} /> : 
        <View id={id} value={value} />}
    </>
  )
}
