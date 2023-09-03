import React, { useEffect, useState } from 'react';
import {
  Layout, Col, Divider, Row, Typography, Card, Avatar,
} from 'antd';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import Claim from '../../components/claim';
import { IClaim } from '../../common/types';
import claimsService from '../../api/claims.service';
import TabExample from '../../components/TabExample';
import CreateArticleTutorial from '../../components/Tutorial/addarticle';
import CreateClaimTutorial from '../../components/Tutorial/addclaim';
import AddReviewTutorial from '../../components/Tutorial/addreview';

const { Title } = Typography;
const { Content } = Layout;

const LadingPage: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [claimsList, setClaimsList] = useState<IClaim[]>([]);

  useEffect(() => {
    claimsService.getClaimsList(1, 'MONTH', 'POSITIVE_VOTES_DESC')
      .then((res: any) => setClaimsList(res.data)).catch();
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
          style={{
            margin: '0px',
            zIndex: 5,
            backgroundColor: '#d86e3d',
            minHeight: '67vh',
          }}
          align="middle"
          justify="space-around"
        >
          <Col xs={22} sm={22} md={22} lg={8} xl={8} xxl={8} style={{ height: '80%', margin: '3%' }}>
            <div
              style={{
                background: 'white',
                padding: '5%',
                paddingTop: '10%',
                paddingBottom: '10%',
                textAlign: 'center',
                borderRadius: '10px',
                margin: 'auto',
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
          <Col xs={22} sm={22} md={22} lg={12} xl={12} xxl={12} style={{ height: '100%', margin: '0%' }}>
            <Carousel
              indicators={false}
              controls
              variant="dark"
              interval={4000}
              style={{
                margin: 'auto',
                height: '100%',
                textAlign: 'center',
              }}
            >
              {
                claimsList.length > 0 ? (claimsList?.map((obj: IClaim, index: number) => (
                  <Carousel.Item
                    key={obj?._id}
                    style={{
                      padding: '12%',
                      height: '60%',
                    }}
                  >
                    <Claim
                      isEditable={false}
                      claim={obj}
                      index={index}
                    />
                  </Carousel.Item>
                ))) : (
                  <div className="emptyList">
                    {' '}
                  </div>
                )
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
                  <h6 style={{ marginRight: '1%', display: 'inline' }}> 1.) </h6>
                  {t('article_explain')}
                </p>
              </Col>
            </Row>
            <Row>
              <TabExample element={<CreateArticleTutorial />} />
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
                  <h6 style={{ marginRight: '1%', display: 'inline' }}> 2.) </h6>
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
            <Row>
              <TabExample element={<CreateClaimTutorial />} />
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
                  <h6 style={{ marginRight: '1%', display: 'inline' }}> 3.) </h6>
                  {t('review_explain')}
                </p>
              </Col>
            </Row>
            <Row>
              <TabExample element={<AddReviewTutorial />} />
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
                      src={`${process.env.PUBLIC_URL}/pictures/team/roman_butora.png`}
                    />
                  )}
                >
                  <Card.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Ing. Roman Bútora"
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
              <Col offset={1} md={6} sm={18}>
                <Card
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
};

export default LadingPage;
