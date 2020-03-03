import React, {Component} from 'react';
import Employee from './Employee';
import FooterInfo from './FooterInfo';
import {isLoggedIn, logout} from '../Services/authService';
import {employeesList} from '../Services/employeeService';
import {writeLog} from '../Services/logService';

import {Layout, Icon, BackTop, message, Modal} from 'antd';
import Nav from './Nav';

const {Header, Footer, Content} = Layout;

class Home extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      list: [],
      visible: false,
      employee: {}
    }
  }

  showModal = () => {
    this.setState({visible: true});
  }

  handleModal = () => {
    this.showModal();
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };


  handleLogOut = () => {
    logout(this.props.history)
  }

  handleLoggedIn = () => {
    const token = localStorage.getItem('token');
    token ? isLoggedIn(this.props.history) : this.props.history.push('/login');

    const user = JSON.parse(localStorage.getItem('user'))
    user ? this.setState({user}) : this.props.history.push('/login');
  }

  handleLog = (employee) => {
    this.handleLoggedIn();

    let {user} = this.state 
    let log = {
      userId: user._id,
      employeeId: employee._id,
      logName: 'Employee consult'
    }
    writeLog(log);
    this.setState({employee})
    this.showModal()
  }

  componentDidMount(){
    this.handleLoggedIn();

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
    const {list, user, employee, visible} = this.state;
    return (
      <div>
        <Layout>
          <Header>
            <Nav user={user} handleLogOut={this.handleLogOut}/>
          </Header>
          <Content>
            <h1 className="home-title">My Company Employees Book</h1>
            <div className="cards-envelop">
              {list.map((employee, index)=><Employee key={index} handleLog={this.handleLog} employee={employee} />)}
            </div>
            <Modal
              visible={visible}
              centered={true}
              width={700}
              title='Employee Details'
              onCancel={this.handleCancel}
              footer={null}
            >
              <div className="employee-details-envelope">
                <div className="details-card">
                  <img className="details-image" src={employee.profilePicture === 'avatar' ? '/avatar.png' : employee.profilePicture} alt={employee.name} />
                </div>
                <div className="details-card details-card-text">
                  <p><span className="details-card-text-tag">Name: </span> {employee.name} </p>
                  <p><span className="details-card-text-tag">Department: </span> {employee.department} </p>
                  <p><span className="details-card-text-tag">Position: </span>{employee.position} </p>
                  <p><span className="details-card-text-tag" >User type: </span>{employee.role} </p>
                  <p> {employee.email} </p>
                </div>
              </div>
            </Modal>
          </Content>
          <Footer>
            <FooterInfo/>
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