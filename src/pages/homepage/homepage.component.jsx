import React from 'react';

import CategoryList from '../../components/category-list/category-list.component';

import CurrentArticle  from '../../components/current-article/current-article.component';

import { HomePageContainer } from './homepage.styles';



const HomePage = () => (
  
  <HomePageContainer>
      <CurrentArticle />
      <CategoryList />
  </HomePageContainer>
);

export default HomePage;
