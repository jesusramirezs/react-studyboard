import AnnotationPanelActionTypes from './annotation-panel.types';

const INITIAL_STATE = {
    hidden: true,
    editMode: false, 
    currentAnnotatedItem: null
    
}

const annotationPanelReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AnnotationPanelActionTypes.TOGGLE_ANNOTATION_PANEL_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };

        case AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_HIDDEN:
            return {
                ...state,
                hidden: true
            };

        case AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_EDIT_MODE:
            return {
                ...state,
                editMode: true
            };

        case AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_READ_MODE:
            return {
                ...state,
                editMode: false
            };

        case AnnotationPanelActionTypes.SET_ANNOTATION_PANEL_VISIBLE:
            return {
                ...state,
                hidden: false
            };

        case AnnotationPanelActionTypes.SET_CURRENT_ANNOTATED_ITEM:
            return {
                ...state,
                currentAnnotatedItem: action.payload
                    
            };            

    
        default:
            return state;
    }


}

export default annotationPanelReducer;