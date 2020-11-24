import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ArticleElement from '../../components/article-element/article-element.component';

import { CurrentArticleLayout } from './current-article.styles';

import { selectCurrentArticle } from '../../redux/reading-status/reading-status.selectors';


const CurrentArticle = ({currentArticle}) => {

    if(currentArticle) {

        return(
        <CurrentArticleLayout>
            <h1 className="athelas f2  fw1 ph3 ph0-l">Last reading:</h1>
            
            <ArticleElement key={currentArticle.articleId} element={{...currentArticle}} />

        </CurrentArticleLayout>);
    } else {
        return null;
    }

}


const mapStateToProps = createStructuredSelector({   
    currentArticle: selectCurrentArticle,
  
})


export default connect(mapStateToProps)(CurrentArticle);