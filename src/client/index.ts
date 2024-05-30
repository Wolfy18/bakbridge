import axios from 'axios';

const createClient = ({
  baseUrl,
  accessToken,
  headers,
}: {
  baseUrl?: string;
  accessToken?: string;
  headers?: { [key: string]: string | number | boolean };
}) => {
  const requestHeaders: { [key: string]: string | number | boolean } = {};
  if (accessToken) requestHeaders['Authorization'] = `Bearer ${accessToken}`;

  return axios.create({
    baseURL: baseUrl ? baseUrl : 'https://bakrypt.io/v1/',
    headers: {
      ...requestHeaders,
      ...headers,
    },
  });
};

export { createClient };
