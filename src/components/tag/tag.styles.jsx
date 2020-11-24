import styled from 'styled-components';

import '../../css/tachyons/css/tachyons.css';

const tagBaseStyles = 'white ml1';

const tagStandardStyles = 'bg-orange';

const questionStyles = 'bg-blue';

const highlightStyles = 'bg-hot-pink';

const getTagStyles = props => {
  const addStyles = props.question?  questionStyles 
    :
    (props.highlight ? highlightStyles : tagStandardStyles);

  return { className: tagBaseStyles + ' ' + addStyles };
};

export const CustomTag = styled.span.attrs(getTagStyles)``  

