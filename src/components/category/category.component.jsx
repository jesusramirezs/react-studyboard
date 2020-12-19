import React, {useEffect} from 'react';

import { connect } from 'react-redux';

import ArticleElement from '../../components/article-element/article-element.component';

import {ArticleListLayout} from './category.styles';

import { selectCategoryArticlesFromArticleDirectory } from '../../redux/article-directory/article-directory.selectors';

import { selectCategoryInfo } from '../../redux/category-directory/category-directory.selectors';

const Category = ({articleElements, categoryInfo}) => {

    const elements = articleElements;
    const { title } = categoryInfo;

    useEffect(()=>  {
        window.scrollTo(0, 0);
      },[]);

    return(
    <ArticleListLayout>
        <h1 className="baskerville  fw1 ph3 ph0-l">{ title }</h1>
        <div className=''>
        {
            elements.map(element => (<ArticleElement key={element.articleId} element={{...element}} />))
        }    
        </div>
        
    </ArticleListLayout>);

}


const mapStateToProps = (state, ownProps) => ({   
    articleElements: selectCategoryArticlesFromArticleDirectory(ownProps.match.params.categoryStrId)(state),
    categoryInfo: selectCategoryInfo(ownProps.match.params.categoryStrId)(state) 
      
})


export default connect(mapStateToProps)(Category);