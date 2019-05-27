import React from 'react';
import { List, Tag, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const ListComponent = (props) => {
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
    <List
      itemLayout="vertical"
      size="large"
      dataSource={props.data}
      loading={props.loading}
      renderItem={item => (
        <div>
          <List.Item
            key={item.title}
            actions={item.tags.map(tag => (
              <Tag>
                <Link to={`/category/${tag}`}>
                  {tag}
                </Link>
              </Tag>
            ))}
            extra={
              <img
                width={80}
                alt="책 표지"
                src={item.image}
              />
            }
          >
            <List.Item.Meta
              title={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
              description={item.author}
            />
            {item.content}
          </List.Item>
          <div style={{padding: 10}}>
            <Link to={`/detail/${item.id}`}><Button style={{ marginRight: 10 }}>상품 정보</Button></Link>
            <Button onClick={() => { addToCart(item.id) }} type="primary" icon="shopping">장바구니 담기</Button>
          </div>
        </div>
      )} />
  );
};

export default ListComponent;