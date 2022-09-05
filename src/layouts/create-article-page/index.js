import React, { useState } from 'react';
import {
  Layout, Col, Row, Typography,
} from 'antd';
import CreateClaim from '../../components/claim/create';
import CreateArticle from '../../components/article/create';

const { Content } = Layout;
const { Title } = Typography;

export default function CreateArticlePage() {
  const [articleSubmited, setArticleSubmited] = useState(false);

  return (
    <Content className="site-layout" style={{ padding: '50px 0 0 0', marginTop: 40 }}>
      <Row
        gutter={{
          xs: 16, sm: 16, md: 16, lg: 16,
        }}
        style={{
          margin: 0,
        }}
      >
        <Col xs={24} sm={24} md={13} lg={14} xl={14}>
          <div
            style={{
              background: (articleSubmited) ? '#fffffa' : '#9E9E9E',
              padding: '20px 50px',
            }}
          >
            <CreateArticle
              setArticleSubmited={setArticleSubmited}
              articleSubmited={articleSubmited}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={9} lg={10} xl={10}>
          <div
            style={{
              background: (articleSubmited) ? '#9E9E9E' : '#fffffa',
              border: '5px bold',
              padding: '10px 40px',
            }}
          >
            <Title level={5}>Aaaa</Title>
            <CreateClaim articleSubmited={articleSubmited} />
          </div>
        </Col>
      </Row>
    </Content>
  );
}
