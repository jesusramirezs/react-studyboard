import React from 'react'; 

import {ASSETS_PATH} from '../../config_data.js';

import { ReadingListPanelElementLayout, ReadingListPanelElementImg } from './reading-list-panel-element.styles';



const ReadingListPanelItem = ({element: {thumbUrl, articleStrId, title}}) => (
    <ReadingListPanelElementLayout>
        <ReadingListPanelElementImg src={ASSETS_PATH+thumbUrl} alt='element' />
        <div className='item-details'>
            <span className='name'>{title}</span>

        </div>

    </ReadingListPanelElementLayout>

)

export default ReadingListPanelItem;