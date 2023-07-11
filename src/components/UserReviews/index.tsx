/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Divider, List,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import UserReview from '../UserReview';
import { IUserReview } from '../../common/types';
import reviewsService from '../../api/reviews.service';

interface Props {
  userid: string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserReviews : React.FC<Props> = ({ userid }) => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [reviewsList, setReviewsList] = useState<IUserReview[]>([]);

  useEffect(() => {
    // redirect to home if already logged in

    reviewsService.userReviews(userid).then((res: any) => {
      // const reviews = res.filter((el) => claimid === el?.claimId);
      setReviewsList(res.data);
    }).catch();
  }, [auth, navigate]);

  return (
    <div>
      <Divider style={{ backgroundColor: 'white', width: '0%' }} />
      <List
        style={{
          padding: '0%',
        }}
      >
        {
          // _id, priority, author, articleId, text
          reviewsList.length > 0 ? (
            reviewsList.map((obj) => (
              <UserReview review={obj} />
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

export default UserReviews;
