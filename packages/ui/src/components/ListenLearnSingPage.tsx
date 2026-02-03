import { Paragraph, YStack, XStack, useThemeName, Button } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

export const ListenLearnSingPage = () => {
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const border = isDark ? 'rgba(255,255,255,0.14)' : '#E5D6C8';

  const pulseGlow = `
    @keyframes pulseGlow {
      0% { box-shadow: 0 10px 30px rgba(255, 108, 171, 0.28); }
      50% { box-shadow: 0 12px 34px rgba(115, 102, 255, 0.45); }
      100% { box-shadow: 0 10px 30px rgba(255, 108, 171, 0.28); }
    }
  `;

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      color={isDark ? '#F5F7FF' : '$textPrimary'}
      {...(isDark
        ? {
            backgroundImage:
              'radial-gradient(circle at 18% 18%, rgba(74,118,255,0.18), transparent 42%), radial-gradient(circle at 82% -6%, rgba(255,148,255,0.16), transparent 40%), linear-gradient(180deg, rgba(11,16,38,0.92) 0%, rgba(11,16,38,0.96) 100%)',
          }
        : {
            backgroundImage:
              "none",
          })}
    >
      <PageContainer>
        <style>{pulseGlow}</style>
        <YStack
          gap="$6"
          maxWidth={960}
          width="100%"
          alignSelf="center"
          paddingVertical="$7"
          $sm={{ paddingHorizontal: '$3', gap: '$5' }}
        >
          <YStack
            padding="$6"
            borderRadius="$radius.12"
            backgroundColor={isDark ? 'rgba(255,255,255,0.06)' : '$surface'}
            borderWidth={1}
            borderColor={border}
            shadowColor={isDark ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.08)'}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 6 }}
            gap="$3"
            overflow="hidden"
          >
            <Paragraph fontFamily="$heading" fontSize="$9" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
              Learn
            </Paragraph>
              <Paragraph fontSize="$4" color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={26}>
                We&apos;re building modules to help you absorb ragas through structured lessons, and sing-along guides with help of AI.
              </Paragraph>
            <YStack
              marginTop="$2"
              padding="$5"
              borderRadius="$radius.12"
              backgroundColor={isDark ? 'rgba(255,255,255,0.06)' : '#FFF7E6'}
              borderWidth={2}
              borderColor={isDark ? 'rgba(255,215,128,0.55)' : '#E6B800'}
              shadowColor={isDark ? 'rgba(255,215,128,0.25)' : 'rgba(230,184,0,0.18)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              gap="$2"
            >
              <XStack
                gap="$3"
                marginTop="$2"
                alignItems="center"
                justifyContent="space-between"
                alignSelf="stretch"
                flexWrap="wrap"
              >
                <Button
                  onPress={async () => {
                    try {
                      const res = await fetch('/fastapi/api/learn/kalyani', { method: 'GET' });
                      if (!res.ok) return;
                      window.location.href = '/learn/kalyani';
                    } catch {
                      // Silent failure for optional feature.
                    }
                  }}
                  backgroundColor={isDark ? 'rgba(58,61,92,0.9)' : '#F4E3C7'}
                  borderWidth={3}
                  borderColor="#FFFFFF"
                  borderRadius="$radius.12"
                  paddingHorizontal="$7"
                  paddingVertical="$4"
                  minHeight={72}
                  alignSelf="stretch"
                  justifyContent="flex-start"
                  hoverStyle={{
                    backgroundColor: isDark ? 'rgba(58,61,92,1)' : '#F1D7AE',
                  }}
                  pressStyle={{
                    backgroundColor: isDark ? 'rgba(58,61,92,1)' : '#F1D7AE',
                  }}
                >
                  <XStack alignItems="center" justifyContent="space-between" width="100%">
                    <XStack alignItems="center" gap="$3" flexShrink={1}>
                      <YStack
                        width={36}
                        height={36}
                        borderRadius="$radius.8"
                        backgroundColor={isDark ? '#FFFFFF' : '#3A3D5C'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Paragraph color={isDark ? '#3A3D5C' : '#FFFFFF'} fontWeight="800" fontSize="$4">
                          K
                        </Paragraph>
                      </YStack>
                      <YStack gap="$1">
                        <Paragraph color={isDark ? '#FFFFFF' : '#3A2B20'} fontWeight="800" fontSize="$5">
                          Kalyani Raga
                        </Paragraph>
                        <Paragraph color={isDark ? 'rgba(255,255,255,0.75)' : '$textSecondary'} fontSize="$3">
                          Start guided practice
                        </Paragraph>
                      </YStack>
                    </XStack>
                  </XStack>
                </Button>
                <Button
                  onPress={() => {
                    window.location.href = '/learn';
                  }}
                  alignSelf="flex-end"
                  backgroundColor="transparent"
                  borderWidth={0}
                  paddingHorizontal="$4"
                  paddingVertical="$2"
                  color={isDark ? '#FFFFFF' : '$primaryDeep'}
                  textDecorationLine="underline"
                  fontWeight="800"
                  fontSize="$4"
                  hoverStyle={{ opacity: 0.85 }}
                >
                  Find my Sruti
                </Button>
              </XStack>
            </YStack>
            <YStack
              marginTop="$4"
              borderRadius="$radius.12"
              overflow="hidden"
              borderWidth={1}
              borderColor={border}
              shadowColor={isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
            >
              <img
                src="/Concert.jpg"
                alt="Concert audience immersed in music"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </YStack>
          </YStack>
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
