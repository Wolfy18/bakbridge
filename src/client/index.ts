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

  return axios.create({
    baseURL: baseUrl ? baseUrl : 'https://bakrypt.io/v1/',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...extraHeaders,
    },
  });
};

export { createClient };
