import React from 'react';
import { Layout } from 'antd';
import List from '../components/List';
import { useFetch } from '../components/Hooks';
import LoadingAnimation from '../components/LoadingAnimation';
import Cart from '../components/Cart';

const { Content, Sider } = Layout;

const AllBooks = () => {
  const [data, loading] = useFetch(
    "/api/books"
  );

  return (
    <Layout>
      <Content style={{ padding: '16px 50px' }}>
        <div style={{ background: '#ffffff', padding: 24, minHeight: 280 }}>
          {
            loading ?
            <LoadingAnimation loading={loading} />
            :
            <List data={data.books} />
          }
        </div>
      </Content>
      <Sider style={{ margin: 16, marginLeft: 0, background: "#f0f2f5" }}>
        <Cart refresh={true} />
      </Sider>
    </Layout>
  );
};

export default AllBooks;
