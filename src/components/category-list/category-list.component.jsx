import React from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import CategoryElement from '../category-element/category-element.component';

import { selectCategoryDirectoryAsList } from '../../redux/category-directory/category-directory.selectors';

import { CategoryListLayout } from './category-list.styles';


const CategoryList = ({categories}) => {

    return(
      <CategoryListLayout>
        <div>
          <h1 className="baskerville  fw1 ph3 ph0-l">Sections</h1>
          {categories.map(({ id, ...otherSectionProps }) => (
            <CategoryElement key={id} {...otherSectionProps} />
          ))}
        </div>
      </CategoryListLayout>
    );
}
  

const mapStateToProps = createStructuredSelector({  
  categories: selectCategoryDirectoryAsList
});

export default connect(mapStateToProps)(CategoryList);

