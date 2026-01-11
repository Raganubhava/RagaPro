import { H3, Paragraph, YStack, useThemeName } from 'tamagui';
import { PageContainer } from './PageContainer';

export const AboutPage = () => {
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  return (
    <PageContainer>
      <YStack
        gap="$4"
        maxWidth={720}
        marginHorizontal="auto"
        padding="$6"
        backgroundColor="$surfaceAlt"
        borderRadius="$radius.14"
        borderWidth={1}
        borderColor="$borderSoft"
      >
        <H3 fontFamily="$heading" color="$primary" alignSelf="center">
          About
        </H3>
        <Paragraph color="$textPrimary" lineHeight={24}>
          I&apos;m Bheema Shankar Maruvada, a software developer passionate about building intelligent systems,
          full-stack applications, and tools that enhance productivity and creativity. Over the years, I&apos;ve developed
          solutions across AI, web development, cloud architecture, and automation.
        </Paragraph>
        <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
          Outside programming, I enjoy exploring Indian classical music, especially Carnatic ragas — the inspiration
          for this Raga App project. My goal is to make learning ragas easier through technology, interactive tools,
          and accessible design.
        </Paragraph>
        <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
          If you&apos;d like to connect, collaborate, or explore more of my work, visit my website{' '}
          <Paragraph asChild color="$primary" textDecorationLine="underline" fontWeight="700">
            <a href="https://bheemashankar.net/" target="_blank" rel="noreferrer">
              bheemashankar.net
            </a>
          </Paragraph>{' '}
          or reach out through the contact options provided.
        </Paragraph>
        <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24}>
          Book: <Paragraph asChild color="$primary" textDecorationLine="underline" fontWeight="700">
            <a
              href="https://www.amazon.com/Hamsadhwani-Journey-Melody-Carnatic-Music/dp/9356489602/ref=sr_1_1?crid=1VLKVM3RUXN0M&dib=eyJ2IjoiMSJ9.bD1EO_VgNTvjyWfGG0n77A.DjnZqnRBgkzHuqLL9_2R1visXcJeig-GokVUUBr2eW0&dib_tag=se&keywords=hamsadhwani+book&qid=1768160892&sprefix=hamsadhwani+book%2Caps%2C145&sr=8-1"
              target="_blank"
              rel="noreferrer"
            >
              Hamsadhwani: Journey into the Melody of Carnatic Music
            </a>
          </Paragraph>
        </Paragraph>
      </YStack>
    </PageContainer>
  );
};
