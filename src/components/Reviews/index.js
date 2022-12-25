import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row, Col, Typography, Divider, List, Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { BiLike, BiDislike, BiQuestionMark } from 'react-icons/bi';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import authAtom from '../../_state/auth';

const { Paragraph } = Typography;
const { Title } = Typography;

export default function Reviews({
  claim,
}) {
  const auth = useRecoilValue(authAtom);
  const fetchWrapper = useFetchWrapper();
  const navigate = useNavigate();

  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    const articleid = claim?.article._id;
    const claimid = claim?._id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}/reviews`).then((res) => {
        const reviews = res.filter((el) => claimid === el?.claimId);
        setReviewsList(reviews);
        console.log('');
      }).catch(console.log(''));
    }
  }, [auth, navigate]);

  return (
    <div>
      <Row style={{
        background: '#d86e3d', borderRadius: '10px', textAlign: 'center', padding: '1%', paddingTop: '2%',
      }}
      >
        <Col span={24}>
          <Paragraph style={{ color: 'white', fontWeight: 'bold' }}>
            {claim.text}
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white', width: '5%' }} />
      <Title level={5} className="defaultForm" style={{ color: 'white', whiteSpace: 'pre-line', textDecoration: 'none' }}>Reviews :</Title>
      <List
        style={{
          padding: '0%',
        }}
      >
        {
          // _id, priority, addedBy, articleId, text
          reviewsList.map((obj) => (
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
                  key={obj._id}
                  style={{
                    padding: '1%', background: '#e6cec488', borderRadius: '10px', margin: '1%',
                  }}
                >
                  <Row style={{
                    borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%', fontWeight: 'bold',
                  }}
                  >
                    <Col span={20}>
                      <Paragraph style={{ color: 'black', margin: '0%' }}>
                        <p style={{ display: 'inline' }}>
                          {`${obj?.addedBy.firstName} ${obj?.addedBy.lastName}`}
                          {obj.vote === 'positive' && <BiLike style={{ marginLeft: '7px' }} /> }
                          {obj.vote === 'negative' && <BiDislike style={{ marginLeft: '7px' }} />}
                          {obj.vote === 'no_info' && <BiQuestionMark style={{ marginLeft: '7px' }} />}
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
                        {obj.text}
                      </Paragraph>
                    </Col>
                  </Row>
                  <Row style={{
                    borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
                  }}
                  >
                    <Col span={20}>
                      <Paragraph style={{ color: 'black', margin: '0%' }}>
                        <ul>
                          {
                            obj.links.map((objLink, index) => (
                              <li style={{ display: 'inline-block', margin: '0' }}>
                                <Tooltip title={`${objLink}`}>
                                  <span>
                                    <a href={`${objLink}`} style={{ color: 'black', textDecoration: 'underline', textDecorationColor: 'black' }}>
                                      { `Link ${index + 1} `}
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
                </div>
              </Col>
            </Row>
          ))
        }
      </List>
    </div>
  );
}

Reviews.propTypes = {
  claim: PropTypes.shape({
    _id: PropTypes.string,
    article: PropTypes.shape({ _id: PropTypes.string }),
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    language: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

Reviews.defaultProps = {
};
