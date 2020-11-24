import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { toggleReadingListHidden } from '../../redux/reading-list/reading-list.actions.js';

import { selectReadingListElementsCount } from '../../redux/reading-list/reading-list.selectors'

import { ReactComponent as PanelIcon } from '../../assets/panel-icon.svg';

import { ReadingListIconContainer } from './reading-list-icon.styles';

const ReadingListIcon = ({elementCount, toggleReadingListHidden}) => (
    
    <ReadingListIconContainer onClick={()=>toggleReadingListHidden()}>
        
        <span className='item-count'>={elementCount}=</span>

    </ReadingListIconContainer>
)


const mapStateToProps = createStructuredSelector({  
    elementCount: selectReadingListElementsCount  
});


const mapDispatchToProps = dispatch => ({
    toggleReadingListHidden: () => dispatch(toggleReadingListHidden())
});

  
export default connect(mapStateToProps, mapDispatchToProps)(ReadingListIcon);
