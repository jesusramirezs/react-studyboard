import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './loading-status.styles';


const LoadingStatus = WrappedComponent => {
  const LoadingPresentation = ({ isLoaded, ...otherProps }) => {
    return isLoaded ? (
      <WrappedComponent {...otherProps} />
    ) : (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    );
  };
  return LoadingPresentation;
};

export default LoadingStatus;