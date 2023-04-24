/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react';
import {
  List, Layout, Button, Row, Col, Input, Skeleton, Divider,
} from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import authAtom from '../../_state/auth';
import Article from '../../components/article';
import MyTitle from '../../components/MyTitle';
import { IArticle } from '../../common/types';
import articlesService from '../../api/articles.service';
import hotArticles from '../../_state/hotArticles';
import hotArticlesPage from '../../_state/hotArticlesPage';

const { Content } = Layout;
const { Search } = Input;

const AllArticles : React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [recoilHotArticlesList, setRecoilHotArticlesList] = useRecoilState(hotArticles);
  const [recoilHotArticlesPageNum, setRecoilHotArticlesPage] = useRecoilState(hotArticlesPage);
  const [articlesList, setArticlesList] = useState<IArticle[]>([]);

  const [loading, setLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [isDefaultSearch, setIsDefaultSearch] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const allowEdit = false;

  useEffect(() => {
    if (auth?.user?.email === undefined) {
      navigate('/sign-in');
    }
    if (recoilHotArticlesList.length > 0) {
      setArticlesList(Array.from(recoilHotArticlesList));
    } else {
      articlesService.getArticlesList(recoilHotArticlesPageNum).then((res: any) => {
        setRecoilHotArticlesList(Array.from(res.data));
        setRecoilHotArticlesPage(recoilHotArticlesPageNum + 1);
        setArticlesList(Array.from(res.data));
      }).catch();
    }
  }, [auth, navigate]);

  const onSearch = (pattern: string) => {
    // eslint-disable-next-line max-len
    if (pattern.length > 3) {
      setIsDefaultSearch(false);
      setSearchValue(pattern);
      setSearchPage(1);
      // eslint-disable-next-line max-len
      articlesService.queryArticle(pattern).then((res: any) => {
        setSearchPage((s) => s + 1);
        setArticlesList(res.data);
      }).catch(() => {
        setSearchPage(1);
        setArticlesList(Array.from(recoilHotArticlesList));
      });
    } else {
      setArticlesList(Array.from(recoilHotArticlesList));
      setIsDefaultSearch(true);
    }
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (isDefaultSearch) {
      articlesService.getArticlesList(recoilHotArticlesPageNum).then((res: any) => {
        setRecoilHotArticlesPage(recoilHotArticlesPageNum + 1);
        setArticlesList([...recoilHotArticlesList, ...res.data]);
        setRecoilHotArticlesList([...recoilHotArticlesList, ...res.data]);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
      }).catch(() => {
        setLoading(false);
      });
    } else {
      // eslint-disable-next-line max-len
      if (searchPage < 2) {
        articlesService.queryArticle(searchValue).then((res: any) => {
          setSearchPage(searchPage + 1);
          setArticlesList([...articlesList, ...res.data]);
          setLoading(false);
          window.dispatchEvent(new Event('resize'));
        }).catch(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <InfiniteScroll
        dataLength={articlesList.length}
        next={loadMoreData}
        hasMore={articlesList.length < 100}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={articlesList}
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
                  {t('add')}
                </Button>
              </Link>
            </Col>

          </Row>
          {
          articlesList?.map((obj: IArticle, index: number) => <div key={obj._id} style={{ padding: '1%', borderRadius: '10px' }}><Article article={obj} isEditable={allowEdit} indexArticle={index} /></div>)
        }
        </List>
      </InfiniteScroll>
    </Content>
  );
};

export default AllArticles;
