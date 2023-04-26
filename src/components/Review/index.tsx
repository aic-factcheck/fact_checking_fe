import React, { useState } from 'react';
import {
  Row, Col, Typography, Divider, Tooltip, Button,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { BiQuestionMark } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { IReview } from '../../common/types';
import reviewsService from '../../api/reviews.service';
import authAtom from '../../_state/auth';

interface Props {
  review: IReview,
}

class ReviewSemaphore {
  upvote: number;

  downvote: number;

  neutralVote: number;

  constructor() {
    this.upvote = 0;
    this.downvote = 0;
    this.neutralVote = 0;
  }

  upvoteReview(): boolean {
    let changed = false;
    if (this.upvote === 0) {
      changed = true;
    }
    this.upvote = 1;
    this.downvote = 0;
    this.neutralVote = 0;
    return changed;
  }

  downvoteReview(): boolean {
    let changed = false;
    if (this.downvote === 0) {
      changed = true;
    }
    this.upvote = 0;
    this.downvote = 1;
    this.neutralVote = 0;
    return changed;
  }

  neutralVoteReview(): boolean {
    let changed = false;
    if (this.neutralVote === 0) {
      changed = true;
    }
    this.upvote = 0;
    this.downvote = 0;
    this.neutralVote = 1;
    return changed;
  }
}

const { Paragraph } = Typography;
// eslint-disable-next-line prefer-const

const Review: React.FC<Props> = ({ review }) => {
  // eslint-disable-next-line prefer-const
  let semaphore: ReviewSemaphore = new ReviewSemaphore();
  const { t } = useTranslation();
  const auth = useRecoilValue(authAtom);

  const [upvote, setUpvote] = useState(review?.nPositiveVotes);
  const [downvote, setDownvote] = useState(review?.nNegativeVotes);
  const [neutralvote, setNeutralvote] = useState(review?.nNeutralVotes);

  const addUpVote = () => {
    console.log(auth?.token);
    if (auth?.token !== undefined) {
      const changed = semaphore.upvoteReview();
      if (changed) {
        setUpvote(review.nPositiveVotes + semaphore.upvote);
        setDownvote(review.nNegativeVotes + semaphore.downvote);
        setNeutralvote(review.nNeutralVotes + semaphore.neutralVote);
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
      const changed = semaphore.downvoteReview();
      if (changed) {
        setUpvote(review.nPositiveVotes + semaphore.upvote);
        setDownvote(review.nNegativeVotes + semaphore.downvote);
        setNeutralvote(review.nNeutralVotes + semaphore.neutralVote);
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
      const changed = semaphore.neutralVoteReview();
      if (changed) {
        setUpvote(review.nPositiveVotes + semaphore.upvote);
        setDownvote(review.nNegativeVotes + semaphore.downvote);
        setNeutralvote(review.nNeutralVotes + semaphore.neutralVote);
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
      <Row>
        <Col span={1} style={{ marginTop: '2%', marginRight: '0%' }}>
          <Row justify="end">
            <img
              src={`${process.env.PUBLIC_URL}/user.svg`}
              alt="user"
              className="myUserIcon"
            />
          </Row>
        </Col>
        <Col span={22} style={{ marginBottom: '0%' }}>
          <div
            key={review._id}
            style={{
              padding: '1%', background: '#F2F2F2', borderRadius: '10px', margin: '1%',
            }}
          >
            <Row style={{
              borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%', fontWeight: 'bold',
            }}
            >
              <Col span={20}>
                <Paragraph style={{ color: 'black', margin: '0%' }}>
                  <p style={{ display: 'inline' }}>
                    {`${review?.addedBy.firstName} ${review?.addedBy.lastName}`}
                    {review.vote === 'positive' && <CheckOutlined style={{ marginLeft: '7px' }} /> }
                    {review.vote === 'negative' && <CloseOutlined style={{ marginLeft: '7px' }} />}
                    {review.vote === 'no_info' && <BiQuestionMark style={{ marginLeft: '7px' }} />}
                  </p>
                </Paragraph>
              </Col>
            </Row>
            <Row style={{
              borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
            }}
            >
              <Col span={20}>
                <Paragraph style={{ color: 'black', margin: '0%' }}>
                  {review.text}
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
                            review.links.map((objLink: string) => (
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
    </div>
  );
};

export default Review;
