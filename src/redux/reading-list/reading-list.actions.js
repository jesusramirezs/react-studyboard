import ReadingListActionTypes from './reading-list.types';

export const toggleReadingListHidden = () => ({
    type: ReadingListActionTypes.TOGGLE_READING_LIST_HIDDEN,
    payload: null

})

export const setReadingListHidden = () => ({
    type: ReadingListActionTypes.SET_READING_LIST_HIDDEN,
    payload: null

})


export const addElementToReadingList = element => ({
    type: ReadingListActionTypes.ADD_ELEMENT_TO_READING_LIST,
    payload: element

})


export const removeElementFromReadingList = element => ({
    type: ReadingListActionTypes.REMOVE_ELEMENT_FROM_READING_LIST,
    payload: element

})