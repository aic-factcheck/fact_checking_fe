import React from 'react';
import { Layout } from 'antd';
import {
  Tab, Row, Col, Nav,
} from 'react-bootstrap';
import EditProfile from '../EditProfile';
import MyArticles from '../MyArticles';
import MyClaims from '../MyClaims';

const { Content } = Layout;

export default function ProfileSidebar() {
  return (
    <Content
      className="site-layout"
      style={{
        padding: '1%', borderRadius: '10px', minHeight: '100vh', marginTop: '2%', margin: '4%',
      }}
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="1st">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="1st" className="whites">Edit profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2nd" className="whites">My articles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3rd" className="whites">My claims</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="4th" className="whites">Send invitation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="5th" className="whites">My statistics</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} style={{ paddingLeft: '0' }}>
            <Tab.Content>
              <Tab.Pane eventKey="1st">
                <EditProfile />
              </Tab.Pane>
              <Tab.Pane eventKey="2nd">
                <MyArticles />
              </Tab.Pane>
              <Tab.Pane eventKey="3rd">
                <MyClaims />
              </Tab.Pane>
              <Tab.Pane eventKey="4th">
                <p> 4 </p>
              </Tab.Pane>
              <Tab.Pane eventKey="5th">
                <p> 5 </p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Content>
  );
}
