import { useEffect, useMemo, useState } from 'react';
import { Paragraph, XStack, YStack, Button } from 'tamagui';
import { AnimatePresence, MotiView } from 'moti';
import { AudioPlayer } from './AudioPlayer';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Raga } from '@raga/data';
import { expandSwaraValue } from '../constants/swaraMap';
import { MELAKARTA_BY_NUMBER } from '../constants/melakartaRagas';

interface RagaCardProps {
  raga: Raga;
  onAskAI?: () => void;
}

const RagaDetailRow = ({ label, value }: { label: string; value?: string | number | boolean | null }) => {
  const displayValueRaw = value === undefined || value === null || value === '' ? '—' : value;
  const displayValue = typeof displayValueRaw === 'boolean' ? (displayValueRaw ? 'Yes' : 'No') : displayValueRaw;
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

const InfoChip = ({ label, value }: { label: string; value?: string | number | boolean | null }) => {
  if (value === undefined || value === null || value === '') return null;
  const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value;
  return (
    <XStack
      paddingVertical="$2"
      paddingHorizontal="$3"
      backgroundColor="$secondary"
      borderRadius="$radius.6"
      borderWidth={1}
      borderColor="$goldDeep"
      gap="$2"
    >
      <Paragraph fontSize="$2" color="$textSecondary" fontWeight="600">
        {label}:
      </Paragraph>
      <Paragraph fontSize="$2" color="$textPrimary" fontWeight="700">
        {displayValue}
      </Paragraph>
    </XStack>
  );
};

export const RagaCard = ({ raga, onAskAI }: RagaCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const [showArohanaTip, setShowArohanaTip] = useState(false);
  const [showAvarohanaTip, setShowAvarohanaTip] = useState(false);
  const [roleTips, setRoleTips] = useState({
    vadi: false,
    samvadi: false,
    graha: false,
    nyasa: false,
    jeeva: false,
    ragaType: false,
  });
  const audioSrc = useMemo(() => {
    if (!raga.audioFile) return null;
    // Default to mp3; adjust if API returns mime type in the future.
    return `data:audio/mpeg;base64,${raga.audioFile}`;
  }, [raga.audioFile]);
  useEffect(() => {
    setExpanded(true);
  }, [raga]);
  const hasShadjam = useMemo(() => {
    const fields = [
      raga.rishabham,
      raga.gandharam,
      raga.madhyamam,
      raga.panchamam,
      raga.daivatam,
      raga.nishadam,
    ];
    return fields.some((val) => val?.toUpperCase().includes('S'));
  }, [raga.daivatam, raga.gandharam, raga.madhyamam, raga.nishadam, raga.panchamam, raga.rishabham]);
  const melakartaLabel = useMemo(() => {
    if (!raga.melakarthaId) return undefined;
    const entry = MELAKARTA_BY_NUMBER.get(raga.melakarthaId);
    if (!entry) return String(raga.melakarthaId);
    return `${entry.number} ${entry.name}`;
  }, [raga.melakarthaId]);
  const chakraLabel = useMemo(() => {
    if (!raga.melakarthaId) return undefined;
    const entry = MELAKARTA_BY_NUMBER.get(raga.melakarthaId);
    if (!entry) return raga.chakram;
    const chakraNumber = Math.ceil(entry.number / 6);
    const suffix =
      chakraNumber % 10 === 1 && chakraNumber % 100 !== 11
        ? 'st'
        : chakraNumber % 10 === 2 && chakraNumber % 100 !== 12
        ? 'nd'
        : chakraNumber % 10 === 3 && chakraNumber % 100 !== 13
        ? 'rd'
        : 'th';
    return `${chakraNumber}${suffix} Chakram (${entry.chakra})`;
  }, [raga.chakram, raga.melakarthaId]);

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
      {/* Clickable header for accordion */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onPress={() => setExpanded(!expanded)}
      >
        <Paragraph fontSize="$lg" fontWeight="700" color="$primary">
          Raga: {raga.ragaName}
        </Paragraph>
        <MotiView
          animate={{ rotate: expanded ? '180deg' : '0deg' }}
          transition={{ type: 'timing', duration: 200 }}
        >
          <ChevronDown size="$1.5" color="$textSecondary" />
        </MotiView>
      </XStack>

      {/* Basic Info - Always Visible */}
      <YStack gap="$3">
        <XStack gap="$2" flexWrap="wrap">
          <InfoChip label="Melakarta" value={melakartaLabel} />
          <InfoChip label="Chakram" value={chakraLabel} />
        </XStack>
        <RagaDetailRow label="Alternative Name" value={raga.alternativeRagaName} />
      </YStack>
      <YStack borderBottomWidth={1} borderColor="$borderSoft" />

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
              gap="$3"
              marginTop="$3"
            >
              {/* Audio Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Audio
                </Paragraph>
                {audioSrc ? (
                  <AudioPlayer src={audioSrc} />
                ) : (
                  <Paragraph fontSize="$sm" color="$textSecondary">
                    No audio available.
                  </Paragraph>
                )}
              </YStack>

              {/* Arohana & Avarohana Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Scales
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor="$surfaceAlt"
                  borderWidth={1}
                  borderColor="$borderSoft"
                  gap="$3"
                >
                  <YStack gap="$2">
                    <Paragraph
                      fontSize="$sm"
                      color="$primary"
                      fontWeight="700"
                      textDecorationLine="underline"
                      onPress={() => setShowArohanaTip((prev) => !prev)}
                      cursor="pointer"
                    >
                      Arohana
                    </Paragraph>
                    {showArohanaTip && (
                      <Paragraph fontSize="$2" color="$textSecondary" fontFamily="$body" fontStyle="italic">
                        Ascending order of the notes in a raga.
                      </Paragraph>
                    )}
                    <XStack
                      paddingVertical="$2"
                      paddingHorizontal="$3"
                      backgroundColor="$secondary"
                      borderRadius="$radius.6"
                      borderWidth={1}
                      borderColor="$borderSoft"
                    >
                      <Paragraph fontSize="$md" color="$textPrimary" letterSpacing={1}>
                        {raga.arohana || '—'}
                      </Paragraph>
                    </XStack>
                  </YStack>
                  <YStack gap="$2">
                    <Paragraph
                      fontSize="$sm"
                      color="$primary"
                      fontWeight="700"
                      textDecorationLine="underline"
                      onPress={() => setShowAvarohanaTip((prev) => !prev)}
                      cursor="pointer"
                    >
                      Avarohana
                    </Paragraph>
                    {showAvarohanaTip && (
                      <Paragraph fontSize="$2" color="$textSecondary" fontFamily="$body" fontStyle="italic">
                        Descending order of the notes in a raga.
                      </Paragraph>
                    )}
                    <XStack
                      paddingVertical="$2"
                      paddingHorizontal="$3"
                      backgroundColor="$secondary"
                      borderRadius="$radius.6"
                      borderWidth={1}
                      borderColor="$borderSoft"
                    >
                      <Paragraph fontSize="$md" color="$textPrimary" letterSpacing={1}>
                        {raga.avarohana || '—'}
                      </Paragraph>
                    </XStack>
                  </YStack>
                </YStack>
                <YStack borderBottomWidth={1} borderColor="$borderSoft" />
              </YStack>

              {/* Swaras Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Swaras
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor="$surfaceAlt"
                  borderWidth={1}
                  borderColor="$borderSoft"
                  gap="$3"
                >
                  {hasShadjam && (
                    <Paragraph fontSize="$sm" color="$textSoft">
                      Shadjam is included.
                    </Paragraph>
                  )}
                  {([
                    { label: 'Rishabham (R)', value: expandSwaraValue(raga.rishabham) },
                    { label: 'Gandharam (G)', value: expandSwaraValue(raga.gandharam) },
                    { label: 'Madhyamam (M)', value: expandSwaraValue(raga.madhyamam) },
                    { label: 'Panchamam (P)', value: expandSwaraValue(raga.panchamam) },
                    { label: 'Daivatam (D)', value: expandSwaraValue(raga.daivatam) },
                    { label: 'Nishadam (N)', value: expandSwaraValue(raga.nishadam) },
                  ] as const).map((item) => (
                    <XStack key={item.label} gap="$3" alignItems="center">
                      <Paragraph flexBasis={140} color="$primary" fontWeight="700" fontSize="$sm">
                        {item.label}:
                      </Paragraph>
                      <XStack
                        flex={1}
                        paddingVertical="$2"
                        paddingHorizontal="$3"
                        backgroundColor="$secondary"
                        borderRadius="$radius.6"
                        borderWidth={1}
                        borderColor="$borderSoft"
                      >
                        <Paragraph fontSize="$md" color="$textPrimary">
                          {item.value || '—'}
                        </Paragraph>
                      </XStack>
                    </XStack>
                  ))}
                </YStack>
                <YStack borderBottomWidth={1} borderColor="$borderSoft" />
              </YStack>

              {/* Swara Roles Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Swara Roles
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor="$surfaceAlt"
                  borderWidth={1}
                  borderColor="$borderSoft"
                  gap="$3"
                >
                  {([
                    { label: 'Vadi Swaram', value: raga.vadiSwara, tipKey: 'vadi' as const, tip: 'The note of primary importance in a raga; often the most emphasized or rested upon note.' },
                    { label: 'Samvadi Swaram', value: raga.samvadiSwara, tipKey: 'samvadi' as const, tip: 'The consonant note to the vadi, typically a fourth or fifth apart.' },
                    { label: 'Graha Swara', value: raga.grahaswara, tipKey: 'graha' as const, tip: 'It is a note based on which Raga begins.' },
                    { label: 'Nyasa Swara', value: raga.nyasaSwara, tipKey: 'nyasa' as const, tip: 'It is a note at which Raga may be concluded.' },
                    { label: 'Jeeva Swaram', value: raga.jeevaSwara, tipKey: 'jeeva' as const, tip: 'Life-giving notes that bring out the raga’s identity and emotional color.' },
                  ] as const).map((item) => (
                    <YStack key={item.label} gap="$2">
                      <XStack gap="$3" alignItems="center">
                        <Paragraph
                          flexBasis={140}
                          color="$primary"
                          fontWeight="700"
                          fontSize="$sm"
                          textDecorationLine="underline"
                          cursor="pointer"
                          onPress={() =>
                            setRoleTips((prev) => ({
                              ...prev,
                              [item.tipKey]: !prev[item.tipKey],
                            }))
                          }
                        >
                          {item.label}:
                        </Paragraph>
                        <XStack
                          flex={1}
                          paddingVertical="$2"
                          paddingHorizontal="$3"
                          backgroundColor="$secondary"
                          borderRadius="$radius.6"
                          borderWidth={1}
                          borderColor="$borderSoft"
                        >
                          <Paragraph fontSize="$md" color="$textPrimary">
                            {item.value || '—'}
                          </Paragraph>
                        </XStack>
                      </XStack>
                      {roleTips[item.tipKey] && (
                        <Paragraph fontSize="$2" color="$textSecondary" fontFamily="$body" fontStyle="italic">
                          {item.tip}
                        </Paragraph>
                      )}
                    </YStack>
                  ))}
                </YStack>
                <YStack borderBottomWidth={1} borderColor="$borderSoft" />
              </YStack>

              {/* Characteristics Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Characteristics
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor="$surfaceAlt"
                  borderWidth={1}
                  borderColor="$borderSoft"
                  gap="$2"
                >
                  <XStack gap="$3" alignItems="center">
                    <Paragraph
                      flexBasis={140}
                      color="$primary"
                      fontWeight="700"
                      fontSize="$sm"
                      textDecorationLine="underline"
                      cursor="pointer"
                      onPress={() => setRoleTips((prev) => ({ ...prev, ragaType: !prev.ragaType }))}
                    >
                      Raga Type:
                    </Paragraph>
                    <XStack
                      flex={1}
                      paddingVertical="$2"
                      paddingHorizontal="$3"
                      backgroundColor="$secondary"
                      borderRadius="$radius.6"
                      borderWidth={1}
                      borderColor="$borderSoft"
                    >
                      <Paragraph fontSize="$md" color="$textPrimary">
                        {raga.ragaType || '—'}
                      </Paragraph>
                    </XStack>
                  </XStack>
                  {roleTips.ragaType && (
                    <Paragraph fontSize="$2" color="$textSecondary" fontFamily="$body" fontStyle="italic">
                      Please see help page for RagaTypes.
                    </Paragraph>
                  )}
                </YStack>
                <YStack borderBottomWidth={1} borderColor="$borderSoft" />
              </YStack>

              {/* Additional Info Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Additional Information
                </Paragraph>
                <RagaDetailRow label="Apuroopa Prayogas" value={raga.apuroopaPrayogas} />
                <RagaDetailRow label="Swara Sancharam" value={raga.swaraSancharam} />
                <RagaDetailRow label="Additional Notes" value={raga.additionalNotes} />
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor="$surfaceAlt"
                  borderWidth={1}
                  borderColor="$borderSoft"
                  gap="$3"
                >
                  <YStack gap="$1">
                    <Paragraph fontSize="$sm" color="$primary" fontWeight="700">
                      Compositions
                    </Paragraph>
                    <Paragraph fontSize="$md" color="$textPrimary" lineHeight="$md">
                      {raga.compositions || '—'}
                    </Paragraph>
                  </YStack>
                  <YStack gap="$1">
                    <Paragraph fontSize="$sm" color="$primary" fontWeight="700">
                      Description
                    </Paragraph>
                    <Paragraph fontSize="$md" color="$textPrimary" lineHeight="$md">
                      {raga.description || '—'}
                    </Paragraph>
                  </YStack>
                </YStack>
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
