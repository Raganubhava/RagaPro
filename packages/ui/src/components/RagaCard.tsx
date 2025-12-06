import { useState } from 'react';
import { Button, Paragraph, XStack, YStack } from 'tamagui';
import { AnimatePresence, MotiView } from 'moti';
import { AudioPlayer } from './AudioPlayer';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Raga } from '@raga/data';

interface RagaCardProps {
  raga: Raga;
}

const RagaDetailRow = ({ label, value }: { label: string; value?: string | number | boolean | null }) => {
  if (value === undefined || value === null || value === '') return null;
  const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
  return (
    <XStack justifyContent="space-between" alignItems="flex-start" gap="$2">
      <Paragraph fontSize="$sm" color="$goldDeep" textTransform="uppercase" letterSpacing={1} flexShrink={0}>
        {label}:
      </Paragraph>
      <Paragraph fontSize="$md" color="$textPrimary" textAlign="right" flexGrow={1}>
        {displayValue}
      </Paragraph>
    </XStack>
  );
};

export const RagaCard = ({ raga }: RagaCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <YStack
      backgroundColor="$surfaceAlt"
      borderWidth={1}
      borderColor="$borderSoft"
      borderRadius="$radius.14"
      padding="$4"
      gap="$3"
      shadowColor="rgba(0,0,0,0.08)"
      shadowRadius={6}
      shadowOffset={{ height: 3, width: 0 }}
      animation="bouncy"
      width="100%"
      $sm={{ padding: '$3', borderRadius: '$radius.10' }}
    >
      {/* FIX: Clickable header for accordion */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onPress={() => setExpanded(!expanded)}
      >
        <Paragraph fontSize="$lg" fontWeight="700" color="$primary">
          {raga.ragaName}
        </Paragraph>
        <MotiView
          animate={{ rotate: expanded ? '180deg' : '0deg' }}
          transition={{ type: 'timing', duration: 200 }}
        >
          <ChevronDown size="$1.5" color="$textSecondary" />
        </MotiView>
      </XStack>

      <YStack gap="$2">
        <RagaDetailRow label="Alternative Name" value={raga.alternativeRagaName} />
        <RagaDetailRow label="Melakarta ID" value={raga.melakarthaId} />
        <RagaDetailRow label="Arohana" value={raga.arohana} />
      </YStack>

      <AnimatePresence>
        {expanded && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', duration: 300 }}
            style={{ overflow: 'hidden' }}
          >
            <YStack
              backgroundColor="$surface"
              borderRadius="$radius.10"
              padding="$3"
              gap="$2"
              marginTop="$3"
            >
              <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
              <RagaDetailRow label="Avarohana" value={raga.avarohana} />
              <RagaDetailRow label="Chakram" value={raga.chakram} />
              <RagaDetailRow label="Rasa" value={raga.rasa} />
            </YStack>
          </MotiView>
        )}
      </AnimatePresence>
    </YStack>
  );
};
