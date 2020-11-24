import ArticleDirectoryActionTypes from './article-directory.types';
import { firestore, convertContentsSnapshotToMap } from '../../firebase/firebase.utils';

import CONTENTS_DATA from './article-directory.data.js';  


export const setCurrentArticleId = articleId => ({
  type: ArticleDirectoryActionTypes.SET_CURRENT_ARTICLE_ID,
  payload: articleId

})

export const fetchArticleDirectoryStart = () => ({
    type: ArticleDirectoryActionTypes.FETCH_ARTICLE_DIRECTORY_START,
    
});

export const fetchArticleDirectorySuccess = contentMap => ({
  type: ArticleDirectoryActionTypes.FETCH_ARTICLE_DIRECTORY_SUCCESS,
  payload: contentMap
  
});


export const fetchArticleDirectoryFailure = errorMessage => ({
  type: ArticleDirectoryActionTypes.FETCH_ARTICLE_DIRECTORY_FAILURE,
  payload: errorMessage
  
});

export const fetchArticleDirectoryStartAsync = () => {
  
  return dispatch => {

    const collectionRef = firestore.collection('contents');
    dispatch(fetchArticleDirectoryStart());

    collectionRef.get().then(snapshot => {

        const contentsMap = CONTENTS_DATA;

        dispatch(fetchArticleDirectorySuccess(contentsMap));

    }).catch(error => dispatch(fetchArticleDirectoryFailure(error.message)));



  }
  
};