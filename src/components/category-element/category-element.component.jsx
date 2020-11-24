import React from 'react';

import { withRouter } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

const CategoryElement = ({ title, description, imageUrl,  history, name }) => (

  <article className="bt bb b--black-10" >
    <div className="db pv4 ph3 ph0-l no-underline black dim pointer" onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+name}`)} >
      <div className="flex flex-column flex-row-ns">
        <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns"  >
          <img src={imageUrl} className="db" alt={title} />
        </div>
        <div className="w-100 w-60-ns pl3-ns" >
          <h1 className="f2 fw1 baskerville mt0 lh-title">
          {title}</h1>
          <p className="f6 f5-l lh-copy">
            {description}
          </p>
          
        </div>
      </div>
    </div>
  </article>  
);

export default withRouter(CategoryElement);
