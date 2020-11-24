import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { Drawer, Button } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import CustomButton from '../custom-button/custom-button.component';

import  AnnotationForm from '../annotation-form/annotation-form.component';

import  AnnotationInfo from '../annotation-info/annotation-info.component';

import { selectAnnotationPanelHidden } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectAnnotationPanelEditMode } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectCurrentAnnotationData } from '../../redux/highlighting-list/highlighting-list.selectors';

import { toggleAnnotationPanelHidden, setAnnotationPanelEditMode, setAnnotationPanelReadMode } from '../../redux/annotation-panel/annotation-panel.actions';



const AnnotationDrawer = ({currentAnnotationData, annotationPanelEditMode, annotationPanelHidden, setAnnotationPanelReadMode, toggleAnnotationPanelHidden, setAnnotationPanelEditMode}) => {

    return (
      <div>
        <Drawer
          backdrop={false}
          size={'xs'}
          show={!annotationPanelHidden}
          onHide={toggleAnnotationPanelHidden}
          placement={'right'}>
          <Drawer.Header>
            <Drawer.Title>Note</Drawer.Title>
          </Drawer.Header>
        <Drawer.Body>


        {annotationPanelEditMode? 
          <AnnotationForm   setupAnnotationData={currentAnnotationData}/>
        :
          <AnnotationInfo   setupAnnotationData={currentAnnotationData}/>
        }     
        {!annotationPanelEditMode? 
          <div className='buttons mt3'>
            <CustomButton onClick={setAnnotationPanelEditMode}>edit</CustomButton>
          </div>
          :
          null
        }
        <div className="mt3">

        </div>
        </Drawer.Body>
          <Drawer.Footer>
            
            <Button onClick={toggleAnnotationPanelHidden} appearance="subtle">Close</Button>
          </Drawer.Footer>
        </Drawer>
        </div>
    );

}


const mapStateToProps = createStructuredSelector({    
        currentAnnotationData: selectCurrentAnnotationData,
        annotationPanelEditMode: selectAnnotationPanelEditMode,
        annotationPanelHidden: selectAnnotationPanelHidden,        
      });

const mapDispatchToProps = dispatch => ({
        toggleAnnotationPanelHidden: () => dispatch(toggleAnnotationPanelHidden()),
        setAnnotationPanelEditMode: () => dispatch(setAnnotationPanelEditMode()),
        setAnnotationPanelReadMode: () => dispatch(setAnnotationPanelReadMode()),
      });

export default connect(mapStateToProps,mapDispatchToProps)(AnnotationDrawer);
