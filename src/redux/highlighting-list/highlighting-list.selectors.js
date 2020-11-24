import { createSelector } from 'reselect';

import { selectCurrentAnnotatedItem } from '../annotation-panel/annotation-panel.selectors';

import { selectArticleDirectory } from '../article-directory/article-directory.selectors';

const selectHighlightingListStorage = state => state.highlightingListStorage; 

export const selectSelectionHighlightings = createSelector(
    [selectHighlightingListStorage],
    content => content.highlightings

);


export const selectAnnotationListPanelHidden = createSelector(
    [selectHighlightingListStorage],
    content => content.hidden

)


export const selectArticleSelectionHighlightings = (articleId) => createSelector(
    [selectSelectionHighlightings],

    highlightingsMap => {
        const articleHighlightings = highlightingsMap ? highlightingsMap[articleId]: null;
        return(articleHighlightings? articleHighlightings : []);
    }

);

export const selectParagraphHighlightings = createSelector(
    [selectHighlightingListStorage],
    content => content.paragraphHighlightings

);


export const selectArticleParagraphHighlightings = (articleId) => createSelector(
    [selectParagraphHighlightings],

    paragrapHighlightingsMap => {

        const articleParagraphHighlightings = paragrapHighlightingsMap ? paragrapHighlightingsMap[articleId]: null;
        return(articleParagraphHighlightings? articleParagraphHighlightings : []);
    }

);


export const selectParagraphHighlighting = (articleId, textBlockId) => createSelector(
    [selectParagraphHighlightings],

    paragrapHighlightingsMap => {
        
        return paragrapHighlightingsMap? (paragrapHighlightingsMap[articleId] ? paragrapHighlightingsMap[articleId][textBlockId] : false)
        : false  
        
    }

);


export const selectAnnotations = createSelector(
    [selectHighlightingListStorage],
    content => content.annotations

);


export const selectAnnotationElementsCountIncorrect = createSelector(
    [selectAnnotations, selectParagraphHighlightings],
    

    (annotationElements, paragraphHighlightingsMap) => {

        
        const elements = Object.values(annotationElements); 
        const counterElements = elements.reduce(
            (counter, element) => {
                return(counter + 
                    Object.values(element).length)
            }, 0
            
                
            )
        return counterElements;
    }
);
        

export const selectAnnotationElementsCount = createSelector(
    [selectHighlightingListStorage, selectParagraphHighlightings],



    (content, paragraphHighlightingsMap ) => {
        const alreadyShown = [];

       
        const annotationsHistoryFiltered = content.annotationsHistory.filter(a => {
            const tag = "A"+a.articleStrId+"T"+a.textBlockId;
            if(!alreadyShown.includes(tag)) {
                alreadyShown.push(tag);
                return(true)
            } else
            return (false)
        }
        );


        const annotationsHistoryFilteredByHighlighting = annotationsHistoryFiltered.filter(a => 
            paragraphHighlightingsMap? (paragraphHighlightingsMap[a.articleId] ? paragraphHighlightingsMap[a.articleId][a.textBlockId] : false)
            : false
        );

        return annotationsHistoryFilteredByHighlighting.length;

    }

);
    


export const selectTextBlockAnnotation = (articleId, textBlockId) => createSelector(
    [selectAnnotations],

    annotationsMap => {

        const articleAnnotations = annotationsMap ? annotationsMap[articleId]: {};
        if(articleAnnotations) {
            const textBlockAnnotation = articleAnnotations[textBlockId];
            return (textBlockAnnotation? textBlockAnnotation: {});
        }
        else 
            return {}
        
    }

);



export const  selectCurrentAnnotationData = createSelector(

[selectCurrentAnnotatedItem, selectAnnotations],
    
(currentItem, annotationsMap) => {
    if(!currentItem) return {}
    const articleAnnotations = annotationsMap ? annotationsMap[currentItem.articleId]: null;
    if(articleAnnotations) {
        const textBlockAnnotation = articleAnnotations[currentItem.textBlockId];
        return (textBlockAnnotation? {...currentItem, annotation: textBlockAnnotation} : {...currentItem, annotation:{} });
    }
    else 
        return {...currentItem, annotation:{} }
    
    }
);







export const selectAnnotationsHistory = createSelector(
    [selectHighlightingListStorage, selectArticleDirectory, selectParagraphHighlightings],

    (content, articleDirectory, paragraphHighlightingsMap ) => {
        const alreadyShown = [];

        if(!articleDirectory) return [];
       
        const annotationsHistoryFiltered = content.annotationsHistory.filter(a => {
            const tag = "A"+a.articleStrId+"T"+a.textBlockId;
            if(!alreadyShown.includes(tag)) {
                alreadyShown.push(tag);
                return(true)
            } else
            return (false)
        }
        );

        const annotationsHistoryFilteredByHighlighting = annotationsHistoryFiltered.filter(a => 
            paragraphHighlightingsMap? (paragraphHighlightingsMap[a.articleId] ? paragraphHighlightingsMap[a.articleId][a.textBlockId] : false)
            : false
        
        );


        const annotationsHistoryWithArticleInfo = annotationsHistoryFilteredByHighlighting.map(a => { 

            const element = articleDirectory? 
                articleDirectory[a.categoryStrId].elements.find(e => e.articleStrId === a.articleStrId)
                :
                null;

            return (
               {...a, thumbUrl: element.thumbUrl, title: element.title}

               ) 
            }
        );


        return annotationsHistoryWithArticleInfo;

    }


    );



