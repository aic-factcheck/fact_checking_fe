import React, { useState } from 'react';
import {
  Row, Col, Typography, Divider, Tooltip, Button, Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { BiQuestionMark } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import {
  CheckOutlined, CloseOutlined, EditOutlined, UserOutlined,
} from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { IReview } from '../../common/types';
import reviewsService from '../../api/reviews.service';
import authAtom from '../../_state/auth';
import EditReview from '../EditReview';

interface Props {
  review: IReview,
  indexReview: number,
}

const { Paragraph } = Typography;
// eslint-disable-next-line prefer-const

const UserReview: React.FC<Props> = ({ review, indexReview }) => {
  const { t } = useTranslation();
  const auth = useRecoilValue(authAtom);

  const [myupvotes, setMyUpvotes] = useState(0);
  const [mydownvotes, setMyDownvotes] = useState(0);
  const [myneutralvotes, setMyNeutralvotes] = useState(0);

  const [upvote, setUpvote] = useState(review?.nPositiveVotes);
  const [downvote, setDownvote] = useState(review?.nNegativeVotes);
  const [neutralvote, setNeutralvote] = useState(review?.nNeutralVotes);

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

  const addUpVote = () => {
    console.log(auth?.token);
    if (auth?.token !== undefined) {
      let changedHappen = false;
      if (myupvotes !== 1) {
        changedHappen = true;
        setMyUpvotes(1);
      }
      setMyDownvotes(0);
      setMyNeutralvotes(0);
      if (changedHappen) {
        setUpvote(review.nPositiveVotes + myupvotes);
        setDownvote(review.nNegativeVotes + mydownvotes);
        setNeutralvote(review.nNeutralVotes + myneutralvotes);
        reviewsService.voteReview(review._id, 1).then((res: any) => {
          setUpvote(res?.data?.nPositiveVotes);
          setDownvote(res?.data?.nNegativeVotes);
          setNeutralvote(res?.data?.nNeutralVotes);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const addDownVote = () => {
    if (auth?.token !== undefined) {
      let changedHappen = false;
      if (mydownvotes !== 1) {
        changedHappen = true;
        setMyDownvotes(1);
      }
      setMyUpvotes(0);
      setMyNeutralvotes(0);
      if (changedHappen) {
        setUpvote(review.nPositiveVotes + myupvotes);
        setDownvote(review.nNegativeVotes + mydownvotes);
        setNeutralvote(review.nNeutralVotes + myneutralvotes);
        reviewsService.voteReview(review._id, -1).then((res: any) => {
          setUpvote(res?.data?.nPositiveVotes);
          setDownvote(res?.data?.nNegativeVotes);
          setNeutralvote(res?.data?.nNeutralVotes);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const addNeutralVote = () => {
    if (auth?.token !== undefined) {
      let changedHappen = false;
      if (myneutralvotes !== 1) {
        changedHappen = true;
        setMyNeutralvotes(1);
      }
      setMyUpvotes(0);
      setMyDownvotes(0);
      if (changedHappen) {
        setUpvote(review.nPositiveVotes + myupvotes);
        setDownvote(review.nNegativeVotes + mydownvotes);
        setNeutralvote(review.nNeutralVotes + myneutralvotes);
        reviewsService.voteReview(review._id, 0).then((res: any) => {
          setUpvote(res?.data?.nPositiveVotes);
          setDownvote(res?.data?.nNegativeVotes);
          setNeutralvote(res?.data?.nNeutralVotes);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  return (
    <div>
      <Row style={{
        background: 'white', borderRadius: '10px', textAlign: 'center', padding: '0%', paddingTop: '0%',
      }}
      >
        <Col span={24} style={{ background: '#d86e3d', borderRadius: '10px 10px 0px 0px', paddingTop: '2%' }}>
          <Paragraph>
            <Tooltip title={t('open_article')}>
              <Link to={`/article/${review.article}`}>
                <p style={{
                  display: 'inline', color: 'white', fontStyle: 'italic', fontSize: '1.1em', fontWeight: 'bold',
                }}
                >
                  „
                  {review?.claim?.text}
                  “
                </p>
              </Link>
            </Tooltip>
          </Paragraph>
        </Col>
        <Divider style={{ margin: '0%' }} />
        <Col span={24} style={{ marginLeft: '5%', marginBottom: '0%', marginTop: '0%' }}>
          <Row>
            <Col span={1} style={{ marginTop: '2%', marginRight: '0%' }}>
              <Row justify="end">
                <Tooltip title={t('open_profile')}>
                  <Link to={`/profileSearch/${review.author._id}`}>
                    <Button shape="circle" icon={<UserOutlined />} />
                  </Link>
                </Tooltip>
              </Row>
            </Col>
            <Col span={22} style={{ marginBottom: '0%' }}>
              <div
                key={review._id}
                style={{
                  padding: '1%', borderRadius: '10px', margin: '1%',
                }}
              >
                <Row style={{
                  borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%', fontWeight: 'bold',
                }}
                >
                  <Col span={20}>
                    <Paragraph style={{ color: 'black', margin: '0%' }}>
                      <p style={{ display: 'inline' }}>
                        <Tooltip title={t('open_profile')}>
                          <Link to={`/profileSearch/${review.author._id}`} style={{ color: 'black' }}>
                            {`${review?.author.firstName} ${review?.author.lastName}`}
                          </Link>
                        </Tooltip>
                        {review.vote === 'TRUE' && <CheckOutlined style={{ marginLeft: '7px' }} /> }
                        {review.vote === 'FALSE' && <CloseOutlined style={{ marginLeft: '7px' }} />}
                        {review.vote === 'INCONCLUSIVE' && <BiQuestionMark style={{ marginLeft: '7px' }} />}
                      </p>
                    </Paragraph>
                  </Col>
                  <Col offset={1} span={3}>
                    <div>
                      <Button type="primary" className="editArticleProfile" onClick={showModal} icon={<EditOutlined />}>
                        {t('edit')}
                      </Button>
                      <Modal
                        title={t('edit')}
                        open={open}
                        onOk={handleOk}
          // confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        width="80%"
                        footer={[]}
                      >
                        <EditReview
                          review={review}
                          indexEdit={indexReview}
                        />
                      </Modal>
                    </div>
                  </Col>
                </Row>
                <Row style={{
                  borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
                }}
                >
                  <Col span={20}>
                    <Paragraph style={{ color: 'black', margin: '0%' }}>
                      {review?.text}
                    </Paragraph>
                  </Col>
                </Row>
                <Row style={{
                  borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
                }}
                >
                  <Col span={16}>
                    <Paragraph style={{ color: 'black', margin: '0%' }}>
                      <ul>
                        {
                            review.links?.map((objLink: string) => (
                              <li style={{ display: 'inline-block', margin: '0' }}>
                                <Tooltip title={`${objLink}`}>
                                  <span>
                                    <a href={`${objLink}`} style={{ color: 'black', textDecoration: 'underline', textDecorationColor: 'black' }}>
                                      { `${objLink.substring(0, 20)}`}
                                    </a>
                                  </span>
                                </Tooltip>
                              </li>
                            ))
                          }
                      </ul>
                    </Paragraph>
                  </Col>
                </Row>
                <Row>
                  <Divider style={{ margin: '0%' }} />
                  <Col
                    style={{
                      color: 'black', fontStyle: 'italic', zIndex: '99',
                    }}
                    offset={0}
                    span={8}
                  >
                    <Button
                      size="small"
                      block
                      className="reactions"
                      style={{
                        borderRadius: '10px 0px 0px 10px', border: 'none', background: '#F2F2F2', fontSize: '12px',
                      }}
                      onClick={() => addUpVote()}
                    >
                      <AiOutlineLike style={{ marginRight: '2%' }} />
                      {`${t('agree')}(${upvote})`}
                    </Button>
                  </Col>
                  <Col
                    style={{
                      color: 'black', fontStyle: 'italic', zIndex: '99',
                    }}
                    offset={0}
                    span={8}
                  >
                    <Button size="small" block className="reactions" style={{ border: 'none', background: '#F2F2F2', fontSize: '12px' }} onClick={() => addNeutralVote()}>
                      <BiQuestionMark style={{ marginRight: '2%' }} />
                      {`${t('miss_info')}(${neutralvote})`}
                    </Button>
                  </Col>
                  <Col
                    style={{
                      color: 'black', fontStyle: 'italic', zIndex: '99',
                    }}
                    offset={0}
                    span={8}
                  >
                    <Button
                      size="small"
                      block
                      className="reactions"
                      style={{
                        borderRadius: '0px 10px 10px 0px', border: 'none', background: '#F2F2F2', fontSize: '12px',
                      }}
                      onClick={() => addDownVote()}
                    >
                      <AiOutlineDislike style={{ marginRight: '2%' }} />
                      {`${t('disagree')}(${downvote})`}
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserReview;
