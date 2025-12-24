// 'development' | 'production' | 'preprod'

export const workSpaceEnvironnement: 'development' | 'preprod' | 'prod' =
  'development';

const BASE_URL: Record<'prod' | 'development' | 'preprod', string> = {
  preprod: 'http://192.162.71.169',
  prod: 'http://192.162.71.169',
  development: `http://localhost:4000/`,
};

export const env = {
  BASE_URL: BASE_URL[workSpaceEnvironnement],
  VERSION: 'v1/api',
};

export const API_ROOT = {
  admin: 'admin',
  customer: 'customer',
  order: 'order',
  documents: 'documents',
  ouvriers: 'ouvriers',
};
