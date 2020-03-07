import React, {useState, useEffect} from 'react';
import {logHistory} from '../Services/logService';
import { Line, Radar } from 'react-chartjs-2';



export default function Chart() {
  
  //const [logs, setLogs] = useState([]);
  const [data, setData] = useState({});
  const [dates, setDates] = useState([]);
  const [hours, setHours] = useState([]);
  
  
  const handleRequest = () => {
    logHistory()
      .then(res => {
        let logs = res.data.logs;
        let dates = [];
        let hours = [];

        logs.forEach(log => {
          let date = [...log.created_at ].slice(0,10).join("");
          let hour = new Date (log.created_at).getHours()


          log.date = date;
          log.hour = hours

          dates.push(date);
          hours.push(hour);
          
        });


        setDates(dates);
        setHours(hours);
        //setLogs(logs);
      })
      .catch(err => {
        console.log('ERROR =====> ',err)
  
      })
  }

  const setChart = () => {
    let data = {
      labels: dates,
      datasets: [{
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: hours
      }]
    }
    setData(data);    
  }
  
  useEffect(() => {
    handleRequest();
  }, [])
  
  useEffect(() => {
    setChart();
  }, [hours, dates, ])


  return (
    <div>
      <h1>
        Log History      
      </h1>
      <Line
        data={data}
        options={{
          title:{
            display:true,
            text:'Average Rainfall per month',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    </div>
  )
}

//      <ol>
//        {logs.map((log, index) => <li key={index}>{log.userId.name} perform {log.logName} @ {log.created_at} </li>)}
//      </ol>