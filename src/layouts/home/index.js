import React, { useEffect, useState } from 'react';
import { List, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Article from '../../components/article';
import MyTitle from '../../components/MyTitle';

const { Content } = Layout;

export default function Home() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [articlesList, setArticlesList] = useState([]);
  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/articles`).then((res) => setArticlesList(res)).catch(console.log('api error'));
    }
  }, [auth, navigate]);

  return (
    <Content className="site-layout" style={{ padding: '25px 25px', marginTop: 20 }}>
      <List
        style={{
          padding: '0% 6% 6% 6%',
        }}
      >
        <MyTitle headline="List of articles" fontcolor="#00887A" />
        {
          articlesList.map((obj) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Article article={obj} isEditable={allowEdit} setMyArticles={setArticlesList} /></div>)
        }
      </List>
    </Content>
  );
}
