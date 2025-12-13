import { H2, H3, Paragraph, YStack } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

export const HelpPage = () => {
  return (
    <>
      <PageContainer>
        <YStack
          gap="$5"
          maxWidth={820}
          marginHorizontal="auto"
          padding="$6"
          backgroundColor="$surfaceAlt"
          borderRadius="$radius.14"
          borderWidth={1}
          borderColor="$borderSoft"
        >
          <H2 fontFamily="$heading" color="$primary" alignSelf="center">
            Explore the World of Indian Classical Ragas
          </H2>

          <H3 fontFamily="$heading" color="$primary" textAlign="center">
            Search, and Get to Know About Indian Classical Ragas Instantly
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            RagaPro is a powerful raga discovery platform for both Carnatic and Hindustani music. Explore arohana–avarohana, lakshana, audio examples, compositions, and raga families. Identify ragas from audio, search by swaras, and learn through structured raga insights.
          </Paragraph>

          <Paragraph color="$textPrimary" lineHeight={26}>
            Welcome to <strong>RagaPro</strong>, a comprehensive platform built to help you search, learn, and experience the rich traditions of
            <strong> Carnatic</strong> and <strong>Hindustani</strong> classical music. Whether you're a student, performer, or music enthusiast,
            RagaPro provides deep insights into raga structures, audio examples, compositions, and AI-powered raga identification.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Search Any Raga Instantly
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            Explore detailed information for hundreds of ragas — Arohana, Avarohana, gamakas, prayogas, vadi–samvadi, rasa, time-of-day, and traditional compositions.
            RagaPro brings authentic explanations inspired by the teachings and musical insights described in the book <strong>Hamsadhwani</strong>.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Chat BOT — AI-Powered Raga Identification
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            Designed for learners, teachers, and rasikas, this feature makes raga exploration more accessible and interactive.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Carnatic & Hindustani Raga Explorer
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            Browse ragas from the Carnatic <strong>Melakarta</strong> & Janya system or Hindustani <strong>Thaats</strong>. Discover characteristic prayogas, pakkad, chalan,
            emotional qualities, and the cultural stories that make each raga unique. RagaPro honors the profound spiritual heritage of Indian classical music — including the power of <strong>Nada</strong>, the significance of OM, and the transformative journey of melody.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Ragas for Wellness & Mindfulness
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            Indian classical ragas are known for their healing effects — improving sleep, reducing stress, enhancing focus, and balancing emotions. Explore curated raga
            recommendations for calmness, meditation, devotion, and emotional well-being.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Learn the Foundations
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            RagaPro includes beginner-friendly guides based on the principles outlined in <strong>Hamsadhwani</strong> — What is a raga? What are swaras? How do gamakas work?
            What is the difference between Carnatic and Hindustani music? Perfect for students starting their musical journey.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            What Is a Raga?
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            A raga is a structured melodic framework made from swaras, forming the foundation of Indian classical music. Raga is derived from a melakarta, which is equivalent to a scale in Western music. Indian classical music cannot exist without the presence of Raga (or Raaga).
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Carnatic Ragas
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            Explore Melakarta ragas, Janya ragas, arohana–avarohana, gamakas, prayogas, compositions, and audio demonstrations. Learn the raga identity using swaras, graha swarams, nyasa swarams, jeeva swarams, and characteristic phrases.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Hindustani Ragas
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            Browse ragas from the major Thaats — Bilawal, Kalyan, Bhairav, Asavari, Kafi, Bhairavi, Marva, Poorvi. Understand the time theory, vadi–samvadi, pakad, chalan, and iconic bandishes.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            How many ragas exist in Carnatic music?
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            Ragavai anantaḥ — ragas are infinite in Carnatic music. Although the system defines 72 Melakarta ragas, the number of Janya ragas is vast because ragas evolve over time. Some ragas become popular in certain eras, while others fade and reappear later in history. This natural fluidity makes the world of Carnatic ragas dynamic and ever-changing, giving the tradition an infinite melodic scope.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            What is a Melakarta raga?
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            A Melakarta is the parent scale (similar to a Western scale) from which other ragas (janya ragas) are derived.
          </Paragraph>

          <H3 fontFamily="$heading" color="$primary">
            Which raga is used in film song/film music?
          </H3>
          <Paragraph color="$textSecondary" lineHeight={26}>
            You can reach me at shankar.maruvada@gmail.com, and I will respond as soon as possible.
          </Paragraph>

          <Paragraph color="$textPrimary" lineHeight={26} fontWeight="600">
            Start exploring the beauty, science, and spirituality of Indian classical music with RagaPro — your companion for learning, practice, and discovery.
          </Paragraph>
        </YStack>
      </PageContainer>
      <Footer />
    </>
  );
};
