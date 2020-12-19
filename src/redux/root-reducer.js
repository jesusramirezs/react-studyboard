import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';


import userReducer from './user/user.reducer';
import readingListReducer from './reading-list/reading-list.reducer';
import annotationPanelReducer from './annotation-panel/annotation-panel.reducer';
import visualConfigurationReducer from './visual-configuration/visual-configuration.reducer';
import readingStatusReducer from './reading-status/reading-status.reducer';
import categoryDirectoryReducer from './category-directory/category-directory.reducer';
import articleDirectoryReducer from './article-directory/article-directory.reducer';
import highlightingListReducer from './highlighting-list/highlighting-list.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['readingListStorage', 'readingStatusStorage', 'visualConfigurationStorage', 'highlightingListStorage']

}
//


const rootReducer = combineReducers({
    user: userReducer,  
    readingListStorage: readingListReducer,
    annotationPanelStorage: annotationPanelReducer, 
    visualConfigurationStorage: visualConfigurationReducer,
    categoryDirectoryStorage: categoryDirectoryReducer,
    articleDirectoryStorage: articleDirectoryReducer, 
    readingStatusStorage: readingStatusReducer,
    highlightingListStorage: highlightingListReducer,
    });

export default persistReducer(persistConfig, rootReducer);