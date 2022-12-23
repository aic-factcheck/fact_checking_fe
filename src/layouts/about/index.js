import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Row, Col, Layout,
} from 'antd';
import authAtom from '../../_state/auth';
import MyTitle from '../../components/MyTitle';

const { Content } = Layout;

export default function About() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
  }, [auth, navigate]);

  return (
    <Content className="content" style={{ padding: '25px 25px', marginTop: 20 }}>
      <MyTitle headline="About Fact-Check" fontcolor="#d86e3d9a" />
      <div>
        <p>
          We - creators of Fact-Check, believe that decisions we make should be made independently,
          without leaning to any particular political party, country, religion, etc. That is why
          we created this web - to gather information from people and let our custom AI program
          decide. Our program uses advanced technologies to extract data from the internet and
          help you make unbiased decisions. We are currently trying to gather data from users
          and this data will be used in our AI.
        </p>
        <Row>
          <Col span="auto">
            <Row>
              <MyTitle headline="Article" fontcolor="#d86e3d9a" />
            </Row>
            <Row>
              Article is any text you found on web. Fill the form and your article will be saved
              and displayed on &apos;Articles&apos; page. You can edit the article even after
              submitting in your profile section.
              <p />
              <img alt src='../' />
            </Row>
          </Col>
          <Col span="auto">
            <Row>
              <MyTitle headline="Claim" fontcolor="#d86e3d9a" />
            </Row>
            <Row>
              Claim is a part of article, which you are not sure whether it is true. You
              can add claim right after submitting your article. You can also add claims
              to articles added by other users. Just click on &apos;Articles&apos;, find
              article and click on the article title. You will see the whole article with
              all claims associated to the article. Click on &apos;Add claim&apos; and
              add claim that you are curious about.
              <p />
            </Row>
          </Col>
          <Col span="auto">
            <Row>
              <MyTitle headline="Review" fontcolor="#d86e3d9a" />
            </Row>
            <Row>
              Review is a review associated to particular claim. As a user, you can only
              add one review to one claim. You can look for any claim in &apos;Claims&apos;
              section and submit your opinion. Your opinion should be based on data, so
              do not forget to add links in form.
              <p />
            </Row>
          </Col>
        </Row>
      </div>
    </Content>
  );
}
