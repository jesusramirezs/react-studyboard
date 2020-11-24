
export const updateProgressAtReadingStatus = (progressList, updatedProgress) => {


    const existingProgressElement = progressList.find(progressListElement => progressListElement.articleId === updatedProgress.articleId);

    if (existingProgressElement) {
        
        return progressList.map(progressListElement => progressListElement.articleId === updatedProgress.articleId ?  
            {...progressListElement, progress: updatedProgress.progress }
            : progressListElement
            
            )

    } else {

    return [...progressList, {...updatedProgress}];

    }

}





