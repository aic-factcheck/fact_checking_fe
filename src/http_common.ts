import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    "Content-type": "application/json",
  }
});

const scrapingService = axios.create({
  baseURL: process.env.REACT_APP_API_GET_TEXT,
  headers: {
    "Content-type": "application/json",
  }
});

export {
  scrapingService
};