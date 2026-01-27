import { Paragraph, YStack, XStack, useThemeName, Button } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';
import { NavLinkItem } from './NavLinkItem';

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
              <Paragraph fontWeight="800" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$6">
                Launching shortly
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$4" lineHeight={24}>
                Launching shortly: AI-assisted listening drills, guided lessons, and sing-along practice to deepen your raga journey.
              </Paragraph>
              <XStack
                gap="$3"
                marginTop="$2"
                alignItems="center"
                justifyContent="flex-end"
                alignSelf="stretch"
              >
                <Button
                  asChild
                  color="#FFFFFF"
                  borderRadius="$radius.10"
                  borderWidth={0}
                  borderColor="transparent"
                  paddingHorizontal="$5"
                  paddingVertical="$3"
                  colorOverride="#FFFFFF"
                  fontWeight={900}
                  fontSize="$4"
                  letterSpacing={0.6}
                  textTransform="uppercase"
                  textDecorationLine="underline"
                  style={{
                    backgroundColor: 'transparent',
                    backgroundImage: 'none',
                    boxShadow: 'none',
                    animation: 'none',
                  }}
                  hoverStyle={{ opacity: 0.92 }}
                >
                  <NavLinkItem to="/learn" colorOverride={isDark ? '#FFFFFF' : '$textPrimary'}>
                    Find my Sruti
                  </NavLinkItem>
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
