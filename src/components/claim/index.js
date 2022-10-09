import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Col, Row, Typography, Divider,
} from 'antd';
import MyTitle from '../MyTitle';

const { Paragraph } = Typography;

export default function Claim({
  // eslint-disable-next-line no-unused-vars
  _id, priority, addedBy, articleId, text, nPositiveVotes, positiveVotes,
  // eslint-disable-next-line no-unused-vars
  nNeutralVotes, neutralVotes, nNegativeVotes, negativeVotes,
}) {
  return (
    <List.Item
      title={_id}
      style={{
        width: '100%',
        padding: '10px',
        backgroundColor: 'tomato',
        color: 'white',
        display: 'block',
      }}
      key={_id}
      description={_id}
    >
      <Row gutter={[16, 16]}>
        <Col span={4}>
          {priority}
        </Col>
        <Col span={12}>
          {addedBy}
        </Col>
        <Col span={8}>
          <MyTitle headline={articleId} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Paragraph>
            {text}
          </Paragraph>
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
        <Title level={5}>Votes: </Title>
        <Row style={{ width: '100%' }}>
          <Col offset={4} span={8}>
            Positive
          </Col>
          <Col span={8}>
            {nPositiveVotes}
          </Col>
        </Row>
        <Row style={{ width: '100%' }}>
          <Col offset={4} span={8}>
            Neutral
          </Col>
          <Col span={8}>
            {nNeutralVotes}
          </Col>
        </Row>
        <Row style={{ width: '100%' }}>
          <Col offset={4} span={8}>
            Negatve
          </Col>
          <Col span={8}>
            {nNegativeVotes}
          </Col>
        </Row>
      </Row> */}
    </List.Item>
  );
}

Claim.propTypes = {
  _id: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  addedBy: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  nPositiveVotes: PropTypes.number.isRequired,
  positiveVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  nNeutralVotes: PropTypes.number.isRequired,
  neutralVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  nNegativeVotes: PropTypes.number.isRequired,
  negativeVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
