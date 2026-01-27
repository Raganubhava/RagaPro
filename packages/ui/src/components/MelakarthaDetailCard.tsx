import { Paragraph, XStack, YStack, useThemeName } from 'tamagui';
import { AudioPlayer } from './AudioPlayer';
import { expandSwaraValue } from '../constants/swaraMap';

export type MelakarthaDetail = {
  name: string;
  chakra: string;
  note_s: string;
  note_r: string;
  note_g: string;
  note_m: string;
  note_p: string;
  note_d: string;
  note_n: string;
  audioFile?: string | null;
};

type MelakarthaDetailCardProps = {
  raga: MelakarthaDetail;
};

export const MelakarthaDetailCard = ({ raga }: MelakarthaDetailCardProps) => {
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#BFD9B7';
  const surfaceBg = isDark ? 'rgba(255,255,255,0.06)' : '#E7F7D6';
  const headerBg = isDark ? 'rgba(74,118,255,0.18)' : '#E0F2C9';
  const scaleCardBg = isDark ? 'rgba(255,255,255,0.04)' : '#F6E8CC';
  const scaleHeaderBg = isDark ? 'rgba(255,255,255,0.08)' : '#F1DCC1';
  const scaleRowBg = isDark ? 'rgba(255,255,255,0.04)' : '#FAEED7';
  const scaleRowAltBg = isDark ? 'rgba(255,255,255,0.08)' : '#F4E2C7';
  const audioSrc = raga.audioFile ? `data:audio/mpeg;base64,${raga.audioFile}` : null;

  const swaraRows = [
    { label: 'Shadjam (S)', value: raga.note_s },
    { label: 'Rishabham (R)', value: raga.note_r },
    { label: 'Gandharam (G)', value: raga.note_g },
    { label: 'Madhyamam (M)', value: raga.note_m },
    { label: 'Panchamam (P)', value: raga.note_p },
    { label: 'Daivatam (D)', value: raga.note_d },
    { label: 'Nishadam (N)', value: raga.note_n },
  ];

  return (
    <YStack
      backgroundColor={surfaceBg}
      borderRadius="$radius.10"
      borderWidth={1}
      borderColor={borderColor}
      padding="$4"
      gap="$4"
      shadowColor={isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}
      shadowRadius={8}
      shadowOffset={{ width: 0, height: 3 }}
      maxWidth={720}
      alignSelf="center"
      width="100%"
    >
      <YStack
        backgroundColor={headerBg}
        borderRadius="$radius.10"
        padding="$3"
        gap="$2"
        borderWidth={1}
        borderColor={borderColor}
      >
        <Paragraph fontSize="$7" fontWeight="800" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
          {raga.name}
        </Paragraph>
        <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
          Chakra: {raga.chakra}
        </Paragraph>
      </YStack>

      <YStack
        gap="$3"
        padding="$3"
        borderRadius="$radius.12"
        backgroundColor={scaleCardBg}
        borderWidth={1}
        borderColor={borderColor}
        shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 3 }}
      >
        <YStack
          gap="$1"
          padding="$3"
          borderRadius="$radius.10"
          backgroundColor={scaleHeaderBg}
          borderWidth={1}
          borderColor={borderColor}
        >
          <Paragraph fontSize="$6" fontWeight="800" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
            Arohana & Avarohana
          </Paragraph>
        </YStack>
        <YStack gap="$2">
          {[
            { label: 'Arohana', value: 'S R G M P N S' },
            { label: 'Avarohana', value: 'S N P M G R S' },
          ].map((row, index) => (
            <XStack
              key={row.label}
              alignItems="center"
              justifyContent="space-between"
              paddingVertical="$2"
              paddingHorizontal="$3"
              borderRadius="$radius.8"
              backgroundColor={index % 2 === 0 ? scaleRowBg : scaleRowAltBg}
              borderWidth={1}
              borderColor={borderColor}
              flexWrap="wrap"
              gap="$2"
            >
              <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$3">
                {row.label}
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
                {row.value}
              </Paragraph>
            </XStack>
          ))}
        </YStack>
        <YStack gap="$2">
          <Paragraph fontSize="$4" fontWeight="700" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
            Arohana / Avarohana Audio
          </Paragraph>
          {audioSrc ? (
            <AudioPlayer src={audioSrc} />
          ) : (
            <Paragraph fontSize="$sm" color={isDark ? '#FFFFFF' : '$textSecondary'}>
              No audio available.
            </Paragraph>
          )}
        </YStack>
      </YStack>

      <YStack
        gap="$2"
        padding="$3"
        borderRadius="$radius.12"
        backgroundColor={scaleCardBg}
        borderWidth={1}
        borderColor={borderColor}
        shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 3 }}
      >
        <YStack
          paddingVertical="$2"
          paddingHorizontal="$3"
          borderRadius="$radius.8"
          backgroundColor={scaleHeaderBg}
          borderWidth={1}
          borderColor={borderColor}
        >
          <Paragraph fontSize="$5" fontWeight="700" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
            Swarasthanas
          </Paragraph>
        </YStack>
        <XStack flexWrap="wrap" gap="$2" justifyContent="space-between">
          {swaraRows.map((row, index) => (
            <YStack
              key={row.label}
              width="49%"
              minWidth={200}
              paddingVertical="$1"
              paddingHorizontal="$2"
              borderRadius="$radius.8"
              backgroundColor={index % 2 === 0 ? scaleRowBg : scaleRowAltBg}
              borderWidth={1}
              borderColor={borderColor}
              gap="$1"
            >
              <XStack alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="$2">
                <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
                  {row.label}
                </Paragraph>
                <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
                  {row.value ? expandSwaraValue(row.value) : '--'}
                </Paragraph>
              </XStack>
            </YStack>
          ))}
        </XStack>
      </YStack>
    </YStack>
  );
};




