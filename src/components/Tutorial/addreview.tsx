/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { } from 'react';
import {
  Carousel,
} from 'antd';

const contentStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const AddReviewTutorial: React.FC = () => (
  <Carousel dotPosition="bottom" autoplay>
    <div>
      <div style={contentStyle}>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/pictures/tutorial/add_review_1.png`}
          width="100%"
          height="fit-content"
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/pictures/tutorial/add_review_2.png`}
          width="100%"
          height="fit-content"
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/pictures/tutorial/add_review_3.png`}
          width="100%"
          height="fit-content"
        />
      </div>
    </div>
  </Carousel>
);

export default AddReviewTutorial;
