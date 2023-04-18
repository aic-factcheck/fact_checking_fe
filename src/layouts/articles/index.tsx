import React, { useEffect, useState } from 'react';
import {
  List, Layout, Button, Row, Col, Input,
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
const { Search } = Input;

const AllArticles : React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [articlesList, setArticlesList] = useState<IArticle[]>([]);
  const [loadedArticlesList, setLoadedArticlesList] = useState<IArticle[]>([]);
  const allowEdit = false;

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
    articlesService.getArticlesList().then((res: any) => {
      setArticlesList(res.data);
      setLoadedArticlesList(res.data);
    }).catch();
  }, [auth, navigate]);

  const onSearch = (pattern: string) => {
    // eslint-disable-next-line max-len
    if (pattern.length > 3) {
      // eslint-disable-next-line max-len
      articlesService.queryArticle(pattern).then((res: any) => setArticlesList(res.data)).catch();
    } else {
      setArticlesList(loadedArticlesList);
    }
  };

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <List
        style={{
          padding: '0% 1% 1% 1%',
        }}
      >
        <Row justify="space-between" align="bottom">
          <Col span={18}>
            <MyTitle headline={t('hot_articles')} fontcolor="#d86e3d" />
          </Col>
        </Row>
        <Row justify="space-between" align="bottom" style={{ marginBottom: '2%' }}>
          <Col span={14}>
            <Search placeholder={t('search_article')} onSearch={onSearch} />
          </Col>
          <Col span={10} flex="0">
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
