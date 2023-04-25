import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter: React.FC = () => (
  <Footer style={{
    textAlign: 'center', backgroundColor: '#d86e3d', zIndex: 1, color: 'white',
  }}
  >
    Fact checking ©2022 Created by FEL CTU
  </Footer>
);

export default CustomFooter;
