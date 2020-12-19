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
         selectParagraphSelectionHighlightings, 
         selectTextBlockAnnotation } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectIsTextBlockActive } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectAnnotationPanelEditMode,
         selectCurrentAnnotatedAnnotationPanelEditMode } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectVisualConfigurationData } from '../../redux/visual-configuration/visual-configuration.selectors';


const close_span = (text, ending_word) => {  //function that removes punctuation from last word of selection

  if(ending_word) {
    let pos = text.length-1;
    let punctuation = "";
    while(" .,;:!?".indexOf(text[pos]) > -1 && pos >= 0) {
      punctuation = text[pos] + punctuation;
      --pos;
    }

  
    return(text.slice(0,pos+1)+"</span>"+punctuation);
  } else {
    return(text+"</span>");
  }
}

const TextBlock = ({ textBlockId, 
                     articleId, 
                     categoryStrId,
                     articleStrId,
                     children, 
                     add_paragraph_highlighting, 
                     remove_paragraph_highlighting, 
                     annotationPanelEditMode, 
                     paragraphHighlighting, 
                     paragraphSelectionHighlightings, 
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
    
    let text = children;

    

    const filter_special = (text) => {

      let result=[];
  
      let found = true;
      while(found) {
        if(text[0] == '>' || text[0] == '#' || text[0] == '-' ) {
          result.push({t: text[0], s: false, h:false, color:null});
          text = text.slice(1);
        } else {
          found = false;
        }
      }
  
      found = true;
      
      let pos;
      let result2=result;

      while(found) {
        pos = text.indexOf('*');

        if(pos > -1) {
          
          if(pos == 0) {
            result2.push({t: text[0], s: false, h:false, color:null});
            text = text.slice(1);
          }
          else {
            if(text[pos-1] != '\\') {
              result2.push({t: text.slice(0, pos), s: true, h:false, color:null});
              result2.push({t: text[pos], s: false, h:false, color:null});
              
              text = text.slice(pos+1);
            }
          }
            
        } else {
          found = false;
          result2.push({t: text, s: true, h:false, color:null});
        }

      }    

      return(result2);

    }

    let text_result = "";

    if(paragraphSelectionHighlightings.length) {

      let textSplit = text.split(" ");
      textSplit = textSplit.map((t, i) => {return (i<textSplit.length-1)? t+" ":t});

      let textSplit_m = [];
      let filtered_text = "";

      let pos = 0;
      textSplit.map(t => {

        filter_special(t).map(b=>{
          b.pos = pos;
          textSplit_m.push(b); 
          if(b.s) {
            filtered_text += b.t;
            pos += b.t.length;
          }
          
        })

      });

      
      paragraphSelectionHighlightings.map(
        h => {
          let stringSplit = h.selectionString.split(" ");
          stringSplit = stringSplit.map((t, i) => {return(i<stringSplit.length-1)? t+" ":t});
          const pos = filtered_text.indexOf(h.selectionString);

          // lets match stringSplit vector and textSplit vector

          let last_ind_o1 = 0 ;
          let ind_o1 = 0;
          let l1_broken = false;
          let l2_broken = false;
          let h_i = [];
          let success = false;


            while(!success && !l2_broken) {
              
              let ind_o2 = 0;
              ind_o1 = last_ind_o1+1;

              h_i = [];
              l1_broken = false;

              if(ind_o1 >= textSplit_m.length ) {
                l2_broken = true;
              } else {
                while(ind_o1 < textSplit_m.length && !textSplit_m[ind_o1].s) {
                  ++ind_o1;

                }

                while(!l1_broken && !success) {

                  if(textSplit_m[ind_o1].pos > h.offset - 5 && 
                    
                    ( textSplit_m[ind_o1].t == stringSplit[ind_o2]
                    ||
                     (ind_o2 == stringSplit.length-1 && textSplit_m[ind_o1].t.startsWith(stringSplit[ind_o2])  )
                    ||
                      (ind_o2 == 0 && textSplit_m[ind_o1].t.endsWith(stringSplit[ind_o2]))
                    ) 
                    
                    ){
                    last_ind_o1 = ind_o1;
                    h_i.push(ind_o1);

                    ++ind_o1;
                    while(ind_o1 < textSplit_m.length && !textSplit_m[ind_o1].s) {
                      ++ind_o1;
                    }

                    ++ind_o2;
                    if(ind_o2 >= stringSplit.length) {
                      success = true
                    }
                  } else {
                  
                    l1_broken=true;
                    last_ind_o1=ind_o1;

                  }
               
                }
              }
            }

          h_i.map((i, ind) => { 
            textSplit_m[i].h = true; 
            textSplit_m[i].color = h.currentColor
            textSplit_m[i].final = false;
            if(ind==h_i.length-1) {
              textSplit_m[i].final = true;
            }
          });

        });

      textSplit_m.map(
        (w, i) => {
          text_result += w.h? "<span style='backgroundColor:"+w.color+"'>"+close_span(w.t, w.final) : w.t;
    
      });

      text_result = text_result.replaceAll(" <span", "<span>&nbsp;</span><span");

    } else {
      text_result = text;
    }


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
      <div id={textBlockId} onMouseOver={viewAnnotation} className={highlighted ? (isTextBlockActive? 'active':'highlighted-on') : 'highlighted-off'}>
          <div className="dt w-100  b--black-05 pb2"> 
	          <div className="dtc w2 w3-ns v-mid">
              <SmallButton onClick={highlightChange}>{highlighted? <Icon icon="data-decrease"></Icon>:<Icon icon="edit2"></Icon>}</SmallButton>
                {highlighted? <SmallButton onClick={editAnnotation}><Icon icon="edit"></Icon></SmallButton>: null}
            </div>

            <div className="dtc v-mid pl3">
              <div text-block-id={textBlockId} className={font + " " + font_size + " fw1 black mv0"}>
                <Markdown  options={markdown_options} >{text_result}</Markdown>
              </div>
            </div>
	      </div>

      </div>

    );

}


const mapStateToProps = (state, ownProps) => ({   
    paragraphHighlighting: selectParagraphHighlighting(ownProps.articleId,ownProps.textBlockId)(state),
    paragraphSelectionHighlightings: selectParagraphSelectionHighlightings(ownProps.articleId, ownProps.textBlockId)(state),
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



