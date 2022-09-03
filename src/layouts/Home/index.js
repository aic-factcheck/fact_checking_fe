import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';

const { Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          Content
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
