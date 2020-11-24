import React, {useEffect, useState, useRef, useParams} from 'react';

import { connect } from 'react-redux';

import { ASSETS_PATH, INSTRUCTIONS } from '../../config_data.js';

import { _getUniqueId } from '../../utils/utils';

import TextBlock from '../text-block/text-block.component';

import  ReadingProgress  from '../reading-progress/reading-progress.component';

import { ArticleLayout, TitleLayout } from './article.styles';

import { selectArticle } from '../../redux/article-directory/article-directory.selectors';

import { setCurrentArticle } from '../../redux/reading-status/reading-status.actions';


const Article = ({article, setCurrentArticle, match}) => {

    const [articleBlocks, setArticleBlocks] = useState({});
    const [articleBlockUpdate, setArticleBlockUpdate] = useState([]);
    
    let loaded_highlightings = {};

    let currentBlockId = 0;

    const getCurrentBlockId = () => {
      ++currentBlockId;
      return currentBlockId;
      
      };

    
    const { title, content, imageUrl, author, date, subtitle } = article;
    const target = useRef(null);
    var initialPosition = match.params.position;
    initialPosition = initialPosition?initialPosition:0;

    useEffect(()=>  {

      setCurrentArticle(article);

      const str = content;
      const content_breaks = str.match(/[^\r\n]+/g);

      const new_article_blocks = content_breaks.reduce(function(map, obj) {
          map[getCurrentBlockId()] = obj;
          return map;
      }, {});

      setArticleBlocks(new_article_blocks);

      if(articleBlockUpdate.length) {

        let new_article_blocks = articleBlocks;

        articleBlockUpdate.forEach(b => 
          b.highlights.forEach(u => new_article_blocks[u.parentId] = 
            new_article_blocks[u.parentId] + "|" + u.string));

        setArticleBlocks(new_article_blocks);
        setArticleBlockUpdate([]);

      }

    },[articleBlockUpdate, article]);


    return(
      articleBlocks? (
        <div>
          <TitleLayout style={{backgroundSize: 'cover',  backgroundImage: `url(${ASSETS_PATH+imageUrl})`}} >
          
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
          <ReadingProgress target={target} article={article} initialPosition={initialPosition}/>
          <ArticleLayout ref={target}>

            <br/>
            <p class="f6 f5-ns lh-copy measure i pl4 bl bw1 b--gold mb4">
              {INSTRUCTIONS}
            </p>
            {
              Object.keys(articleBlocks).map(
                key => 
                  articleBlocks[key].length> 1?
                  <div data-block-id={_getUniqueId()} key={_getUniqueId()}>
                    <TextBlock highlighted={loaded_highlightings[key]}  textBlockId={key}  articleId={article.articleId} categoryStrId={article.categoryStrId} articleStrId={article.articleStrId}>{articleBlocks[key]}</TextBlock>
                  </div>
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
    article: selectArticle(ownProps.match.params.categoryStrId,ownProps.match.params.articleStrId)(state),
    
})


const mapDispatchToProps = dispatch => ({
    setCurrentArticle: article => dispatch(setCurrentArticle(article)),
   
});


export default connect(mapStateToProps, mapDispatchToProps)(Article);