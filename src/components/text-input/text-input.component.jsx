import React from 'react';

import { TextInputField, Group, TextInputLabel } from './text-input.styles';

const TextInput = ({ handleChange, label, ...otherProps }) => (
  <Group>
    <TextInputField onChange={handleChange}  {...otherProps} />
    {label ? (
      <TextInputLabel
      className={`${
        otherProps.value.length ? 'shrink' : ''
      } form-input-label`}
      >
        {label}
      </TextInputLabel>
    ) : null}
  </Group>
);

export default TextInput;
