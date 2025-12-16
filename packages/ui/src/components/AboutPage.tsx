import { H3, Paragraph, YStack } from 'tamagui';
import { PageContainer } from './PageContainer';

export const AboutPage = () => {
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
        <Paragraph color="$textSecondary" lineHeight={24}>
          Outside programming, I enjoy exploring Indian classical music, especially Carnatic ragas — the inspiration
          for this Raga App project. My goal is to make learning ragas easier through technology, interactive tools,
          and accessible design.
        </Paragraph>
        <Paragraph color="$textSecondary" lineHeight={24}>
          If you&apos;d like to connect, collaborate, or explore more of my work, visit my website{' '}
          <Paragraph asChild color="$primary" textDecorationLine="underline" fontWeight="700">
            <a href="https://bheemashankar.net/" target="_blank" rel="noreferrer">
              bheemashankar.net
            </a>
          </Paragraph>{' '}
          or reach out through the contact options provided.
        </Paragraph>
      </YStack>
    </PageContainer>
  );
};
