import { H2, H3, Paragraph, XStack, YStack, useThemeName } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

export const HelpPage = () => {
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');
  const heroBorder = isNavy ? 'rgba(255,255,255,0.12)' : '#E5D6C8';

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      color={isNavy ? '#F5F7FF' : '$textPrimary'}
      {...(isNavy
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage:
              "none",
          })}
    >
      <PageContainer>
        <YStack gap="$6" maxWidth={960} marginHorizontal="auto" paddingVertical="$6" $sm={{ paddingHorizontal: '$3' }}>
          <YStack
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.92)'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isNavy ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 6 }}
            gap="$4"
          >
            <XStack gap="$4" alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <YStack gap="$3" flex={1} minWidth={260}>
                <H2 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primaryDeep'} $sm={{ fontSize: '$7', textAlign: 'center' }}>
                  Explore the World of Indian Classical Ragas
                </H2>

                <H3 fontFamily="$heading" color={isNavy ? '#9fd5ff' : '$primary'} $sm={{ fontSize: '$5', textAlign: 'center' }}>
                  Glossary
                </H3>
                <Paragraph color="$textSecondary" lineHeight={26} $sm={{ textAlign: 'center' }}>
                  RagaPro is your companion to decode Carnatic and Hindustani ragas: arohana/avarohana, lakshana, audio, and practice tips.
                </Paragraph>
              </YStack>

              <YStack
                width={220}
                height={160}
                overflow="hidden"
                borderRadius="$radius.12"
                borderWidth={1}
                borderColor={heroBorder}
                backgroundColor={isNavy ? 'rgba(255,255,255,0.08)' : '$surface'}
                $sm={{ display: 'none' }}
              >
                <img
                  src="/hampi.jpg"
                  alt="Hampi temple"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </YStack>
            </XStack>
          </YStack>

          <YStack
            gap="$5"
            padding="$5"
            backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surface'}
            borderRadius="$radius.12"
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isNavy ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 4 }}
            $sm={{ padding: '$4', gap: '$4' }}
          >
            <Paragraph color="$textPrimary" lineHeight={26}>
              Welcome to <strong>RagaPro</strong>, a comprehensive platform built to help you search, learn, and experience the rich traditions of
              <strong> Carnatic</strong> and <strong>Hindustani</strong> classical music. Whether you're a student, performer, or music enthusiast, RagaPro provides deep insights into raga structures, audio examples, compositions, and AI-powered raga identification.
            </Paragraph>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Search Any Raga Instantly
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                Explore detailed information for hundreds of ragas - Arohana, Avarohana, gamakas, prayogas, vadi-samvadi, rasa, time-of-day, and traditional compositions. RagaPro brings authentic explanations inspired by teachings and musical insights from <strong>Hamsadhwani</strong>.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Chat BOT - AI-Powered Raga Identification
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                Designed for learners, teachers, and rasikas, this feature makes raga exploration more accessible and interactive.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Carnatic & Hindustani Raga Explorer
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                Browse ragas from the Carnatic <strong>Melakarta</strong> & Janya system or Hindustani <strong>Thaats</strong>. Discover characteristic prayogas, pakkad, chalan, emotional qualities, and the cultural stories that make each raga unique.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Ragas for Wellness & Mindfulness
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                Indian classical ragas are known for their healing effects—improving sleep, reducing stress, enhancing focus, and balancing emotions. Explore curated raga recommendations for calmness, meditation, devotion, and emotional well-being.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Learn the Foundations
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                RagaPro includes beginner-friendly guides based on the principles outlined in <strong>Hamsadhwani</strong>—what is a raga? What are swaras? How do gamakas work? What is the difference between Carnatic and Hindustani music?
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                What Is a Raga?
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                A raga is a structured melodic framework made from swaras, forming the foundation of Indian classical music. Raga is derived from a melakarta, which is equivalent to a scale in Western music. Indian classical music cannot exist without the presence of Raga (or Raaga).
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Carnatic Ragas
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                Explore Melakarta ragas, Janya ragas, arohana-avarohana, gamakas, prayogas, compositions, and audio demonstrations. Learn the raga identity using swaras, graha swarams, nyasa swarams, jeeva swarams, and characteristic phrases.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Hindustani Ragas
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                Browse ragas from the major Thaats—Bilawal, Kalyan, Bhairav, Asavari, Kafi, Bhairavi, Marva, Poorvi. Understand the time theory, vadi-samvadi, pakad, chalan, and iconic bandishes.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                How many ragas exist in Carnatic music?
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                Ragavai ananta—ragas are infinite in Carnatic music. Although the system defines 72 Melakarta ragas, the number of Janya ragas is vast because ragas evolve over time.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                What is a Melakarta raga?
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                A Melakarta is the parent scale (similar to a Western scale) from which other ragas (janya ragas) are derived.
              </Paragraph>
            </YStack>

            <YStack gap="$3">
              <H3 fontFamily="$heading" color={isNavy ? '#FFFFFF' : '$primary'} $sm={{ fontSize: '$5' }}>
                Which raga is used in film song/film music?
              </H3>
              <Paragraph color="$textSecondary" lineHeight={26}>
                You can reach me at shankar.maruvada@gmail.com, and I will respond as soon as possible.
              </Paragraph>
            </YStack>

            <Paragraph color="$textPrimary" lineHeight={26} fontWeight="600">
              Start exploring the beauty, science, and spirituality of Indian classical music with RagaPro—your companion for learning, practice, and discovery.
            </Paragraph>
          </YStack>
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
