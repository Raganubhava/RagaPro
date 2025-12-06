import { Paragraph, XStack, YStack } from 'tamagui';
import { RagaCard } from './RagaCard';
import { Raga } from '@raga/data';

interface TopRagasGridProps {
  ragas: Raga[];
}

export const TopRagasGrid = ({ ragas }: TopRagasGridProps) => {
  const top5Ragas = ragas.slice(0, 5);

  return (
    <YStack
      width="100%"
      marginHorizontal="auto"
      gap="$6"
      paddingHorizontal="$4"
    >
      <YStack gap="$3">
        <Paragraph fontSize="$xl" fontWeight="700" color="$primary">Top 5 Ragas</Paragraph>
        <Paragraph fontSize="$sm" color="$textSecondary">Popular ragas you can explore quickly.</Paragraph>
      </YStack>

      <XStack
        flexWrap="wrap"
        justifyContent="center"
        gap="$6"
        width="100%"
        className="raga-grid"
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
        {top5Ragas.map((r) => (
          <YStack
            key={r.id}
            flexBasis="calc(33.333% - $6)"
            $md={{ flexBasis: 'calc(50% - $4)' }}
            $sm={{ flexBasis: '100%' }}
            maxWidth={400}
          >
            <RagaCard raga={r} />
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
};
