import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row, Col, Typography, Divider, List,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import authAtom from '../../_state/auth';
import Review from '../Review';

const { Paragraph } = Typography;

export default function Reviews({
  claim, updated,
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
      }).catch(console.log(''));
    }
  }, [auth, navigate, updated]);

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
      <Divider style={{ backgroundColor: 'white', width: '0%' }} />
      <List
        style={{
          padding: '0%',
        }}
      >
        {
          // _id, priority, addedBy, articleId, text
          reviewsList.map((obj) => (
            <Review review={obj} />
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
  updated: PropTypes.func.isRequired,
};

Reviews.defaultProps = {
};
