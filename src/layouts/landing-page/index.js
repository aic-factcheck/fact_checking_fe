import React, { useEffect, useState } from 'react';
import {
  Layout, Col, Divider, Row, Typography, Card, Button, Avatar,
} from 'antd';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import useFetchWrapper from '../../_helpers/fetch_wrapper';

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
              interval={3000}
              style={{
                padding: '15px 11% 0 11%',
                height: '90%',
              }}
            >
              <Card
                style={{
                  width: '100%',
                  minHeight: '250px',
                }}
              >
                <h2>
                  {obj.text}
                </h2>
                <Divider />
                <p>
                  {obj.addedBy.firstName}
                </p>
                <Divider />
                <Row>
                  <Col span={8} offset={2}>
                    <Button type="primary">
                      Show reviews
                    </Button>
                  </Col>
                  <Col span={8} offset={4}>
                    <Button type="primary">
                      Add review
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Carousel.Item>
          )));
        })
        .catch();
    }
  }, [auth, navigate, fetchWrapper]);

  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/pictures/orange-wave-bg.svg`}
        alt="background"
        style={{
          position: 'absolute',
          minHeight: '920px',
          left: 0,
          top: 0,
          zIndex: 1,
        }}
      />
      <Layout
        style={{
          backgroundColor: 'white',
          minHeight: 'calc(100% - 48px)',
          padding: '24px 24px 24px 24px',
          height: '100%',
        }}
      >
        <Row
          gutter={16}
          style={{
            margin: '40px',
            zIndex: 5,
          }}
        >
          <Col className="gutter-row" md={10} sm={24}>
            <div
              style={{
                background: 'white',
                padding: '90px 24px 90px 24px',
                textAlign: 'center',
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
              style={{
                margin: 0,
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
          }}
        >
          <div
            style={{
              margin: '50px 100px 0px 100px',
            }}
          >
            <Row
              style={{
                height: '150px',
              }}
            >
              <Col offset={2} span={4}>
                <img
                  src={`${process.env.PUBLIC_URL}/pictures/article_design.jpg`}
                  alt="article"
                  style={{
                    width: '80%',
                    maxWidth: '200px',
                  }}
                />
              </Col>
              <Col offset={2} span={16}>
                <Title level={2}>Article</Title>
                <p>
                  Article is any text you found on web. Fill the form and your article will be saved
                  and displayed on &apos;Articles&apos; page. You can edit the article even after
                  submitting in your profile section.
                </p>
              </Col>
            </Row>
            <Divider />
            <Row
              style={{
                height: '150px',
              }}
            >
              <Col
                offset={2}
                span={16}
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
              <Col offset={2} span={4}>
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
            <Row
              style={{
                height: '150px',
              }}
            >
              <Col offset={2} span={4}>
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
                offset={2}
                span={16}
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
            style={{
              margin: '50px 100px 0px 100px',
            }}
          >
            <Row
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Title level={1}>Our mission</Title>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a book.
                It has survived not only five centuries, but also the leap into typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more recently publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Row>
            <Divider />

            <Row>
              <Title level={1}>Our team</Title>
            </Row>
            <Row
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Col md={4} sm={18}>
                <Card
                  style={{ width: 300 }}
                  cover={(
                    <img
                      style={{ width: 'auto', height: '180px', margin: 'auto' }}
                      alt="example"
                      src="https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/65644073_2359225074137529_2376627437506134016_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=kGPRba322-gAX91-poM&_nc_ht=scontent-vie1-1.xx&oh=00_AfAaLnJjm0PmYrqP-pW7v7cIBMnTn5F3skekxC2iQkOL4g&oe=63CB0B83"
                    />
                  )}
                >
                  <Card.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Roman Bútora"
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
                      src="https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/236010137_5083716218322104_3918665992526365160_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RlcoQioepIkAX9Z82Ff&_nc_ht=scontent-vie1-1.xx&oh=00_AfBvmrPi1RliHjtJ1yKn3NvVbshrOA4IVPpzaDA1Jy1cTQ&oe=63A82ABD"
                    />
                  )}
                >
                  <Card.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Rastislav Kopál"
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
                      src="https://cs.felk.cvut.cz/upload/persons/8141cd3ca5208fc07fdae8a34e2e5fbb09c0842e.jpg"
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
      <div style={{ display: 'none' }}>
        <a href="http://www.freepik.com">Designed by vectorjuice / Freepik</a>
        <a href="https://www.freepik.com/free-vector/organic-flat-feedback-concept-illustrated_13862360.htm#query=review%20design&position=18&from_view=search&track=sph">Freepik</a>
        <a href="https://www.freepik.com/free-vector/person-watching-through-magnifying-glass-daily-news-feed-hands-holding-mobile-phone-lens-flat-vector-illustration-announcement-event-concept-banner-website-design-landing-web-page_27573151.htm#query=hoax%20design&position=0&from_view=search&track=sph">pch.vector</a>
      </div>
    </div>
  );
}
