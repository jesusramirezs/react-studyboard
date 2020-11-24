import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { ASSETS_PATH, ROUTE_PATHS} from '../../config_data.js';

import CustomButton from '../custom-button/custom-button.component';

import { Progress } from 'rsuite';

import { ArticleElementLayout, ReadLaterButton } from './article-element.styles';

import { selectArticleReadingProgress } from '../../redux/reading-status/reading-status.selectors';

import { addElementToReadingList } from '../../redux/reading-list/reading-list.actions';



const ArticleElement = ({element, sample, addElementToReadingList, history,  progress}) => {
    
  const {articleStrId, description, imageUrl, title, categoryStrId, author, date} = element;

    const { Line } = Progress;
    
    return (

      <ArticleElementLayout>
        
        <div className="db pv4 ph3 ph0-l no-underline black "  >
        
          <div className="flex flex-column flex-row-ns">
            <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns pointer"  >
              <img src={ASSETS_PATH+imageUrl} className="db dim" alt="{title}" onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+categoryStrId}/${articleStrId}`)} />
            </div>
            <div className="w-100 w-60-ns pl3-ns" >
              <h1 className="f3 fw1 athelas mt0 lh-title pointer dim" onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+categoryStrId}/${articleStrId}`)}>
                
              {title}</h1>
              <p className="f6 f5-l lh-copy tl">
                <Line percent={progress} strokeColor='#ff0000' status='active' showInfo={false} />
                  
              </p>
              <p className="f6 f5-l lh-copy">
                {description}
              </p>
              <p class="f6 lh-copy gray mv0">By <span class="ttu">{author}</span></p>
              <time class="f6 db gray">{date}</time>
              {sample !== "yes" ?
                  <div className='w-100 pa2 dim pointer center'> 
                    <ReadLaterButton onClick={()=> addElementToReadingList(element)} >+ Read later</ReadLaterButton>
                  </div>
                  : null
              } 
            </div>
          </div>
        </div>
          
      </ArticleElementLayout>

    );

}


const mapStateToProps = (state, ownProps) => ({       
  progress: selectArticleReadingProgress(ownProps.element.articleId)(state),  
})

const mapDispatchToProps = dispatch => ({
    addElementToReadingList: element => dispatch(addElementToReadingList(element))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleElement));
