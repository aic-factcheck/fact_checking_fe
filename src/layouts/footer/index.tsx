import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter: React.FC = () => {
  return (
    <Footer style={{
      textAlign: 'center', backgroundColor: '#d86e3d', zIndex: 9999, color: 'white',
    }}
    >
      Fact checking ©2022 Created by FEL CTU
    </Footer>
  );
}

export default CustomFooter;
