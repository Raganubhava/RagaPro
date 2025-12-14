import { useEffect, useRef } from 'react';

type Fetcher = <T = any>(url: string, options?: RequestInit) => Promise<T>;

// Lightweight client with abort on unmount and per-call cancellation
export const useApiClient = () => {
  const controllers = useRef<AbortController[]>([]);

  useEffect(
    () => () => {
      controllers.current.forEach((c) => c.abort());
      controllers.current = [];
    },
    []
  );

  const fetchJson: Fetcher = async (url, options) => {
    const controller = new AbortController();
    controllers.current.push(controller);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      return res.json();
    } finally {
      controllers.current = controllers.current.filter((c) => c !== controller);
    }
  };

  return { fetchJson };
};
