import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  auth: {
    username: 'testUser',
    password: 'testPassword',
  },
});

export default instance;
