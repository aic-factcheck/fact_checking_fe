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
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/article/create" element={<CreateArticlePage />} />
          <Route path="/article/:articleId" element={<ReviewArticle />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
