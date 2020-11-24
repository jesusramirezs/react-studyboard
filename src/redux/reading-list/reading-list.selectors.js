import { createSelector } from 'reselect';

const selectReadingListStorage = state => state.readingListStorage; 

export const selectReadingListElements = createSelector(

    [selectReadingListStorage],
    readingList => readingList.readingListElements

)

export const selectReadingListHidden = createSelector(
    [selectReadingListStorage],
    readingList => readingList.hidden

)

export const selectReadingListElementsCount = createSelector(
    [selectReadingListElements],
    
    readingListElements => readingListElements.length
)


