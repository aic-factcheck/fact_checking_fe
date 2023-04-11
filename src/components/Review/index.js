import React, { useState } from 'react';
import {
  Row, Col, Typography, Divider, Tooltip, Button,
} from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BiQuestionMark } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useUserActions from '../../_actions/user.actions';

const { Paragraph } = Typography;

export default function Review({
  review,
}) {
  const userActions = useUserActions();
  const { t } = useTranslation();

  const [upvote, setUpvote] = useState(review?.nPositiveVotes);

  const addUpVote = () => {
    userActions.voteReview(review._id, upvote, setUpvote, 1).catch();
  };

  const [downvote, setDownvote] = useState(review?.nNegativeVotes);

  const addDownVote = () => {
    userActions.voteReview(review._id, downvote, setDownvote, -1).catch();
  };

  const [neutralvote, setNeutralvote] = useState(review?.nNeutralVotes);

  const addNeutralVote = () => {
    userActions.voteReview(review._id, neutralvote, setNeutralvote, 0).catch();
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
                            review.links.map((objLink) => (
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
                <Button block className="reactions" style={{ borderRadius: '10px 0px 0px 10px', border: 'none', background: '#F2F2F2' }} onClick={() => addUpVote()}>
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
                <Button block className="reactions" style={{ border: 'none', background: '#F2F2F2' }} onClick={() => addNeutralVote()}>
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
                <Button block className="reactions" style={{ borderRadius: '0px 10px 10px 0px', border: 'none', background: '#F2F2F2' }} onClick={() => addDownVote()}>
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
}

Review.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string,
    claimId: PropTypes.shape({ _id: PropTypes.string }),
    text: PropTypes.string,
    createdAt: PropTypes.string,
    vote: PropTypes.string,
    links: PropTypes.string,
    nPositiveVotes: PropTypes.string,
    nNeutralVotes: PropTypes.string,
    nNegativeVotes: PropTypes.string,
    addedBy: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

Review.defaultProps = {
};
