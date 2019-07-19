import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000',
  responseType: 'json',
  headers: { 'Authorization': ' Bearer ' + sessionStorage.getItem('jwt') }
});