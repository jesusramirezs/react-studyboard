import { createSelector } from 'reselect';



const selectReadingStatusStorage = state => state.readingStatusStorage; 


export const selectCurrentArticle = createSelector(
    [selectReadingStatusStorage],
    content => content.currentArticle

);


export const selectReadingProgress = createSelector(
    [selectReadingStatusStorage],
    content => content.readingProgress

);



export const selectArticleReadingProgress = (articleId) => createSelector(
    [selectReadingProgress],

    readingProgressList => {
        const articleReadingProgress = readingProgressList ? readingProgressList.find(p => p.articleId === articleId): null;
        return(articleReadingProgress? articleReadingProgress['progress'] : 0);
    }

);

