import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row, Col, Typography, Divider, List,
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
        background: '#d86e3d9a', borderRadius: '10px', textAlign: 'center', padding: '1%', paddingTop: '2%',
      }}
      >
        <Col span={24}>
          <Paragraph style={{ color: 'white' }}>
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
            <div key={obj._id} style={{ padding: '1%', background: '#e2bead9a', borderRadius: '10px' }}>
              <Row style={{
                borderRadius: '0px', textAlign: 'left', paddingLeft: '2%', paddingTop: '1%', margin: '0%',
              }}
              >
                <Col span={20}>
                  <Paragraph style={{ color: 'black' }}>
                    {`${obj?.addedBy.firstName} ${obj?.addedBy.lastName}`}
                  </Paragraph>
                </Col>
              </Row>
              <Divider style={{ backgroundColor: '#e2bead9a', width: '0%', margin: '1%' }} />
              <Row style={{
                borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
              }}
              >
                <Col span={1}>
                  <Paragraph style={{ color: 'black' }}>
                    {obj.vote === 'positive' && <BiLike /> }
                    {obj.vote === 'negative' && <BiDislike />}
                    {obj.vote === 'no_info' && <BiQuestionMark />}
                  </Paragraph>
                </Col>
                <Col span={20}>
                  <Paragraph style={{ color: 'black' }}>
                    {obj.text}
                  </Paragraph>
                </Col>
              </Row>
              <Divider style={{ backgroundColor: '#e2bead9a', width: '0%', margin: '1%' }} />
              <Row style={{
                borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
              }}
              >
                <Col span={20}>
                  <Paragraph style={{ color: 'black' }}>
                    {
                      obj.links.map((objLink, index) => (
                        <div>
                          <p>
                            { `Link ${index + 1} : `}
                            <a href={`${objLink}`} style={{ color: 'black', textDecoration: 'underline', textDecorationColor: 'black' }}>
                              { `${objLink.slice(0, 32)}`}
                            </a>
                          </p>
                        </div>
                      ))
                    }
                  </Paragraph>
                </Col>
              </Row>
            </div>
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
