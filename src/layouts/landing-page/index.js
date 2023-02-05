import React, { useEffect, useState } from 'react';
import {
  Layout, Col, Divider, Row, Typography, Card, Avatar,
} from 'antd';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import Claim from '../../components/claim';

const { Title } = Typography;
const { Content } = Layout;

export default function LadingPage() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [sliderClaimsList, setSliderClaimsList] = useState([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/hot/claims`)
        .then((res) => {
          setSliderClaimsList(res.slice(0, 8).map((obj) => (
            <Carousel.Item
              key={obj._id}
              style={{
                padding: '15px 11% 0 11%',
                height: '90%',
              }}
            >
              <Claim
                claim={obj}
                style={{
                  width: '100%',
                  minHeight: '250px',
                }}
              />
            </Carousel.Item>
          )));
        })
        .catch();
    }
  }, [auth, navigate]);

  return (
    <div>
      <Layout
        style={{
          backgroundColor: 'white',
          minHeight: 'calc(100% - 48px)',
          padding: '0px 0px 24px 0px',
          height: '100%',
        }}
      >
        <Row
          gutter={24}
          style={{
            margin: '0px',
            zIndex: 5,
            backgroundColor: '#d86e3d',
            minHeight: '500px',
          }}
          align="middle"
        >
          <Col className="gutter-row" md={10} sm={24}>
            <div
              style={{
                background: 'white',
                padding: '24px 24px 24px 24px',
                textAlign: 'center',
                borderRadius: '10px',
                margin: 'auto',
                maxWidth: '500px',
              }}
            >
              <Title level={1}>
                Let&apos;s Make the World a Better Place
              </Title>
              <Title level={5}>
                With your help, we can try to avoid the spread of misinformation.
              </Title>
            </div>
          </Col>
          <Col className="gutter-row" md={14} sm={24}>
            <Carousel
              autoPlay
              variant="dark"
              interval={4000}
              style={{
                margin: 'auto',
                height: '100%',
                textAlign: 'center',
              }}
            >
              {sliderClaimsList}
            </Carousel>
          </Col>
        </Row>
        <Content
          style={{
            overflowX: 'hidden',
            overflowY: 'auto',
            margin: '5%',
          }}
        >
          <div
            className="contentLand"
          >
            <Row style={{ margin: '3%' }}>
              <Col offset={2} span={6}>
                <img
                  src={`${process.env.PUBLIC_URL}/pictures/article_design.jpg`}
                  alt="article"
                  style={{
                    width: '80%',
                    maxWidth: '200px',
                  }}
                />
              </Col>
              <Col offset={0} span={14}>
                <Title level={2}>Article</Title>
                <p>
                  Article is any text you found on web. Fill the form and your article will be saved
                  and displayed on &apos;Articles&apos; page. You can edit the article even after
                  submitting in your profile section.
                </p>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col
                offset={0}
                span={14}
                style={{
                  textAlign: 'center',
                }}
              >
                <Title level={2}>Claim</Title>
                <p>
                  Claim is a part of article, which you are not sure whether it is true. You
                  can add claim right after submitting your article. You can also add claims
                  to articles added by other users. Just click on &apos;Articles&apos;, find
                  article and click on the article title. You will see the whole article with
                  all claims associated to the article. Click on &apos;Add claim&apos; and
                  add claim that you are curious about.
                </p>
              </Col>
              <Col offset={2} span={6}>
                <img
                  src={`${process.env.PUBLIC_URL}/pictures/claim_design.jpg`}
                  alt="article"
                  style={{
                    width: '80%',
                    maxWidth: '200px',
                  }}
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col offset={2} span={6}>
                <img
                  src={`${process.env.PUBLIC_URL}/pictures/review_design.jpg`}
                  alt="article"
                  style={{
                    width: '80%',
                    maxWidth: '200px',
                    borderRadius: '50%',
                  }}
                />
              </Col>
              <Col
                offset={0}
                span={14}
              >
                <Title level={2}>Review</Title>
                <p>
                  Review is a review associated to particular claim. As a user, you can only
                  add one review to one claim. You can look for any claim in &apos;Claims&apos;
                  section and submit your opinion. Your opinion should be based on data, so
                  do not forget to add links in form.
                </p>
              </Col>
            </Row>
            <Divider />
          </div>

          {/* About us */}
          <div
            className="contentLand"
          >
            <Row
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Title level={1}>Our mission</Title>
              <p>
                We - creators of Fact-Check, believe that decisions we make should be made
                independently, without leaning to any particular political party, country,
                religion, etc. That is why we created this web - to gather information
                from people and let our custom AI program
                decide. Our program uses advanced technologies to extract data from the internet and
                help you make unbiased decisions. We are currently trying to gather data from users
                and this data will be used in our AI.
              </p>
            </Row>
            <Divider />

            <Row
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Title level={1}>Our team</Title>
            </Row>
            <Row
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Col offset={2} md={4} sm={18}>
                <Card
                  style={{ width: 300 }}
                  cover={(
                    <img
                      style={{ width: 'auto', height: '180px', margin: 'auto' }}
                      alt="example"
                      src={`${process.env.PUBLIC_URL}/pictures/team/roman_butora.png`}
                    />
                  )}
                >
                  <Card.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Bc. Roman Bútora"
                    description="Frontend developer"
                  />
                </Card>
              </Col>
              <Col offset={2} md={4} sm={18}>
                <Card
                  style={{ width: 300 }}
                  cover={(
                    <img
                      style={{ width: 'auto', height: '180px', margin: 'auto' }}
                      alt="example"
                      src={`${process.env.PUBLIC_URL}/pictures/team/rastislav_kopal.png`}
                    />
                  )}
                >
                  <Card.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Bc. Rastislav Kopál"
                    description="Backend developer"
                  />
                </Card>
              </Col>
              <Col offset={2} md={4} sm={18}>
                <Card
                  style={{ width: 300 }}
                  cover={(
                    <img
                      style={{ width: 'auto', height: '180px', margin: 'auto' }}
                      alt="example"
                      src={`${process.env.PUBLIC_URL}/pictures/team/jan_drchal.png`}
                    />
                  )}
                >
                  <Card.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Ing. Jan Drchal, Ph.D."
                    description="Researcher & Lecturer"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      {/* <img
        src={`${process.env.PUBLIC_URL}/pictures/bottom-wave-bg.svg`}
        alt="background"
        style={{
          position: 'sticky',
          left: 0,
          bottom: 0,
          width: '100%',
          zIndex: 1,
        }}
      /> */}
      <div style={{ display: 'none' }}>
        <a href="http://www.freepik.com">Designed by vectorjuice / Freepik</a>
        <a href="https://www.freepik.com/free-vector/organic-flat-feedback-concept-illustrated_13862360.htm#query=review%20design&position=18&from_view=search&track=sph">Freepik</a>
        <a href="https://www.freepik.com/free-vector/person-watching-through-magnifying-glass-daily-news-feed-hands-holding-mobile-phone-lens-flat-vector-illustration-announcement-event-concept-banner-website-design-landing-web-page_27573151.htm#query=hoax%20design&position=0&from_view=search&track=sph">pch.vector</a>
      </div>
    </div>
  );
}
