import React, {useState, useEffect} from 'react';
import {logHistory} from '../Services/logService';
import {isLoggedIn, logout} from '../Services/authService';
import { Radar } from 'react-chartjs-2';
import { Layout } from 'antd';
import FooterInfo from './FooterInfo';
import Nav from './Nav';

const { Header, Footer, Content } = Layout;



export default function Chart(props) {
  
  //const [logs, setLogs] = useState([]);
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [dates, setDates] = useState([]);
  const [hours, setHours] = useState([]);
  const [weekday, setWeekday] = useState([]);
  const [timesPerDay, setTimesPerDay] = useState([]);
  
  const  handleLogOut = () => {
    logout(props.history)
  }

  const handleLoggedIn = () => {
    const token = localStorage.getItem('token');
    token ? isLoggedIn(props.history) : props.history.push('/login');

    const user = JSON.parse(localStorage.getItem('user'))
    user ? setUser(user) : props.history.push('/login');
  }

  const handleRequest = () => {
    logHistory()
      .then(res => {
        let logs = res.data.logs;
        let dates = [];
        let hours = [];
        
        let timesPerDay = new Array(7);
          timesPerDay[0] = 0;
          timesPerDay[1] = 0;
          timesPerDay[2] = 0;
          timesPerDay[3] = 0;
          timesPerDay[4] = 0;
          timesPerDay[5] = 0;
          timesPerDay[6] = 0;

        let weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";

        logs.forEach(log => {

          let logDate = new Date (log.created_at)
          let date = [...log.created_at ].slice(5,10).join("");
          let hour = logDate.getHours()

          timesPerDay[logDate.getDay()] = timesPerDay[logDate.getDay()] + 1;

          log.date = date;
          log.hour = hours

          dates.push(date);
          hours.push(hour);
        });

        setDates(dates);
        setHours(hours);
        setWeekday(weekday);
        setTimesPerDay(timesPerDay);
        //setLogs(logs);
      })
      .catch(err => {
        console.log('ERROR =====> ',err)
      })
  }

  const setChart = () => {
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
    setData(data);    
  }
  
  useEffect(() => {
    handleRequest();
    handleLoggedIn();
  }, [])
  
  useEffect(() => {
    setChart();
  }, [weekday, timesPerDay])


  return (
    <div>
      <Layout>
        <Header>
          <Nav user={user} handleLogOut={handleLogOut} />
        </Header>
        <Content>
          <Radar
            data={data}
            options={{
              title:{
                display:true,
                text:'History Logs vs Day',
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

//      <ol>
//        {logs.map((log, index) => <li key={index}>{log.userId.name} perform {log.logName} @ {log.created_at} </li>)}
//      </ol>