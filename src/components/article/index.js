import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider,
} from 'antd';
import MyTitle from '../MyTitle/index';

const { Paragraph } = Typography;

export default function Article({ article }) {
  return (
    <div style={{
      backgroundColor: '#00887A',
      padding: '3% 3% 3% 3%',
      borderRadius: '10px',
      color: 'white',
    }}
    >
      <Row>
        <Col offset={2} span={20}>
          <MyTitle headline={article.sourceUrl} />
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={4}>
          <Paragraph style={{ color: 'white' }}>{`Type: ${article.sourceType}`}</Paragraph>
        </Col>
        <Col span={4}>
          <Paragraph style={{ color: 'white' }}>{`Language: ${article.language}`}</Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col offset={2} span={20}>
          <Paragraph style={{ color: 'white' }}>{article.text}</Paragraph>
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
