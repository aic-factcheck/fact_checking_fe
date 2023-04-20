import axios from 'axios';

const factCheckBe = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    'Content-type': 'application/json',
  },
});

const scrapingService = axios.create({
  baseURL: process.env.REACT_APP_API_GET_TEXT,
  headers: {
    'Content-type': 'application/json',
  },
});

let isLockedFree = true;

/* var event = new Date();
console.log(event.toLocaleString('en-GB', { timeZone: 'Europe/London' })); */

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
  try {
    const expires = localStorage.getItem('expiresIn');
    // eslint-disable-next-line prefer-const
    let expiresDate = new Date(expires != null ? new Date(expires) : 10000000);
    // expiresDate.setHours(expiresDate.getHours() + 2);
    console.log(expiresDate);
    console.log(Date.now());
    if (expiresDate.getTime() < Date.now() && isLockedFree) {
      isLockedFree = false;
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/auth/refresh-token`, {
        email: localStorage.getItem('email'),
        refreshToken: localStorage.getItem('refreshToken'),
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('expiresIn', response.data.expiresIn);
      isLockedFree = true;
    }
  } catch (err) {
    console.log(`${err}  rrrrrrrrrrrr`);
    console.error(err);
  }
}

// Axios interceptor to handle expired tokens
factCheckBe.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        return await refreshAccessToken().then(() => {
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          return axios.create(originalRequest);
        });
      } catch (err) {
        console.log(`${err}  eroooooooooor`);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
        localStorage.removeItem('expiresIn');
      }
    }
    return Promise.reject(error);
  },
);

// Axios interceptor to handle expired tokens
scrapingService.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      refreshAccessToken().then(() => {
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios(originalRequest);
      });
    }

    return Promise.reject(error);
  },
);

export {
  factCheckBe,
  scrapingService,
};
