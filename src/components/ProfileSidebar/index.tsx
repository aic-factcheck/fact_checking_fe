/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import {
  Tab, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import EditProfile from '../EditProfile';
import MyArticles from '../MyArticles';
import MyClaims from '../MyClaims';
import Scoreboard from '../Scoreboard';
import UserReviews from '../UserReviews';
import Invitation from '../Invitation';

const { Content } = Layout;

interface Props {
  userid: string,
}

const ProfileSidebar: React.FC<Props> = ({ userid }) => {
  const { t } = useTranslation();
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia('(orientation: portrait)').matches,
  );

  const handleResize = () => {
    setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Content
      style={{
        padding: '0%', borderRadius: '10px', minHeight: '100vh', marginTop: '2%', margin: '2%',
      }}
    >
      <Tab.Container
        defaultActiveKey="1st"
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={isPortrait ? 24 : 6} xl={isPortrait ? 24 : 6} xxl={isPortrait ? 24 : 6}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="1st" className="whites">{t('score')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2nd" className="whites">{t('edit_profile')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3rd" className="whites myArticlesProfile">{t('my_articles')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="4th" className="whites myClaimsProfile">{t('my_claims')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="5th" className="whites myReviewsProfile">{t('my_reviews')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="6th" className="whites invitationsProfile">{t('invite')}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={24} sm={24} md={24} lg={isPortrait ? 24 : 17} xl={isPortrait ? 24 : 17} xxl={isPortrait ? 24 : 17}>
            <Row className="justify-content-center">
              <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22} style={{ paddingLeft: '0' }}>
                <Tab.Content>
                  <Tab.Pane eventKey="1st">
                    <Scoreboard />
                  </Tab.Pane>
                  <Tab.Pane eventKey="2nd">
                    <EditProfile />
                  </Tab.Pane>
                  <Tab.Pane eventKey="3rd">
                    <MyArticles />
                  </Tab.Pane>
                  <Tab.Pane eventKey="4th">
                    <MyClaims />
                  </Tab.Pane>
                  <Tab.Pane eventKey="5th">
                    <UserReviews userid={userid} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="6th">
                    <Invitation />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Col>
        </Row>
      </Tab.Container>
    </Content>
  );
};

export default ProfileSidebar;
