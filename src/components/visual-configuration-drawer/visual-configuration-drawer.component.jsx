import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { Drawer, Button } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import CustomButton from '../custom-button/custom-button.component';

import { selectVisualConfigurationPanelHidden } from '../../redux/visual-configuration/visual-configuration.selectors';

import { selectVisualConfigurationData } from '../../redux/visual-configuration/visual-configuration.selectors';

import { setVisualConfigurationPanelHidden } from '../../redux/visual-configuration/visual-configuration.actions';

import VisualConfigurationForm  from '../visual-configuration-form/visual-configuration-form.component';



const VisualConfigurationDrawer = ({currentVisualConfigurationData,  visualConfigurationPanelHidden, setVisualConfigurationPanelHidden}) => {

    return (
      <div>
        <Drawer
          backdrop={false}
          size={'xs'}
          show={!visualConfigurationPanelHidden}
          onHide={setVisualConfigurationPanelHidden}
          placement={'left'}>
          <Drawer.Header>
            <Drawer.Title>Font</Drawer.Title>
          </Drawer.Header>
        <Drawer.Body>

        <VisualConfigurationForm   setupVisualConfigurationData={currentVisualConfigurationData}/>

        <div className="mt3">

        </div>
        </Drawer.Body>
          <Drawer.Footer>
            
            <Button onClick={setVisualConfigurationPanelHidden} appearance="subtle">Close</Button>
          </Drawer.Footer>
        </Drawer>
        </div>
    );

}


const mapStateToProps = createStructuredSelector({    
        currentVisualConfigurationData: selectVisualConfigurationData,
        visualConfigurationPanelHidden: selectVisualConfigurationPanelHidden,        
      });

const mapDispatchToProps = dispatch => ({
        setVisualConfigurationPanelHidden: () => dispatch(setVisualConfigurationPanelHidden()),

      });

export default connect(mapStateToProps,mapDispatchToProps)(VisualConfigurationDrawer);
