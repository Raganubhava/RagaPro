import { useState } from 'react';
import { API_ENDPOINTS } from '../constants/api';

export const useSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const submitSignup = async (payload: {
    loginName: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(API_ENDPOINTS.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      setMessage('Signup successful.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, message, submitSignup, setError, setMessage };
};
