import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// eslint-disable-next-line import/no-absolute-path
import '/node_modules/flag-icons/css/flag-icons.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {
  Col, Row,
} from 'antd';
import authAtom from '../../_state/auth';

const CustomHeader : React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = (auth?.user?.email !== undefined)
    ? (
      <Container fluid style={{ zIndex: 1 }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand className="mx-auto" style={{ color: 'white', margin: '0px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/pictures/image44.png`}
              width="120"
              height="32"
              className="d-inline-block align-top"
            />
            {' '}
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav" style={{ paddingRight: '10px' }}>
          <Nav className="me-auto" activeKey={location.pathname}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Nav.Link as={Link} to="/claims" active={location.pathname === '/claims'} style={{ color: 'white', fontWeight: '500' }}>{t('claims')}</Nav.Link>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Nav className="me-auto" activeKey={location.pathname}>
                <Nav.Link as={Link} to="/articles" active={location.pathname === '/articles'} style={{ color: 'white', fontWeight: '500' }}>{t('articles')}</Nav.Link>
              </Nav>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Nav.Link as={Link} to="/profile" active={location.pathname === '/claims'} style={{ color: 'white', fontWeight: '500' }}>{t('scoreboard')}</Nav.Link>
            </Link>
          </Nav>
          <Nav activeKey={location.pathname} style={{ float: 'left' }}>
            <Nav.Item style={{ color: 'white' }}>
              <Button
                onClick={() => i18next.changeLanguage('en')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex', paddingLeft: '0px',
                }}
              >
                <span className="fi fi-gb" style={{ whiteSpace: 'nowrap' }} />
              </Button>
              <Button
                onClick={() => i18next.changeLanguage('cz')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex',
                }}
              >
                <span className="fi fi-cz" style={{ whiteSpace: 'nowrap' }} />
              </Button>
              <Button
                onClick={() => i18next.changeLanguage('sk')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex',
                }}
              >
                <span className="fi fi-sk" style={{ whiteSpace: 'nowrap' }} />
              </Button>
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Container>
    ) : (
      <Container fluid style={{ zIndex: 1 }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand className="mx-auto" style={{ color: 'white', margin: '0px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/pictures/image44.png`}
              width="120"
              height="32"
              className="d-inline-block align-top"
            />
            {' '}
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            {' '}
          </Nav>
          <Nav activeKey={location.pathname}>
            <Nav.Item style={{ color: 'white' }}>
              <Button
                onClick={() => i18next.changeLanguage('en')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex', paddingLeft: '0px',
                }}
              >
                <span className="fi fi-gb" style={{ whiteSpace: 'nowrap' }} />
              </Button>
              <Button
                onClick={() => i18next.changeLanguage('cz')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex',
                }}
              >
                <span className="fi fi-cz" style={{ whiteSpace: 'nowrap' }} />
              </Button>
              <Button
                onClick={() => i18next.changeLanguage('sk')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex',
                }}
              >
                <span className="fi fi-sk" style={{ whiteSpace: 'nowrap' }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    );

  const profileIsLoggedIn = (auth?.user?.email !== undefined)
    ? (
      <Dropdown style={{
        background: 'none', border: '0px solid red', backgroundColor: 'none', position: 'sticky', zIndex: '7',
      }}
      >
        <DropdownButton
          id="dropdown-button-dark-example1"
          variant="link"
          style={{
            background: 'none', border: '0px', backgroundColor: 'none', color: 'white',
          }}
          title={(
            <Button className="rounded-circle" size="sm" style={{ background: 'white', border: '0px' }}>
              <img
                src={`${process.env.PUBLIC_URL}/user.svg`}
                alt="user"
                style={{ paddingLeft: '0%' }}
                width="28px"
              />
            </Button>
)}
          align="end"
        >
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Dropdown.Item href="/profile">
              <UserOutlined />
              {'     '}
              {t('profile')}
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Link to="/logout" style={{ textDecoration: 'none' }}>
            <Dropdown.Item href="/logout">
              <LogoutOutlined />
              {'     '}
              {t('logout')}
            </Dropdown.Item>
          </Link>
        </DropdownButton>
      </Dropdown>
    ) : (
      <Dropdown style={{
        background: 'none', border: '0px solid red', backgroundColor: 'none', position: 'sticky', zIndex: '7',
      }}
      >
        <DropdownButton
          id="dropdown-button-dark-example1"
          variant="link"
          style={{
            background: 'none', border: '0px', backgroundColor: 'none', color: 'white',
          }}
          title={(
            <Button className="rounded-circle" size="sm" style={{ background: 'white', border: '0px' }}>
              <img
                src={`${process.env.PUBLIC_URL}/user.svg`}
                alt="user"
                style={{ paddingLeft: '0%' }}
                width="28px"
              />
            </Button>
)}
          align="end"
        >
          <Link to="/sign-in" style={{ textDecoration: 'none' }}>
            <Dropdown.Item href="/sign-in">
              <UserOutlined />
              {'     '}
              {t('sign_in')}
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Link to="/sign-up" style={{ textDecoration: 'none' }}>
            <Dropdown.Item href="/sign-up">
              <LogoutOutlined />
              {'     '}
              {t('sign_up')}
            </Dropdown.Item>
          </Link>
        </DropdownButton>
      </Dropdown>
    );

  return (
    <Row style={{ width: '100%', background: '#d86e3d' }}>
      <Col xs={20} sm={21} md={21} lg={22} xl={22} xxl={23}>
        <Navbar
          collapseOnSelect
          expand="md"
          style={{
            backgroundColor: '#d86e3d', fontWeight: 'bold', color: 'white', fontSize: 'medium', width: '100%',
          }}
        >
          {navItems}
        </Navbar>
      </Col>
      <Col xs={4} sm={3} md={3} lg={2} xl={2} xxl={1}>
        {profileIsLoggedIn}
      </Col>
    </Row>
  );
};

export default CustomHeader;
