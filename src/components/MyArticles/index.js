import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, List,
} from 'antd';

import { useRecoilValue, useRecoilState } from 'recoil';
import myArticles from '../../_state/usersArticles';
import authAtom from '../../_state/auth';

import Article from '../article';
import useUserActions from '../../_actions/user.actions';

const { Content } = Layout;

export default function MyArticles() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const userActions = useUserActions();
  const [myArticlesList, setMyArticlesList] = useRecoilState(myArticles);

  const allowEdit = true;

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }

    if (!myArticlesList) {
      const id = auth?.data.id;
      if (id) {
        userActions.getMyArticles(id, setMyArticlesList);
      }
    }
  }, [auth, navigate, myArticlesList]);

  return (
    <Content className="site-layout" style={{ paddingLeft: '0%', padding: '1%' }}>
      <List
        style={{
          padding: '1%',
        }}
      >
        {
          myArticlesList?.map((obj, index) => (
            <div key={obj?._id} style={{ margin: '1%', background: 'white', borderRadius: '10px' }}>
              <Article
                article={obj}
                isEditable={allowEdit}
                indexArticle={index}
              />
            </div>
          ))
        }
      </List>
    </Content>
  );
}
