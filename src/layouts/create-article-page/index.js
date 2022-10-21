import React, { useEffect, useState } from 'react';
import {
  Layout, Col, Row, List,
} from 'antd';
import CreateClaim from '../../components/claim/create';
import CreateArticle from '../../components/article/create';
import Claim from '../../components/claim';
import Article from '../../components/article';
import MyTitle from '../../components/MyTitle';

const { Content } = Layout;

export default function CreateArticlePage() {
  const [articleSubmited, setArticleSubmited] = useState(false);
  const [article, setArticle] = useState({});
  const [claims, setClaims] = useState([]);

  useEffect(() => {}, [claims]);

  const addArticleComponent = (!articleSubmited)
    ? (
      <CreateArticle
        setArticleSubmited={setArticleSubmited}
        articleSubmited={articleSubmited}
        setArticle={setArticle}
      />
    ) : (
      <Article article={article} />
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
              background: (articleSubmited) ? '#00887A' : '#77A6F7',
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
              background: '#77A6F7',
              borderRadius: '10px',
              marginBottom: '1%',
            }}
          >
            <div
              style={{
                background: (articleSubmited) ? '#77A6F7' : '#77A6F7',
                border: '5px bold',
                padding: '10px 40px',
                borderRadius: '10px',
              }}
            >
              <MyTitle headline="Add claim to article" />
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
              background: '#77A6F7',
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
              <MyTitle headline="List of claims:" />
              <List
                style={{
                  padding: '1%',
                }}
              >
                {
                  claims.map((obj) => <div key={obj._id} style={{ padding: '1%', background: '#77A6F7' }}><Claim {...obj} /></div>)
                }
              </List>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
