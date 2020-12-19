import React from 'react';

import { TextInputField, Group, TextInputLabel } from './text-input.styles';

const TextInput = ({ handleChange, label, ...otherProps }) => (
  <Group>
    <TextInputField onChange={handleChange}  {...otherProps} />
    {label && !otherProps.value.length  ? (
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
