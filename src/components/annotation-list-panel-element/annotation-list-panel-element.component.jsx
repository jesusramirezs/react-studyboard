import React from 'react'; 

import { withRouter } from 'react-router-dom';

import {ASSETS_PATH, ROUTE_PATHS} from '../../config_data.js';

import { _getUniqueId } from '../../utils/utils';

import { TagSpan } from './annotation-list-panel-element.styles';

import { AnnotationListPanelElementLayout, AnnotationListPanelElementImg } from './annotation-list-panel-element.styles';


const AnnotationListPanelItem = ({element: {thumbUrl, summary, categoryStrId, articleStrId, textBlockId, scrollTop, title, annotation: {note, tags}}, history}) => {
    const bg_style = tag => {
        switch(tag) {
         case 'question': return 'bg-blue';
         case 'read': return 'bg-orange';
         case 'highlight': return 'bg-hot-pink';
        }
        return 'bg-light-green';
      }

    return (

    <AnnotationListPanelElementLayout>
        <div className="pointer" onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+categoryStrId}/${articleStrId}/${textBlockId}`)}>
            <div className="dtc w2 w3-ns v-top">
    
                <img alt='element' src={ASSETS_PATH+thumbUrl} className="br2 h3 w3 dib" alt="avatar" />
            </div>

            <div className="dtc v-top pl3">
                <p className="gray measure mb3 tl f6 fw1 lh-title black mv0">{title}</p>        
                <p className="mb3 tl f6 f5-ns fw1 lh-title black mv0">{note.split('\n')[0].slice(0, 40)}</p>
                <p>{tags.map(tag=><TagSpan key={_getUniqueId()} className={bg_style(tag)}>{tag}</TagSpan>)}</p>
            </div>
        </div>


    </AnnotationListPanelElementLayout>
    );
}

export default withRouter(AnnotationListPanelItem);