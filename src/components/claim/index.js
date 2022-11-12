import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List, Col, Row, Typography, Divider, Button, Modal,
} from 'antd';
import { FiEdit } from 'react-icons/fi';
import EditClaim from './edit';
// import MyTitle from '../MyTitle';

const { Paragraph } = Typography;

export default function Claim({
  claim, isEditable, setMyClaimsList, index, claims,
}) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const editButton = (isEditable)
    ? (
      <div>
        <Button variant="primary" onClick={showModal} style={{ backgroundColor: '#77a6f7' }}>
          <FiEdit size={20} style={{ color: 'white' }} />
        </Button>
        <Modal
          title="Edit article"
          open={open}
          onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <EditClaim
            claim={claim}
            setMyClaimsList={setMyClaimsList}
            claimsList={claims}
            indexClaim={index}
          />
        </Modal>
      </div>
    ) : (
      <div />
    );

  return (
    <List.Item
      title={claim._id}
      style={{
        width: '100%',
        padding: '1%',
        backgroundColor: '#00887A',
        color: 'white',
        display: 'block',
        borderRadius: '10px',
      }}
      key={claim._id}
      description={claim._id}
    >
      <Row>
        <Col span={4}>
          {index + 1}
        </Col>
        <Col offset={18} span={2}>
          {editButton}
        </Col>
        {
          /* <Col span={12}>
              {addedBy}
            </Col>
            <Col span={8}>
              <MyTitle headline={articleId} />
            </Col> */
        }
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Paragraph style={{ color: 'white' }}>
            {claim.text}
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
  claim: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    addedBy: PropTypes.string.isRequired,
    articleId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    nPositiveVotes: PropTypes.number.isRequired,
    // positiveVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    // nNeutralVotes: PropTypes.number.isRequired,
    // neutralVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    nNegativeVotes: PropTypes.number.isRequired,
    // negativeVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isEditable: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  claims: PropTypes.arrayOf(PropTypes.objectOf),
  setMyClaimsList: PropTypes.func,
};

Claim.defaultProps = {
  setMyClaimsList: () => {},
  claims: [],
};
