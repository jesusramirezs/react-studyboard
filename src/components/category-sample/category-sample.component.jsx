import React from 'react';

import { withRouter } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

import { _getUniqueId } from '../../utils/utils';

import ArticleElement from '../article-element/article-element.component';

import CustomButton from '../custom-button/custom-button.component';


const CategorySample = ({title, linkUrl, elements, history, description, name}) =>  (
    <div className='cf mb4'>
        <div className='fl w-100 pa2 bb' key={_getUniqueId()}>
            <h1 className='athelas dim pointer' onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+name}`)}>{title}</h1>
        </div>
        
        <div className='fl w-100 pa2'> <p>{description}</p></div>
        <div className='fl w-100 pa2'> <p>Latest articles:</p></div>
        <div className='fl w-100 pa2'>
            {               
                elements.filter((element, index) => (index <2)).map(
                    (element) => (
                        <div className='fl w-50 pa2' key={_getUniqueId()}>
                        <ArticleElement key={element.articleId} element={{...element}} sample="yes"></ArticleElement>
                        </div>
                        
                    )
                )

            }
        </div>
        <div className='w-100 pa2 dim pointer center'> 
            <CustomButton onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+name}`)}>View more...</CustomButton>
        </div> 
        
    </div>

);

export default withRouter(CategorySample);