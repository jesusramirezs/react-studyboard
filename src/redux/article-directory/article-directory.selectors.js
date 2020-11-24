import { createSelector } from 'reselect';

import { selectCategoryDirectory } from '../category-directory/category-directory.selectors';

const selectArticleDirectoryStorage = state => state.articleDirectoryStorage; 

export const selectArticleDirectory = createSelector(
    [selectArticleDirectoryStorage],
    content => content.articleDirectory

);

export const selectCurrentArticleId = createSelector(
    [selectArticleDirectoryStorage],
    content => content.currentArticleId

);

export const selectArticleDirectoryAsList = createSelector(
    [selectArticleDirectory],
   
    categories => categories ? Object.keys(categories).map(key => categories[key]) : []
    

);

export const selectArticleDirectoryAndCategoryInfoAsList = createSelector(
    [selectArticleDirectory, selectCategoryDirectory],
    
    (categories, categoryDirectory) => categories ? 
        Object.keys(categories)
        .map(key => ({ contents: categories[key], meta: categoryDirectory[key] })) : []
    

);



export const selectCategoryFromArticleDirectory = categoryStrId => createSelector(
    [selectArticleDirectory],
    
    categories => categories ? categories[categoryStrId] : []

);



export const selectCategoryArticlesFromArticleDirectory = categoryStrId => createSelector(
    [selectArticleDirectory],
    
    categories => categories ? categories[categoryStrId].elements.sort(function(a, b) {
        return a.order - b.order
      }) : []

);



export const selectIsArticleDirectoryFetching = createSelector(
    [selectArticleDirectoryStorage],
    content => content.isFetching
);



export const selectIsArticleDirectoryLoaded = createSelector(
    [selectArticleDirectoryStorage],
    content => content.isLoaded

);


export const selectArticle = (categoryStrId, articleStrId) => createSelector(
    [selectArticleDirectory],

    categories => categories ? categories[categoryStrId].elements.find(a => a.articleStrId === articleStrId) : null
    

);