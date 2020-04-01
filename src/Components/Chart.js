import React, { Component } from 'react';
import {logHistory} from '../Services/logService';
import {isLoggedIn, logout} from '../Services/authService';
import { Radar } from 'react-chartjs-2';
import { Layout } from 'antd';
import FooterInfo from './FooterInfo';
import Nav from './Nav';
import { days, week} from '../Helpers/helpers';

const {Header, Footer, Content} = Layout;

class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      data: {},
      weekday: [],
      timesPerDay: [],
    }
  }

  handleLogOut = () => {
    logout(this.props.history)
  }

  handleLoggedIn = () => {
    const token = localStorage.getItem('token');
    token ? isLoggedIn(this.props.history) : this.props.history.push('/login');
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('User =====> ', user)
    user ? this.setState({user}) : this.props.history.push('/login');
  }

  handleRequest = () => {
    logHistory()
      .then(res => {
        let logs = res.data.logs;
        let timesPerDay = days;
        let weekday = week;

        logs.forEach(log => {
          let logDate = new Date (log.created_at)
          timesPerDay[logDate.getDay()] = timesPerDay[logDate.getDay()] + 1;
        });
        this.setState({weekday});
        this.setState({timesPerDay});
        this.setChart();
      })
      .catch(err => {
        console.log('ERROR =====> ',err)
      })
  }

  setChart = () => {
    const {weekday, timesPerDay} = this.state
    let data = {
      labels: weekday,
      datasets: [{
        label: 'Hour',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: timesPerDay
      }]
    }
    this.setState({data});    
  }

  componentDidMount(){
    this.handleLoggedIn();
    this.handleRequest();
  }

  render() {
    const {user, data} = this.state;
    return (
      <div>
      <Layout>
        <Header>
          <Nav user={user} handleLogOut={this.handleLogOut} />
        </Header>
        <Content>
          <Radar
            data={data}
            options={{
              title:{
                display:true,
                text:'Logs vs Day',
                fontSize:20
              },
              legend:{
                display:false,
                position:'right'
              }
            }}
          />
        </Content>
        <Footer>
          <FooterInfo/>
        </Footer>
      </Layout>
    </div>
    )
  }
}

export default Chart;
  