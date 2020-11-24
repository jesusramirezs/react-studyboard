import React, { useEffect, useState } from 'react';

import { Uploader, Icon } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';


const AddImage = ({}) => {
  
    return (
        <Uploader multiple listType="picture" action="//jsonplaceholder.typicode.com/posts/">
        <button type="button">
          <Icon icon='camera-retro' size="lg" />
        </button>
      </Uploader>
    );
  
}

export default AddImage;
