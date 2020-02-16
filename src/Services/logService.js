import axios from 'axios';

const base_url = window.location.hostname === 'localhost' ? 'http://localhost:3500/api' : 'https://my-employees-2020.herokuapp.com/api';

// Log services
export const writeLog = (log) => {
  axios.post(`${base_url}/log`, log)
    .catch(err=>{
      console.log('Log Error =====>', err.response.data.msg);
    });
}