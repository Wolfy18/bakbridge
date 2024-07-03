import axios from 'axios';

const createClient = ({
  baseUrl,
  userToken,
  headers,
}: {
  baseUrl?: string;
  userToken?: string;
  headers?: { [key: string]: string | number | boolean };
}) => {
  const requestHeaders: { [key: string]: string | number | boolean } = {};
  if (userToken) requestHeaders['authorization'] = `Bearer ${userToken}`;

  return axios.create({
    baseURL: baseUrl ? baseUrl : 'https://bakrypt.io/v1/',
    headers: {
      ...requestHeaders,
      ...headers,
    },
  });
};

export { createClient };
