import { Paragraph, YStack } from 'tamagui';
import { AudioPlayer } from './AudioPlayer';

interface PodcastPlayerProps {
  episode: {
    title: string;
    audioSrc: string;
  };
}

export const PodcastPlayer = ({ episode }: PodcastPlayerProps) => {
  return (
    <YStack
      width="100%"
      padding="$4"
      backgroundColor="$surfaceAlt"
      borderRadius="$large"
      borderWidth={1}
      borderColor="$borderSoft"
      gap="$3"
    >
      <Paragraph fontFamily="$heading" fontSize="$6" color="$primary">
        Now Playing: {episode.title}
      </Paragraph>
      <AudioPlayer src={episode.audioSrc} />
    </YStack>
  );
};
