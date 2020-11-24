import ReadingStatusActionTypes from './reading-status.types';

import {updateProgressAtReadingStatus} from './reading-status.utils.js';


const INITIAL_STATE = {
    
    isFetching: false,  
    isLoaded: false,
    errorMessage: undefined,
    currentArticle: undefined,
    readingProgress: []
}


const ReadingStatusReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case ReadingStatusActionTypes.SET_CURRENT_ARTICLE:
            return {
                ...state,
                currentArticle: action.payload
                    
            }            

           

        case ReadingStatusActionTypes.UPDATE_PROGRESS_AT_READING_STATUS:
            return {
                ...state,
                readingProgress: updateProgressAtReadingStatus(state.readingProgress, action.payload) 
            };        



        default:
            return state;
    }


}

export default ReadingStatusReducer;