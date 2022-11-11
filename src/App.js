import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.less';
import Home from './layouts/home';
import Header from './layouts/header';
import Footer from './layouts/footer';
import SignIn from './layouts/authentication/sign-in';
import SignUp from './layouts/authentication/sign-up';
import Logout from './layouts/authentication/logout';
import Profile from './layouts/profile';
import CreateArticlePage from './layouts/create-article-page';
import ReviewArticle from './layouts/review-article';

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/article/create" element={<CreateArticlePage />} />
          <Route exact path="/article/:articleId" element={<ReviewArticle />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
