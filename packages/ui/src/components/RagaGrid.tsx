import { XStack, YStack } from 'tamagui';
import { RagaCard } from './RagaCard';

interface RagaGridProps {
  ragas: RagaCardProps['raga'][];
}

export const RagaGrid = ({ ragas }: RagaGridProps) => {
  return (
    <XStack
      flexWrap="wrap"
      gap="$6"
      justifyContent="center"
      $md={{ gap: '$4' }}
      $sm={{ flexDirection: 'column', alignItems: 'center' }}
    >
      {ragas.map((raga) => (
        <YStack
          key={raga.id}
          flexBasis="calc(50% - $6)"
          $md={{ flexBasis: '100%' }}
          $sm={{ flexBasis: '100%' }}
          alignItems="center"
        >
          <RagaCard raga={raga} />
        </YStack>
      ))}
    </XStack>
  );
};
