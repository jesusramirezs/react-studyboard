import HighlightingListActionTypes from './highlighting-list.types';
import { firestore } from '../../firebase/firebase.utils';


export const toggleAnnotationListPanelHidden = () => ({
  type: HighlightingListActionTypes.TOGGLE_ANNOTATION_LIST_PANEL_HIDDEN,
  payload: null

});

export const addSelectionHighlighting = highlighting => ({
  type: HighlightingListActionTypes.ADD_SELECTION_HIGHLIGHTING,
  payload: highlighting

});


export const addParagraphHighlighting = paragraphHighlighting => ({
  type: HighlightingListActionTypes.ADD_PARAGRAPH_HIGHLIGHTING,
  payload: paragraphHighlighting

});

export const removeParagraphHighlighting = paragraphHighlighting => ({
  type: HighlightingListActionTypes.REMOVE_PARAGRAPH_HIGHLIGHTING,
  payload: paragraphHighlighting

});


export const addAnnotation = annotation => {
  return dispatch => {
    dispatch(addAnnotationDetail(annotation));
    dispatch(addAnnotationHistory(annotation));
  }

}


export const addAnnotationDetail = annotation => ({
  type: HighlightingListActionTypes.ADD_ANNOTATION_DETAIL,
  payload: annotation

});


export const addAnnotationHistory = annotationHistory => ({
  type: HighlightingListActionTypes.ADD_ANNOTATION_HISTORY,
  payload: annotationHistory

});


export const setTagFilter = tagFilter => ({
  type: HighlightingListActionTypes.SET_TAG_FILTER,
  payload: tagFilter


});