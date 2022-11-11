import React, { useEffect, useState } from 'react';
import { Layout, List } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Article from '../../components/article';
import Claim from '../../components/claim';
import MyTitle from '../../components/MyTitle';

const { Content } = Layout;

export default function ReviewArticle() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();

  const [article, setArticle] = useState();
  const [claims, setClaims] = useState([]);

  const { articleId } = useParams();
  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleId}`).then((res) => { setArticle(res); console.log('oukej'); }).catch(console.log('api error'));
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleId}/claims`).then((res) => { setClaims(res); console.log('oukej'); }).catch(console.log('api error'));
    }
  }, [auth, navigate]);

  return (
    <Content className="site-layout" style={{ padding: '0% 6% 6% 6%', marginTop: 20 }}>
      <div style={{ marginBottom: '3%' }}>
        <Article article={article} isEditable={allowEdit} />
      </div>
      <MyTitle headline="Article claims:" fontcolor="#00887A" />
      <List
        style={{
          padding: '1%',
        }}
      >
        {
          // _id, priority, addedBy, articleId, text
          claims.map((obj, index) => (
            <div key={obj._id} style={{ padding: '1%', background: '#77A6F7', borderRadius: '10px' }}>
              <Claim
                claim={obj}
                index={index + 1}
                isEditable={allowEdit}
              />
            </div>
          ))
        }
      </List>
    </Content>
  );
}
