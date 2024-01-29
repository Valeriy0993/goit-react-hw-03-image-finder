import axios from 'axios';

const API_KEY = '40978321-f1efcc4bfa3c901177745f4fe';
const BASE_URL = 'https://pixabay.com/api/';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const searchImages = (q, perPage = 12, page = 1) => {
  return instance.get(
    `?q=${encodeURIComponent(q)}&per_page=${perPage}&page=${page}`
  );
};
