import React, {useEffect} from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTE_PATHS } from './config_data.js';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ContentPage from './pages/content/content.component';
import SignInAndSignUpPage  from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ReadingListPage  from './pages/reading-list/reading-list.component';
import FooterContent from './components/footer-content/footer-content.component';

import HeaderNavigation  from './components/header-navigation/header-navigation.component';

import ReadingListPanel from './components/reading-list-panel/reading-list-panel.component';

import AnnotationListDrawer from './components/annotation-list-drawer/annotation-list-drawer.component';
import AnnotationDrawer from './components/annotation-drawer/annotation-drawer.component';
import ReadingListDrawer from './components/reading-list-drawer/reading-list-drawer.component';
import VisualConfigurationDrawer from './components/visual-configuration-drawer/visual-configuration-drawer.component';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions'; 

import { selectCurrentUser } from './redux/user/user.selectors'

import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

const App = ({setCurrentUser, currentUser}) =>  {

  useEffect(() => {
      let unsubscribeFromAuth = null;
      unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            
          });
        });
      } else {

      setCurrentUser(userAuth );  
      }
      
    });
    
    return(() => {unsubscribeFromAuth();})
  },[]);

  

  
  return (
      <div>
        <AnnotationListDrawer />
        <AnnotationDrawer />
        <ReadingListDrawer />
        <VisualConfigurationDrawer />
        <Header>
          <HeaderNavigation/>
        </Header>
        <Content>
        <Switch>
          <Route exact path={ROUTE_PATHS.root} component={HomePage} />
          <Route path={ROUTE_PATHS.root+ROUTE_PATHS.content} component={ContentPage} />
          <Route path={ROUTE_PATHS.root+ROUTE_PATHS.reading_list} component={ReadingListPage} />
          <Route exact path='/signin' render={()=>currentUser ? 
                                                  (<Redirect to='/' />) : (<SignInAndSignUpPage /> ) }  />
                                                  


        </Switch>
        </Content>
        <Footer>
        <FooterContent />
        </Footer>
        

      </div>
    );
  
}





const mapStateToProps = createStructuredSelector({

  currentUser: selectCurrentUser,    
});


const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
