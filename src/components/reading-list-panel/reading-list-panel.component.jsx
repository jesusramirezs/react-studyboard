import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

import { _getUniqueId } from '../../utils/utils';

import CustomButton from '../custom-button/custom-button.component';

import ReadingListPanelElement from '../reading-list-panel-element/reading-list-panel-element.component'

import {PanelLayout} from './reading-list-panel.styles';

import { selectReadingListElements } from '../../redux/reading-list/reading-list.selectors';

import { toggleReadingListHidden } from '../../redux/reading-list/reading-list.actions';


const ReadingListPanel = ({readingListElements, toggleReadingListHidden, history}) => (
    <PanelLayout>
        <div >
            {
                readingListElements.length ? (
                    readingListElements.map(readingListElement => <ReadingListPanelElement key={_getUniqueId()} element={readingListElement} />)
                )
                :
                 (
                <span className='lh-title ml3'>Your reading list is empty</span>

                )
            }
        </div>
        <CustomButton className="mt6" inverted onClick={()=>{
                                    history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.reading_list}`);
                                    toggleReadingListHidden();
                                    }}>
                                    Manage reading List
        </CustomButton>

    </PanelLayout>
)



const mapStateToProps = createStructuredSelector({     
    readingListElements: selectReadingListElements    
  });

const mapDispatchToProps = dispatch => ({
    toggleReadingListHidden: () => dispatch(toggleReadingListHidden())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ReadingListPanel));
