import React, { useEffect, useState } from 'react';
import {
  List, Layout, Button, Row, Col,
} from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import authAtom from '../../_state/auth';
import Article from '../../components/article';
import MyTitle from '../../components/MyTitle';
import { IArticle } from '../../common/types';
import articlesService from '../../api/articles.service';

const { Content } = Layout;

const AllArticles : React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [articlesList, setArticlesList] = useState<IArticle[]>([]);
  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
    articlesService.getArticlesList().then((res: any) => setArticlesList(res.data)).catch();
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
            <Link to="/article/create" style={{ color: 'white', padding: '2%' }}>
              <Button type="primary" shape="round" size="large" style={{ backgroundColor: '#d86e3d', color: 'white' }} icon={<PlusCircleOutlined />}>
                {t('add_article')}
              </Button>
            </Link>
          </Col>
        </Row>
        {
          articlesList.sort((a, b) => ((a.createdAt < b.createdAt) ? 1 : -1)).map((obj: IArticle, index: number) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Article article={obj} isEditable={allowEdit} indexArticle={index} /></div>)
        }
      </List>
    </Content>
  );
};

export default AllArticles;
