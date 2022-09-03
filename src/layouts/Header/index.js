import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import useUserActions from '../../_actions/user.actions';

const { Header } = Layout;

export default function CustomHeader() {
  const auth = useRecoilValue(authAtom);
  const [menuItems, setMenuItems] = useState([]);

  const userActions = useUserActions();

  useEffect(() => {
    if (auth) {
      setMenuItems([{
        name: 'Home',
        link: '/',
        navKey: 1,
        disabled: false,
      }, {
        name: 'Logout',
        link: '/logout',
        navKey: 4,
        disabled: false,
      }]);
    } else {
      setMenuItems([
        {
          name: 'Home',
          link: '/',
          navKey: 1,
          disabled: false,
        },
        {
          name: 'Sign in',
          link: '/sign-in',
          navKey: 2,
          disabled: false,
        },
        {
          name: 'Sign up',
          link: '/sign-up',
          navKey: 3,
          disabled: false,
        },
      ]);
    }
  }, [auth, userActions]);

  const location = useLocation();

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.link}>
            <Link to={item.link}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
}
