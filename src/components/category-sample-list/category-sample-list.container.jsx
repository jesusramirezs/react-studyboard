import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { compose } from 'redux';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

import LoadingPresentation from '../loading-status/loading-status.component';

import CategorySampleList from './category-sample-list.component';

const mapStateToProps = createStructuredSelector({
  
  isLoaded: selectIsArticleDirectoryLoaded
  
});



const CategorySampleListContainer = compose(
  connect(mapStateToProps),
  LoadingPresentation
)(CategorySampleList);

export default CategorySampleListContainer;