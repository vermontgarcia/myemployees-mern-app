import React, {useState, useEffect} from 'react';
import {logHistory} from '../Services/logService';



export default function Chart() {
  
  const [logs, setLogs] = useState([]);
  
  const handleRequest = () => {
    logHistory()
      .then(res => {
        //console.log(res.data.log)
        setLogs(res.data.log);
      })
      .catch(err => {
        console.log('ERROR =====> ',err)
  
      })
  }
  
  useEffect(() => {
    handleRequest()
  }, [])


  return (
    <div>
      <h1>
        Log History      
      </h1>
      <ol>
        {logs.map((log, index) => <li key={index}>{log.userId.name} perform {log.logName} @ {log.created_at} </li>)}
      </ol>
    </div>
  )
}
