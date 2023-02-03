import React, { useEffect, useState } from 'react'

import Header from '@/Components/InlineComponents/Header'
import Text from '@/Components/InlineComponents/Text'
import RichText from '@/Components/InlineComponents/RichText'

import Example from '@/Components/InlineComponents/Example'

import { FaPlus, FaTrash } from 'react-icons/fa'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import classNames from 'classnames'


/**
 * Component config
 */
const components = {
  enabled: [
    "Header",
    "Text",
    "RichText",
    "Example"
  ],
  mapping: {
    "Header": Header,
    "Text": Text,
    "RichText": RichText,
    "Example": Example
  },
  templates: {
    Header: {
      type: "h2",
      text: "Placeholder"
    },
    Text: {
      content: "Placeholder"
    },
    RichText: {
      content: "Placeholder"
    },
    Example: {
      value: "Placeholder"
    }
  }
}


/**
 * Random utility function for generating random strings for use as ID's
 * 
 * @param {*} length 
 * @returns 
 */
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


/**
 * Placeholder for the block toolbar when in edit mode.
 * 
 * @param {*} param0 
 * @returns 
 */
const Toolbar = ({
  index,
  length,
  handleInsert,
  handleRemove
}) => {
  const [showOptions, setShowOptions] = useState(false)

  const buttonClasses = classNames([
    "border-2",
    "text-xs",
    "border-slate-600",
    "px-4",
    "py-1",
    "text-white"
  ]);

  const insert = (component, i) => {
    setShowOptions(false)
    handleInsert(i, {
      id: makeid(6),
      type: component,
      props: {...components.templates[component]}
    })
  }

  return (
  <>
    <div className="flex justify-end relative">
      <div>{index > 0 && <button 
        className={`${buttonClasses} bg-green-500 text-slate-800`} 
        type="button"><BsFillCaretUpFill /></button>}
      </div>
      <div>{index < (length - 1) && <button 
        className={`${buttonClasses} bg-green-500 text-slate-800`} 
        type="button"><BsFillCaretDownFill /></button>}
      </div>
      <div><button 
        onClick={() => setShowOptions(!showOptions)} 
        className={`${buttonClasses} bg-slate-500`} 
        type="button"><FaPlus /></button>
      </div>
      <div><button onClick={() => handleRemove(index)} 
        className={`${buttonClasses} bg-red-500`}
        type="button"><FaTrash /></button>
      </div>
      {showOptions && 
        <div className="absolute top-6 bg-white border-2">
          <ul>
          {components.enabled.map((component, i) => 
            <li key={i} className="hover:bg-slate-200 px-2 py-1"><button type="button" onClick={() => insert(component, index)}>{component}</button></li>
          )}
          </ul>
        </div>}
      </div>
      <hr className="mb-4 mt-4" />
    </>
  )
}

export default function ArticleTest({ 
  defaultData // From the Laravel ArticleController
}) {
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState(defaultData)

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

  const insertBlock = (index, newBlock) => {
    const components = []
    for (let i = 0; i < data.content.length; i++) {
      components.push({...data.content[i]})
      if (i == index) {
        components.push(newBlock)
      }
    }
    setData({title: data.title, subtitle: data.subtitle, content: components})
  }

  const removeBlock = (index) => {
    setData({title: data.title, subtitle: data.subtitle, content: [...data.content.slice(0, index), ...data.content.slice(index + 1)]})
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
            {edit && 
              <Toolbar 
                index={index} 
                length={data.content.length} 
                handleInsert={insertBlock}
                handleRemove={removeBlock} />}
          </div>)
        })}   
      </div>
    </div>    
  )
}
