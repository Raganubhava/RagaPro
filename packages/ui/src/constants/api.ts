export const API_BASE_URL = 'https://localhost:44308/api';


//export const API_BASE_URL = '/api';


export const API_ENDPOINTS = {
  raga: (name: string) => `${API_BASE_URL}/raga/${encodeURIComponent(name.trim())}`,
  hindustaniRaga: (name: string) => `${API_BASE_URL}/HindustaniRaga/${encodeURIComponent(name.trim())}`,
  swaraSancharamAudio: (name: string) =>
    `${API_BASE_URL}/raga/ssaudio?name=${encodeURIComponent(name.trim())}`,
  allRagas: `${API_BASE_URL}/raga/allragas`,
  allHindustaniRagas: `${API_BASE_URL}/raga/allhindustaniragas`,
  allMelas: `${API_BASE_URL}/raga/allmelas`,
  janyaByMela: (melaId: number) => `${API_BASE_URL}/raga/janya/${melaId}`,
  archiveWithData: `${API_BASE_URL}/Archive/with-data`,
  archive: `${API_BASE_URL}/Archive`,
  pitch: `${API_BASE_URL}/pitch`,
  feedback: `${API_BASE_URL}/feedback/submit`,
  chatBot: `${API_BASE_URL}/RagaBot`,
  chatBotHindustani: `${API_BASE_URL}/RagaBot/hindustani`,
  authLogin: `${API_BASE_URL}/auth/login`,
  signup: `${API_BASE_URL}/user/signup`,
};
