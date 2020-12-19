import React, {useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import { connect } from 'react-redux';

import { ReadingProgressBar } from './reading-progress.styles';

import { selectArticleReadingProgress } from '../../redux/reading-status/reading-status.selectors';

const ReadingProgress = forwardRef(({ target, article, initialPosition, textBlockId, setArticleReadingProgress, progress }, ref) => {


    useImperativeHandle(ref, ()=> ({

      initialUpdateProgress() { 
        //empty
      }
    }
    ));


    useEffect(() => {
      
      return () => { 
                     
                  }
    },[article]);
  
    return <ReadingProgressBar style={{width: `${progress}%`}} />;
  });


  const mapStateToProps = (state, ownProps) => ({   
    progress: selectArticleReadingProgress(ownProps.article.articleId)(state),
    
  })


  export default connect(mapStateToProps,null, null, { forwardRef: true })(ReadingProgress);