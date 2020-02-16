import axios from 'axios';
import { message } from 'antd';


const base_url = window.location.hostname === 'localhost' ? 'http://localhost:3500/api' : 'https://my-employees-2020.herokuapp.com/api';

// Log services

export const writeLog = (log) => {
  axios.post(`${base_url}/log`, log)
    .then(res=>{
      console.log('Log =====> ', res.data.msg, res.data.log);
    })
    .catch(err=>{
      console.log('Log Error =====>', err.response.data.msg);
    });
}