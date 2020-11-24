import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ReadingListElement from '../../components/reading-list-element/reading-list-element.component';

import {ReadingsListLayout} from './reading-list.styles';

import { selectReadingListElements } from '../../redux/reading-list/reading-list.selectors';



const ReadingListPage = ({readingListElements}) => (
    <ReadingsListLayout>    
        <h2 className="athelas mb4">Reading list</h2>    
        {
           
            readingListElements.length ? (
                readingListElements.map(readingListElement => <ReadingListElement key={readingListElement.articleId} readingListElement={readingListElement}/>)
            )
            :
            (
                <span className='empty-message'>Your reading list is empty</span>
            )

        }

    </ReadingsListLayout>

)



const mapStateToProps = createStructuredSelector({  
    
    readingListElements: selectReadingListElements    
    
});

export default connect(mapStateToProps)(ReadingListPage);