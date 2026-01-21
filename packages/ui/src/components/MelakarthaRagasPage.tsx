import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paragraph, XStack, YStack, useThemeName } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';
import { MELAKARTA_RAGAS } from '../constants/melakartaRagas';

type ChakraGroup = {
  chakra: string;
  ragas: { number: number; name: string }[];
};

const CHAKRA_ORDER = [
  'Indu',
  'Netra',
  'Agni',
  'Veda',
  'Bana',
  'Rutu',
  'Rishi',
  'Vasu',
  'Brahma',
  'Disi',
  'Rudra',
  'Aditya',
];

const buildChakraGroups = (start: number, end: number) =>
  CHAKRA_ORDER.map((chakra) => ({
    chakra,
    ragas: MELAKARTA_RAGAS.filter((raga) => raga.chakra === chakra && raga.number >= start && raga.number <= end)
      .sort((a, b) => a.number - b.number)
      .map((raga) => ({ number: raga.number, name: raga.name })),
  })).filter((group) => group.ragas.length > 0);

export const MelakarthaRagasPage = () => {
  const navigate = useNavigate();
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const darkBackground = '#0B1026';
  const heroBorder = isDark ? 'rgba(255,255,255,0.12)' : '#E5D6C8';
  const cardBg = isDark ? 'rgba(255,255,255,0.06)' : '$surface';
  const cardBorder = isDark ? 'rgba(255,255,255,0.16)' : '$borderSoft';
  const mintRow = '#E3F4D1';

  const m1Groups = useMemo(() => buildChakraGroups(1, 36), []);
  const m2Groups = useMemo(() => buildChakraGroups(37, 72), []);

  const renderRagaLinks = (ragas: ChakraGroup['ragas']) => (
    <XStack flexWrap="wrap" gap="$1" flex={1}>
      {ragas.map((raga, index) => (
        <Paragraph
          key={raga.number}
          color={isDark ? '#FFFFFF' : '$textSecondary'}
          fontSize="$2"
          textDecorationLine="underline"
          onPress={() => navigate(`/melakartha-ragas/${raga.number}`)}
          style={{ cursor: 'pointer' }}
        >
          {raga.name}{index < ragas.length - 1 ? ',' : ''}
        </Paragraph>
      ))}
    </XStack>
  );

  const renderTable = (title: string, groups: ChakraGroup[]) => (
    <YStack
      backgroundColor={cardBg}
      borderWidth={1}
      borderColor={heroBorder}
      borderRadius="$radius.12"
      padding="$5"
      gap="$4"
      shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
      shadowRadius={10}
      shadowOffset={{ width: 0, height: 4 }}
      $sm={{ padding: '$4' }}
    >
      <Paragraph fontSize="$6" fontWeight="800" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
        {title}
      </Paragraph>
      <YStack borderWidth={1} borderColor={cardBorder} borderRadius="$radius.10" overflow="hidden">
        <XStack
          backgroundColor={cardBg}
          borderBottomWidth={1}
          borderColor={cardBorder}
          paddingVertical="$2"
          paddingHorizontal="$3"
          gap="$2"
        >
          <Paragraph flexBasis="30%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
            Chakra
          </Paragraph>
          <Paragraph flexBasis="70%" flexGrow={1} fontWeight="700" color={isDark ? '#FFFFFF' : '$textPrimary'} fontSize="$2">
            Ragas
          </Paragraph>
        </XStack>
        {groups.map((group, index) => (
          <XStack
            key={group.chakra}
            borderBottomWidth={1}
            borderColor={cardBorder}
            paddingVertical="$2"
            paddingHorizontal="$3"
            gap="$2"
            backgroundColor={isDark ? 'transparent' : index % 2 === 1 ? mintRow : 'transparent'}
          >
            <Paragraph flexBasis="30%" flexGrow={1} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$2">
              {group.chakra} Chakra
            </Paragraph>
            {renderRagaLinks(group.ragas)}
          </XStack>
        ))}
      </YStack>
    </YStack>
  );

  return (
    <YStack
      minHeight="100vh"
      backgroundColor={isDark ? darkBackground : '$background'}
      {...(isDark
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage: 'none',
          })}
    >
      <PageContainer>
        <YStack gap="$6" paddingVertical="$6">
          <YStack gap="$2">
            <Paragraph fontSize="$9" fontWeight="800" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
              Melakartha Ragas
            </Paragraph>
            <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24} maxWidth={900}>
              Browse the 72 Melakartha ragas grouped by chakra. Click a raga to view its janya list.
            </Paragraph>
          </YStack>

          {renderTable('Suddha Madhyamam (M1) - Melakarta Ragas 1-36', m1Groups)}
          {renderTable('Prati Madhyamam (M2) - Melakarta Ragas 37-72', m2Groups)}
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
