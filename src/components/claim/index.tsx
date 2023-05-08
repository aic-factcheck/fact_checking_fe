import React, { useState } from 'react';
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
  const [myupvotes, setMyUpvotes] = useState(0);
  const [mydownvotes, setMyDownvotes] = useState(0);
  const auth = useRecoilValue(authAtom);
  const { t } = useTranslation();
  const [reviewsNum, setReviewsNum] = useState(claim?.nReviews);
  // eslint-disable-next-line prefer-const

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

  const increaseReviewsNum = () => {
    setReviewsNum(reviewsNum + 1);
  };

  const [upvotes, setUpvotes] = useState(claim.nPositiveVotes);
  const [downvotes, setDownvotes] = useState(claim.nNegativeVotes);

  const addUpVote = (claimId: string) => {
    if (auth?.token !== undefined) {
      let changedHappen = false;
      if (myupvotes !== 1) {
        changedHappen = true;
        setMyUpvotes(1);
      }
      setMyDownvotes(0);
      if (changedHappen) {
        setUpvotes(claim.nPositiveVotes + myupvotes);
        setDownvotes(claim.nNegativeVotes + mydownvotes);
        claimsService.voteClaim(claimId, 1).then((res: any) => {
          setUpvotes(res?.data?.nPositiveVotes);
          setDownvotes(res?.data?.nNegativeVotes);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const addDownVote = (claimId: string) => {
    if (auth?.token !== undefined) {
      let changedHappen = false;
      if (mydownvotes !== 1) {
        changedHappen = true;
        setMyDownvotes(1);
      }
      setMyUpvotes(0);
      if (changedHappen) {
        setUpvotes(claim.nPositiveVotes + myupvotes);
        setDownvotes(claim.nNegativeVotes + mydownvotes);
        claimsService.voteClaim(claimId, -1).then((res: any) => {
          setUpvotes(res?.data?.nPositiveVotes);
          setDownvotes(res?.data?.nNegativeVotes);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const editButton = (isEditable)
    ? (
      <div>
        <Button
          block
          onClick={showModal}
          icon={<EditOutlined />}
          className="buttons editClaimProfile"
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
            closeModal={handleOk}
          />
        </Modal>
      </div>
    ) : (
      <div>
        <Button
          block
          onClick={showModalAddReview}
          icon={<PlusCircleOutlined />}
          className="buttons addReviewButton"
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
            closeModal={handleOkAddReview}
            reviewsNum={increaseReviewsNum}
          />
        </Modal>
      </div>
    );

  return (
    <div
      className="claimComponent"
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
                  ? (
                    <Link to={`/profileSearch/${claim?.addedBy?._id}`}>
                      {`${claim?.addedBy?.firstName} ${claim?.addedBy.lastName}`}
                    </Link>
                  )
                  : (
                    <Link to={`/profileSearch/${claim?.addedBy?._id}`}>
                      {`${auth?.user?.firstName} ${auth?.user.lastName}`}
                    </Link>
                  )
            }
            {', '}
            {new Date(claim?.createdAt).toUTCString().slice(4).slice(0, -7)}
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            color: 'black', fontStyle: 'italic', zIndex: '99',
          }}
          offset={0}
          xs={9}
          sm={8}
          md={8}
          lg={7}
          xl={6}
          xxl={5}
        >
          <Button size="small" block className="reactions upvoteClaimButton" style={{ borderRadius: '10px 0px 0px 10px' }} onClick={() => addUpVote(claim?._id)}>
            <UpCircleOutlined />
            {' '}
            {t('upvote')}
            {'   '}
            {upvotes}
          </Button>
        </Col>
        <Col
          style={{
            color: 'black', fontStyle: 'italic', zIndex: '99',
          }}
          offset={0}
          xs={5}
          sm={5}
          md={4}
          lg={3}
          xl={2}
          xxl={2}
        >
          <Button size="small" block className="reactions downvoteClaimButton" style={{ borderRadius: '0px 10px 10px 0px' }} onClick={() => addDownVote(claim?._id)}>
            <DownCircleOutlined />
            {' '}
            {downvotes}
            {' '}
          </Button>
        </Col>
      </Row>
      <Divider style={{ margin: '0%', marginTop: '1%' }} />
      <Row>
        <Col
          offset={0}
          style={{ zIndex: '99' }}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
        >
          {editButton}
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
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
            {' ('}
            {reviewsNum !== undefined ? reviewsNum : 0}
            {') '}
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
