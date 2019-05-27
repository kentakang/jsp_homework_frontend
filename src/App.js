import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AllBooks from './pages/AllBooks';
import Bestseller from './pages/Bestseller';
import CategoryBooks from './pages/CategoryBooks';
import BookDetail from './pages/BookDetail';
import Purchase from './pages/Purchase';
import Index from './pages/Index';
import './App.css';

const { Header, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <div className="logo">
            <Link to="/">찬이네 책방</Link>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/bestseller">베스트셀러</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/all">책 전체 보기</Link></Menu.Item>
          </Menu>
        </Header>
        <Route path="/" exact component={Index} />
        <Route path="/bestseller" exact component={Bestseller} />
        <Route path="/all" component={AllBooks} />
        <Route path="/category/:category" component={CategoryBooks} />
        <Route path="/detail/:id" component={BookDetail} />
        <Route path="/purchase" component={Purchase} />
        <Footer style={{ textAlign: 'left' }}>
          찬이네 책방 &copy; 2019
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
