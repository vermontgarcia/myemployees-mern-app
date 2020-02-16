import React, {Component} from 'react';
import Employee from './Employee';
import {isLoggedIn, logout} from '../Services/authService';
import {employeesList} from '../Services/employeeService';
import {Link} from 'react-router-dom';

import {Layout, Icon, BackTop, message, Skeleton} from 'antd';
import Nav from './Nav';

const {Header, Footer, Content} = Layout;

class Home extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      list: []
    }
  }

  handleLogOut = () => {
    logout(this.props.history)
  }


  handleLog = (employeeId) => {
    console.log("Writing to log", employeeId)
    let {user} = this.state 
    console.log(user)
  }


  componentDidMount(){
    const token = localStorage.getItem('token');
    token ? isLoggedIn(this.props.history) : this.props.history.push('/login');

    const user = JSON.parse(localStorage.getItem('user'))
    user ? this.setState({user}) : this.props.history.push('/login');

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
    const {list, user} = this.state;
    return (
      <div>
        <Layout>
          <Header>
            <Nav user={user} handleLogOut={this.handleLogOut}/>
          </Header>
          <Content>
            <div className="cards-envelop">
              {list.map((employee, index)=><Employee key={index} handleLog={this.handleLog} employee={employee} />)}
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