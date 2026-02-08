type RawFetcher = (url: string, options?: RequestInit) => Promise<Response>;

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
      if (typeof audioPayload === 'string') return audioPayload;
      if (audioPayload && typeof (audioPayload as { audio?: unknown }).audio === 'string') {
        return (audioPayload as { audio: string }).audio;
      }
      if (
        audioPayload &&
        typeof (audioPayload as { swaraSancharamAudio?: unknown }).swaraSancharamAudio === 'string'
      ) {
        return (audioPayload as { swaraSancharamAudio: string }).swaraSancharamAudio;
      }
      return null;
    }

    if (contentType.startsWith('audio/')) {
      const blob = await res.blob();
      return await blobToDataUrl(blob);
    }

    const text = (await res.text()).trim();
    if (!text) return null;
    if (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:')) {
      return text;
    }
    return text;
  } catch {
    return null;
  }
};
