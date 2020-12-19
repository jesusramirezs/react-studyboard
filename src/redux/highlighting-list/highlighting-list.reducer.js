import HighlightingListActionTypes from './highlighting-list.types';

import {_addSelectionHighlighting, 
        _addParagraphHighlighting, 
        _removeParagraphHighlighting, 
        _addAnnotationDetail,
        _addAnnotationHistory} from './highlighting-list.utils.js';


const INITIAL_STATE = {
    
    isFetching: false,  
    isLoaded: false,
    errorMessage: undefined,
    hidden: true,
    selectionHighlightings: {},
    paragraphHighlightings: {},
    annotations: {}, 
    annotationsHistory: [],
    tagFilter: ['question','read','highlight','others'],
    highlightings: {}
}


const HighlightingListReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {

        case HighlightingListActionTypes.TOGGLE_ANNOTATION_LIST_PANEL_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };

        case HighlightingListActionTypes.ADD_SELECTION_HIGHLIGHTING:
            return {
                ...state,
                highlightings: _addSelectionHighlighting(state.highlightings, action.payload)
                
                    
            }       
            
        case HighlightingListActionTypes.ADD_PARAGRAPH_HIGHLIGHTING:
            return {
                ...state,
                paragraphHighlightings: _addParagraphHighlighting(state.paragraphHighlightings, action.payload)
                    
            }        
        case HighlightingListActionTypes.REMOVE_PARAGRAPH_HIGHLIGHTING:
            return {
                ...state,
                paragraphHighlightings: _removeParagraphHighlighting(state.paragraphHighlightings, action.payload)
                    
            }      
        case HighlightingListActionTypes.ADD_ANNOTATION_DETAIL:
            return {
                ...state,
                annotations: _addAnnotationDetail(state.annotations, action.payload)
                    
            }     
        case HighlightingListActionTypes.ADD_ANNOTATION_HISTORY:
                return {
                    ...state,
                    annotationsHistory: _addAnnotationHistory(state.annotationsHistory, action.payload)
                        
                }     
        case HighlightingListActionTypes.SET_TAG_FILTER:
                return {
                    ...state,
                    tagFilter: action.payload
                        
                }     

        default:
            return state;
    }


}

export default HighlightingListReducer;