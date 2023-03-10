import React, { useState /* useEffect */ } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider, Button, Modal,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import {
  PlusCircleOutlined, ReadOutlined, EditOutlined, CheckOutlined, CloseOutlined,
} from '@ant-design/icons';
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
  const { t } = useTranslation();

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

  /* const isLandscape = () => window.matchMedia('(orientation:landscape)').matches;
  const [orientation, setOrientation] = useState(isLandscape() ? 'landscape' : 'portrait');
  const onWindowResize = () => {
    clearTimeout(window.resizeLag);
    window.resizeLag = setTimeout(() => {
      delete window.resizeLag;
      setOrientation(isLandscape() ? 'landscape' : 'portrait')
    }, 200);
  };

  useEffect(() => (
    onWindowResize();
    window.addEventListener('resize', onWindowResize),
    () => window.removeEventListener('resize', onWindowResize)
  ),[]) */

  const editButton = (isEditable)
    ? (
      <div>
        <Button
          block
          onClick={showModal}
          icon={<EditOutlined />}
          className="buttons"
          style={{ border: 'none' }}
        >
          {t('edit')}
        </Button>
        <Modal
          title={t('edit')}
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
        <Button
          block
          onClick={showModalAddReview}
          icon={<PlusCircleOutlined />}
          className="buttons"
          style={{
            zIndex: '99',
            border: 'none',
          }}
        >
          {t('add')}
        </Button>
        <Modal
          title={t('add')}
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
        <Col span={16} offset={0}>
          <Paragraph style={{ color: 'black', fontSize: '0.5em', textAlign: 'left' }}>
            {
                claim?.addedBy.firstName !== undefined && claim?.createdAt !== undefined
                  ? `${claim?.addedBy.firstName} ${claim?.addedBy.lastName}, ${new Date(claim.createdAt).toGMTString().slice(4).slice(0, -7)}`
                  : `${auth?.data.firstName} ${auth?.data.lastName}, ${new Date(claim.createdAt).toGMTString().slice(4).slice(0, -7)}`
            }
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={0}>
          <Paragraph style={{ color: 'black', fontSize: '0.5em', textAlign: 'left' }}>
            17 ✔️ 5 ❌
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ margin: '0%' }} />
      <Row>
        <Col
          style={{
            color: 'black', fontStyle: 'italic', zIndex: '99',
          }}
          offset={0}
          span={5}
        >
          <Button block className="reactions" style={{ borderRadius: '10px 0px 0px 10px' }}>
            <CheckOutlined />
            {t('true')}
          </Button>
        </Col>
        <Col
          style={{
            color: 'black', fontStyle: 'italic', zIndex: '99',
          }}
          offset={0}
          span={5}
        >
          <Button block className="reactions" style={{ borderRadius: '0px 10px 10px 0px' }}>
            <CloseOutlined />
            {t('false')}
          </Button>
        </Col>
        <Col offset={0} style={{ zIndex: '99' }} span={7}>
          {editButton}
        </Col>
        <Col span={7} offset={0}>
          <Button
            block
            onClick={showModalReview}
            icon={<ReadOutlined />}
            className="buttons"
            style={{ border: 'none' }}
          >
            {t('reviews')}
          </Button>
          <Modal
            title={t('reviews')}
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
