import axios from 'axios';

const createClient = ({
  baseUrl,
  accessToken,
  headers,
}: {
  baseUrl?: string;
  accessToken?: string;
  headers?: JSONstring;
}) => {
  let extraHeaders: object = {};
  try {
    if (headers) {
      extraHeaders = JSON.parse(headers);
    }
  } catch (error) {
    console.error('[ERROR]: Unable to parse custom headers; ' + error);
  }

  const requestHeaders: { [key: string]: string | number | boolean } = {};
  if (accessToken) requestHeaders['Authorization'] = `Bearer ${accessToken}`;

  return axios.create({
    baseURL: baseUrl ? baseUrl : 'https://bakrypt.io/v1/',
    headers: {
      ...requestHeaders,
      ...extraHeaders,
    },
  });
};

export { createClient };
