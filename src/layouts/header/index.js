import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import { authRoutes, nonAuthRoutes } from './routes';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CgProfile } from 'react-icons/cg';

import authAtom from '../../_state/auth';

export default function CustomHeader() {
  const auth = useRecoilValue(authAtom);

  const location = useLocation();
  useEffect(() => {
  }, [auth]);

  const navItems = (auth)
    ? (
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'} style={{ color: 'white' }}>Home</Nav.Link>
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/articles" active={location.pathname === '/articles'} style={{ color: 'white' }}>Articles</Nav.Link>
            </Nav>
            <Nav.Link as={Link} to="/article/create" active={location.pathname === '/article/create'} style={{ color: 'white' }}>Add article</Nav.Link>
          </Nav>
          <Nav activeKey={location.pathname}>
            <Nav.Link as={Link} to="/profile" active={location.pathname === '/profile'} style={{ color: 'white' }}>
              <CgProfile />
            </Nav.Link>
            <Nav.Link as={Link} to="/logout" active={location.pathname === '/logout'} style={{ color: 'white' }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    ) : (
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'} style={{ color: 'white' }}>Home</Nav.Link>
          </Nav>
          <Nav activeKey={location.pathname}>
            <Nav.Link as={Link} active={location.pathname === '/sign-in'} to="/sign-in" style={{ color: 'white' }}>Sign In</Nav.Link>
            <Nav.Link as={Link} active={location.pathname === '/sign-up'} to="/sign-up" style={{ color: 'white' }}>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    );

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#00887A', fontWeight: 'bold' }}>
      {navItems}
    </Navbar>
  );
}
