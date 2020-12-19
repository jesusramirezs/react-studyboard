import React, {useEffect} from 'react';

import { withRouter } from 'react-router-dom';

import { ROUTE_PATHS } from '../../config_data.js';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import { HeaderContainer, HeaderLayout, LogoContainer, SimpleButton, SimpleOpenPanel, OptionLink, OptionsContainer } 
    from './header.styles';

import { Divider, Badge, Button } from 'rsuite';    

import { selectReadingListHidden } from '../../redux/reading-list/reading-list.selectors';

import { selectReadingListElementsCount } from '../../redux/reading-list/reading-list.selectors'

import { selectAnnotationPanelHidden } from '../../redux/annotation-panel/annotation-panel.selectors';

import { selectVisualConfigurationPanelHidden } from '../../redux/visual-configuration/visual-configuration.selectors';

import { selectAnnotationListPanelHidden, selectAnnotationElementsCount } from '../../redux/highlighting-list/highlighting-list.selectors';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { toggleAnnotationPanelHidden } from '../../redux/annotation-panel/annotation-panel.actions';

import { toggleAnnotationListPanelHidden } from '../../redux/highlighting-list/highlighting-list.actions';

import { toggleReadingListHidden } from '../../redux/reading-list/reading-list.actions.js';

import { toggleVisualConfigurationPanelHidden } from '../../redux/visual-configuration/visual-configuration.actions.js';


const HeaderNavigation = ({currentUser, hidden, readingListElementCount, annotationElementCount, history, match, annotationPanelHidden, annotationListPanelHidden, toggleReadingListHidden, toggleAnnotationPanelHidden, toggleAnnotationListPanelHidden, visualConfigurationPanelHidden, toggleVisualConfigurationPanelHidden}) => {

    useEffect(()=>  {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual"
          }
    },[]);

    return (
    <HeaderContainer>
        <HeaderLayout>
            <LogoContainer onClick={() => history.push(`${ROUTE_PATHS.root}`)}>
        
                STUDYBOARD

            </LogoContainer>
        
            <OptionsContainer>
            <Divider vertical />
            <OptionLink onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.content}`)}>
                Content
            </OptionLink>

            <Divider vertical />
            <OptionLink onClick={() => history.push(`${ROUTE_PATHS.root+ROUTE_PATHS.reading_list}`)}>
                Manage
            </OptionLink>

            <Divider vertical />
            
            <Badge content={readingListElementCount}>
                <Button  onClick={() => toggleReadingListHidden()}>{hidden?'+':'-'} reading list</Button>
            </Badge>

            <Divider vertical />

            <Badge content={annotationElementCount}>
                <Button  onClick={()=> toggleAnnotationListPanelHidden()}>{annotationListPanelHidden?'+':'-'} notes</Button>
            </Badge>
          
            <Divider vertical />

            
            <Button  onClick={()=> toggleVisualConfigurationPanelHidden()}>{visualConfigurationPanelHidden?'+':'-'} Font</Button>
            

            <Divider vertical />


            
        </OptionsContainer>
        <div className="left db dtc-l v-mid w-100 w-25-l tc">
        {
                currentUser ?
                    <SimpleButton onClick={()=>auth.signOut()}>Sign out</SimpleButton>
                    :
                    <SimpleButton  onClick={() => history.push(`${match.url}signin`)}>Sign in</SimpleButton>
            }
        </div>

        </HeaderLayout>
    </HeaderContainer>

    )
}


const mapStateToProps = createStructuredSelector({  
    readingListElementCount: selectReadingListElementsCount,
    annotationElementCount: selectAnnotationElementsCount,
    currentUser: selectCurrentUser,    
    hidden: selectReadingListHidden,
    annotationPanelHidden: selectAnnotationPanelHidden,
    annotationListPanelHidden: selectAnnotationListPanelHidden,
    visualConfigurationPanelHidden: selectVisualConfigurationPanelHidden,   
  });

const mapDispatchToProps = dispatch => ({
    toggleAnnotationPanelHidden: () => dispatch(toggleAnnotationPanelHidden()),
    toggleAnnotationListPanelHidden: () => dispatch(toggleAnnotationListPanelHidden()),
    toggleReadingListHidden: () => dispatch(toggleReadingListHidden()),
    toggleVisualConfigurationPanelHidden: () => dispatch(toggleVisualConfigurationPanelHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderNavigation));