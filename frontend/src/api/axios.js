import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  auth: {
    username: 'sahil',
    password: 'sahil',
  },
});

export default instance;
