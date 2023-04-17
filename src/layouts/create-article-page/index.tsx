import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Col, Row, List,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import CreateClaim from '../../components/claim/create';
import CreateArticle from '../../components/article/create';
import Claim from '../../components/claim';
import Article from '../../components/article';
import MyTitle from '../../components/MyTitle';
import authAtom from '../../_state/auth';
import { IArticle, IClaim } from '../../common/types';

const { Content } = Layout;

class ArticleEmpty implements IArticle {
  _id = '';
  createdAt= '';
  title= '';
  sourceUrl= '';
  lang= '';
  text= '';
  sourceType= '';
  addedBy!: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isSavedByUser = false
}

const CreateArticlePage: React.FC = () =>{
  const [articleSubmited, setArticleSubmited] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [article, setArticle] = useState<IArticle>();
  const [claims, setClaims] = useState<IClaim[]>([]);
  const allowEdit = false;
  const auth = useRecoilValue(authAtom);

  const addArticleComponent = (!articleSubmited)
    ? (
      <CreateArticle
        setArticleSubmited={setArticleSubmited}
        articleSubmited={articleSubmited}
        setArticle={setArticle}
      />
    ) : (
      <Article article={article != undefined ? article : new ArticleEmpty()} isEditable={allowEdit} indexArticle={1} />
    );

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token == undefined) {
      navigate('/sign-in');
    }
  }, []);

  return (
    <Content className="site-layout" style={{ padding: '1% 2% 2% 2%', borderRadius: '10px', minHeight: '100vh' }}>
      <Row
        gutter={{
          xs: 24, sm: 24, md: 24, lg: 24,
        }}
        style={{
          marginBottom: '1%',
          minWidth: '360px',
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{
            marginBottom: '1%',
          }}
        >
          <div
            style={{
              minWidth: '40%',
              minHeight: '100%',
              background: (articleSubmited) ? 'white' : 'white',
              borderRadius: '10px',
              marginBottom: '1%',
            }}
          >
            {addArticleComponent}
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{
            minWidth: '40%',
            minHeight: '100%',
            marginBottom: '1%',
          }}
        >
          <Row
            gutter={{
              xs: 24,
              sm: 24,
              md: 12,
              lg: 12,
              xl: 12,
            }}
            style={{
              background: 'white',
              borderRadius: '10px',
              marginBottom: '1%',
            }}
          >
            <div
              style={{
                background: (articleSubmited) ? 'white' : 'white',
                border: '5px bold',
                padding: '10px 40px',
                borderRadius: '10px',
              }}
            >
              <MyTitle headline={t('add_claim')} fontcolor="#d86e3d" />
              <CreateClaim
                articleSubmited={articleSubmited}
                claims={claims}
                setClaims={setClaims}
                article={article!}
              />
            </div>
          </Row>
          {(articleSubmited)}
          <Row
            gutter={{
              xs: 24,
              sm: 24,
              md: 12,
              lg: 12,
              xl: 12,
            }}
            style={{
              borderRadius: '10px',
              minWidth: '360px',
              width: '100%',
            }}
          >
            <Col
              style={{
                width: '96%',
              }}
            >
              <MyTitle headline={t('my_claims')} fontcolor="#d86e3d" />
              <List
                style={{
                  padding: '1%',
                }}
              >
                {
                  claims.map((obj: IClaim, index: number) => (
                    <div
                      key={obj._id}
                      style={{
                        marginBottom: '1%', background: 'none', borderRadius: '10px',
                      }}
                    >
                      <Claim claim={obj} index={index} isEditable={allowEdit} />
                    </div>
                  ))
                }
              </List>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

export default CreateArticlePage;
