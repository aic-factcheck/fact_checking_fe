import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Col, Row, List,
} from 'antd';
import { useRecoilValue } from 'recoil';
import CreateClaim from '../../components/claim/create';
import CreateArticle from '../../components/article/create';
import Claim from '../../components/claim';
import Article from '../../components/article';
import MyTitle from '../../components/MyTitle';
import authAtom from '../../_state/auth';

const { Content } = Layout;

export default function CreateArticlePage() {
  const [articleSubmited, setArticleSubmited] = useState(false);
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [claims, setClaims] = useState([]);
  const allowEdit = false;
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
  }, [claims]);

  const addArticleComponent = (!articleSubmited)
    ? (
      <CreateArticle
        setArticleSubmited={setArticleSubmited}
        articleSubmited={articleSubmited}
        setArticle={setArticle}
      />
    ) : (
      <Article article={article} isEditable={allowEdit} />
    );

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
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
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
              <MyTitle headline="Add claim to article" fontcolor="#d86e3d" />
              <CreateClaim
                articleSubmited={articleSubmited}
                claims={claims}
                setClaims={setClaims}
                article={article}
              />
            </div>
          </Row>
          {(articleSubmited)}
          <Row
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            style={{
              background: 'white',
              borderRadius: '10px',
              paddingLeft: '2%',
              paddingTop: '2%',
              minWidth: '360px',
              width: '100%',
            }}
          >
            <Col
              style={{
                width: '96%',
              }}
            >
              <MyTitle headline="List of claims:" fontcolor="#d86e3d" />
              <List
                style={{
                  padding: '1%',
                }}
              >
                {
                  claims.map((obj, index) => (
                    <div
                      key={obj._id}
                      style={{
                        padding: '1%', background: '#e2bead9a', border: '1px solid #e2bead9a', borderRadius: '10px',
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
