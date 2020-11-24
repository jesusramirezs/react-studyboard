import React, { useState, useEffect } from 'react';

import TagsInput from 'react-tagsinput' //https://github.com/olahol/react-tagsinput
import 'react-tagsinput/react-tagsinput.css' 

const TagInput = ({value, updateHandle}) => {

  const [tags, setTags] = useState([]);
  const [color, setColor] = useState('#48c774');

  const keys=[9,32]

  const handleChange = tags => {
    setTags(tags)
    updateHandle(tags);
  }

  useEffect(() => {
    if(value.length) setTags(value);
  },[value]);

  const bg_style = tag => {

    switch(tag) {
     case 'question': return ' rgb(53, 120, 226)';
     case 'read': return 'rgb(243, 129, 23)';
     case 'highlight': return 'rgb(235, 110, 228)';
    }
    return 'rgb(110, 235, 162)';
  }

  function RenderTag (props) {
    let {tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other} = props
    return (
      <span key={key} {...other} style={{color: '#fff', backgroundColor:`${bg_style(tag)}`}} >
        {getTagDisplayValue(tag)}
        {!disabled &&
          <a style={{backgroundColor:`${bg_style(tag)}`}} className={classNameRemove} onClick={(e) => onRemove(key)} />
        }
      </span>
    )
  }

  return (

    <TagsInput value={tags} addKeys={keys} onlyUnique renderTag={RenderTag} onChange={handleChange} />  
    
  );
}

export default TagInput;