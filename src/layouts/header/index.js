import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useRecoilValue } from 'recoil';
import authAtom from '../../_state/auth';
import { authRoutes, nonAuthRoutes } from './routes';

const { Header } = Layout;

export default function CustomHeader() {
  const auth = useRecoilValue(authAtom);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (auth) {
      setMenuItems(authRoutes);
    } else {
      setMenuItems(nonAuthRoutes);
    }
  }, [auth]);

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
