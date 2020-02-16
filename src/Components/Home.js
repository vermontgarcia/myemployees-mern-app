import React, {Component} from 'react';
import Employee from './Employee';
import {isLoggedIn} from '../Services/authService';
import {Link} from 'react-router-dom';

import {Layout, Icon, BackTop} from 'antd';

const {Header, Footer, Content} = Layout;

class Home extends Component {

  componentWillMount(){
    const token = localStorage.getItem('token');
    token ? isLoggedIn(this.props.history) : this.props.history.push('/login');
  }

  render(){
    //const {user} = this.props.state;
    return (
      <div>
        <Layout>
          <Header>
            Header
          </Header>
          <Content>
            <Employee />
          </Content>
          <Footer>
            Footer
          </Footer>
        </Layout>
        <div>
          <BackTop id="back-top-custom">
            <div className="ant-back-top-inner"><Icon type="to-top" /></div>
          </BackTop>
        </div>
      </div>
    )
  }
}
  

export default Home;