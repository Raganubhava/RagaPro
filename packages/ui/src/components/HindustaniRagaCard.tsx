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
    <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
      <Paragraph fontWeight="700" color="$textSecondary" minWidth={120}>
        {label}
      </Paragraph>
      <Paragraph flex={1} color="$textPrimary">
        {value}
      </Paragraph>
    </XStack>
  );
};

export const HindustaniRagaCard = ({ raga }: { raga: HindustaniRaga }) => {
  return (
    <YStack
      padding="$4"
      backgroundColor="$surface"
      borderRadius="$10"
      borderWidth={1}
      borderColor="$borderLight"
      gap="$3"
    >
      <YStack gap="$1">
        <Paragraph fontSize="$7" fontWeight="800" color="$primary">
          {raga.ragaName}
        </Paragraph>
        {raga.alternateRagaName && (
          <Paragraph fontSize="$4" color="$textSecondary">
            Also known as {raga.alternateRagaName}
          </Paragraph>
        )}
        {raga.thaat && (
          <Paragraph fontSize="$3" color="$textSoft">
            Thaat: {raga.thaat}
          </Paragraph>
        )}
      </YStack>

      <YStack gap="$2">
        <InfoRow label="Arohan" value={raga.arohan} />
        <InfoRow label="Avarohan" value={raga.avarohan} />
        <InfoRow label="Vaadi" value={raga.vaadi} />
        <InfoRow label="Samvaadi" value={raga.samvaadi} />
        <InfoRow label="Pakad" value={raga.pakad} />
        <InfoRow label="Samay" value={raga.samay} />
        <InfoRow label="Description" value={raga.description} />
        <InfoRow label="Compositions" value={raga.compositions} />
      </YStack>
    </YStack>
  );
};
