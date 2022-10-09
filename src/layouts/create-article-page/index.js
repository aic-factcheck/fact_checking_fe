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
    <Content className="site-layout" style={{ padding: '1% 3% 3% 3%', borderRadius: '10px' }}>
      <Row
        gutter={{
          xs: 16, sm: 16, md: 16, lg: 16,
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={13}
          lg={14}
          xl={14}
          style={{
            minWidth: '100%',
          }}
        >
          <div
            style={{
              background: (articleSubmited) ? '#77A6F7' : '#77A6F7', borderRadius: '10px',
            }}
          >
            {addArticleComponent}
          </div>
        </Col>
      </Row>
      <Row
        style={{
          margin: '1% 0% 0% 0%',
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={9}
          lg={10}
          xl={10}
          style={{
            minHeight: '250px',
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
        </Col>
      </Row>
      {(articleSubmited && <MyTitle headline="List of claims:" />)}
      <Row
        style={{
          margin: 0,
        }}
      >
        <Col xs={24} sm={24} md={13} lg={14} xl={14}>
          <List
            style={{
              paddingBottom: '10px',
            }}
          >
            {
              claims.map((obj) => <div key={obj._id} style={{ padding: '20px' }}><Claim {...obj} /></div>)
            }
          </List>
        </Col>
      </Row>
    </Content>
  );
}
