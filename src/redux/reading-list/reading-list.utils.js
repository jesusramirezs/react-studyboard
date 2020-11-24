export const addElementToReadingList = (readingListElements, readingListElementToAdd) => {


    const existingReadingListElement = readingListElements.find(readingListElement => readingListElement.articleId === readingListElementToAdd.articleId);

    if (existingReadingListElement) {
        return readingListElements

    } else {

    return [...readingListElements, {...readingListElementToAdd}];

    }

}





export const removeElementFromReadingList = (readingListElements, readingListElementToRemove) => {

    return readingListElements.filter(readingListElement => readingListElement.articleId !== readingListElementToRemove.articleId);



}