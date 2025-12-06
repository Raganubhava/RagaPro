import { Image, Paragraph, YStack } from 'tamagui';

interface PodcastCardProps {
  episode: {
    id: number;
    title: string;
    imageUrl: string;
  };
  onPress: () => void;
}

export const PodcastCard = ({ episode, onPress }: PodcastCardProps) => {
  return (
    <YStack
      group
      gap="$3"
      onPress={onPress}
      cursor="pointer"
      flexShrink={0}
      width={200}
      hoverStyle={{ scale: 1.03 }}
      animation="bouncy"
    >
      <Image
        source={{ uri: episode.imageUrl, width: 200, height: 200 }}
        borderRadius="$large"
        aspectRatio={1}
        $group-hover={{
          borderColor: '$gold',
          borderWidth: 2,
        }}
      />
      <Paragraph fontWeight="600" color="$textPrimary">{episode.title}</Paragraph>
    </YStack>
  );
};
