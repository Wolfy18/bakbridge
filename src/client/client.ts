import axios from 'axios';
// import { useSessionContext } from 'context/SessionContext';

const createClient = () => {
  // const { baseUrl, accessToken } = useSessionContext();

  return axios.create({
    baseURL: 'https://bakrypt.io/v1/',
    headers: {
      Authorization: `Token ${'ceba8f4bdf93938a85eb08d0f25c8f24103a1666'}`,
    },
  });
};

const client = createClient();

export default client;
