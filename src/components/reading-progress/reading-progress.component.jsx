import React, {useEffect, useState} from 'react';

import { connect } from 'react-redux';

import { ReadingProgressBar } from './reading-progress.styles';

import { updateProgressAtReadingStatus } from '../../redux/reading-status/reading-status.actions';

import { selectArticleReadingProgress } from '../../redux/reading-status/reading-status.selectors';

const ReadingProgress = ({ target, article, initialPosition, setArticleReadingProgress, progress }) => {

    const [readingProgress, setReadingProgress] = useState(0);
    const [readInterval, setStartedToRead] = useState(0)

    const calcProgress = () => {

      if (!target.current) {
        return;
      }
  
      const element         = target.current;
      const totalHeight     = element.clientHeight ;

      const windowScrollTop = (window.innerHeight - element.offsetTop) + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);

      if (windowScrollTop === 0) {
        setReadingProgress(0);
        return(0);
      }
  
      if (windowScrollTop > totalHeight) {
        setReadingProgress(100);
        return(100);
      }

      const readingProgress = (windowScrollTop / totalHeight) * 100;
      setReadingProgress(readingProgress);
      
      return(readingProgress);

    }


    const scrollListener = () => {
      setArticleReadingProgress(article.articleId, calcProgress());
    };

    const domListener = (event) => {
      setArticleReadingProgress(article.articleId, calcProgress());
    };


    const scrollAtInitialProgress = (progress) => {
 
      if (!progress) {
        return;
      }


      const initial_timer = setTimeout(() => {
        const element         = target.current;
        const totalHeight     = element.clientHeight ;
        const initialScroll = ((progress / 100) * totalHeight) - (window.innerHeight - element.offsetTop);
        document.documentElement.scrollTop = document.body.scrollTop = initialScroll;
      }, 25);


    }; 

    const scrollAtInitialPosition = (position) => {
 
      if (!position) {
        return;
      }
      const initial_timer = setTimeout(() => {
        document.documentElement.scrollTop = document.body.scrollTop = position;
      }, 25);

    }; 


    const autoUpdateProgress =  () => {
      const previousProgress = progress;

      const newProgress = calcProgress();

      if(newProgress > previousProgress) setArticleReadingProgress(article.articleId, newProgress);

    }


    useEffect(() => {
      window.addEventListener("scroll", scrollListener);

      setReadingProgress(progress);

      if(initialPosition) {
        scrollAtInitialPosition(initialPosition);
      }

      else {
        scrollAtInitialProgress(progress);
      }

      const timer = setTimeout(() => {
        autoUpdateProgress();
      }, 3000);
      

      return () => { window.removeEventListener("scroll", scrollListener);
                     clearTimeout(timer);
                     console.log("CLEaREDDDDD");
                  }
    },[article]);
  
    return <ReadingProgressBar style={{width: `${readingProgress}%`}} />;
  };


  const mapStateToProps = (state, ownProps) => ({   
    progress: selectArticleReadingProgress(ownProps.article.articleId)(state),
  })

  const mapDispatchToProps = dispatch => ({
    setArticleReadingProgress: (articleId, progress) => dispatch(updateProgressAtReadingStatus({articleId: articleId, progress: progress})),
  });


  export default connect(mapStateToProps, mapDispatchToProps)(ReadingProgress);