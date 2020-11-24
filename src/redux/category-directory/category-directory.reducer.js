import CATEGORY_DIRECTORY_DATA from './category-directory.data.js'; 

import CategoryDirectoryActionTypes from './category-directory.types';

const INITIAL_STATE = {
    categoryDirectory: CATEGORY_DIRECTORY_DATA,
    currentCategoryName: undefined
}


const categoryDirectoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CategoryDirectoryActionTypes.SET_CURRENT_CATEGORY_NAME:
            return {
                ...state,
                currentCategoryName: action.payload
                    
            }            
    
        default:
            return state;
    }


}

export default categoryDirectoryReducer;