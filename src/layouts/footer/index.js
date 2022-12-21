import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default function CustomFooter() {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#d86e3d9a', zIndex: 9999 }}>Fact checking ©2022 Created by FEL CTU</Footer>
  );
}
