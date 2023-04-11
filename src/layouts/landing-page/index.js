import React, { useEffect, useState } from 'react';
import {
  Layout, Col, Divider, Row, Typography, Card, Avatar,
} from 'antd';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import useUserActions from '../../_actions/user.actions';
import Claim from '../../components/claim';

const { Title } = Typography;
const { Content } = Layout;

export default function LadingPage() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const userActions = useUserActions();
  const { t } = useTranslation();
  const [claimsList, setClaimsList] = useState([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    if (id) {
      userActions.getClaims(setClaimsList);
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
          }}
        >
          <Col className="gutter-row" md={10} sm={24}>
            <div
              style={{
                background: 'white',
                padding: '24px 24px 24px 24px',
                textAlign: 'center',
                borderRadius: '10px',
                margin: '3%',
              }}
            >
              <Title level={1}>
                {t('lets_make_world_better')}
              </Title>
              <Title level={5}>
                {t('lets_make_additional')}
              </Title>
            </div>
          </Col>
          <Col className="gutter-row" md={14} sm={24}>
            <Carousel
              autoPlay
              variant="dark"
              interval={4000}
              style={{
                margin: '3%',
                height: '100%',
                textAlign: 'center',
              }}
            >
              {
                claimsList?.slice(0, 8).map((obj) => (
                  <Carousel.Item
                    key={obj._id}
                    style={{
                      padding: '15px 11% 0 11%',
                      height: '90%',
                    }}
                  >
                    <Claim
                      isEditable={false}
                      claim={obj}
                      style={{
                        width: '100%',
                        minHeight: '250px',
                      }}
                    />
                  </Carousel.Item>
                ))
              }
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
            <Row
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Title level={1}>{t('mission')}</Title>
              <p>
                {t('mission_explain')}
              </p>
            </Row>
            <Divider />
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
                <Title level={2}>{t('articles')}</Title>
                <p>
                  {t('article_explain')}
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
                <Title level={2}>{t('claims')}</Title>
                <p>
                  {t('claim_explain')}
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
                <Title level={2}>{t('reviews')}</Title>
                <p>
                  {t('review_explain')}
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
              <Title level={1}>{t('our_team')}</Title>
            </Row>
            <Row
              style={{
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Col offset={1} md={6} sm={18}>
                <Card
                  cover={(
                    <img
                      style={{ width: 'auto', height: '180px', margin: 'auto' }}
                      alt="example"
                      src={`${process.env.PUBLIC_URL}/pictures/romaan.png`}
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
              <Col offset={1} md={6} sm={18}>
                <Card
                  cover={(
                    <img
                      style={{ width: 'auto', height: '180px', margin: 'auto' }}
                      alt="example"
                      src={`${process.env.PUBLIC_URL}/pictures/rastooo.png`}
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
              <Col offset={1} md={6} sm={18}>
                <Card
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
