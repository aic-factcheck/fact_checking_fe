/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Divider, List,
} from 'antd';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import UserReview from '../UserReview';
import { IReview } from '../../common/types';
import reviewsService from '../../api/reviews.service';
import myReviews from '../../_state/usersReviews';
import reviewsLoaded from '../../_state/reviewsLoaded';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyReviews = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [myReviewsList, setMyReviewsList] = useRecoilState(myReviews);
  const [loaded, setReviewsLoaded] = useRecoilState(reviewsLoaded);
  const userid = auth?.user?._id;

  useEffect(() => {
    // redirect to home if already logged in
    if (loaded === false && userid !== undefined) {
      reviewsService.userReviews(userid).then((res: any) => {
        // const reviews = res.filter((el) => claimid === el?.claimId);
        setMyReviewsList(res.data);
        setReviewsLoaded(true);
      }).catch();
    }
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
          myReviewsList.length > 0 ? (
            myReviewsList?.map((obj : IReview, index: number) => (
              <UserReview review={obj} indexReview={index} />
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

export default MyReviews;
