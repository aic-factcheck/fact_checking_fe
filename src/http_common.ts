import axios from 'axios';

export default axios.create({
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

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
  try {
    const response = await axios.post('/auth/refresh-token', {
      email: localStorage.getItem('email'),
      refreshToken: localStorage.getItem('refreshToken'),
    });
    localStorage.setItem('accessToken', response.data.token.accessToken);
    localStorage.setItem('refreshToken', response.data.token.refreshToken);
  } catch (err) {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    console.error(err);
  }
}

// Axios interceptor to handle expired tokens
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshAccessToken().then(() => {
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios(originalRequest);
      });
    }

    return Promise.reject(error);
  },
);

export {
  scrapingService,
};
