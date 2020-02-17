import axios from 'axios';
import {message} from 'antd'

const base_url = window.location.hostname === 'localhost' ? 'http://localhost:3500/api' : 'https://my-employees-2020.herokuapp.com/api';

// Log services
export const writeLog = (log) => {
  axios.post(`${base_url}/log`, log)
    .then(res=>{
      message.success(`${res.data.msg}, Type: "${res.data.log.logName}" at "${Date(res.data.log.created_at)}"` , 5);
    })
    .catch(err=>{
      console.log('Log Error =====>', err.response.data.msg);
    });
}