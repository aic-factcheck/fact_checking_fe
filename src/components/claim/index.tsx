import React, { useState /* useEffect */ } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider, Button, Modal,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import {
  PlusCircleOutlined, ReadOutlined, EditOutlined, UpCircleOutlined, DownCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import authAtom from '../../_state/auth';
import EditClaim from './edit';
import AddReview from '../AddReview';
import Reviews from '../Reviews';
import MyTitle from '../MyTitle/index';
import { IClaim } from '../../common/types';
import claimsService from '../../api/claims.service';

interface Props {
  claim: IClaim;
  isEditable: boolean;
  index: number;
}

const { Paragraph } = Typography;

const Claim: React.FC<Props> = ({ claim, isEditable, index }) => {
  const auth = useRecoilValue(authAtom);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const [openAddReview, setOpenAddReview] = useState(false);

  const showModalAddReview = () => {
    setOpenAddReview(true);
  };

  const handleOkAddReview = () => {
    setOpenAddReview(false);
  };

  const [openReview, setOpenReview] = useState(false);

  const showModalReview = () => {
    setOpenReview(true);
  };

  const handleOkReview = () => {
    setOpenReview(false);
  };

  const [upvote, setUpvote] = useState(claim?.nPositiveVotes);

  const addUpVote = (claimId: string) => {
    claimsService.voteClaim(claimId, 1).then(() => setUpvote(upvote + 1)).catch((err) => {
      console.log(err);
      setUpvote(upvote);
    });
  };

  const [downvote, setDownvote] = useState(claim?.nNegativeVotes);

  const addDownVote = (claimId: string) => {
    claimsService.voteClaim(claimId, -1).then(() => setDownvote(downvote + 1)).catch((err) => {
      console.log(err);
      setDownvote(downvote);
    });
  };

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
          onCancel={handleOk}
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
          {t('add_review')}
        </Button>
        <Modal
          title={t('add_review')}
          open={openAddReview}
          onOk={handleOkAddReview}
          // confirmLoading={confirmLoading}
          onCancel={handleOkAddReview}
          className="reviewsModal"
          footer={[]}
        >
          <AddReview
            claim={claim}
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
            <Link to={`/article/${claim?.article._id}`} className="claims" style={{ color: 'black', textDecorationColor: 'black' }}>
              <MyTitle headline={claim?.text} fontcolor="black" />
            </Link>
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={0}>
          <Paragraph style={{ color: 'black', textAlign: 'left' }}>
            {
                claim?.addedBy.firstName !== undefined && claim?.createdAt !== undefined
                  ? `${claim?.addedBy.firstName} ${claim?.addedBy.lastName}, ${new Date(claim.createdAt).toUTCString().slice(4).slice(0, -7)}`
                  : `${auth?.user.firstName} ${auth?.user.lastName}, ${new Date(claim.createdAt).toUTCString().slice(4).slice(0, -7)}`
            }
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={0}>
          <Paragraph style={{ color: 'black', textAlign: 'left' }}>
            <UpCircleOutlined />
            {' '}
            {upvote}
            {' '}
            <DownCircleOutlined style={{ marginLeft: '1%' }} />
            {' '}
            {downvote}
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
          xs={7}
          sm={7}
          md={7}
          lg={7}
          xl={7}
          xxl={4}
        >
          <Button block className="reactions" style={{ borderRadius: '10px 0px 0px 10px' }} onClick={() => addUpVote(claim?._id)}>
            <UpCircleOutlined />
            {t('upvote')}
          </Button>
        </Col>
        <Col
          style={{
            color: 'black', fontStyle: 'italic', zIndex: '99',
          }}
          offset={0}
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          xxl={2}
        >
          <Button block className="reactions" style={{ borderRadius: '0px 10px 10px 0px' }} onClick={() => addDownVote(claim?._id)}>
            <DownCircleOutlined />
          </Button>
        </Col>
        <Col
          offset={0}
          style={{ zIndex: '99' }}
          xs={7}
          sm={7}
          md={7}
          lg={7}
          xl={7}
          xxl={9}
        >
          {editButton}
        </Col>
        <Col
          xs={7}
          sm={7}
          md={7}
          lg={7}
          xl={7}
          xxl={9}
          offset={0}
        >
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
            onCancel={handleOkReview}
            className="reviewsModal"
            footer={[]}
          >
            <Reviews
              claim={claim}
              indexClaim={index}
              updated={showModalReview}
            />
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default Claim;
