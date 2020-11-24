import { createSelector } from 'reselect';


const selectCategoryDirectoryStorage = state => state.categoryDirectoryStorage; 


export const selectCategoryDirectory = createSelector(

  [selectCategoryDirectoryStorage],
  categoryDirectoryStorage => categoryDirectoryStorage.categoryDirectory


);



export const selectCategoryDirectoryAsList = createSelector(

    [selectCategoryDirectory],
    categories => categories ? Object.keys(categories).map(key => categories[key]).sort(function(a, b) {
      return a.order - b.order
    }) : []
    

);


export const selectCategoryInfo = categoryURLParam => createSelector(
  [selectCategoryDirectory],
  
  categories => categories ? categories[categoryURLParam] : []

);