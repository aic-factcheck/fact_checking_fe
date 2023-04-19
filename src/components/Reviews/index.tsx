import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row, Col, Typography, Divider, List,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import Review from '../Review';
import { IClaim } from '../../common/types';
import reviewsService from '../../api/reviews.service';

const { Paragraph } = Typography;

interface Props {
  claim: IClaim,
  updated: () => void,
  indexClaim: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Reviews : React.FC<Props> = ({ claim, updated, indexClaim }) => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token === undefined) {
      navigate('/sign-in');
    }
    const id = auth?.user.id;
    const articleid = claim?.article._id;
    const claimid = claim?._id;
    if (id !== undefined) {
      reviewsService.getReviews(articleid, claimid).then((res: any) => {
        // const reviews = res.filter((el) => claimid === el?.claimId);
        setReviewsList(res.data);
      }).catch();
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
          reviewsList.length > 0 ? (reviewsList.map((obj) => (
            <Review review={obj} />
          ))) : (
            <div className="emptyList">
              {t('no_reviews_yet')}
            </div>
          )
        }
      </List>
    </div>
  );
};

export default Reviews;
