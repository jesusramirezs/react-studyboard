import React from 'react';

import { CustomTag } from './tag.styles';

const Tag = ({ children, ...OtherProps }) => {

  return(
  <CustomTag {...OtherProps}>{children}</CustomTag>
)};


export default Tag;
