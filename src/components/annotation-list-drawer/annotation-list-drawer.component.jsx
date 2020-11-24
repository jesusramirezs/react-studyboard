import React, {useEffect} from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

import CustomButton from '../custom-button/custom-button.component';

import AnnotationListPanelElement from '../annotation-list-panel-element/annotation-list-panel-element.component'

import { Drawer, Button } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import { SpinnerContainer, SpinnerOverlay } from '../loading-status/loading-status.styles';

import { selectAnnotationsHistory } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectAnnotationListPanelHidden } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

import { fetchArticleDirectoryStartAsync } from '../../redux/article-directory/article-directory.actions';

import { toggleAnnotationListPanelHidden } from '../../redux/highlighting-list/highlighting-list.actions';


const AnnotationListDrawer = ({ annotationsHistory, isLoaded, toggleAnnotationListPanelHidden, annotationListPanelHidden, fetchArticleDirectoryStartAsync, history }) => {


  useEffect(()=>  {
        
    if(!isLoaded) fetchArticleDirectoryStartAsync();

  },[]);


  return(        


    <div>
      <Drawer
        size={'xs'}
        backdrop={false}
        show={!annotationListPanelHidden}
        onHide={toggleAnnotationListPanelHidden}
        placement={'left'}>

        <Drawer.Header>
          <Drawer.Title>Notes</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>

          { isLoaded?
              annotationsHistory.length ? (
                annotationsHistory.map(annotationHistoryElement => <AnnotationListPanelElement key={annotationHistoryElement.id} element={annotationHistoryElement} />)
              )
              :
              (
                <span className='pa5 empty-message'>Your notes list is empty</span>
               )
            :
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>

            }
     
        </Drawer.Body>

        <Drawer.Footer>
            
            <Button onClick={toggleAnnotationListPanelHidden} appearance="subtle">Close</Button>
        </Drawer.Footer>
      </Drawer>
      </div>
  )
}


const mapStateToProps = createStructuredSelector({  
    annotationsHistory: selectAnnotationsHistory,
    annotationListPanelHidden: selectAnnotationListPanelHidden,
    isLoaded: selectIsArticleDirectoryLoaded  //el primer currentUser podría llamarse de otra forma, pero tiene que coincidir con la props que especificamos en la definicion de Header

});

const mapDispatchToProps = dispatch => ({
    toggleAnnotationListPanelHidden: () => dispatch(toggleAnnotationListPanelHidden()),
    fetchArticleDirectoryStartAsync: () => dispatch(fetchArticleDirectoryStartAsync())

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AnnotationListDrawer));