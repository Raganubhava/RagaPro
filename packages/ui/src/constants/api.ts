export const API_BASE_URL = 'https://localhost:44308/api';

export const API_ENDPOINTS = {
  raga: (name: string) => `${API_BASE_URL}/raga/${encodeURIComponent(name)}`,
  hindustaniRaga: (name: string) => `${API_BASE_URL}/HindustaniRaga/${encodeURIComponent(name)}`,
  archiveWithData: `${API_BASE_URL}/Archive/with-data`,
  archive: `${API_BASE_URL}/Archive`,
  pitch: `${API_BASE_URL}/pitch`,
  feedback: `${API_BASE_URL}/feedback/submit`,
  chatBot: `${API_BASE_URL}/RagaBot`,
  authLogin: `${API_BASE_URL}/auth/login`,
  signup: `${API_BASE_URL}/user/signup`,
};
