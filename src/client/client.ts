import axios from 'axios';

const client = axios.create({
  baseURL: ``,
  responseType: 'json',
  responseEncoding: 'utf8',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': '',
  },
});

export default client;
