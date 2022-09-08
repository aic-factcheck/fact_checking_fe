import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider,
} from 'antd';

const { Title, Paragraph } = Typography;

export default function Article({ article }) {
  return (
    <div style={{
      backgroundColor: '#F5DEB3',
      padding: '10px',
    }}
    >
      <Row>
        <Col offset={2} span={20}>
          <Title level={4} style={{ color: 'crimson' }}>{article.sourceUrl}</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={4}>
          <Paragraph style={{ color: 'black' }}>{`Type: ${article.sourceType}`}</Paragraph>
        </Col>
        <Col span={4}>
          <Paragraph style={{ color: 'black' }}>{`Language: ${article.language}`}</Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col offset={2} span={20}>
          <Paragraph style={{ color: 'black' }}>{article.text}</Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col offset={2} span={20}>
          {`Created at: ${article.createdAt.split('T')[0]}` }
        </Col>
      </Row>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string,
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    language: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};
