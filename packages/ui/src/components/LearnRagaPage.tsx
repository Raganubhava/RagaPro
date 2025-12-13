import React, { useRef, useState } from 'react';
import { Button, Input, Paragraph, TextArea, XStack, YStack } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Mic, Square } from '@tamagui/lucide-icons';
import { Footer } from './Footer';

const API_BASE_URL = 'https://localhost:44308/api';
const PITCH_ENDPOINT = `${API_BASE_URL}/pitch`;

export const LearnRagaPage = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState<{ note: string; sruti: string } | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startRecording = async () => {
    setError(null);
    setStatus('Requesting microphone access...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedBlob(blob);
        setSelectedFile(null);
        setIsRecording(false);
        setStatus('Recording captured. Submit to analyze sruti.');
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setStatus('Recording...');
    } catch (err) {
      setError('Microphone permission denied or unavailable.');
      setIsRecording(false);
      setStatus(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecordedBlob(null);
    setResult(null);
    setStatus(null);
    setError(null);
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    setStatus(null);
    setError(null);
    setResult(null);

    const blobToSend = recordedBlob || selectedFile;
    if (!blobToSend) {
      setError('Please record or choose an audio file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', blobToSend, 'input.webm');

    try {
      setStatus('Analyzing pitch...');
      const res = await fetch(PITCH_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult({ note: data.note, sruti: data.sruti });
      setStatus('Sruti detected successfully.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      setError(`Could not analyze sruti. ${msg}`);
    }
  };

  return (
    <YStack minHeight="100vh" justifyContent="space-between" width="100%">
      <PageContainer>
        <YStack gap="$5" maxWidth={820} alignSelf="center" width="100%">
        <YStack gap="$2">
          <Paragraph fontFamily="$heading" fontSize="$9" color="$primary">
            Sruti detection
          </Paragraph>
          <Paragraph fontSize="$4" color="$textSecondary">
            Record a short sample (or upload an mp3) and we’ll detect your base note and sruti.
          </Paragraph>
        </YStack>

        <XStack gap="$4" alignItems="stretch" flexWrap="wrap">
          <YStack flex={1} gap="$3" padding="$4" backgroundColor="$surfaceAlt" borderRadius="$radius.10" borderWidth={1} borderColor="$borderSoft" minWidth={320}>
            <Paragraph fontWeight="700" color="$primary">
              Record your voice
            </Paragraph>
            <XStack gap="$3" alignItems="center" flexWrap="wrap">
              <Button
                icon={Mic}
                backgroundColor="#d32f2f"
                color="#fff"
                onPress={startRecording}
                disabled={isRecording}
                hoverStyle={{ backgroundColor: '#c62828' }}
              >
                Start Recording
              </Button>
              <Button
                icon={Square}
                backgroundColor="#757575"
                color="#fff"
                onPress={stopRecording}
                disabled={!isRecording}
                hoverStyle={{ backgroundColor: '#616161' }}
              >
                Stop
              </Button>
            </XStack>
            <Paragraph fontSize="$3" color="$textSecondary">
              Or upload an audio file (mp3/webm):
            </Paragraph>
            <XStack gap="$3" alignItems="center" flexWrap="wrap">
              <Button
                backgroundColor="$primary"
                color="$surface"
                onPress={() => fileInputRef.current?.click()}
                hoverStyle={{ backgroundColor: '$primaryHover' }}
              >
                Choose File
              </Button>
              <Paragraph color="$textSecondary" fontSize="$3">
                {selectedFile ? selectedFile.name : recordedBlob ? 'Recording ready to submit' : 'No file selected'}
              </Paragraph>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </XStack>
          </YStack>
          <YStack
            width={240}
            minHeight={240}
            backgroundColor="$surfaceAlt"
            borderRadius="$radius.10"
            borderWidth={1}
            borderColor="$borderSoft"
            overflow="hidden"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src="/deekshitar.jpg"
              alt="Deekshitar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </YStack>
        </XStack>

        <YStack gap="$3">
          <Button
            backgroundColor="$primary"
            color="$surface"
            onPress={handleSubmit}
            disabled={isRecording}
            alignSelf="flex-start"
            minWidth={160}
            paddingHorizontal="$6"
            hoverStyle={{ backgroundColor: '$primaryHover' }}
          >
            Submit for Sruti Detection
          </Button>
          {status && (
            <Paragraph color="$textSecondary">
              {status}
            </Paragraph>
          )}
          {error && (
            <Paragraph color="$primaryActive">
              {error}
            </Paragraph>
          )}
          {result && (
            <YStack gap="$2" padding="$3" borderRadius="$radius.8" backgroundColor="$surfaceAlt" borderWidth={1} borderColor="$borderSoft">
              <Paragraph fontWeight="700" color="$primary" fontSize="$5">
                Detected Sruti
              </Paragraph>
              <Paragraph color="$textPrimary">Note: {result.note}</Paragraph>
              <Paragraph color="$textPrimary">Sruti: {result.sruti}</Paragraph>
            </YStack>
          )}
        </YStack>
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
