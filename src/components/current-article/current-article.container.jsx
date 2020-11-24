import { connect } from 'react-redux';

import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import LoadingPresentation from '../../components/loading-status/loading-status.component';

import CurrentArticle from './current-article.component';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

const mapStateToProps = createStructuredSelector({
  
  isLoaded: selectIsArticleDirectoryLoaded

});

const CurrentArticleContainer = compose(
  connect(mapStateToProps),
  LoadingPresentation
)(CurrentArticle);

export default CurrentArticleContainer;