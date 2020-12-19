import React from 'react';

import ArticleFromId from '../../components/article/article-from-id.component';

import { connect } from 'react-redux';

import { selectArticle } from '../../redux/article-directory/article-directory.selectors';

import { selectArticleLastTextBlockId } from '../../redux/reading-status/reading-status.selectors';


const ArticleFromUrl = ({article, lastTextBlockId, match}) => {

    var textBlockId = match? match.params.textBlockId:0;
    textBlockId = textBlockId?textBlockId:0;

    
    return (
        <ArticleFromId  categoryStrId={article.categoryStrId} articleStrId={article.articleStrId} articleId={article.articleId} textBlockId={textBlockId} />
    );

}


const mapStateToProps = (state, ownProps) => ({   
    article: selectArticle(ownProps.match.params.categoryStrId,ownProps.match.params.articleStrId)(state),
    lastTextBlockId: selectArticleLastTextBlockId(ownProps.articleId)(state)
    
})



export default connect(mapStateToProps, null)(ArticleFromUrl);