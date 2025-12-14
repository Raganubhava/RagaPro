export const get = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export * from './api-constants';
export * from './raga-api';
