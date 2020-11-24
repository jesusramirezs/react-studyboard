import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { Form, FormGroup, ControlLabel, FormControl, Radio, Button, RadioGroup } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import TextInput from '../text-input/text-input.component';

import CustomButton from '../custom-button/custom-button.component';

import { setVisualConfiguration } from '../../redux/visual-configuration/visual-configuration.actions';




const VisualConfigurationForm = ({ setupVisualConfigurationData, setVisualConfiguration }) => {
    
    const [visualConfiguration, setVisualConfigurationState] = useState(setupVisualConfigurationData);

    const { font, font_size } = visualConfiguration;

 
    const setVisualConfigurationData = data => {

      setVisualConfiguration(data);
      setVisualConfigurationState(data);
    }
     
    const handleSubmit = async event => {
      event.preventDefault();
  
      try {
        
        setVisualConfiguration(visualConfiguration);
        

      } catch (error) {
        console.log(error);
      }
    };
  

      const handleChange = event => {
        const { value, name } = event;
        console.log(event);
        setVisualConfigurationState({ ...visualConfiguration, [name]: value });
      };



      useEffect(() => {

       

      }, []);
      

      return (
        <div>


<Form formValue={visualConfiguration} onChange={formValue => {setVisualConfigurationData(formValue)}}>


<FormGroup>
        <ControlLabel>Font</ControlLabel>
        <FormControl
                 name="font"
                 accepter={RadioGroup}>

          <Radio value="courier"><span className="f4 courier">Courier</span></Radio>
          <Radio value="avenir"><span className="f4 avenir">Avenir</span></Radio>
          <Radio value="calisto"><span className="f4 calisto">Calisto</span></Radio>
          <Radio value="helvetica"><span className="f4 helvetica">Helvetica</span></Radio>
          <Radio value="athelas"><span className="f4 athelas">Athelas</span></Radio>
          <Radio value="garamond"><span className="f4 garamond">Garamond</span></Radio>
        
        </FormControl>
        </FormGroup>

        <FormGroup>
        <ControlLabel>Size</ControlLabel>
        <FormControl
                 name="font_size"
                 accepter={RadioGroup}>

          <Radio value="f5"><span className="f5 ">Small</span></Radio>
          <Radio value="f4"><span className="f4 ">Medium</span></Radio>
          <Radio value="f3"><span className="f3 ">Large</span></Radio>
        
        </FormControl>
        </FormGroup>
      
      </Form>


        </div>
      ); 
    
  }




  const mapDispatchToProps = dispatch => ({

    setVisualConfiguration: (data) => dispatch(setVisualConfiguration(data)),
 
});
   

export default connect(null, mapDispatchToProps)(VisualConfigurationForm);
  
