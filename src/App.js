import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.less';
import Header from './layouts/header';
import Footer from './layouts/footer';
import SignIn from './layouts/authentication/sign-in';
import SignUp from './layouts/authentication/sign-up';
import Logout from './layouts/authentication/logout';
import Profile from './layouts/profile';
import CreateArticlePage from './layouts/create-article-page';
import ReviewArticle from './layouts/review-article';
import AllArticles from './layouts/home';
import ClaimPages from './layouts/claims';
import LadingPage from './layouts/landing-page';

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', backgroundColor: '#e2bead9a' }}>
        <Header />
        <Routes>
          <Route path="/" element={<LadingPage />} />
          <Route path="/claims" element={<ClaimPages />} />
          <Route path="/articles" element={<AllArticles />} />
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
