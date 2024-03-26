import ky from 'ky';
export const API_VERSION = 'v1';

const client = ky.extend({
  prefixUrl: 'https://api.sommify.ai/',
});

export default client;
