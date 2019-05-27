import React from 'react';
import { Layout } from 'antd';
import Lottie from 'react-lottie';
import loadingAnimation from '../animations/slider.json';

const { Content } = Layout;

const Index = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '16px 50px' }}>
        <div style={{ background: '#ffffff', padding: 24, minHeight: 280 }}>
        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
        </div>
      </Content>
    </Layout>
  );
};

export default Index;
