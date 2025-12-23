import { Paragraph, XStack, YStack } from 'tamagui';

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
  if (!value) return null;
  return (
    <XStack justifyContent="space-between" alignItems="flex-start" gap="$2">
      <Paragraph fontSize="$sm" color="$goldDeep" textTransform="uppercase" letterSpacing={1} flexShrink={0}>
        {label}:
      </Paragraph>
      <Paragraph fontSize="$md" color="$textPrimary" flex={1} textAlign="right">
        {value}
      </Paragraph>
    </XStack>
  );
};

export const HindustaniRagaCard = ({ raga }: { raga: HindustaniRaga }) => {
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

      <YStack gap="$3" backgroundColor="$surface" borderRadius="$radius.10" padding="$3">
        <YStack gap="$1">
          {raga.thaat && <InfoRow label="Thaat" value={raga.thaat} />}
          {raga.samay && <InfoRow label="Samay" value={raga.samay} />}
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
    </YStack>
  );
};
