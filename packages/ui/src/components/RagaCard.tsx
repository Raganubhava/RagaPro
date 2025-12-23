import { useEffect, useMemo, useState } from 'react';
import { Paragraph, XStack, YStack, Button } from 'tamagui';
import { AnimatePresence, MotiView } from 'moti';
import { AudioPlayer } from './AudioPlayer';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Raga } from '@raga/data';
import { expandSwaraValue } from '../constants/swaraMap';

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
          {raga.ragaName}
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
          <InfoChip label="Melakarta" value={raga.melakarthaId} />
          <InfoChip label="Raga Type" value={raga.ragaType} />
          <InfoChip label="Chakram" value={raga.chakram} />
          <InfoChip label="Popular" value={raga.popularRaga} />
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
                <RagaDetailRow label="Arohana" value={raga.arohana} />
                <RagaDetailRow label="Avarohana" value={raga.avarohana} />
                <YStack borderBottomWidth={1} borderColor="$borderSoft" />
              </YStack>

              {/* Swaras Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Swaras
                </Paragraph>
                {hasShadjam && (
                  <Paragraph fontSize="$sm" color="$textSoft">
                    Shadjam is included.
                  </Paragraph>
                )}
                <RagaDetailRow label="Rishabham" value={expandSwaraValue(raga.rishabham)} />
                <RagaDetailRow label="Gandharam" value={expandSwaraValue(raga.gandharam)} />
                <RagaDetailRow label="Madhyamam" value={expandSwaraValue(raga.madhyamam)} />
                <RagaDetailRow label="Panchamam" value={expandSwaraValue(raga.panchamam)} />
                <RagaDetailRow label="Daivatam" value={expandSwaraValue(raga.daivatam)} />
                <RagaDetailRow label="Nishadam" value={expandSwaraValue(raga.nishadam)} />
                <YStack borderBottomWidth={1} borderColor="$borderSoft" />
              </YStack>

              {/* Swara Roles Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Swara Roles
                </Paragraph>
                <RagaDetailRow label="Vadi Swara" value={raga.vadiSwara} />
                <RagaDetailRow label="Samvadi Swara" value={raga.samvadiSwara} />
                <RagaDetailRow label="Graha Swara" value={raga.grahaswara} />
                <RagaDetailRow label="Nyasa Swara" value={raga.nyasaSwara} />
                <RagaDetailRow label="Jeeva Swara" value={raga.jeevaSwara} />
                <YStack borderBottomWidth={1} borderColor="$borderSoft" />
              </YStack>

              {/* Characteristics Section */}
              <YStack gap="$2">
                <Paragraph fontSize="$sm" fontWeight="600" color="$primary">
                  Characteristics
                </Paragraph>
                <RagaDetailRow label="Rasa" value={raga.rasa} />
                <RagaDetailRow label="Hindustani Equi Raga" value={raga.hindustaniEquiRaga} />
                <RagaDetailRow label="Popular Raga" value={raga.popularRaga} />
                <RagaDetailRow label="Rakti Raga" value={raga.raktiRaga} />
                <RagaDetailRow label="Ancient Raga" value={raga.ancientRaga} />
                <RagaDetailRow label="Upanga Raga" value={raga.upangaRaga} />
                <RagaDetailRow label="Bhashanga Raga" value={raga.bhashangaRaga} />
                <RagaDetailRow label="Anyaswaram" value={raga.anyaswaram} />
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
                <RagaDetailRow label="Compositions" value={raga.compositions} />
                {raga.description && (
                  <YStack gap="$1">
                    <Paragraph fontSize="$sm" color="$goldDeep" textTransform="uppercase" letterSpacing={1}>
                      Description:
                    </Paragraph>
                    <Paragraph fontSize="$md" color="$textPrimary" lineHeight="$md">
                      {raga.description}
                    </Paragraph>
                  </YStack>
                )}
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
