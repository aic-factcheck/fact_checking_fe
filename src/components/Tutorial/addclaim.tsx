import React from 'react';
import {
  Carousel,
} from 'antd';

const contentStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CreateClaimTutorial : React.FC = () => (
  <Carousel dotPosition="bottom">
    <div>
      <div style={contentStyle}>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/pictures/tutorial/add_article_3.png`}
          width="100%"
          height="fit-content"
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/pictures/tutorial/add_claim_1.png`}
          width="100%"
          height="fit-content"
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/pictures/tutorial/add_claim_2.png`}
          width="100%"
          height="fit-content"
        />
      </div>
    </div>
  </Carousel>
);

export default CreateClaimTutorial;
