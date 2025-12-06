import { Play, Pause } from '@tamagui/lucide-icons';
import { useState, useRef, useEffect } from 'react';
import { Button, Paragraph, Progress, XStack, YStack } from 'tamagui';

interface AudioPlayerProps {
  src: string;
}

export const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioData);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioData);
    };
  }, []);

  return (
    <YStack gap="$3" width="100%" padding="$3" backgroundColor="$surface" borderRadius="$radius.10">
      <audio ref={audioRef} src={src} preload="metadata" />
      <XStack alignItems="center" gap="$3">
        <Button
          icon={isPlaying ? Pause : Play}
          onPress={togglePlay}
          circular
          size="$3"
          backgroundColor="$surfaceAlt"
          borderWidth={1}
          borderColor="$borderSoft"
        />
        <YStack flex={1} gap="$1">
          <Progress value={progress} backgroundColor="$borderLight">
            <Progress.Indicator animation="bouncy" backgroundColor="$gold" />
          </Progress>
          <XStack justifyContent="space-between">
            <Paragraph size="$1" color="$textSecondary">{formatTime(currentTime)}</Paragraph>
            <Paragraph size="$1" color="$textSecondary">{formatTime(duration)}</Paragraph>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
};
