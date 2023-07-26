import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, List,
} from 'antd';

import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import myArticles from '../../_state/usersArticles';
import authAtom from '../../_state/auth';
import { IArticle } from '../../common/types';
import Article from '../article';
import articlesService from '../../api/articles.service';
import articlesLoaded from '../../_state/articlesLoaded';

const { Content } = Layout;

const MyArticles: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const [myArticlesList, setMyArticlesList] = useRecoilState(myArticles);
  const [loaded, setArticlesLoaded] = useRecoilState(articlesLoaded);
  const { t } = useTranslation();
  const allowEdit = true;

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token === undefined) {
      navigate('/sign-in');
    }

    if (loaded === false) {
      const id = auth?.user._id;
      if (id !== undefined) {
        articlesService.getMyArticles(id).then((res: any) => {
          /* const articles = res.filter((el) => id === el?.author._id); */
          setMyArticlesList(res.data);
          setArticlesLoaded(true);
        }).catch();
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
          myArticlesList !== undefined ? (myArticlesList?.map((obj : IArticle, index: number) => (
            <div key={obj?._id} style={{ margin: '1%', background: 'white', borderRadius: '10px' }}>
              <Article
                article={obj}
                isEditable={allowEdit}
                indexArticle={index}
              />
            </div>
          ))) : (
            <div className="emptyList">
              {' '}
              {t('no_articles_yet')}
              {' '}
            </div>
          )
        }
      </List>
    </Content>
  );
};

export default MyArticles;
