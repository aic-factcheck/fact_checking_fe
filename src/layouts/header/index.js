import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import { authRoutes, nonAuthRoutes } from './routes';
import { } from 'flag-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import authAtom from '../../_state/auth';

export default function CustomHeader() {
  const auth = useRecoilValue(authAtom);
  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
  }, [auth]);

  const navItems = (auth)
    ? (
      <Container fluid width="100%" style={{ zIndex: 9999 }}>
        <Dropdown style={{ background: 'none', border: '0px solid red' }}>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" style={{ background: 'none', border: '0px' }}>
            <Button className="rounded-circle" size="sm" style={{ background: 'white', border: '0px' }}>
              <img
                src={`${process.env.PUBLIC_URL}/user.svg`}
                alt="user"
                style={{ paddingLeft: '0%' }}
                width="30px"
              />
            </Button>
          </Dropdown.Toggle>

          <Dropdown.Menu variant="light">
            <Dropdown.Item href="/profile">
              <UserOutlined />
              {'     '}
              {t('profile')}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/logout">
              <LogoutOutlined />
              {'     '}
              {t('logout')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Navbar.Brand href="/" style={{ color: 'white' }}>
          Fact Check
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/claims" active={location.pathname === '/claims'} style={{ color: 'white' }}>{t('claims')}</Nav.Link>
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/articles" active={location.pathname === '/articles'} style={{ color: 'white' }}>{t('articles')}</Nav.Link>
            </Nav>
          </Nav>
          <Nav activeKey={location.pathname} style={{ float: 'left' }}>
            <Nav.Item style={{ color: 'white' }}>
              <Button
                onClick={() => i18next.changeLanguage('en')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex', paddingLeft: '0px',
                }}
              >
                <span className="fi fi-gb" style={{ whiteSpace: 'no-wrap' }} />
              </Button>
              <Button
                onClick={() => i18next.changeLanguage('cz')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex',
                }}
              >
                <span className="fi fi-cz" style={{ whiteSpace: 'no-wrap' }} />
              </Button>
              <Button
                onClick={() => i18next.changeLanguage('sk')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex',
                }}
              >
                <span className="fi fi-sk" style={{ whiteSpace: 'no-wrap' }} />
              </Button>
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Container>
    ) : (
      <Container fluid width="100%" style={{ zIndex: 9999, margin: '0px' }}>
        <Navbar.Brand href="/" style={{ color: 'white' }}>
          Fact Check
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
                <span className="fi fi-gb" style={{ whiteSpace: 'no-wrap' }} />
              </Button>
              <Button
                onClick={() => i18next.changeLanguage('cz')}
                style={{
                  background: 'none', border: 'none', alignItems: 'flex-end', display: 'inline-flex',
                }}
              >
                <span className="fi fi-cz" style={{ whiteSpace: 'no-wrap' }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    );

  return (
    <Navbar
      width="100%"
      collapseOnSelect
      expand="md"
      style={{
        backgroundColor: '#d86e3d', fontWeight: 'bold', color: 'white', fontSize: 'medium',
      }}
    >
      {navItems}
    </Navbar>
  );
}
