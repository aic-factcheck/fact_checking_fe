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

let isRefreshing = false;

async function refreshAccessToken() {
  try {
    const expires = localStorage.getItem('expiresIn');
    const expiresDate = new Date(expires != null ? new Date(expires) : 10000000);
    if (expiresDate.getTime() < Date.now()) {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/auth/refresh-token`, {
        email: localStorage.getItem('email'),
        refreshToken: localStorage.getItem('refreshToken'),
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('expiresIn', response.data.expiresIn);
    }
  } catch (err) {
    console.error(err);
  }
}

factCheckBe.interceptors.response.use((response) => response, (error) => {
  const { config, response: { statusCode } } = error;
  const originalRequest = config;

  if (statusCode === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshAccessToken()
        .then(() => {
          isRefreshing = false;
        })
        .catch(() => {
          isRefreshing = false;
        });
    }

    const retryOrigReq = new Promise((resolve) => {
      const retry = () => {
        if (!isRefreshing) {
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          resolve(axios(originalRequest));
        } else {
          setTimeout(retry, 1000);
        }
      };
      retry();
    });
    return retryOrigReq;
  }
  return Promise.reject(error);
});

scrapingService.interceptors.response.use((response) => response, (error) => {
  const { config, response: { status } } = error;
  const originalRequest = config;

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshAccessToken()
        .then(() => {
          isRefreshing = false;
        })
        .catch(() => {
          isRefreshing = false;
        });
    }

    const retryOrigReq = new Promise((resolve) => {
      const retry = () => {
        if (!isRefreshing) {
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          resolve(axios(originalRequest));
        } else {
          setTimeout(retry, 1000);
        }
      };
      retry();
    });
    return retryOrigReq;
  }
  return Promise.reject(error);
});

export {
  factCheckBe,
  scrapingService,
};
