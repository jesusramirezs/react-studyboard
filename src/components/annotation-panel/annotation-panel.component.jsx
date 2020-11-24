import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';

import  AnnotationForm from '../annotation-form/annotation-form.component';

import  AnnotationInfo from '../annotation-info/annotation-info.component';

import { PanelLayout } from './annotation-panel.styles';

import { selectAnnotationPanelEditMode } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectCurrentAnnotationData } from '../../redux/highlighting-list/highlighting-list.selectors';

import { toggleAnnotationPanelHidden, setAnnotationPanelEditMode, setAnnotationPanelReadMode } from '../../redux/annotation-panel/annotation-panel.actions';



const AnnotationPanel = ({currentAnnotationData, annotationPanelEditMode, setAnnotationPanelReadMode, toggleAnnotationPanelHidden, setAnnotationPanelEditMode}) => {

    return (
      <PanelLayout> 

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
          <CustomButton onClick={()=>{
                                    toggleAnnotationPanelHidden();
                                    setAnnotationPanelReadMode();
                                    }}>
                                    Close
          </CustomButton>
        </div>
      </PanelLayout>
    );

}


const mapStateToProps = createStructuredSelector({    
        currentAnnotationData: selectCurrentAnnotationData,
        annotationPanelEditMode: selectAnnotationPanelEditMode
      });

const mapDispatchToProps = dispatch => ({
        toggleAnnotationPanelHidden: () => dispatch(toggleAnnotationPanelHidden()),
        setAnnotationPanelEditMode: () => dispatch(setAnnotationPanelEditMode()),
        setAnnotationPanelReadMode: () => dispatch(setAnnotationPanelReadMode()),
      });

export default connect(mapStateToProps,mapDispatchToProps)(AnnotationPanel);
