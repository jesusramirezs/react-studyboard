import ArticleDirectoryActionTypes from './article-directory.types';

const INITIAL_STATE = {
    
    articleDirectory: null,
    isFetching: false,  
    isLoaded: false,
    errorMessage: undefined,
    currentArticleId: undefined

}


const articleDirectoryReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case ArticleDirectoryActionTypes.FETCH_ARTICLE_DIRECTORY_START: {
            
            return {
                ...state,
                isFetching: true,
                isLoaded: false,

            }            
        }
        case ArticleDirectoryActionTypes.FETCH_ARTICLE_DIRECTORY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                articleDirectory: action.payload
                
            }            
        case ArticleDirectoryActionTypes.FETCH_ARTICLE_DIRECTORY_FAILURE: 
            return {
                ...state,
                isFetching: false,
                isLoaded: false,
                errorMessage: action.payload

            }
        case ArticleDirectoryActionTypes.SET_CURRENT_ARTICLE_ID:
            return {
                ...state,
                currentArticleId: action.payload
                    
            }            
        

        default:
            return state;
    }


}

export default articleDirectoryReducer;