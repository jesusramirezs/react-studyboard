import React, {useEffect, useState, useRef, } from 'react';

import { connect, useSelector } from 'react-redux';

import { ASSETS_PATH, INSTRUCTIONS } from '../../config_data.js';

import { _getUniqueId } from '../../utils/utils';

import VisibilitySensor from 'react-visibility-sensor';

import TextBlock from '../text-block/text-block.component';

import  ReadingProgress  from '../reading-progress/reading-progress.component';

import Highlighter  from '../highlighter/highlighter.component';

import { ArticleLayout, TitleLayout } from './article.styles';

import { selectArticle } from '../../redux/article-directory/article-directory.selectors';

import { selectArticleLastTextBlockId } from '../../redux/reading-status/reading-status.selectors';

import { setCurrentArticle } from '../../redux/reading-status/reading-status.actions';

import { updateProgressAtTextBlockId } from '../../redux/reading-status/reading-status.actions';

import { updateProgressAtReadingStatus } from '../../redux/reading-status/reading-status.actions';

 

const Article = ({dispatch, article, categoryStrId, articleStrId, articleId, textBlockId, match}) => {

    const [articleBlocks, setArticleBlocks] = useState({});
    
    const lastScroll = useRef(0);  //to control the last position of scroll done by user
    const lastScrollTime = useRef(Date.now());  // to control time between scroll updates to Redux
    const lastAutoScrollTime = useRef(0);  // to control time after initial automatic scroll is done
    const initialized = useRef(0);       //to control the execution of selectArticleLastTextBlockId
    

    const equality_selector = () => {
      if(initialized.current) return true;
      else return false; 
    }


    const stored_textBlockId = useSelector(state => selectArticleLastTextBlockId(article.articleId)(state), equality_selector);
    
    initialized.current = 1;
   
    const progressRef  = useRef(null); 
    
    let loaded_highlightings = {};

    let currentBlockId = 0;

    const scrollRef = useRef(null);
    
    const getCurrentBlockId = () => {
      ++currentBlockId;
      return currentBlockId;
      
    };

    
    const { title, content, imageUrl, author, date, subtitle } = article;
    const target = useRef(null);
    var initialPosition = match? match.params.position:0;
    initialPosition = initialPosition?initialPosition:0;


    const calcProgress = () => {
      
      if (!target.current) {
        return 0 ;
      }
  
      const element         = target.current;
      const totalHeight     = element.clientHeight ;

      const windowScrollTop = (window.innerHeight - element.offsetTop) + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);

      if (windowScrollTop === 0) {
        return(0);
      }
  
      if (windowScrollTop > totalHeight) {
        return(100);
      }

      const readingProgress = (windowScrollTop / totalHeight) * 100;
      return(readingProgress);

    }

    useEffect(()=>  {

      dispatch(setCurrentArticle(article))

      const str = content;
      const content_breaks = str.match(/[^\r\n]+/g);

      const v = {};
      var id; 
      const new_article_blocks = content_breaks.reduce(function(map, obj) {
          id = getCurrentBlockId();
          map[id] = obj;
          v[id] = {visibility: false}
          return map;
      }, {});

      setArticleBlocks(new_article_blocks);

      
      if(textBlockId && scrollRef.current) {  //textBlockId is the text block targeted when navigation comes from an annotation

        lastAutoScrollTime.current = Date.now();
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center'}); 

        dispatch(updateProgressAtTextBlockId({articleId: article.articleId, textBlockId: textBlockId}));
      } else {
        if(stored_textBlockId && scrollRef.current) {

          lastAutoScrollTime.current = Date.now();
          
          scrollRef.current.scrollIntoView({ behavior: 'smooth'}); 
          
          }
        }

    },[article, progressRef.current]);
    
    
    const getScrollRef = (key, element_type) => {

      if(stored_textBlockId < 3 && element_type == 'title') {
        return scrollRef;
      }

      if(key==textBlockId) {
        return scrollRef;
      } else if(!textBlockId && key === stored_textBlockId  && stored_textBlockId >= 3) {
        return scrollRef;
      }
      return null;

    }

    const visibilityChange = (key) => (isVisible) => {
      

      const previous_scroll = lastScroll.current;
      const new_scroll = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);

      if((key > 5 || new_scroll < previous_scroll ) && Date.now()-lastScrollTime.current > 50 && Date.now()-lastAutoScrollTime.current > 2000) {

        if((!isVisible && new_scroll > previous_scroll) || (isVisible && new_scroll < previous_scroll)) {
          
          dispatch(updateProgressAtReadingStatus({articleId: article.articleId, progress: calcProgress(), textBlockId: key}));
         
          lastScrollTime.current = Date.now();
          lastScroll.current = new_scroll;
        }

      }
      lastScroll.current = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
    
    }


    return(

      articleBlocks? (
        <div>
          <TitleLayout ref={getScrollRef(0, "title")} style={{backgroundSize: 'cover',  backgroundImage: `url(${ASSETS_PATH+imageUrl})`}} >
          
            <div className="mw7 center pa1 pt5-ns ">
            
              <h3 className="f2 f1-m f-headline-m measure-narrow lh-title mv0">
                <span className="bg-black-90 lh-copy white pa1 tracked-tight athelas">
                  {title}
                </span>
              </h3>
              <h4 className="f3 fw1 georgia i bg-white-90 lh-copy tracked-tight">{subtitle}</h4>
              <h5 className="f6 ttu tracked black-80">By {author}</h5>
              <time className="f6 db black mb5">{date}</time>
            </div>          
          </TitleLayout>
          
          <ReadingProgress  ref={progressRef}
            target={target} article={article} initialPosition={initialPosition} textBlockId={textBlockId}/>
          
          <ArticleLayout ref={target}>

            <br/>
            <p class="f6 f5-ns lh-copy measure i pl4 bl bw1 b--gold mb4">
              {INSTRUCTIONS}
            </p>
            <Highlighter target={target} articleId={article.articleId} categoryStrId={article.categoryStrId} articleStrId={article.articleStrId} articleBlocks={articleBlocks} />
           
            {
              Object.keys(articleBlocks).map(
                key => 
                  articleBlocks[key].length> 1?
                  <VisibilitySensor scrollCheck={true} scrollThrottle={1} partialVisibility={true} onChange={visibilityChange(key)} >
                  <div data-block-id={_getUniqueId()} key={_getUniqueId()}  ref={getScrollRef(key, "text_block")} >
                    <TextBlock highlighted={loaded_highlightings[key]}  textBlockId={key}  articleId={article.articleId} categoryStrId={article.categoryStrId} articleStrId={article.articleStrId}>{articleBlocks[key]}</TextBlock>
                  </div>
                  </VisibilitySensor>
                  :
                  null
              )
            }
 
          </ArticleLayout>        
        </div>
      )
      :
      null
    );

}


const mapStateToProps = (state, ownProps) => ({   
    article: selectArticle(ownProps.categoryStrId,ownProps.articleStrId)(state)
    
    
})


export default connect(mapStateToProps)(Article);