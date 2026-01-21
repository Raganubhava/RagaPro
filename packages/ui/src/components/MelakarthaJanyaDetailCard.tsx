import { Paragraph, XStack, YStack, useThemeName } from 'tamagui';
import { expandSwaraValue } from '../constants/swaraMap';

export type MelakarthaJanyaDetail = {
  janyaRaga: string;
  arohana: string;
  avarohana: string;
  rishabham: string;
  gandharam: string;
  madhyamam: string;
  panchamam: string;
  daivatam: string;
  nishadam: string;
};

type MelakarthaJanyaDetailCardProps = {
  raga: MelakarthaJanyaDetail;
};

export const MelakarthaJanyaDetailCard = ({ raga }: MelakarthaJanyaDetailCardProps) => {
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#BFD9B7';
  const surfaceBg = isDark ? 'rgba(255,255,255,0.06)' : '#E7F7D6';
  const headerBg = isDark ? 'rgba(74,118,255,0.18)' : '#E0F2C9';
  const rowBg = isDark ? 'rgba(255,255,255,0.04)' : '#EDF9D9';
  const rowAltBg = isDark ? 'rgba(255,255,255,0.08)' : '#E3F2C8';
  const scaleCardBg = isDark ? 'rgba(255,255,255,0.04)' : '#F6E8CC';
  const scaleHeaderBg = isDark ? 'rgba(255,255,255,0.08)' : '#F1DCC1';
  const scaleRowBg = isDark ? 'rgba(255,255,255,0.04)' : '#FAEED7';
  const scaleRowAltBg = isDark ? 'rgba(255,255,255,0.08)' : '#F4E2C7';

  const swaraRows = [
    { label: 'Shadjam (S)', value: 'S' },
    { label: 'Rishabham (R)', value: raga.rishabham },
    { label: 'Gandharam (G)', value: raga.gandharam },
    { label: 'Madhyamam (M)', value: raga.madhyamam },
    { label: 'Panchamam (P)', value: raga.panchamam },
    { label: 'Daivatam (D)', value: raga.daivatam },
    { label: 'Nishadam (N)', value: raga.nishadam },
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
          {raga.janyaRaga}
        </Paragraph>
        <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
          Melakartha Janya Detail
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
            { label: 'Arohana', value: raga.arohana || '--' },
            { label: 'Avarohana', value: raga.avarohana || '--' },
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
        <YStack gap="$2">
          {swaraRows.map((row, index) => (
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
              <Paragraph minWidth={150} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$3">
                {row.label}
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
                {row.value ? expandSwaraValue(row.value) : '--'}
              </Paragraph>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </YStack>
  );
};
