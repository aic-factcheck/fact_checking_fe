import React from 'react';
import { Layout } from 'antd';
import {
  Tab, Row, Col, Nav,
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
          <Col sm={2}>
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
          <Col sm={9} xl={9} style={{ marginLeft: '1%' }}>
            <Row className="justify-content-center">
              <Col sm={9} xl={8} style={{ paddingLeft: '0' }}>
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
