import { connect } from 'react-redux';

import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

import LoadingPresentation from '../../components/loading-status/loading-status.component';

import Article from './article.component';

const mapStateToProps = createStructuredSelector({
  
  isLoaded: selectIsArticleDirectoryLoaded

});

const ArticleContainer = compose(
  connect(mapStateToProps),
  LoadingPresentation
)(Article);

export default ArticleContainer;