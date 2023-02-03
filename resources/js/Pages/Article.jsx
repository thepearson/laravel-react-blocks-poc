import React, { lazy } from 'react'

const Accordion = lazy(() => import('@/Components/Articles/Accordion.jsx'));

import Header from '@/Components/Articles/Header.jsx';
import Wysiwyg from '@/Components/Articles/Wysiwyg.jsx';
import Image from '@/Components/Articles/Image.jsx';
//import Accordion from '@/Components/Articles/Accordion.jsx';

const componentMapping = {
  "Header": Header,
  "Wysiwyg": Wysiwyg,
  "Image": Image,
  "Accordion": Accordion,
}


export default function Article({ data }) {
  console.log(data);
  
  return (
    <div>

      <img src={data.hero} alt="banner" />
      <h1>{data.title}</h1>
      <span>{data.subtitle}</span>



      <div className="content">
        {data.content.map((block) => {
          
          const Component = componentMapping[block.type];
          return <Component {...block.props} key={block.id} />
        })}
      </div>

    
    </div>    
  )
}
