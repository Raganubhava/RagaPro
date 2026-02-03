import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Paragraph, XStack, YStack } from 'tamagui';
import { PageContainer } from 'ui';

const PRACTICE_AUDIO = '/Kalyani1_chunk.mp3';
const LAUNCHING_SOON = 'Launching soon';

export const KalyaniPracticePage = () => {
  const [recording, setRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const canRecord = useMemo(() => typeof navigator !== 'undefined' && !!navigator.mediaDevices, []);

  const startRecording = useCallback(async () => {
    setError(null);
    setResult(null);
    setStatus('Requesting microphone access...');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Microphone is not available in this browser.');
      setStatus(null);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        setStatus('Recording captured. Ready to preview.');
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setStatus('Recording...');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to access microphone.';
      setError(msg);
      setStatus(null);
    }
  }, []);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    recorder.stop();
    recorder.stream.getTracks().forEach((track) => track.stop());
    setRecording(false);
  }, []);

  const uploadRecording = useCallback(async () => {
    setError(null);
    setResult(LAUNCHING_SOON);
  }, []);

  const glitterCss = `
    @keyframes launchShimmer {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
  `;

  return (
    <YStack minHeight="100vh" backgroundColor="#0B1538" color="#FFFFFF">
      <PageContainer>
        <style>{glitterCss}</style>
        <YStack gap="$6" paddingVertical="$7" maxWidth={900} alignSelf="center" width="100%">
          <YStack gap="$2">
            <Paragraph fontFamily="$heading" fontSize="$8" color="#FFFFFF">
              Kalyani Practice
            </Paragraph>
            <Paragraph
              fontSize="$8"
              fontWeight="900"
              style={{
                background:
                  'linear-gradient(90deg, #fff8cf 0%, #ffe17a 30%, #ffffff 50%, #ffd369 70%, #fff8cf 100%)',
                backgroundSize: '220% 220%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'launchShimmer 1.8s linear infinite',
                textShadow: '0 0 16px rgba(255, 230, 138, 0.28)',
              }}
            >
              {LAUNCHING_SOON}
            </Paragraph>
            <Paragraph color="#D7DCEE" fontSize="$4" lineHeight={26}>
              Listen to the arohana/avarohana chunk, sing it back, and submit for AI feedback.
            </Paragraph>
          </YStack>

          <YStack
            padding="$5"
            borderRadius="$radius.12"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.18)"
            backgroundColor="rgba(255,255,255,0.06)"
            gap="$4"
          >
            <Paragraph fontWeight="700" fontSize="$5" color="#FFFFFF">
              Listen
            </Paragraph>
            <audio controls src={PRACTICE_AUDIO} style={{ width: '100%' }} />
          </YStack>

          <YStack
            padding="$5"
            borderRadius="$radius.12"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.18)"
            backgroundColor="rgba(255,255,255,0.06)"
            gap="$4"
          >
            <Paragraph fontWeight="700" fontSize="$5" color="#FFFFFF">
              Record Your Singing
            </Paragraph>
            {!canRecord && (
              <Paragraph color="#D7DCEE">Recording is not supported in this browser.</Paragraph>
            )}
            <XStack gap="$3" flexWrap="wrap">
              <Button
                disabled={!canRecord || recording}
                onPress={startRecording}
                backgroundColor="$primary"
                color="$background"
                hoverStyle={{ backgroundColor: '$primaryActive', color: '$background' }}
                pressStyle={{ backgroundColor: '$primaryActive', color: '$background' }}
              >
                Start Recording
              </Button>
              <Button
                disabled={!recording}
                onPress={stopRecording}
                backgroundColor="rgba(255,255,255,0.12)"
                color="#FFFFFF"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.24)"
                hoverStyle={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#FFFFFF' }}
                pressStyle={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#FFFFFF' }}
              >
                Stop
              </Button>
            </XStack>
            {recording && (
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
            {status && <Paragraph color="#D7DCEE">{status}</Paragraph>}
            {recordedUrl && (
              <YStack
                gap="$2"
                padding="$3"
                borderRadius="$radius.10"
                backgroundColor="rgba(255,255,255,0.04)"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.18)"
              >
                <Paragraph fontWeight="700" color="#FFFFFF">
                  Preview recording
                </Paragraph>
                <audio controls src={recordedUrl} style={{ width: '100%' }} />
              </YStack>
            )}
          </YStack>

          <YStack
            padding="$5"
            borderRadius="$radius.12"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.18)"
            backgroundColor="rgba(255,255,255,0.06)"
            gap="$3"
          >
            <Paragraph fontWeight="700" fontSize="$5" color="#FFFFFF">
              AI Comparison
            </Paragraph>
            <Button
              onPress={uploadRecording}
              backgroundColor="$primary"
              color="$background"
              hoverStyle={{ backgroundColor: '$primaryActive', color: '$background' }}
              pressStyle={{ backgroundColor: '$primaryActive', color: '$background' }}
            >
              Compare Recording
            </Button>
            {result && (
              <Paragraph
                fontWeight="800"
                style={{
                  background:
                    'linear-gradient(90deg, #fff8cf 0%, #ffe17a 30%, #ffffff 50%, #ffd369 70%, #fff8cf 100%)',
                  backgroundSize: '220% 220%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'launchShimmer 1.8s linear infinite',
                }}
              >
                {result}
              </Paragraph>
            )}
            {error && <Paragraph color="#FFB4B4">{error}</Paragraph>}
          </YStack>
        </YStack>
      </PageContainer>
    </YStack>
  );
};
