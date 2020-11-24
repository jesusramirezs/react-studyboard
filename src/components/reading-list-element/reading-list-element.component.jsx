import React from 'react'; 

import { withRouter } from 'react-router-dom';

import { ASSETS_PATH, ROUTE_PATHS } from '../../config_data.js';

import { connect } from 'react-redux';

import { ReadingsListElementLayout } from './reading-list-element.styles';

import { removeElementFromReadingList } from '../../redux/reading-list/reading-list.actions';

const ReadingListElement = ({ readingListElement, removeElementFromReadingList, history }) => {
    
    const {thumbUrl, title, articleStrId, categoryStrId} = readingListElement;

    return(
        <ReadingsListElementLayout>
            <div className="pointer" onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content+categoryStrId}/${articleStrId}`)}>
                <div className="dtc w2 w3-ns v-mid">
            
                    <img alt='element' src={ASSETS_PATH+thumbUrl} className="br2 h3 w3 dib" alt="avatar" />
                </div>

                 <div className="dtc v-mid pl3">
                    <h1 className="f6 f5-ns fw6 lh-title black mv0">{title}</h1>
                </div>
            </div>

            <div className="dtc v-mid">
                <form className="w-100 tr">
                    <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" onClick={()=>removeElementFromReadingList(readingListElement)}>&#10005;</button>
                </form>
            </div>

    </ReadingsListElementLayout>
    ); 

}

const mapDispatchToProps = dispatch => ({
    removeElementFromReadingList: element => dispatch(removeElementFromReadingList(element)),
    
});

export default connect(null, mapDispatchToProps)(withRouter(ReadingListElement));