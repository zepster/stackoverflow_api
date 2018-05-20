import axios from 'axios'
export const serviceName = 'stack';

let KEY = '';
const HOST = 'https://api.stackexchange.com';
const VER = '2.2';
const METHODS = {
  SEARCH: 'search'
};

function setSite(source) {
  return `site=${source}`;
}

function getSign() {
  return `key=${KEY}`
}

function buildURL(method) {
  return `${HOST}/${VER}/${method}?${getSign()}&${setSite('stackoverflow')}`;
}

function search(params) {
  const url = buildURL(METHODS.SEARCH);
  return axios.get(url, {params});
}

export function service(key) {
  KEY = key;
  return {
    search
  }
};
