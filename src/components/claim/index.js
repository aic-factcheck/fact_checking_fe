import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider, Button, Modal,
} from 'antd';
import { FiEdit } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import EditClaim from './edit';
import AddReview from '../AddReview';
// import MyTitle from '../MyTitle';

const { Paragraph } = Typography;

export default function Claim({
  claim, isEditable, setMyClaimsList, index, claims,
}) {
  const [open, setOpen] = useState(false);
  const auth = useRecoilValue(authAtom);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [openReview, setOpenReview] = useState(false);

  const showModalReview = () => {
    setOpenReview(true);
  };

  const handleOkReview = () => {
    setOpenReview(false);
  };

  const handleCancelReview = () => {
    setOpenReview(false);
  };

  const editButton = (isEditable)
    ? (
      <div>
        <Button variant="primary" onClick={showModal} style={{ backgroundColor: '#77a6f7' }}>
          <FiEdit size={20} style={{ color: 'white' }} />
        </Button>
        <Modal
          title="Edit claim"
          open={open}
          onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[]}
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
      <div>
        <Button variant="primary" onClick={showModalReview} style={{ backgroundColor: '#77a6f7', color: 'white' }}>
          Reviews
        </Button>
        <Modal
          title="Add review"
          open={openReview}
          onOk={handleOkReview}
          // confirmLoading={confirmLoading}
          onCancel={handleCancelReview}
          width="80%"
        >
          <AddReview
            claim={claim}
            setMyClaimsList={setMyClaimsList}
            claimsList={claims}
            indexClaim={index}
          />
        </Modal>
      </div>
    );

  return (
    <div
      style={{
        padding: '3%',
        backgroundColor: '#00887A',
        color: 'white',
        borderRadius: '10px',
        fontSize: '1.8em',
      }}
    >
      <Row>
        <Col span={24}>
          <Paragraph style={{ color: 'white' }}>
            <a href={`/article/${claim?.article?._id}`} className="claims" style={{ color: 'white', textDecorationColor: 'white' }}>
              {claim?.text}
            </a>
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Paragraph style={{ color: 'white', fontSize: '0.5em' }}>
            {
                claim?.addedBy.firstName !== undefined ? `Author : ${claim?.addedBy.firstName} ${claim?.addedBy.lastName}` : `Author : ${auth?.data.firstName} ${auth?.data.lastName}`
            }
          </Paragraph>
        </Col>
        <Col span={12}>
          <Paragraph style={{ color: 'white', fontSize: '0.5em' }}>
            {
              claim?.createdAt !== undefined && `Created at : ${new Date(claim.createdAt)}`
            }
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ margin: '1%' }} />
      <Row>
        <Col offset={0} span="auto">
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
    </div>
  );
}

Claim.propTypes = {
  claim: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    article: PropTypes.shape({
      _id: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // nPositiveVotes: PropTypes.number.isRequired,
    // positiveVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    // nNeutralVotes: PropTypes.number.isRequired,
    // neutralVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    // nNegativeVotes: PropTypes.number.isRequired,
    // negativeVotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    addedBy: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
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
