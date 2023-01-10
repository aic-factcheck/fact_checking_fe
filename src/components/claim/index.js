import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider, Button, Modal,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { PlusCircleOutlined, ReadOutlined, EditOutlined } from '@ant-design/icons';
import authAtom from '../../_state/auth';
import EditClaim from './edit';
import AddReview from '../AddReview';
import Reviews from '../Reviews';

const { Paragraph } = Typography;

export default function Claim({
  claim, isEditable, index,
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

  const [openAddReview, setOpenAddReview] = useState(false);

  const showModalAddReview = () => {
    setOpenAddReview(true);
  };

  const handleOkAddReview = () => {
    setOpenAddReview(false);
  };

  const handleCancelAddReview = () => {
    setOpenAddReview(false);
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
        <Button onClick={showModal} icon={<EditOutlined />}>
          Edit
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
            indexClaim={index}
          />
        </Modal>
      </div>
    ) : (
      <div>
        <Button onClick={showModalAddReview} icon={<PlusCircleOutlined />}>
          Review
        </Button>
        <Modal
          title="Add review"
          open={openAddReview}
          onOk={handleOkAddReview}
          // confirmLoading={confirmLoading}
          onCancel={handleCancelAddReview}
          className="reviewsModal"
          footer={[]}
        >
          <AddReview
            claim={claim}
            indexClaim={index}
          />
        </Modal>
      </div>
    );

  return (
    <div
      style={{
        padding: '3%',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '10px',
        fontSize: '1.8em',
      }}
    >
      <Row>
        <Col span={24}>
          <Paragraph style={{ color: 'black' }}>
            <a href={`/article/${claim?.article._id}`} className="claims" style={{ color: 'black', textDecorationColor: 'black' }}>
              {claim?.text}
            </a>
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Paragraph style={{ color: 'black', fontSize: '0.5em' }}>
            {
                claim?.addedBy.firstName !== undefined && claim?.createdAt !== undefined
                  ? `${claim?.addedBy.firstName} ${claim?.addedBy.lastName}, ${new Date(claim.createdAt).toGMTString().slice(4).slice(0, -7)}`
                  : `${auth?.data.firstName} ${auth?.data.lastName}, ${new Date(claim.createdAt).toGMTString().slice(4).slice(0, -7)}`
            }
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ margin: '1%' }} />
      <Row style={{ zIndex: '99' }}>
        <Col offset={0} style={{ marginRight: '1%', zIndex: '99' }}>
          {editButton}
        </Col>
        <Col>
          <Button onClick={showModalReview} style={{ zIndex: '99' }} icon={<ReadOutlined />}>
            Reviews
          </Button>
          <Modal
            title="Reviews"
            open={openReview}
            onOk={handleOkReview}
            // confirmLoading={confirmLoading}
            onCancel={handleCancelReview}
            className="reviewsModal"
            footer={[]}
          >
            <Reviews
              claim={claim}
              indexClaim={index}
            />
          </Modal>
        </Col>
      </Row>
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
};

Claim.defaultProps = {
};
