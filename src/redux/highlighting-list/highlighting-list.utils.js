import { _getUniqueId } from '../../utils/utils';

export const _addSelectionHighlighting = (highlighlingMap, highlighlingToAdd) => {

    const existingArticleHighlightings = highlighlingMap[highlighlingToAdd.articleId];

    const newHighlighlingMap = Object.assign({}, highlighlingMap);

    if(existingArticleHighlightings) {

        newHighlighlingMap[highlighlingToAdd.articleId].push(highlighlingToAdd.highlighting);
        return newHighlighlingMap;
        
    } else {

        newHighlighlingMap[highlighlingToAdd.articleId] = [highlighlingToAdd.highlighting];
        return newHighlighlingMap;
    }
}



export const _addParagraphHighlighting = (highlighlingMap, highlighlingToAdd) => {

    const existingArticleHighlightings = highlighlingMap[highlighlingToAdd.articleId];

    const newHighlighlingMap = Object.assign({}, highlighlingMap);

    if(existingArticleHighlightings) {

        newHighlighlingMap[highlighlingToAdd.articleId][highlighlingToAdd.highlighting.textBlockId] = true;
        return newHighlighlingMap;
    
    } else {

        newHighlighlingMap[highlighlingToAdd.articleId] = [highlighlingToAdd.highlighting];
        newHighlighlingMap[highlighlingToAdd.articleId] = {}
        newHighlighlingMap[highlighlingToAdd.articleId][highlighlingToAdd.highlighting.textBlockId] = true;
        return newHighlighlingMap;
    }

}


export const _removeParagraphHighlighting = (highlighlingMap, highlightingToRemove) => {

    const existingArticleHighlightings = highlighlingMap[highlightingToRemove.articleId];

    if(existingArticleHighlightings) {

        if (existingArticleHighlightings[highlightingToRemove.highlighting.textBlockId]) {

            highlighlingMap[highlightingToRemove.articleId][highlightingToRemove.highlighting.textBlockId] = false;
        }
    }

    return highlighlingMap;



}


export const _addAnnotationDetail = (annotationsMap, annotationToAdd) => {

    const existingArticleAnnotations = annotationsMap[annotationToAdd.articleId];

    const newAnnotationsMap = Object.assign({}, annotationsMap);

    if(existingArticleAnnotations) {

        newAnnotationsMap[annotationToAdd.articleId][annotationToAdd.textBlockId] = annotationToAdd.annotation;
        return newAnnotationsMap;

    } else {
        newAnnotationsMap[annotationToAdd.articleId] = {}
        newAnnotationsMap[annotationToAdd.articleId][annotationToAdd.textBlockId]=annotationToAdd.annotation
        
        return newAnnotationsMap;
    }

}



export const _addAnnotationHistory = (annotationsHistoryList, annotationHistoryElementToAdd) => {
    return([{...annotationHistoryElementToAdd, id: _getUniqueId()}, ...annotationsHistoryList]);
}
