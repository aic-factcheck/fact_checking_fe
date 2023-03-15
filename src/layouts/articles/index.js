import React, { useEffect, useState } from 'react';
import {
  List, Layout, Button, Row, Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Article from '../../components/article';
import MyTitle from '../../components/MyTitle';

const { Content } = Layout;

export default function AllArticles() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles`).then((res) => setArticlesList(res)).catch(console.log(''));
    }
  }, [auth, navigate]);

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <List
        style={{
          padding: '0% 1% 1% 1%',
        }}
      >
        <Row justify="space-between" align="bottom">
          <Col span={12}>
            <MyTitle headline={t('hot_articles')} fontcolor="#d86e3d" />
          </Col>
          <Col span={12} flex="0">
            <a href="/article/create" style={{ color: 'white', padding: '2%' }}>
              <Button variant="primary" shape="round" size="large" style={{ backgroundColor: '#d86e3d', color: 'white' }} icon={<PlusCircleOutlined />}>
                {t('add_article')}
              </Button>
            </a>
          </Col>
        </Row>
        {
          articlesList.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : -1)).map((obj) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Article article={obj} isEditable={allowEdit} setMyArticles={setArticlesList} /></div>)
        }
      </List>
    </Content>
  );
}
