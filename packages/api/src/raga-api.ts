import { Raga } from '@raga/data';

const API_BASE_URL = 'https://localhost:44308/api';

export const ragaAPI = {
  getRaga: async (ragaName: string): Promise<Raga> => {
    const response = await fetch(`${API_BASE_URL}/raga/${ragaName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch raga: ${response.statusText}`);
    }
    
    return response.json();
  },

  getAllRagas: async (): Promise<Raga[]> => {
    const response = await fetch(`${API_BASE_URL}/raga`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ragas: ${response.statusText}`);
    }
    
    return response.json();
  },

  searchRagas: async (query: string): Promise<Raga[]> => {
    const response = await fetch(`${API_BASE_URL}/raga/search/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to search ragas: ${response.statusText}`);
    }
    
    return response.json();
  },
};
