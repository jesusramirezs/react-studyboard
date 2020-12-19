import React, {useEffect} from 'react';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { _getUniqueId } from '../../utils/utils';

import CategorySample from '../category-sample/category-sample.component';

import { CategorySampleListLayout } from './category-sample-list.styles';

import { selectArticleDirectoryAndCategoryInfoAsList} from '../../redux/article-directory/article-directory.selectors';

const CategorySampleList = ({categorySamples}) =>  {

    useEffect(()=>  {
        window.scrollTo(0, 0);
      },[]);
      
    return(
        <CategorySampleListLayout>
            {categorySamples.map(({ contents : {id, ...otherCollectionProps }, meta: { description, linkUrl, name }}) => (
                <CategorySample key={_getUniqueId()} description={description} linkUrl={linkUrl} name={name} {...otherCollectionProps} />
            ))}
        </CategorySampleListLayout>
    );
}

const mapStateToProps = createStructuredSelector({  
    categorySamples: selectArticleDirectoryAndCategoryInfoAsList
});


export default connect(mapStateToProps)(CategorySampleList);