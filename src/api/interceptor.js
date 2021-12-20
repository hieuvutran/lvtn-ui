import axios from 'axios';
// import store from '../store';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    // const { auth } = store.getState();
    // console.log('auth', auth);
    // if (auth?.user?.accId) {
    //   newConfig.headers['Authorization'] = auth?.user.accId;
    // }
    return newConfig;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {},
  function (error) {
    return Promise.reject(error);
  }
);
