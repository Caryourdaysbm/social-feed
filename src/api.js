// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const fetchPosts = async (page = 1, limit = 10) => {
  const response = await api.get('posts', {
    params: { _page: page, _limit: limit },
  });
  return response.data;
};
