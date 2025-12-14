export const API_BASE_URL = 'https://localhost:44308/api';

export const API_ENDPOINTS = {
  raga: (name?: string) => `${API_BASE_URL}/raga${name ? `/${name}` : ''}`,
  searchRaga: (query: string) => `${API_BASE_URL}/raga/search/${query}`,
};
