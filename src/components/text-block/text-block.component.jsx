import React, {useEffect, useState} from 'react';

import { connect } from 'react-redux';

import { Icon } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import Markdown  from 'markdown-to-jsx';

import { _getUniqueId } from '../../utils/utils';

import './text-block.styles.scss';

import { SmallButton } from './text-block.styles';

import { addParagraphHighlighting, 
         removeParagraphHighlighting } from '../../redux/highlighting-list/highlighting-list.actions';

import { setCurrentAnnotatedItem, 
         setAnnotationPanelVisible, 
         setAnnotationPanelHidden, 
         setAnnotationPanelEditMode, 
         setAnnotationPanelReadMode } from '../../redux/annotation-panel/annotation-panel.actions';

import { selectParagraphHighlighting, 
         selectTextBlockAnnotation } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectIsTextBlockActive } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectAnnotationPanelEditMode,
         selectCurrentAnnotatedAnnotationPanelEditMode } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectVisualConfigurationData } from '../../redux/visual-configuration/visual-configuration.selectors';


const TextBlock = ({ textBlockId, 
                     articleId, 
                     categoryStrId,
                     articleStrId,
                     children, 
                     add_paragraph_highlighting, 
                     remove_paragraph_highlighting, 
                     annotationPanelEditMode, 
                     paragraphHighlighting, 
                     setCurrentAnnotatedItem,
                     setAnnotationPanelVisible, 
                     setAnnotationPanelHidden, 
                     textBlockAnnotation, 
                     setAnnotationPanelEditMode, 
                     setAnnotationPanelReadMode,
                     isTextBlockActive,
                     currentVisualConfigurationData}) => {

    const [highlighted, sethighlight] = useState(false);
    
    const {font, font_size }  =  currentVisualConfigurationData;
    console.log(font);
    

    const highlightChange = () => {
        const  highlighting = {tags: "highlighting",  textBlockId: textBlockId, scrollTop: document.documentElement.scrollTop}

        if(!highlighted) {
            add_paragraph_highlighting(articleId, highlighting );
            setCurrentAnnotatedItem(categoryStrId, articleId, articleStrId, textBlockId, "paragraph", document.documentElement.scrollTop);
            setAnnotationPanelVisible();
            setAnnotationPanelEditMode();

        } else {            
            remove_paragraph_highlighting(articleId, highlighting );
        }
    
        sethighlight(highlighted => !highlighted);
    }

    const editAnnotation = () => {

          setCurrentAnnotatedItem(categoryStrId, articleId, articleStrId, textBlockId, "paragraph", document.documentElement.scrollTop);
          setAnnotationPanelVisible();
          setAnnotationPanelEditMode();

  }


  const viewAnnotation = () => {
    if(!highlighted) return;
    if(!annotationPanelEditMode) {
      setCurrentAnnotatedItem(categoryStrId, articleId, articleStrId, textBlockId, "paragraph", document.documentElement.scrollTop);
      setAnnotationPanelVisible();
      setAnnotationPanelReadMode();
      
    } 

  }
  


    const highlightOn = () => sethighlight(true);
    const highlightOff = () => sethighlight(false);


    const RenderedParagraph = ({ children, ...props }) => { 
    return(
      <p >{children}</p>

    )};

    const RenderedList = ({ children, ...props }) => (
      <li key={_getUniqueId()} {...props}>{children}</li>
    );

    const RenderedH1 = ({ children, ...props }) => (
      <h1  {...props}>{children}</h1>
    );

    const RenderedH2 = ({ children, ...props }) => (
      <h2 {...props}>{children}</h2>
    );
    const RenderedH3 = ({ children, ...props }) => (
      <h3  {...props}>{children}</h3>
    );
    const RenderedH4 = ({ children, ...props }) => (
      <h4  {...props}>{children}</h4>
    );
    const RenderedH5 = ({ children, ...props }) => (
      <h5  {...props}>{children}</h5>
    );
    const RenderedH6 = ({ children, ...props }) => (
      <h6  {...props}>{children}</h6>
    );
    


    const markdown_options = { forceBlock: true, 
      overrides: {
                      p: RenderedParagraph,
                      li: RenderedList, 
                      h1: RenderedH1,
                      h2: RenderedH2,
                      h3: RenderedH3,
                      h4: RenderedH4,
                      h5: RenderedH5,
                      h6: RenderedH6,

                  },};   
                  
    useEffect(()=>  {
    
     if(paragraphHighlighting) highlightOn();
     
    

    },[]);

    const existing_annotation = Object.entries(textBlockAnnotation).length;
    
    var annotation_text = '';

    if(existing_annotation) annotation_text = textBlockAnnotation['note']; else
        annotation_text = '';
   
    
    return (
      <div  onMouseOver={viewAnnotation} className={highlighted ? (isTextBlockActive? 'active':'highlighted-on') : 'highlighted-off'}>
          <div className="dt w-100  b--black-05 pb2"> 
	          <div className="dtc w2 w3-ns v-mid">
              <SmallButton onClick={highlightChange}>{highlighted? <Icon icon="data-decrease"></Icon>:<Icon icon="edit2"></Icon>}</SmallButton>
                {highlighted? <SmallButton onClick={editAnnotation}><Icon icon="edit"></Icon></SmallButton>: null}
            </div>

            <div className="dtc v-mid pl3">
              <div className={font + " " + font_size + " fw1 black mv0"}>
                <Markdown  options={markdown_options} >{children}</Markdown>
              </div>
            </div>
	      </div>

      </div>

    );

}


const mapStateToProps = (state, ownProps) => ({   
    paragraphHighlighting: selectParagraphHighlighting(ownProps.articleId,ownProps.textBlockId)(state),
    textBlockAnnotation: selectTextBlockAnnotation(ownProps.articleId, ownProps.textBlockId)(state),
    annotationPanelEditMode: selectAnnotationPanelEditMode(state),
    isTextBlockActive: selectIsTextBlockActive(ownProps.articleId,ownProps.textBlockId)(state),
    currentVisualConfigurationData: selectVisualConfigurationData(state),
})

const mapDispatchToProps = dispatch => ({
    
    add_paragraph_highlighting: (articleId, highlighting) => dispatch(addParagraphHighlighting({articleId: articleId, highlighting: highlighting})),
    remove_paragraph_highlighting: (articleId, highlighting) => dispatch(removeParagraphHighlighting({articleId: articleId, highlighting: highlighting})),
    setCurrentAnnotatedItem: (categoryStrId, articleId, articleStrId, textBlockId, type, scrollTop) => dispatch(setCurrentAnnotatedItem({categoryStrId: categoryStrId, articleId: articleId, articleStrId: articleStrId, textBlockId: textBlockId, type: type, scrollTop: scrollTop})),
    setAnnotationPanelVisible: () => dispatch(setAnnotationPanelVisible()),
    setAnnotationPanelHidden: () => dispatch(setAnnotationPanelHidden()),
    setAnnotationPanelEditMode: () => dispatch(setAnnotationPanelEditMode()),
    setAnnotationPanelReadMode: () => dispatch(setAnnotationPanelReadMode()),
});


export default connect(mapStateToProps, mapDispatchToProps)(TextBlock);



