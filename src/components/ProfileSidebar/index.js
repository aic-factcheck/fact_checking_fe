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

export default function ProfileSidebar() {
  const { t } = useTranslation();

  return (
    <Content
      className="site-layout"
      style={{
        padding: '0%', borderRadius: '10px', minHeight: '100vh', marginTop: '2%', margin: '2%',
      }}
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="1st" style={{ paddingLeft: '0' }}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="1st" className="whites">{t('score')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2nd" className="whites">{t('edit_profile')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3rd" className="whites">{t('my_articles')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="4th" className="whites">{t('my_claims')}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} style={{ paddingLeft: '0' }}>
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
      </Tab.Container>
    </Content>
  );
}
