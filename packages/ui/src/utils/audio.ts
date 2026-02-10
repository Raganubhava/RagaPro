type RawFetcher = (url: string, options?: RequestInit) => Promise<Response>;

const AUDIO_EXT_PATTERN = /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i;
const BASE64_PATTERN = /^[A-Za-z0-9+/=\r\n]+$/;

const isLikelyAudioRef = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('/')
  ) {
    return true;
  }
  if (AUDIO_EXT_PATTERN.test(trimmed)) return true;
  return trimmed.length > 100 && BASE64_PATTERN.test(trimmed);
};

const extractAudioString = (payload: unknown): string | null => {
  if (!payload) return null;
  if (typeof payload === 'string') return isLikelyAudioRef(payload) ? payload.trim() : null;
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = extractAudioString(item);
      if (found) return found;
    }
    return null;
  }
  if (typeof payload !== 'object') return null;

  const obj = payload as Record<string, unknown>;
  const preferredKeys = [
    'audio',
    'audioUrl',
    'url',
    'path',
    'filePath',
    'swaraSancharamAudio',
    'swarasancharam_audio',
    'swarasancharamAudio',
  ];
  for (const key of preferredKeys) {
    const value = obj[key];
    if (typeof value === 'string' && isLikelyAudioRef(value)) return value.trim();
  }
  for (const value of Object.values(obj)) {
    const found = extractAudioString(value);
    if (found) return found;
  }
  return null;
};

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    if (typeof FileReader === 'undefined') {
      reject(new Error('FileReader is not available.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read audio blob.'));
    reader.readAsDataURL(blob);
  });

export const fetchAudioSource = async (fetchRaw: RawFetcher, url: string): Promise<string | null> => {
  try {
    const res = await fetchRaw(url);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type')?.toLowerCase() ?? '';

    if (contentType.includes('application/json')) {
      const audioPayload = (await res.json()) as unknown;
      return extractAudioString(audioPayload);
    }

    if (contentType.startsWith('audio/') || contentType.includes('application/octet-stream')) {
      const blob = await res.blob();
      return await blobToDataUrl(blob);
    }

    const text = (await res.text()).trim();
    if (!text) return null;
    if (isLikelyAudioRef(text)) {
      return text;
    }
    return null;
  } catch {
    return null;
  }
};
