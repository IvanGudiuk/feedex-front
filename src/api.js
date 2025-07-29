import axios from 'axios';

// export const api = axios.create({
//   // baseURL: 'https://verify-back.onrender.com',
// });

export const api = axios.create({
  baseURL: 'https://api.sms-verify.top',
});

export const setAuthHeader = token => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    api.defaults.headers.common.Authorization = '';
  }
};

export const setAdminHeader = token => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    api.defaults.headers.common.Authorization = '';
  }
};
