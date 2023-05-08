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

const { Content } = Layout;

const ProfileSidebar: React.FC = () => {
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
