import { connect } from 'react-redux';

import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import LoadingPresentation from '../../components/loading-status/loading-status.component';

import AnnotationListDrawer from './annotation-list-drawer.component';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

const mapStateToProps = createStructuredSelector({
  
  isLoaded: selectIsArticleDirectoryLoaded

});

const AnnotationListDrawerContainer = compose(
  connect(mapStateToProps),
  LoadingPresentation
)(AnnotationListDrawer);

export default AnnotationListDrawerContainer;