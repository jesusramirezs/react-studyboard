import React, {useEffect, useState} from 'react';

import { _getUniqueId } from '../../utils/utils';

import Tag from '../tag/tag.component';

import { TagSpan } from './annotation-info.style';

import Markdown  from 'markdown-to-jsx';

const AnnotationInfo = ({  setupAnnotationData }) => {

    const [annotation, setAnnotation] = useState(
      setupAnnotationData.annotation && Object.entries(setupAnnotationData.annotation).length? 
        setupAnnotationData.annotation
        :
        {note:'', tags:[]}
      );

    const { note, tags } = annotation;

    

    useEffect(() => {

        if(setupAnnotationData.annotation && Object.entries(setupAnnotationData.annotation).length) {
          setAnnotation(setupAnnotationData.annotation);
        } else {
          setAnnotation({note:'', tags:[]});
        }

    },[setupAnnotationData]);

    const bg_style = tag => {

      switch(tag) {
       case 'question': return 'bg-blue';
       case 'read': return 'bg-orange';
       case 'highlight': return 'bg-hot-pink';
      }
      return 'bg-light-green';
    }

    return (
      <div className='annotation-info'> 
        
          {note?
          <div>
            <br/>
            <hr/>
            <div className="f5-ns black">{note.split('\n').map(l=><p key={_getUniqueId()}><Markdown>{l}</Markdown></p>)}</div>
            <br/>
            <hr/>
            
          </div>
          :
          <div>
            <br/>
            <hr/>
            <p>Click edit to add your notes</p>
          </div>          
          
          }
          <br/>
          {tags.map(tag => 
              <TagSpan key={_getUniqueId()} className={bg_style(tag)} > {tag} </TagSpan>

            )
          }
        </div>
      ); 
    
  }

export default AnnotationInfo;
  
