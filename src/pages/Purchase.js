import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  List, 
  Avatar, 
  Typography, 
  Button, 
  Icon, 
  Card, 
  Steps, 
  Form, 
  Select,
  Cascader,
  notification
} from 'antd';
import { useFetch } from '../components/Hooks';
import LoadingAnimation from '../components/LoadingAnimation';
import Cookies from 'js-cookie';
import Lottie from 'react-lottie';
import animation from '../animations/purchase.json';

const { Content } = Layout;
const { Text, Title } = Typography;

const openNotificationWithIcon = (type, title, description) => {
  notification[type]({
    message: title,
    description: description
  });
};

const branch = [
  {
    value: 'seoul',
    label: '서울',
    children: [
      {
        value: 'dongdaemun',
        label: '동대문구',
        children: [
          {
            value: 'ddmbranch',
            label: '동대문점'
          }
        ]
      },
      {
        label: '도봉구',
        children: [
          {
            value: 'ssmbranch',
            label: '쌍문점'
          }
        ]
      }
    ]
  },
  {
    value: 'tokyo',
    label: '도쿄',
    children: [
      {
        value: 'sjkbranch',
        label: '신주쿠점'
      }
    ]
  }
]

const Purchase = ({match, history}) => {
  const [data, loading] = useFetch(`/api/books`);
  const [cart] = useState(Cookies.getJSON('cart'));
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    setCurrentStep(currentStep - 1);
  }

  useEffect(() => {
    if (currentStep === 1) {
      openNotificationWithIcon('info', '배송 관련 안내', '현재 배송은 방문 수령만 가능합니다.');
    } else if (currentStep === 2) {
      Cookies.set('cart', []);
    }
  }, [currentStep]);

  const steps = [
    {
      id: 1,
      title: '상품 확인',
    },
    {
      id: 2,
      title: '구매 정보 입력',
    },
    {
      id: 3,
      title: '구매 완료'
    }
  ];

  const defaultOptions = {
    loop: currentStep === 2,
    autoplay: currentStep === 2,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Content style={{ width: '50%', margin: '16px auto' }}>
      <div style={{ background: '#ffffff', minHeight: 280 }}>
        {
          loading ?
          <LoadingAnimation loading={loading} />
          : (
            <Card 
              title={
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <Button style={{ float: 'left' }} type="link" onClick={() => { history.goBack() }}>
                    <Icon type="left" /> 
                  </Button>
                  <Text strong>구매하기</Text>
                </div>
              } 
              style={{ width: '100%', margin: 'auto', minHeight: 280 }}
              actions={currentStep !== 2 && [currentStep !== 0 && <Button type="primary" onClick={goPrev}><Icon type="left" /> 이전 단계</Button> ,<Button type="primary" onClick={goNext}>다음 단계 <Icon type="right" /></Button>]}
            >
              <Steps current={currentStep}>
                {
                  steps.map(item => (
                    <Steps.Step key={item.id} title={item.title} />
                  ))
                }
              </Steps>
              <div style={{ marginTop: 20 }}>
                {
                  currentStep === 0 &&
                  (
                    <List
                      itemLayout="horizontal"
                      dataSource={data.books.filter(item => (cart.includes(item.id)))}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            title={item.title}
                          />
                          <div>{item.price}원</div>
                        </List.Item>
                      )}
                    >
                    </List>
                  )
                }
                {
                  currentStep === 1 &&
                  (
                    <Form labelCol="6" wrapperCol="14">
                      <Form.Item label="배송 타입" hasFeedback>
                        <Select placeholder="배송 타입을 선택해주세요">
                          <Select.Option value="go">방문 수령</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="지점 선택">
                        <Cascader placeholder="지점을 선택해주세요" options={branch} />
                      </Form.Item>
                    </Form>
                  )
                }
                {
                  currentStep === 2 &&
                  (
                    <div>
                      <Lottie options={defaultOptions} height={200} width={200} isStopped={currentStep === 2} />
                      <Title level={3} style={{ textAlign: 'center', color: '#4BB543' }}>구매가 완료되었습니다!</Title>
                    </div>
                  )
                }
              </div>
            </Card>
          )
        }
      </div>
    </Content>
  );
};

export default Purchase;
