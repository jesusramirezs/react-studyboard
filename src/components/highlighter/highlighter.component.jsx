import React, {useEffect, useState} from 'react';

import { connect } from 'react-redux';

import {addSelectionHighlighting} from '../../redux/highlighting-list/highlighting-list.actions';

import {selectArticleSelectionHighlightings} from '../../redux/highlighting-list/highlighting-list.selectors';

import  AnnotationForm  from '../annotation-form/annotation-form.component';


const Highlighter = ({ articleId, target, add_highlighting, articleSelectionHighlightings, handleUpdateBlock, articleBlocks }) => {

    const [currentColor, setCurrentColor] = useState('#fcf614');
 
    const [annotation, setAnnotation] = useState({});
    const [editorVisible, setEditorVisible] = useState(false);
    const [currentHighlights, setCurrentHighlights] = useState(null);


    const onMouseUpListener = () => {
        
        if(checkSelection()) {
            setEditorVisible(true);

            highlight();
        } else {
            
            setEditorVisible(false);
            
            setCurrentHighlights(null);
            
            clearSelection();
        }
    };



    const clearSelection = () => {
        if ( document.selection ) {
            document.selection.empty();
        } 
    }

    const findNodeWithDataBlockId = (node) => {

        if(node.nodeType == 1 && node.getAttribute('text-block-id')) {

            return node;
        }
        else 
            if(node.parentNode)
                return findNodeWithDataBlockId(node.parentNode)
            else    
                return null;

    }

    const findNodeIdWithDataBlockId = (node) => {
        
        if(node.nodeType == 1 && node.getAttribute('text-block-id')) {

            return node.getAttribute('text-block-id');
        }
        else 
            if(node.parentNode)
                return findNodeIdWithDataBlockId(node.parentNode)
            else    
                return null;

    }

    

    const setHighlight = () => {
    
        if(currentHighlights) {
            const h = currentHighlights;
            h.currentColor = currentColor;

            add_highlighting(articleId, currentHighlights );
            clearSelection();
        }

    }


    const cancelHighlight = () => {

        setEditorVisible(false);
        setCurrentHighlights(null);
        clearSelection();
    }


    const checkSelection = () => {

        if(!window.getSelection().rangeCount) return;

        var range = window.getSelection().getRangeAt(0);
        if((range.startContainer != range.endContainer) || range.startOffset != range.endOffset) return true
        else return false;
    }

    const highlight = () => {

        var range = window.getSelection().getRangeAt(0);
        const selectionString = range.toString().trim();
        const textBlockId = findNodeIdWithDataBlockId(range.startContainer);
        const current_range_offset = range.startOffset;
        const _highlightings = {textBlockId: textBlockId, selectionString:selectionString, currentColor: currentColor};
        const textBlock_node = findNodeWithDataBlockId(range.startContainer);

        var _iterator = document.createNodeIterator( //https://stackoverflow.com/questions/35475961/how-to-iterate-over-every-node-in-a-selected-range-in-javascript
            textBlock_node, 
            NodeFilter.SHOW_ALL, // pre-filter
            {
                // custom filter
                acceptNode: function (node) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        var _nodes = [];
        var char_count = 0;
        while (_iterator.nextNode()) {
            if (_nodes.length === 0 && _iterator.referenceNode !== textBlock_node) continue;
            _nodes.push(_iterator.referenceNode);
            if(_iterator.referenceNode.nodeType == 3 && _iterator.referenceNode !== range.startContainer) {

                char_count += _iterator.referenceNode.length;
            } else {

            }
            if (_iterator.referenceNode === range.startContainer) break;
        }

    
        _highlightings.offset = char_count+current_range_offset;

        setCurrentHighlights(_highlightings);

    }


    const handleUpdate = annotation => {

        setAnnotation(annotation);

    };
    
    
    useEffect(() => {

      window.addEventListener("mouseup", onMouseUpListener);

      return () => window.removeEventListener("mouseup", onMouseUpListener);
    },[]);

    return (
            editorVisible? (

            <div className='mv4 bg-white  w-100 ph3 pv4 ph4-m ph5-l fixed avenir'>
                <button style={{backgroundColor: currentColor, color: (currentColor === '#fcf614'? '#000':'#fff')}} onClick={setHighlight}>Highlight</button>
                <button onClick={cancelHighlight}>Cancel</button>
                <button onClick={()=>setCurrentColor('#fcf614')}>Yellow</button>
                <button onClick={()=>setCurrentColor('#fc4814')}>Red</button>
                <button onClick={()=>setCurrentColor('#14fc3d')}>Green</button>
            </div>
            
            
    ):null );

}
  

const mapStateToProps = (state, ownProps) => ({   
    
    articleSelectionHighlightings: selectArticleSelectionHighlightings(ownProps.articleId)(state),
    
})

  const mapDispatchToProps = dispatch => ({
    
    add_highlighting: (articleId, highlighting) => dispatch(addSelectionHighlighting({articleId: articleId, highlighting: highlighting})),
    
});


export default connect(mapStateToProps, mapDispatchToProps)(Highlighter);

