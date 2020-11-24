import React from 'react';  

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { ASSETS_PATH, ROUTE_PATHS } from '../../config_data.js';

import { _getUniqueId } from '../../utils/utils';

import { ReadingListPanelElementLayout, ReadingListPanelElementImg } from './reading-list-panel-element.styles';

import { setReadingListHidden } from '../../redux/reading-list/reading-list.actions';


const ReadingListPanelItem = ({element: {thumbUrl, title, articleStrId, categoryStrId}, setReadingListHidden, history}) => (
    <div key={_getUniqueId()}>


        <ReadingListPanelElementLayout>
            <div className="pointer" onClick={() => {
                history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+categoryStrId}/${articleStrId}`);
                setReadingListHidden();
            }}>
                <div className="dtc w2 w3-ns v-mid">
            
                    <img alt='element' src={ASSETS_PATH+thumbUrl} className="br2 h3 w3 dib" alt="avatar" />
                </div>

                 <div className="dtc v-mid pl3">
        
                    <span className="f6 f5-ns fw2 lh-title black mv0">{title}</span>
                </div>
            </div>
            <div className="dtc v-mid">

            </div>

        </ReadingListPanelElementLayout>

    </div>

)


const mapDispatchToProps = dispatch => ({   
    setReadingListHidden: () => dispatch(setReadingListHidden())    
});

export default connect(null, mapDispatchToProps)(withRouter(ReadingListPanelItem));

