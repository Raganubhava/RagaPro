import { XStack, YStack, Paragraph } from 'tamagui'; // <-- FIX: Added Paragraph import
import { RagaCardSkeleton } from './RagaCardSkeleton';

export const RagaCardSkeletonGrid = () => {
  return (
    <YStack width="100%" gap="$6">
      <YStack gap="$3">
        <Paragraph fontSize="$xl" fontWeight="700" color="$primary">Top 5 Ragas</Paragraph>
        <Paragraph fontSize="$sm" color="$textSecondary">Popular ragas you can explore quickly.</Paragraph>
      </YStack>
      <XStack
        flexWrap="wrap"
        justifyContent="center"
        gap="$6"
        width="100%"
        $lg={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '$6',
        }}
        $md={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '$4',
        }}
        $sm={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: '$3',
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <YStack
            key={i}
            flexBasis="calc(33.333% - $6)" // LG: 3 columns
            $md={{ flexBasis: 'calc(50% - $4)' }} // MD: 2 columns
            $sm={{ flexBasis: '100%' }} // SM: 1 column
            maxWidth={400} // Max width for individual cards in grid
          >
            <RagaCardSkeleton />
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
};
