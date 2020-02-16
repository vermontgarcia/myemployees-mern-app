import axios from 'axios';
import {message} from 'antd';

const base_url = window.location.hostname === 'localhost' ? 'http://localhost:3500/api' : 'https://my-employees-2020.herokuapp.com/api';

// Auth services

export const signup = (user, history) => {
  axios.post(`${base_url}/auth/signup`, user)
    .then(res=>{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      message.success(res.data.message);
      history.push('/');
    })
    .catch((err)=>{
      message.error(err.response.data.msg);
    });
}

export const login = (user, history) => {
  axios.post(`${base_url}/auth/login`, user)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      message.success(res.data.msg);
      history.push('/');
    })
    .catch(err => {
      err.response.data.msg ? message.error(err.response.data.msg) : console.log('No Message');
    });
}

export const logout = history => {
  localStorage.removeItem('token');
  message.success('Logged out succesfully');
  history.push('/login');
}

export const isLoggedIn = history => {
  const token = localStorage.getItem('token');
  axios.get(`${base_url}/auth/loggedin`, {
    headers: {
      'x-access-token': token
    }
  })
    .then(res => {
      message.success(res.data.msg)
    })
    .catch(err => {
      message.error(err.response.data.msg);
      localStorage.removeItem('token');
      history.push('/login')
    });
}