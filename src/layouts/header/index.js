import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import { authRoutes, nonAuthRoutes } from './routes';
import { } from 'flag-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CgProfile } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Button } from 'antd';
import authAtom from '../../_state/auth';

export default function CustomHeader() {
  const auth = useRecoilValue(authAtom);
  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
  }, [auth]);

  const navItems = (auth)
    ? (
      <Container className="menuContainer" style={{ zIndex: 9999 }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'} style={{ color: 'white' }}>{t('home')}</Nav.Link>
            <Nav.Link as={Link} to="/claims" active={location.pathname === '/claims'} style={{ color: 'white' }}>{t('claims')}</Nav.Link>
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/articles" active={location.pathname === '/articles'} style={{ color: 'white' }}>{t('articles')}</Nav.Link>
            </Nav>
            <Nav.Link as={Link} to="/article/create" active={location.pathname === '/article/create'} style={{ color: 'white' }}>{t('add')}</Nav.Link>
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
            <Nav.Link as={Link} to="/profile" active={location.pathname === '/profile'} style={{ color: 'white' }}>
              <CgProfile />
            </Nav.Link>
            <Nav.Link as={Link} to="/logout" active={location.pathname === '/logout'} style={{ color: 'white', paddingBottom: '0px' }}>
              {t('logout')}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    ) : (
      <Container className="menuContainer">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'} style={{ color: 'white' }}>{t('home')}</Nav.Link>
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
            <Nav.Link as={Link} active={location.pathname === '/sign-in'} to="/sign-in" style={{ color: 'white' }}>{t('sign_in')}</Nav.Link>
            <Nav.Link as={Link} active={location.pathname === '/sign-up'} to="/sign-up" style={{ color: 'white' }}>{t('sign_up')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    );

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#d86e3d', fontWeight: 'bold' }}>
      {navItems}
    </Navbar>
  );
}
