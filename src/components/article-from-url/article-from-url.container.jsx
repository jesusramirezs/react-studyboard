import { connect } from 'react-redux';

import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

import LoadingPresentation from '../../components/loading-status/loading-status.component';

import ArticleFromUrl from './article-from-url.component';

const mapStateToProps = createStructuredSelector({
  
  isLoaded: selectIsArticleDirectoryLoaded

});

const ArticleFromUrlContainer = compose(
  connect(mapStateToProps),
  LoadingPresentation
)(ArticleFromUrl);

export default ArticleFromUrlContainer;