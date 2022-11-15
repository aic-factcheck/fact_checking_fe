import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, List,
} from 'antd';

import { useRecoilValue } from 'recoil';

import authAtom from '../../_state/auth';
import Article from '../article';
import useFetchWrapper from '../../_helpers/fetch_wrapper';

const { Content } = Layout;

export default function MyArticles() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [articlesList, setArticlesList] = useState([]);
  const allowEdit = true;

  /* function add(id) {
    articlesList.forEach((a) => {
      if (a._id === id) {
        a.sourceURL = 'sss';
      }
    });
  } */

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/articles`).then((res) => {
        const articles = res.filter((el) => id === el?.addedBy);
        setArticlesList(articles); console.log('oukej');
      }).catch(console.log('api error'));
    }
  }, [auth, navigate]);

  return (
    <Content className="site-layout" style={{ paddingLeft: '0%', padding: '1%' }}>
      <List
        style={{
          padding: '1%',
        }}
      >
        {
          articlesList.map((obj, index) => (
            <div key={obj._id} style={{ padding: '1%', background: '#77A6F7', borderRadius: '10px' }}>
              <Article
                article={obj}
                isEditable={allowEdit}
                setMyArticles={setArticlesList}
                articles={articlesList}
                indexArticle={index}
              />
            </div>
          ))
        }
      </List>
    </Content>
  );
}
