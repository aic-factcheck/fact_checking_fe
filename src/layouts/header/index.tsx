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
import Offcanvas from 'react-bootstrap/Offcanvas';
import authAtom from '../../_state/auth';

const CustomHeader : React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const { t } = useTranslation();
  const location = useLocation();
  const expand = 'md';

  const navItems = (auth?.user?.email !== undefined)
    ? (
      <Container fluid style={{ zIndex: 1, margin: '0px' }}>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
        <Navbar.Offcanvas
          style={{ paddingRight: '10px', backgroundColor: '#d86e3d' }}
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <img
                  alt=""
                  src={`${process.env.PUBLIC_URL}/pictures/image44.png`}
                  style={{ width: '70%', maxHeight: '20%' }}
                />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto" activeKey={location.pathname}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Nav.Link as={Link} to="/claims" id="claimsLink" active={location.pathname === '/claims'} style={{ color: 'white', fontWeight: '500' }}>{t('claims')}</Nav.Link>
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Nav className="me-auto" activeKey={location.pathname}>
                  <Nav.Link as={Link} to="/articles" id="articlesLink" active={location.pathname === '/articles'} style={{ color: 'white', fontWeight: '500' }}>{t('articles')}</Nav.Link>
                </Nav>
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Nav.Link as={Link} to="/profile" id="profileLink" active={location.pathname === '/claims'} style={{ color: 'white', fontWeight: '500' }}>{t('scoreboard')}</Nav.Link>
              </Link>
            </Nav>
            <Nav activeKey={location.pathname} style={{ float: 'left' }}>
              <Nav.Item style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
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
          </Offcanvas.Body>
        </Navbar.Offcanvas>
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
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <img
                  alt=""
                  src={`${process.env.PUBLIC_URL}/pictures/image44.png`}
                  style={{ width: '70%', maxHeight: '20%' }}
                />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    );

  const profileIsLoggedIn = (auth?.user?.email !== undefined)
    ? (
      <Dropdown
        style={{
          background: 'none', border: '0px solid red', backgroundColor: 'none', position: 'sticky', zIndex: '7',
        }}
      >
        <DropdownButton
          id="dropDownUserMenu"
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
            <Dropdown.Item href="/profile" id="dropDownItemProfile">
              <UserOutlined />
              {'     '}
              {t('profile')}
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Link to="/logout" style={{ textDecoration: 'none' }}>
            <Dropdown.Item href="/logout" id="dropDownItemLogout">
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
    <Row style={{ width: '100%', background: '#d86e3d', marginBottom: '0px' }}>
      <Col xs={20} sm={21} md={21} lg={22} xl={22} xxl={23} style={{ marginBottom: '0px' }}>
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary"
          style={{
            backgroundColor: '#d86e3d', fontWeight: 'bold', color: 'white', fontSize: 'medium', width: '100%', marginBottom: '0px',
          }}
        >
          {navItems}
        </Navbar>
      </Col>
      <Col xs={4} sm={3} md={3} lg={2} xl={2} xxl={1} style={{ marginBottom: '0px', paddingRight: '2%' }}>
        {profileIsLoggedIn}
      </Col>
    </Row>
  );
};

export default CustomHeader;
