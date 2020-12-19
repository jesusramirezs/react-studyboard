import React, {useEffect} from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

import CustomButton from '../custom-button/custom-button.component';

import AnnotationListPanelElement from '../annotation-list-panel-element/annotation-list-panel-element.component'

import { Drawer, Button } from 'rsuite';

import { Form, FormGroup, ControlLabel, FormControl, Checkbox, CheckboxGroup } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import { SpinnerContainer, SpinnerOverlay } from '../loading-status/loading-status.styles';

import { selectAnnotationsHistory } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectAnnotationListPanelHidden } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectTagFilter } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

import { fetchArticleDirectoryStartAsync } from '../../redux/article-directory/article-directory.actions';

import { toggleAnnotationListPanelHidden } from '../../redux/highlighting-list/highlighting-list.actions';

import { setTagFilter } from '../../redux/highlighting-list/highlighting-list.actions';




const FilterForm = ({setupTagFilter, setTagFilter}) => {
    
    return (<div>
      <Form formValue={{tags: setupTagFilter}} onChange={formValue => {setTagFilter(formValue.tags)}}>

        <FormGroup>
          <ControlLabel>Filter Tags</ControlLabel>
          <FormControl
            name="tags"
            accepter={CheckboxGroup}>

            <Checkbox value="question"><span className="f6 ">question</span></Checkbox>
            <Checkbox value="read"><span className="f6">read</span></Checkbox>
            <Checkbox value="highlight"><span className="f6 ">highlight</span></Checkbox>
            <Checkbox value="others"><span className="f6 ">...others</span></Checkbox>


          </FormControl>
        </FormGroup>


      </Form>
    </div>);
};



const AnnotationListDrawer = ({ annotationsHistory, tagFilter, setTagFilter, isLoaded, toggleAnnotationListPanelHidden, annotationListPanelHidden, fetchArticleDirectoryStartAsync, history }) => {


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
        <FilterForm setupTagFilter={tagFilter} setTagFilter={setTagFilter} />
        <hr/>
        <br/>
          { isLoaded? 
            
            annotationsHistory.length ? (
              annotationsHistory.filter(e => 
                {
                  return ((!e.annotation.tags.length && tagFilter.includes('others') ) ||
                    e.annotation.tags
                    .filter(t => tagFilter.includes(t) || (tagFilter.includes('others') && !['read','question','highlight'].includes(t)) )
                    .length)
                })
                .map(annotationHistoryElement => <AnnotationListPanelElement key={annotationHistoryElement.id} element={annotationHistoryElement} />)
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
    isLoaded: selectIsArticleDirectoryLoaded,  
    tagFilter: selectTagFilter
});

const mapDispatchToProps = dispatch => ({
    toggleAnnotationListPanelHidden: () => dispatch(toggleAnnotationListPanelHidden()),
    fetchArticleDirectoryStartAsync: () => dispatch(fetchArticleDirectoryStartAsync()),
    setTagFilter: (tagFilter) => dispatch(setTagFilter(tagFilter))

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AnnotationListDrawer));