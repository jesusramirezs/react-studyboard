import styled from 'styled-components';

import '../../css/tachyons/css/tachyons.css';

const buttonBaseStyles = 'mr2 f6 dib black bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--black-20 pointer';

const buttonStandardStyles = '';

const invertedButtonStyles = 'bg-white black hover-bg-black hover-white';

const googleSignInStyles = 'bg-blue bg-blue white hover-bg-light-blue hover-white';

const getButtonStyles = props => {
    const addStyles = props.isGoogleSignIn?  googleSignInStyles 
    :
    (props.inverted ? invertedButtonStyles : buttonStandardStyles);

    return { className: buttonBaseStyles + ' ' + addStyles };
};

export const CustomButtonContainer = styled.button.attrs(getButtonStyles)``  

