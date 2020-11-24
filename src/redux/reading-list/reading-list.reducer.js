import ReadingListActionTypes from './reading-list.types';

import {addElementToReadingList, removeElementFromReadingList} from './reading-list.utils.js';

const INITIAL_STATE = {
    hidden: true,
    readingListElements: []
}

const readingListReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ReadingListActionTypes.TOGGLE_READING_LIST_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case ReadingListActionTypes.SET_READING_LIST_HIDDEN:
            return {
                ...state,
                hidden: true
            };
        case ReadingListActionTypes.ADD_ELEMENT_TO_READING_LIST:
            return {
                ...state,
                readingListElements: addElementToReadingList(state.readingListElements, action.payload) 
            };        
 
        case ReadingListActionTypes.REMOVE_ELEMENT_FROM_READING_LIST:
            return {
                ...state,
                readingListElements: removeElementFromReadingList(state.readingListElements, action.payload) 
            };        
        

        default:
            return state;
    }


}

export default readingListReducer;