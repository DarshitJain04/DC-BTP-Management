import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

instance.interceptors.request.use((config) => {
  config.headers.post['Content-Type'] = 'multipart/form-data';
  if (localStorage.getItem('cdc_LoggedIn') === 'true') {
    const access_token = localStorage.getItem('cdc_auth_token');
    config.headers.common['Authorization'] = 'Token ' + access_token;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async function (error) {
    if (error.response.status === 401) {
      localStorage.setItem('cdc_LoggedIn', false);
      localStorage.setItem('cdc_auth_token', '');

      window.alert('Session expired');
      window.location = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
