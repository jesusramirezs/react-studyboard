import React from 'react';

import { InputField, Group, InputLabel } from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <Group>
    <InputField onChange={handleChange}  {...otherProps} />
    {label ? (
      <InputLabel
      className={`${
        otherProps.value.length ? 'shrink' : ''
      } form-input-label`}
      >
        {label}
      </InputLabel>
    ) : null}
  </Group>
);

export default FormInput;
