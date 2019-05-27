import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../animations/loading.json';

const LoadingAnimation = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Lottie options={defaultOptions} height={50} width={50} isStopped={!props.loading} />
    </div>
  );
};

export default LoadingAnimation;