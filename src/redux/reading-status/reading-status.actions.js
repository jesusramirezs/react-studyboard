import ReadingStatusActionTypes from './reading-status.types';
import { firestore } from '../../firebase/firebase.utils';


export const setCurrentArticle = article => ({
  type: ReadingStatusActionTypes.SET_CURRENT_ARTICLE,
  payload: article

});


export const updateProgressAtReadingStatus = progress => ({
  type: ReadingStatusActionTypes.UPDATE_PROGRESS_AT_READING_STATUS,
  payload: progress

});

export const updateProgressAtTextBlockId = progress => ({
  type: ReadingStatusActionTypes.UPDATE_PROGRESS_AT_TEXT_BLOCK_ID,
  payload: progress

});

