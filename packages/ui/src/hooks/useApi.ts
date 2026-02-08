import { useCallback, useEffect, useMemo, useRef } from 'react';

type Fetcher = <T = any>(url: string, options?: RequestInit) => Promise<T>;
type RawFetcher = (url: string, options?: RequestInit) => Promise<Response>;

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

  const fetchJson: Fetcher = useCallback(async (url, options) => {
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
  }, []);

  const fetchRaw: RawFetcher = useCallback(async (url, options) => {
    const controller = new AbortController();
    controllers.current.push(controller);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      controllers.current = controllers.current.filter((c) => c !== controller);
    }
  }, []);

  return useMemo(() => ({ fetchJson, fetchRaw }), [fetchJson, fetchRaw]);
};
