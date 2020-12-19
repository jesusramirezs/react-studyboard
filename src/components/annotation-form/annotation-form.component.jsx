import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';


import TextInput from '../text-input/text-input.component';

import CustomButton from '../custom-button/custom-button.component';

import TagInput from '../tag-input/tag-input.component';

import AddImage  from '../add-image/add-image.component';

import { TagButton } from './annotation-form.style';

import { addAnnotation } from '../../redux/highlighting-list/highlighting-list.actions';

import { toggleAnnotationPanelHidden, setAnnotationPanelReadMode } from '../../redux/annotation-panel/annotation-panel.actions';


const AnnotationForm = ({ setupAnnotationData, setAnnotationPanelReadMode, add_annotation }) => {
    
    const [annotation, setAnnotation] = useState(
      setupAnnotationData.annotation && Object.entries(setupAnnotationData.annotation).length? setupAnnotationData.annotation
      :
      {note:'', tags:[]});

    const { note } = annotation;

    const { categoryStrId, articleId, articleStrId, textBlockId, type, scrollTop } = setupAnnotationData;
    
    
     
    const handleSubmit = async event => {
      event.preventDefault();
  
      try {
        
        add_annotation(categoryStrId, articleId, articleStrId, textBlockId, annotation, type, scrollTop);
        setAnnotationPanelReadMode();

      } catch (error) {
        console.log(error);
      }
    };
  

      const handleChange = event => {
        const { value, name } = event.target;

        setAnnotation({ ...annotation, [name]: value });
      };

      const tagInputUpdateHandle = (updateTags) => {
        setAnnotation({...annotation, tags:updateTags})
      }

      const addNewTag = (tagToAdd) => {
        const currentTags = annotation.tags;
        if(currentTags.includes(tagToAdd)) return;
        const newTags = [...currentTags, tagToAdd];
        setAnnotation({note: annotation.note, tags: newTags})
      }

      const addHighlightTag = () => {
        addNewTag('highlight');
      }

      const addQuestionTag = () => {
        addNewTag('question');
      }

      const addReadTag = () => {
        addNewTag('read');
      }

      useEffect(() => {

        if(setupAnnotationData.annotation && Object.entries(setupAnnotationData.annotation).length) {
          setAnnotation(setupAnnotationData.annotation);
        } else {
          setAnnotation({note:'', tags:[]});
        }
        

      }, [setupAnnotationData]);
      

      return (
        <div>
        
          <form onSubmit={handleSubmit}>
            <br/>
            <TextInput
              key='textinput'
              name='note'
              type='text'
              handleChange={handleChange}
              value={note}
              label='Type your note here (Markdown allowed)'
              required
            />
            <div className="bg-near-white pa2 mb3">
              <p className="f6 fw6">Image uploads:</p>
              <AddImage />
            </div>
            
            <div className="bg-near-white pa2 mb3">
              <p className="f6 fw6">Tags:</p>
              <TagInput value={annotation.tags} updateHandle={tagInputUpdateHandle}/>

              <div className='buttons mt2'>

              <TagButton className="bg-blue" onClick={addQuestionTag} > question </TagButton>
              <TagButton className="bg-orange" onClick={addReadTag} > read </TagButton>
              <TagButton className="bg-hot-pink" onClick={addHighlightTag}> highight </TagButton>
            </div>
            
            </div>
            <div className='buttons mt3'>
            <CustomButton type='submit'> Send </CustomButton>
            <CustomButton onClick={setAnnotationPanelReadMode}> Cancel </CustomButton>
            </div>
          </form>
        </div>
      ); 
    
  }




  const mapDispatchToProps = dispatch => ({
    toggleAnnotationPanelHidden: () => dispatch(toggleAnnotationPanelHidden()),
    add_annotation: (categoryStrId, articleId, articleStrId, textBlockId, annotation, type, scrollTop) => dispatch(addAnnotation({categoryStrId: categoryStrId, articleId: articleId, articleStrId: articleStrId, textBlockId: textBlockId, annotation: annotation, type: type, scrollTop: scrollTop})),
    setAnnotationPanelReadMode: () => dispatch(setAnnotationPanelReadMode()),

});
   

export default connect(null, mapDispatchToProps)(AnnotationForm);
  
