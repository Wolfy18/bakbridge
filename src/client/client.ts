import axios from 'axios';
// import { useSessionContext } from 'context/SessionContext';

const createClient = () => {
  // const { baseUrl, accessToken } = useSessionContext();

  return axios.create({
    baseURL: 'baseUrl',
    responseType: 'json',
    responseEncoding: 'utf8',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': '',
      Authorization: `Bearer ${'accessToken'}`,
    },
  });
};

const client = createClient();

export default client;
