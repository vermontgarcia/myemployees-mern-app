import axios from 'axios';

const base_url = window.location.hostname === 'localhost' ? 'http://localhost:3500/api' : 'https://my-employees-2020.herokuapp.com/api';

export const employeesList = () => {
  return axios.get(`${base_url}/employee/list`)
}