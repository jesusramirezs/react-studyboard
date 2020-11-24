import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

import { _getUniqueId } from '../../utils/utils';

import { Drawer, Button } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import CustomButton from '../custom-button/custom-button.component';

import ReadingListPanelElement from '../reading-list-panel-element/reading-list-panel-element.component'

import { selectReadingListHidden } from '../../redux/reading-list/reading-list.selectors';

import { selectReadingListElements } from '../../redux/reading-list/reading-list.selectors';

import { toggleReadingListHidden } from '../../redux/reading-list/reading-list.actions';



const ReadingListDrawer = ({readingListElements, toggleReadingListHidden, readingListPanelHidden, history}) => (
  <div>
    <Drawer
      backdrop={false}
      size={'xs'}
      show={!readingListPanelHidden}
      onHide={toggleReadingListHidden}
      placement={'left'}
      >
      <Drawer.Header>
        <Drawer.Title>Reading list</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
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

        <div className="tc ">
          <CustomButton className="mt6 " inverted onClick={()=>{
                                    history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.reading_list}`);
                                    toggleReadingListHidden();
                                    }}>
                                    Manage reading List

          </CustomButton>
        </div>

        </Drawer.Body>
        
        <Drawer.Footer>            
            <Button onClick={toggleReadingListHidden} appearance="subtle">Close</Button>
        </Drawer.Footer>
      </Drawer>
    </div>
)



const mapStateToProps = createStructuredSelector({  
    readingListPanelHidden: selectReadingListHidden,    
    readingListElements: selectReadingListElements    
  });

const mapDispatchToProps = dispatch => ({
    toggleReadingListHidden: () => dispatch(toggleReadingListHidden())
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ReadingListDrawer));
