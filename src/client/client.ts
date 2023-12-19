import axios from 'axios';
// import { useSessionContext } from 'context/SessionContext';

const createClient = () => {
  // const { baseUrl, accessToken } = useSessionContext();

  return axios.create({
    baseURL: 'https://bakrypt.io/v1/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${''}`,
    },
  });
};

const client = createClient();

export default client;
