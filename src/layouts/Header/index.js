import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function CustomHeader() {
  const menuItems = [
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
  ];

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
