import React, {Component} from 'react';
import Employee from './Employee';
import {isLoggedIn} from '../Services/authService';
import {employeesList} from '../Services/employeeService';
import {Link} from 'react-router-dom';

import {Layout, Icon, BackTop, message, Skeleton} from 'antd';

const {Header, Footer, Content} = Layout;

class Home extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      list: []
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    token ? isLoggedIn(this.props.history) : this.props.history.push('/login');

    let {list} = this.state;

    employeesList()
      .then(res => {
        list = res.data.list
        this.setState({list})

      })
      .catch(err=>{
        message.error(err.response.data.msg);
      })

  }

  render(){
    const {list} = this.state;
    return (
      <div>
        <Layout>
          <Header>
            Header
          </Header>
          <Content>
            <div className="cards-envelop">
              {list.map((employee, index)=><Employee key={index} employee={employee} />)}
            </div>
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