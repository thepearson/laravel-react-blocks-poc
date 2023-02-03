import React from 'react'

import { Editor } from "@tinymce/tinymce-react";
import { tinymce } from "tinymce/tinymce.min.js";

// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";

// importing the plugin js.
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";

import "tinymce/models/dom/model"

import "tinymce/plugins/anchor";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/nonbreaking";


const Edit = ({
  id,
  content,
  handleUpdate
}) => {

  const update = (value) => {
    handleUpdate(id, {
      content: value
    })
  }


  return (
    <Editor
      value={content}
      onEditorChange={update}
      tinymceScriptSrc={tinymce}
      init={{
        plugins: ["fullscreen", "lists", "link", "anchor", "code", "wordcount"],
        toolbar:
          "undo redo | formatselect paste pastetext | " +
          "bold italic | alignleft aligncenter " +
          "bullist numlist" +
          "removeformat fullscreen wordcount",
        content_css: false,
        skin: false,
        rel_list: [
          { title: "No Referrer", value: "noreferrer" },
          { title: "External Link", value: "external" },
        ],
        mobile: {
          toolbar_mode: "wrap",
        },
      }}
    />
  )
}

const View = ({
  id,
  content
}) => {
  return <div id={id} dangerouslySetInnerHTML={{__html: content}} />
}


export default function RichText({
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
