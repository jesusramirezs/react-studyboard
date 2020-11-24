import { createSelector } from 'reselect';

const selectAnnotationPanel = state => state.annotationPanelStorage; 



export const selectAnnotationPanelHidden = createSelector(
    [selectAnnotationPanel],
    annotationPanel => annotationPanel.hidden

);

export const selectAnnotationPanelEditMode = createSelector(
    [selectAnnotationPanel],
    annotationPanel => annotationPanel.editMode

);


export const selectCurrentAnnotatedItem = createSelector(
    [selectAnnotationPanel],
    annotationPanel => annotationPanel.currentAnnotatedItem

);


export const  selectIsTextBlockActive = (articleId, textBlockId) => createSelector(

    [selectCurrentAnnotatedItem],

    (currentItem) => {
        if(!currentItem) return false

        if (currentItem.articleId == articleId && currentItem.textBlockId == textBlockId)
            return true
        else
            return false
        
    }

);

