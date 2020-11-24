import React, {useEffect} from 'react';

import { Route, Switch } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';

import CategorySampleListContainer from '../../components/category-sample-list/category-sample-list.container';

import CategoryContainer from '../../components/category/category.container';

import ArticleContainer from '../../components/article/article.container';

import { fetchArticleDirectoryStartAsync } from '../../redux/article-directory/article-directory.actions';

import { selectIsArticleDirectoryLoaded } from '../../redux/article-directory/article-directory.selectors';

const ContentPage = ({match, fetchArticleDirectoryStartAsync, isLoaded}) => {
    

    useEffect(()=>  {
        
        if(!isLoaded) fetchArticleDirectoryStartAsync();

    },[]);


    return(        
        <div>
            <Switch>
                <Route exact path={ROUTE_PATHS.root+ROUTE_PATHS.content} component={CategorySampleListContainer}  />
                <Route path={`${ROUTE_PATHS.root+ROUTE_PATHS.content}:categoryStrId/:articleStrId/:position`}  component={ArticleContainer}/>
                <Route path={`${ROUTE_PATHS.root+ROUTE_PATHS.content}:categoryStrId/:articleStrId`}  component={ArticleContainer}/>            
                <Route path={`${ROUTE_PATHS.root+ROUTE_PATHS.content}:categoryStrId`}  component={CategoryContainer}/>
            
            </Switch>
        </div>
    );
      
        
}
        

const mapStateToProps = createStructuredSelector({  
    isLoaded: selectIsArticleDirectoryLoaded  
});

const mapDispatchToProps = dispatch => ({   
    fetchArticleDirectoryStartAsync: () => dispatch(fetchArticleDirectoryStartAsync())
});
          
export default connect(mapStateToProps,mapDispatchToProps)(ContentPage);
          

