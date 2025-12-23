import { useEffect, useState } from 'react';
import { Paragraph, XStack, YStack, Button } from 'tamagui';
import { AnimatePresence, MotiView } from 'moti';
import { ChevronDown } from '@tamagui/lucide-icons';

export interface HindustaniRaga {
  id: number;
  ragaName: string;
  alternateRagaName?: string;
  arohan?: string;
  avarohan?: string;
  thaat?: string;
  rishab?: string;
  gandhar?: string;
  madhyam?: string;
  pancham?: string;
  daivat?: string;
  nishad?: string;
  vaadi?: string;
  samvaadi?: string;
  anyaswar?: string;
  pakad?: string;
  samay?: string;
  compositions?: string;
  description?: string;
  audioFile?: string | null;
}

interface InfoRowProps {
  label: string;
  value?: string | null;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  const displayValue = value && value !== '' ? value : '—';
  return (
    <XStack justifyContent="space-between" alignItems="flex-start" gap="$2">
      <Paragraph fontSize="$sm" color="$goldDeep" textTransform="uppercase" letterSpacing={1} flexShrink={0}>
        {label}:
      </Paragraph>
      <Paragraph fontSize="$md" color="$textPrimary" flex={1} textAlign="right">
        {displayValue}
      </Paragraph>
    </XStack>
  );
};

export const HindustaniRagaCard = ({ raga, onAskAI }: { raga: HindustaniRaga; onAskAI?: () => void }) => {
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    setExpanded(true);
  }, [raga]);
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
      maxWidth={820}
      alignSelf="center"
      borderLeftWidth={3}
      borderLeftColor="$primary"
      $sm={{ padding: '$3', borderRadius: '$radius.10' }}
    >
      <XStack justifyContent="space-between" alignItems="center" cursor="pointer" onPress={() => setExpanded(!expanded)}>
        <YStack gap="$1">
          <Paragraph fontSize="$lg" fontWeight="700" color="$primary">
            {raga.ragaName}
          </Paragraph>
          {raga.alternateRagaName && (
            <Paragraph fontSize="$4" color="$textSecondary">
              Also known as {raga.alternateRagaName}
            </Paragraph>
          )}
        </YStack>
        <MotiView animate={{ rotate: expanded ? '180deg' : '0deg' }} transition={{ type: 'timing', duration: 200 }}>
          <ChevronDown size="$1.5" color="$textSecondary" />
        </MotiView>
      </XStack>

      <AnimatePresence>
        {expanded && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', duration: 300 }}
            style={{ overflow: 'hidden', width: '100%' }}
          >
            <YStack gap="$3" backgroundColor="$surface" borderRadius="$radius.10" padding="$3" marginTop="$3">
              <YStack gap="$1">
                <InfoRow label="Thaat" value={raga.thaat} />
                <InfoRow label="Samay" value={raga.samay} />
              </YStack>
              <YStack borderBottomWidth={1} borderColor="$borderSoft" />

              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Scales
                </Paragraph>
                <InfoRow label="Arohan" value={raga.arohan} />
                <InfoRow label="Avarohan" value={raga.avarohan} />
              </YStack>
              <YStack borderBottomWidth={1} borderColor="$borderSoft" />

              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Roles
                </Paragraph>
                <InfoRow label="Vaadi" value={raga.vaadi} />
                <InfoRow label="Samvaadi" value={raga.samvaadi} />
                <InfoRow label="Pakad" value={raga.pakad} />
              </YStack>
              <YStack borderBottomWidth={1} borderColor="$borderSoft" />

              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Notes
                </Paragraph>
                <InfoRow label="Description" value={raga.description} />
                <InfoRow label="Compositions" value={raga.compositions} />
              </YStack>
            </YStack>
          </MotiView>
        )}
      </AnimatePresence>

      {onAskAI && (
        <Button
          size="$3"
          backgroundColor="$primary"
          color="$background"
          alignSelf="flex-start"
          onPress={onAskAI}
          hoverStyle={{ backgroundColor: '$primaryHover' }}
        >
          Ask AI about this raga
        </Button>
      )}
    </YStack>
  );
};
