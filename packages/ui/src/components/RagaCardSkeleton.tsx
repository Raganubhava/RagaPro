import { YStack } from 'tamagui';

export const RagaCardSkeleton = () => {
  return (
    <YStack
      backgroundColor="$surfaceAlt"
      borderRadius="$radius.14" // large radius
      padding="$4"
      borderWidth={1}
      borderColor="$borderSoft"
      animation="bouncy" // Using bouncy for a subtle pulse effect
      opacity={0.7}
      gap="$3"
      width="100%"
      $sm={{ padding: '$3', borderRadius: '$radius.10' }} // medium radius
      $md={{ padding: '$4' }}
    >
      {/* Title Placeholder */}
      <YStack height={24} width="70%" backgroundColor="$borderLight" borderRadius="$radius.6" />

      {/* Collapsed View Placeholders */}
      <YStack gap="$2" marginTop="$3">
        <YStack height={18} width="40%" backgroundColor="$borderLight" borderRadius="$radius.6" />
        <YStack height={18} width="80%" backgroundColor="$borderLight" borderRadius="$radius.6" />
        <YStack height={18} width="60%" backgroundColor="$borderLight" borderRadius="$radius.6" />
        <YStack height={18} width="50%" backgroundColor="$borderLight" borderRadius="$radius.6" />
      </YStack>

      {/* Button Placeholder */}
      <YStack height={40} width="100%" backgroundColor="$borderLight" borderRadius="$radius.6" marginTop="$3" />
    </YStack>
  );
};
