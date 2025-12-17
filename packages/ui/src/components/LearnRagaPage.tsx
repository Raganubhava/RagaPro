import React, { useRef, useState } from 'react';
import { Button, Paragraph, XStack, YStack, useThemeName } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Mic, Square } from '@tamagui/lucide-icons';
import { Footer } from './Footer';
import { API_ENDPOINTS } from '../constants/api';

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
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');
  const heroBorder = isNavy ? 'rgba(255,255,255,0.12)' : '#E5D6C8';

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
      const res = await fetch(API_ENDPOINTS.pitch, {
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
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      color={isNavy ? '#F5F7FF' : '$textPrimary'}
      {...(isNavy
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(255,186,120,0.25), transparent 40%), radial-gradient(circle at 82% -4%, rgba(103,174,255,0.2), transparent 38%), linear-gradient(180deg, #f9f5ef 0%, #f3eee7 100%)",
          })}
    >
      <PageContainer>
        <YStack
          gap="$6"
          maxWidth={1000}
          alignSelf="center"
          width="100%"
          paddingVertical="$6"
          $sm={{
            paddingHorizontal: '$3',
            gap: '$5',
          }}
        >
          <YStack
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.92)'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isNavy ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 6 }}
            gap="$4"
          >
            <Paragraph fontFamily="$heading" fontSize="$9" color={isNavy ? '#FFFFFF' : '$primaryDeep'}>
              Sruti detection
            </Paragraph>
            <Paragraph fontSize="$4" color="$textSecondary" lineHeight={26}>
              Record a short sample or upload audio; we will detect your base note and sruti with instant feedback.
            </Paragraph>
            <XStack gap="$3" flexWrap="wrap">
              {[
                'Works with mic or uploaded mp3/webm',
                'Detects note + sruti in seconds',
                'Keep practicing with quick retries',
              ].map((item) => (
                <Paragraph
                  key={item}
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '#FFFFFF'}
                  borderWidth={1}
                  borderColor={heroBorder}
                  color="$textSecondary"
                  fontSize="$3"
                >
                  {item}
                </Paragraph>
              ))}
            </XStack>
          </YStack>

          <XStack
            gap="$4"
            alignItems="stretch"
            flexWrap="wrap"
            $sm={{
              flexDirection: 'column',
              gap: '$3',
            }}
          >
            <YStack
              flex={1}
              gap="$3"
              padding="$5"
              backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surface'}
              borderRadius="$radius.12"
              borderWidth={1}
              borderColor={heroBorder}
              minWidth={320}
              shadowColor={isNavy ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              $sm={{
                minWidth: '100%',
                padding: '$4',
              }}
            >
              <Paragraph fontWeight="800" color={isNavy ? '#FFFFFF' : '$primaryDeep'} fontSize="$5">
                Record or upload
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
              {isRecording && (
                <XStack
                  gap="$2"
                  alignItems="center"
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor="rgba(211,47,47,0.12)"
                  borderWidth={1}
                  borderColor="rgba(211,47,47,0.4)"
                >
                  <Paragraph color="#d32f2f" fontWeight="800">
                    ● Recording in progress
                  </Paragraph>
                </XStack>
              )}
              <Paragraph fontSize="$3" color="$textSecondary">
                Or upload an audio file (mp3/webm):
              </Paragraph>
              <XStack gap="$3" alignItems="center" flexWrap="wrap">
                <Button
                  backgroundColor="$secondary"
                  color="$text"
                  onPress={() => fileInputRef.current?.click()}
                  borderWidth={1}
                  borderColor={heroBorder}
                  hoverStyle={{ backgroundColor: '$secondaryHover', borderColor: '$primaryDeep', color: '$text' }}
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
              <Button
                backgroundColor="$primary"
                color="$surface"
                onPress={handleSubmit}
                disabled={isRecording}
                alignSelf="flex-start"
                minWidth={200}
                paddingHorizontal="$6"
                hoverStyle={{ backgroundColor: '$primaryHover' }}
              >
                Submit for Sruti Detection
              </Button>
              {status && <Paragraph color="$textSecondary">{status}</Paragraph>}
              {error && <Paragraph color="$primaryActive">{error}</Paragraph>}
              {result && (
                <YStack
                  gap="$2"
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surfaceAlt'}
                  borderWidth={1}
                  borderColor={heroBorder}
                >
                  <Paragraph fontWeight="700" color="$primary" fontSize="$5">
                    Detected Sruti
                  </Paragraph>
                  <Paragraph color="$textPrimary">Note: {result.note}</Paragraph>
                  <Paragraph color="$textPrimary">Sruti: {result.sruti}</Paragraph>
                </YStack>
              )}
            </YStack>

            <YStack
              width={280}
              minHeight={320}
              backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surface'}
              borderRadius="$radius.12"
              borderWidth={1}
              borderColor={heroBorder}
              overflow="hidden"
              alignItems="stretch"
              justifyContent="space-between"
              shadowColor={isNavy ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              $sm={{
                width: '100%',
                minHeight: 260,
              }}
            >
              <img
                src="/deekshitar.jpg"
                alt="Deekshitar"
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                }}
              />
              <YStack padding="$4" gap="$2">
                <Paragraph fontWeight="800" color={isNavy ? '#FFFFFF' : '$primaryDeep'}>
                  Quick tips
                </Paragraph>
                <Paragraph color="$textSecondary" fontSize="$3">
                  Tip: Record in a quiet space and keep samples 5-10 seconds. Use sa/pa for clearer pitch.
                </Paragraph>
                <Paragraph color="$textSecondary" fontSize="$3">
                  Uploads support common audio formats. We&apos;ll report note + sruti in one pass.
                </Paragraph>
              </YStack>
            </YStack>
          </XStack>
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
