import axios from 'axios';

const BaseService = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: `http://localhost:3000/${baseUrl}`
  });

  instance.interceptors.request.use((config) => {
    const sessionId = localStorage.getItem('SESSION_ID');

    if (sessionId) {
      config.headers.Authorization = `Bearer ${sessionId}`;
    }

    return config;
  });

  return instance;
};

export default BaseService;
