import axios from 'axios';
const qs = require('qs');

export const http = axios.create({
  baseURL: "https://kerim.qoodpy.com/",
  timeout: 30000,
  paramsSerializer: function(params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function(config) {

    var jwtToken = localStorage.getItem("TODOAPPJWTKEY");

    if(jwtToken !== undefined && jwtToken !== null){
      config.headers.common['Authorization'] = 'Bearer ' + jwtToken;
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return undefined;
  }
);
