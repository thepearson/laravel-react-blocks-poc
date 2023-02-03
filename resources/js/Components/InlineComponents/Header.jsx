import React from 'react'
import classNames from 'classnames';

const baseStyles = [
  "block",
  "font-serif",
  "w-full"
];

const editStyles = [
  "p-0",
  "m-0",
  "border-0",
  "bg-transparent",
]

const headerOptions = [
  {
    type: "h2",
    class: "text-3xl",
  },
  {
    type: "h3",
    class: "text-2xl",
  },
  {
    type: "h4",
    class: "text-xl",
  },
  {
    type: "h5",
    class: "text-lg",
  }
]

const getFontSize = (type) => {
  return headerOptions.filter(item => item.type == type)[0].class;
}

const Edit = ({
  id,
  type,
  text,
  handleUpdate
}) => {

  const updateText = (e) => {
    handleUpdate(id, {
      type: type,
      text: e.target.value
    })
  }

  const updateType = (e) => {
    handleUpdate(id, {
      type: e.target.value,
      text: text
    })
  }

  return (
    <div className="flex justify-between">
      <input 
        type="text" 
        value={text}
        onChange={updateText}
        className={classNames(baseStyles, editStyles, getFontSize(type))} />
      <select onChange={updateType} value={type} className="py-0 bg-transparent border-0">
        {headerOptions.map(item => {
          return <option key={item.type} value={item.type}>{item.type}</option>
        })}
      </select>
    </div>
  )
}

const View = ({
  id,
  type,
  text
}) => {
  return React.createElement(type, {
    id: id,
    className: classNames(baseStyles, getFontSize(type)),
  }, text)
}

export default function Header({
  id,
  type, 
  text, 
  edit = true,
  handleUpdate = null
}) {
  return (
    <>
      {edit ? 
        <Edit id={id} text={text} type={type} handleUpdate={handleUpdate} /> : 
        <View id={id} text={text} type={type} />}
    </>
  )
}