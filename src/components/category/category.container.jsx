import { connect } from 'react-redux';

import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import LoadingPresentation from '../../components/loading-status/loading-status.component';

import Category from './category.component';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

const mapStateToProps = createStructuredSelector({
  
  isLoaded: selectIsArticleDirectoryLoaded

});

const CategoryContainer = compose(
  connect(mapStateToProps),
  LoadingPresentation
)(Category);

export default CategoryContainer;