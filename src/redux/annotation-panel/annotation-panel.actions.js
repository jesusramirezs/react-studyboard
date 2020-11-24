import AnnotationPanelActionTypes from './annotation-panel.types';

export const toggleAnnotationPanelHidden = () => ({
    type: AnnotationPanelActionTypes.TOGGLE_ANNOTATION_PANEL_HIDDEN,
    payload: null

});

export const setAnnotationPanelHidden = () => ({
    type: AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_HIDDEN,
    payload: null

});

export const setAnnotationPanelVisible = () => ({
    type: AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_VISIBLE,
    payload: null

});

export const setAnnotationPanelEditMode = () => ({
    type: AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_EDIT_MODE,
    payload: null

});

export const setAnnotationPanelReadMode = () => ({
    type: AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_READ_MODE,
    payload: null

});

export const setCurrentAnnotatedItem = annotated_item => ({
    type: AnnotationPanelActionTypes.SET_CURRENT_ANNOTATED_ITEM,
    payload: annotated_item
  
  }); 





