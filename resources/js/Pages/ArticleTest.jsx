import React, { useEffect, useState } from 'react'

import Header from '@/Components/InlineComponents/Header'
import Text from '@/Components/InlineComponents/Text'
import RichText from '@/Components/InlineComponents/RichText'

import { FaPlus } from 'react-icons/fa'
import classNames from 'classnames'

const components = {
  enabled: [
    "Header",
    "Text",
    "RichText"
  ],
  mapping: {
    "Header": Header,
    "Text": Text,
    "RichText": RichText
  },
  templates: {
    Header: {
      type: "h2",
      text: ""
    },
    Text: {
      content: ""
    },
    RichText: {
      content: ""
    }
  }
}


const Toolbar = ({
  index,
  length
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const buttonClasses = classNames([
    "border-2",
    "text-xs",
    "border-slate-600",
    "bg-slate-500",
    "px-4",
    "py-1",
    "text-white"
  ]);

  const insert = () => {
    setShowOptions(false)
  }

  return (<><div className="flex justify-between relative">
    {/* <div>{index > 0 && <button className={buttonClasses} type="button">Move up</button>}</div> */}
    <div><button onClick={() => setShowOptions(!showOptions)} className={buttonClasses} type="button"><FaPlus /></button></div>
    {/* <div>{index < (length - 1) && <button className={buttonClasses} type="button">Move down</button>}</div> */}
    {showOptions && <div className="absolute top-6 bg-white border-2">
      <ul>
      {components.enabled.map((component, i) => 
        <li key={i} className="hover:bg-slate-200 px-2 py-1"><button type="button" onClick={insert}>{component}</button></li>
      )}
      </ul>
    </div>}
  </div>
  <hr className="mb-4 mt-4" />
  </>)
}


export default function ArticleTest({}) {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState({
    title: "My super cool page",
    subtitle: "My super cool page's subtitle",
    content: [
      {
        id: "aaaaaa",
        type: "Header",
        props: {
          type: "h3",
          text: "This is a sweet header" 
        } 
      }, 
      {
        id: "aaaaab",
        type: "Text",
        props: {
          content: "This is some text content" 
        }
      },
      {
        id: "aaaaac",
        type: "RichText",
        props: {
          content: "This is some rich text content" 
        }
      }
    ]
  })

  const toggleEdit = () => {
    setEdit(!edit)
  }

  const handleUpdate = (id, value) => {
    setData({
      title: data.title, 
      subtitle: data.subtitle,
      content: data.content.map((block) => {
        if (id == block.id) {
          return {
            id: block.id,
            type: block.type,
            props: value
          }
        }

        return block;
      })
    })
  }

  return (
    <div className="bg-slate-100 container mx-auto px-4 pt-4 h-1vu">
      <h1 className="font-serif text-4xl font-bold mt-2 mb-4">{data.title}</h1>
      <div className="text-sm"><p>{data.subtitle}</p></div>
      <div>
        <button 
          onClick={toggleEdit}
          className="border-2 text-white bg-slate-500 border-slate-600 px-8 py-1 hover:bg-slate-300 hover:text-slate-600" 
          type="button">
            {edit ? `Save` : `Edit`}
        </button>
      </div>
      <div className="my-8">
        {data.content.map((block, index) => {
          const Component = components.mapping[block.type];
          return (
          <div key={block.id}>
            <Component 
              id={block.id}
              edit={edit}
              handleUpdate={handleUpdate} 
              {...block.props} />
            {edit && <Toolbar index={index} length={data.content.length} />}
          </div>)
        })}   
      </div>
    </div>    
  )
}
