// ALWAYS
export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  raga: (name?: string) => `${API_BASE_URL}/raga${name ? `/${name}` : ''}`,
  searchRaga: (query: string) => `${API_BASE_URL}/raga/search/${query}`,
};
