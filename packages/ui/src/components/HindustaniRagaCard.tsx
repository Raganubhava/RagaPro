import { useEffect, useMemo, useState } from 'react';
import { Paragraph, XStack, YStack, Button, useThemeName } from 'tamagui';
import { AnimatePresence, MotiView } from 'moti';
import { AudioPlayer } from './AudioPlayer';
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

export const HindustaniRagaCard = ({ raga, onAskAI }: { raga: HindustaniRaga; onAskAI?: () => void }) => {
  const [expanded, setExpanded] = useState(true);
  const [showThaatTip, setShowThaatTip] = useState(false);
  const [showSamayTip, setShowSamayTip] = useState(false);
  const [showArohanTip, setShowArohanTip] = useState(false);
  const [showAvarohanTip, setShowAvarohanTip] = useState(false);
  const [showVaadiTip, setShowVaadiTip] = useState(false);
  const [showSamvaadiTip, setShowSamvaadiTip] = useState(false);
  const [showPakadTip, setShowPakadTip] = useState(false);
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : '$borderSoft';
  const softSurface = isDark ? 'rgba(255,255,255,0.05)' : '$surfaceAlt';
  const pillSurface = isDark ? 'rgba(255,255,255,0.08)' : '$secondary';
  const headingColor = isDark ? '#FFFFFF' : '$primary';
  const labelColor = isDark ? '#FFFFFF' : '$goldDeep';
  const textPrimary = isDark ? '#FFFFFF' : '$textPrimary';
  const textSecondary = isDark ? '#FFFFFF' : '$textSecondary';
  const audioSrc = useMemo(() => {
    if (!raga.audioFile) return null;
    // Default to mp3; adjust if API returns mime type in the future.
    return `data:audio/mpeg;base64,${raga.audioFile}`;
  }, [raga.audioFile]);
  useEffect(() => {
    setExpanded(true);
  }, [raga]);
  return (
    <YStack
      backgroundColor={softSurface}
      borderWidth={1}
      borderColor={cardBorder}
      borderRadius="$radius.14"
      padding="$4"
      gap="$3"
      shadowColor={isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'}
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
      <XStack
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onPress={() => setExpanded(!expanded)}
        hoverStyle={{ backgroundColor: softSurface }}
        pressStyle={{ backgroundColor: softSurface }}
        padding="$2"
        borderRadius="$radius.8"
      >
        <YStack gap="$1">
          <Paragraph fontSize="$7" fontWeight="800" color={headingColor} fontFamily="$heading" letterSpacing={0.6}>
            {raga.ragaName}
          </Paragraph>
          {raga.alternateRagaName && (
            <Paragraph fontSize="$4" color={textSecondary}>
              Also known as {raga.alternateRagaName}
            </Paragraph>
          )}
        </YStack>
        <MotiView animate={{ rotate: expanded ? '180deg' : '0deg' }} transition={{ type: 'timing', duration: 200 }}>
          <ChevronDown size="$1.5" color={textSecondary} />
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
            <YStack
              gap="$3"
              backgroundColor={isDark ? 'rgba(255,255,255,0.04)' : '$surface'}
              borderRadius="$radius.10"
              padding="$3"
              marginTop="$3"
              borderWidth={1}
              borderColor={cardBorder}
            >
              <YStack gap="$2">
                <Paragraph fontSize="$4" fontWeight="700" color={isDark ? '#FFFFFF' : '$primary'} fontFamily="$heading" letterSpacing={0.4}>
                  Audio
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor={softSurface}
                  borderWidth={1}
                  borderColor={cardBorder}
                  gap="$2"
                >
                  {audioSrc ? (
                    <AudioPlayer src={audioSrc} />
                  ) : (
                    <Paragraph fontSize="$sm" color={textSecondary}>
                      No audio available.
                    </Paragraph>
                  )}
                </YStack>
              </YStack>
              <YStack borderBottomWidth={1} borderColor={cardBorder} />

            <YStack gap="$1">
                <XStack justifyContent="space-between" alignItems="flex-start" gap="$2">
                  <Paragraph
                    fontSize="$sm"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing={1}
                    flexShrink={0}
                    textDecorationLine="underline"
                    onPress={() => setShowThaatTip((prev) => !prev)}
                    onHoverIn={() => setShowThaatTip(true)}
                    onHoverOut={() => setShowThaatTip(false)}
                    cursor="pointer"
                  >
                    Thaat:
                  </Paragraph>
                  <Paragraph fontSize="$md" color={textPrimary} flex={1} textAlign="right">
                    {raga.thaat && raga.thaat !== '' ? raga.thaat : '—'}
                  </Paragraph>
                </XStack>
                {showThaatTip && (
                  <Paragraph fontSize="$2" color={textSecondary} fontFamily="$body" fontStyle="italic">
                    Thaat represents a set of seven swaras which form the basis for various melodic structures.
                  </Paragraph>
                )}
                <XStack justifyContent="space-between" alignItems="flex-start" gap="$2">
                  <Paragraph
                    fontSize="$sm"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing={1}
                    flexShrink={0}
                    textDecorationLine="underline"
                    onPress={() => setShowSamayTip((prev) => !prev)}
                    onHoverIn={() => setShowSamayTip(true)}
                    onHoverOut={() => setShowSamayTip(false)}
                    cursor="pointer"
                  >
                    Samay:
                  </Paragraph>
                  <Paragraph fontSize="$md" color={textPrimary} flex={1} textAlign="right">
                    {raga.samay && raga.samay !== '' ? raga.samay : '—'}
                  </Paragraph>
                </XStack>
                {showSamayTip && (
                  <Paragraph fontSize="$2" color={textSecondary} fontFamily="$body" fontStyle="italic">
                    A raga shines most when performed at its traditional time of day.
                  </Paragraph>
                )}
              </YStack>
              <YStack borderBottomWidth={1} borderColor={cardBorder} />

              <YStack gap="$2">
                <Paragraph fontSize="$4" fontWeight="700" color={isDark ? '#FFFFFF' : '$primary'} fontFamily="$heading" letterSpacing={0.4}>
                  Scales
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor={softSurface}
                  borderWidth={1}
                  borderColor={cardBorder}
                  gap="$3"
                >
                <XStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap="$2"
                >
                  <Paragraph
                    fontSize="$sm"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing={1}
                    flexShrink={0}
                    textDecorationLine="underline"
                    onPress={() => setShowArohanTip((prev) => !prev)}
                    onHoverIn={() => setShowArohanTip(true)}
                    onHoverOut={() => setShowArohanTip(false)}
                    cursor="pointer"
                  >
                    Arohan:
                  </Paragraph>
                  <Paragraph fontSize="$md" color={textPrimary} flex={1} textAlign="right">
                    {raga.arohan && raga.arohan !== '' ? raga.arohan : '—'}
                  </Paragraph>
                </XStack>
                {showArohanTip && (
                  <Paragraph fontSize="$2" color={textSecondary} fontFamily="$body" fontStyle="italic">
                    Ascending order of the notes in a raga.
                  </Paragraph>
                )}
                <XStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap="$2"
                >
                  <Paragraph
                    fontSize="$sm"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing={1}
                    flexShrink={0}
                    textDecorationLine="underline"
                    onPress={() => setShowAvarohanTip((prev) => !prev)}
                    onHoverIn={() => setShowAvarohanTip(true)}
                    onHoverOut={() => setShowAvarohanTip(false)}
                    cursor="pointer"
                  >
                    Avarohan:
                  </Paragraph>
                  <Paragraph fontSize="$md" color={textPrimary} flex={1} textAlign="right">
                    {raga.avarohan && raga.avarohan !== '' ? raga.avarohan : '—'}
                  </Paragraph>
                </XStack>
                {showAvarohanTip && (
                  <Paragraph fontSize="$2" color={textSecondary} fontFamily="$body" fontStyle="italic">
                    Descending order of the notes in a raga.
                  </Paragraph>
                )}
                </YStack>
              </YStack>
              <YStack borderBottomWidth={1} borderColor={cardBorder} />

              <YStack gap="$2">
                <Paragraph fontSize="$4" fontWeight="700" color={isDark ? '#FFFFFF' : '$primary'} fontFamily="$heading" letterSpacing={0.4}>
                  Roles
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor={softSurface}
                  borderWidth={1}
                  borderColor={cardBorder}
                  gap="$3"
                >
                <XStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap="$2"
                >
                  <Paragraph
                    fontSize="$sm"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing={1}
                    flexShrink={0}
                    textDecorationLine="underline"
                    onPress={() => setShowVaadiTip((prev) => !prev)}
                    onHoverIn={() => setShowVaadiTip(true)}
                    onHoverOut={() => setShowVaadiTip(false)}
                    cursor="pointer"
                  >
                    Vaadi:
                  </Paragraph>
                  <Paragraph fontSize="$md" color={textPrimary} flex={1} textAlign="right">
                    {raga.vaadi && raga.vaadi !== '' ? raga.vaadi : '—'}
                  </Paragraph>
                </XStack>
                {showVaadiTip && (
                  <Paragraph fontSize="$2" color={textSecondary} fontFamily="$body" fontStyle="italic">
                    The most important king note.
                  </Paragraph>
                )}
                <XStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap="$2"
                >
                  <Paragraph
                    fontSize="$sm"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing={1}
                    flexShrink={0}
                    textDecorationLine="underline"
                    onPress={() => setShowSamvaadiTip((prev) => !prev)}
                    onHoverIn={() => setShowSamvaadiTip(true)}
                    onHoverOut={() => setShowSamvaadiTip(false)}
                    cursor="pointer"
                  >
                    Samvaadi:
                  </Paragraph>
                  <Paragraph fontSize="$md" color={textPrimary} flex={1} textAlign="right">
                    {raga.samvaadi && raga.samvaadi !== '' ? raga.samvaadi : '—'}
                  </Paragraph>
                </XStack>
                {showSamvaadiTip && (
                  <Paragraph fontSize="$2" color={textSecondary} fontFamily="$body" fontStyle="italic">
                    The second most important note usually a 4th or 5th from vadi.
                  </Paragraph>
                )}
                <XStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  gap="$2"
                >
                  <Paragraph
                    fontSize="$sm"
                    color={labelColor}
                    textTransform="uppercase"
                    letterSpacing={1}
                    flexShrink={0}
                    textDecorationLine="underline"
                    onPress={() => setShowPakadTip((prev) => !prev)}
                    onHoverIn={() => setShowPakadTip(true)}
                    onHoverOut={() => setShowPakadTip(false)}
                    cursor="pointer"
                  >
                    Pakad:
                  </Paragraph>
                  <Paragraph fontSize="$md" color={textPrimary} flex={1} textAlign="right">
                    {raga.pakad && raga.pakad !== '' ? raga.pakad : '—'}
                  </Paragraph>
                </XStack>
                {showPakadTip && (
                  <Paragraph fontSize="$2" color={textSecondary} fontFamily="$body" fontStyle="italic">
                    The signature phrase that immediately identifies raga.
                  </Paragraph>
                )}
                </YStack>
              </YStack>
              <YStack borderBottomWidth={1} borderColor={cardBorder} />

              <YStack gap="$2">
                <Paragraph fontSize="$4" fontWeight="700" color={isDark ? '#FFFFFF' : '$primary'} fontFamily="$heading" letterSpacing={0.4}>
                  Notes
                </Paragraph>
                <YStack
                  padding="$3"
                  borderRadius="$radius.10"
                  backgroundColor={softSurface}
                  borderWidth={1}
                  borderColor={cardBorder}
                  gap="$3"
                >
                  <YStack gap="$1">
                    <Paragraph fontSize="$sm" color={headingColor} fontWeight="700">
                      Description
                    </Paragraph>
                    <Paragraph fontSize="$md" color={textPrimary} lineHeight="$md">
                      {raga.description || '—'}
                    </Paragraph>
                  </YStack>
                  <YStack gap="$1">
                    <Paragraph fontSize="$sm" color={headingColor} fontWeight="700">
                      Compositions
                    </Paragraph>
                    <Paragraph fontSize="$md" color={textPrimary} lineHeight="$md">
                      {raga.compositions || '—'}
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
