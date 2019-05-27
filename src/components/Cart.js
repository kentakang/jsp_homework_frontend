import React, { useState } from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { useFetch } from '../components/Hooks';
import LoadingAnimation from '../components/LoadingAnimation';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [data, loading] = useFetch(
    "/api/books"
  );
  const [cart, setCart] = useState(Cookies.getJSON('cart'));

  setInterval(() => {
    if (Cookies.getJSON('cart') === undefined) {
      Cookies.set('cart', []);
    }

    if (cart.length !== Cookies.getJSON('cart').length) {
      setCart(Cookies.getJSON('cart'));
    }
  }, 2000);

  return (
    <Card 
      title={"장바구니"} 
      extra={<Button style={{ padding: 0 }} type="link" onClick={() => { Cookies.set('cart', []) }}>비우기</Button>}
      actions={[<Link to="/purchase"><Button type="primary">구매하기</Button></Link>]}
    >
      {
        loading ?
        <LoadingAnimation loading={loading} />
        :
        <List
          itemLayout="horizontal"
          dataSource={data.books.filter(item => (cart.includes(item.id)))}
          renderItem={item => (
            <Link to={`/detail/${item.id}`}>
              <List.Item>
                <List.Item.Meta 
                  avatar={<Avatar src={item.image} />}
                  title={item.title}
                  description={item.author}
                />
              </List.Item>
            </Link>
          )}
        />
      }
    </Card>
  );
};

export default Cart;
