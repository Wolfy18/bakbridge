import axios from 'axios';

const createClient = ({
  baseUrl,
  accessToken,
}: {
  baseUrl?: string;
  accessToken?: string;
}) => {
  return axios.create({
    baseURL: baseUrl ? baseUrl : 'https://bakrypt.io/v1/',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export { createClient };
