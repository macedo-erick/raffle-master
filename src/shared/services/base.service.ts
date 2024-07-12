import axios from 'axios';

const BaseService = axios.create({
  baseURL: 'http://localhost:3000'
});

export default BaseService;
