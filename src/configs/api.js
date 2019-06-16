export const BASE_URL = 'https://api.github.com';

export const GITHUB_CLIENT_ID = process.env.NODE_ENV !== 'production'
  ? process.env.REACT_APP_GITHUB_CLIENT_ID
  : process.env.GITHUB_CLIENT_ID;

export const GITHUB_CLIENT_SECRET = process.env.NODE_ENV !== 'production'
  ? process.env.REACT_APP_GITHUB_CLIENT_SECRET
  : process.env.GITHUB_CLIENT_SECRET;

export default {};
