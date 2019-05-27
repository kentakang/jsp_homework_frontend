import React from 'react';
import { Layout, Row, Col, Typography, Button, Tabs, List, Icon, Tag, Card, message } from 'antd';
import { useFetch } from '../components/Hooks';
import LoadingAnimation from '../components/LoadingAnimation';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const { Content } = Layout;
const { Title, Text } = Typography;

const BookDetail = ({match, history}) => {
  const [data, loading] = useFetch(
    `/api/book/${match.params.id}`
  );

  const addToCart = (id) => {
    const cookie = Cookies.getJSON('cart');

    if (cookie.includes(id)) {
      message.error('이미 장바구니에 있습니다!', 2.5);
    } else {
      Cookies.set('cart', [...Cookies.getJSON('cart'), id]);
      message.success('장바구니에 추가되었습니다!', 2.5);
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
                  <Text strong>상품 상세 정보</Text>
                </div>
              } 
              style={{ width: '100%', margin: 'auto' }}
            >
              <Row>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <img alt={data.book.title} src={data.book.image} />
                </Col>
                <Col span={12} style={{ marginTop: 30 }}>
                  <Title level={3}>{data.book.title}</Title>
                  <Text strong>{data.book.author} | {data.book.company}</Text>
                  <Title level={4} style={{ marginTop: 10 }}>{data.book.price}원</Title>
                  <Button type="primary" icon="shopping" onClick={() => { addToCart(data.book.id) }}>장바구니 담기</Button>
                </Col>
              </Row>
              <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
                <Tabs.TabPane tab="상품 설명" key="1">
                  {data.book.description}
                </Tabs.TabPane>
                <Tabs.TabPane tab="상품 상세 정보" key="2">
                  <List
                    itemLayout="horizontal">
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Icon type="user" style={{ fontSize: '32px', color: '#001529', marginTop: 5 }} />}
                        title="저자"
                        description={data.book.author}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Icon type="bank" style={{ fontSize: '32px', color: '#001529', marginTop: 5 }} />}
                        title="출판사"
                        description={data.book.company}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Icon type="money-collect" style={{ fontSize: '32px', color: '#001529', marginTop: 5 }} />}
                        title="가격"
                        description={`${data.book.price}원`}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Icon type="tags" style={{ fontSize: '32px', color: '#001529', marginTop: 5 }} />}
                        title="카테고리"
                        description={data.book.tags.map(tag => (
                          <Tag>
                            <Link to={`/category/${tag}`}>
                              {tag}
                            </Link>
                          </Tag>
                        ))}
                      />
                    </List.Item>
                  </List>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          )
        }
      </div>
    </Content>
  );
};

export default BookDetail;
