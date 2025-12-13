import { useState } from 'react';
import { Button, Input, Paragraph, TextArea, YStack } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';

const API_BASE_URL = 'https://localhost:44308/api';
const FEEDBACK_ENDPOINT = `${API_BASE_URL}/feedback/submit`;

export const FeedbackPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    if (!email || !feedback) {
      setError('Please provide an email and your feedback.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNumber,
          feedback,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      setMessage('Thank you! Your feedback has been submitted.');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setFeedback('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      setError(`Could not submit feedback. ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageContainer>
        <YStack gap="$5" maxWidth={680} width="100%" alignSelf="center" paddingBottom="$12">
          <YStack gap="$3" padding="$4" backgroundColor="$surfaceAlt" borderRadius="$radius.10" borderWidth={1} borderColor="$borderSoft">
            <Paragraph fontFamily="$heading" fontSize="$8" color="$primary">
              About
            </Paragraph>
            <Paragraph color="$textPrimary" lineHeight={24}>
              I’m Bheema Shankar Maruvada, a software developer passionate about building intelligent systems,
              full-stack applications, and tools that enhance productivity and creativity. Over the years, I’ve developed
              solutions across AI, web development, cloud architecture, and automation.
            </Paragraph>
            <Paragraph color="$textSecondary" lineHeight={24}>
              Outside programming, I enjoy exploring Indian classical music, especially Carnatic ragas — the inspiration
              for this Raga App project. My goal is to make learning ragas easier through technology, interactive tools,
              and accessible design.
            </Paragraph>
            <Paragraph color="$textSecondary" lineHeight={24}>
              If you'd like to connect, collaborate, or explore more of my work, visit my website{' '}
              <Paragraph
                asChild
                color="$primary"
                textDecorationLine="underline"
                fontWeight="700"
              >
                <a href="https://bheemashankar.net/" target="_blank" rel="noreferrer">
                  bheemashankar.net
                </a>
              </Paragraph>{' '}
              or reach out through the contact options provided.
            </Paragraph>
          </YStack>

          <YStack gap="$2">
            <Paragraph fontFamily="$heading" fontSize="$9" color="$primary">
              Share Your Feedback
            </Paragraph>
            <Paragraph fontSize="$4" color="$textSecondary">
              Please tell us what you love, what feels off, or what you want to change in the raga description. We will make the necessary corrections and display the updated raga information. If you would like to submit a new raga you have discovered, please feel free to do so.
            </Paragraph>
          </YStack>

          <YStack gap="$3">
            <Input
              placeholder="Email*"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Input
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextArea
              placeholder="Your feedback*"
              value={feedback}
              onChangeText={setFeedback}
              minHeight={140}
              numberOfLines={5}
            />
          </YStack>

          {message && (
            <Paragraph color="$primary" fontWeight="700">
              {message}
            </Paragraph>
          )}
          {error && (
            <Paragraph color="$primaryActive">
              {error}
            </Paragraph>
          )}

          <Button
            onPress={handleSubmit}
            disabled={isSubmitting}
            backgroundColor="$primary"
            color="$surface"
            borderRadius="$radius.6"
            paddingVertical="$3"
            marginBottom="$8"
            alignSelf="center"
            minWidth={160}
            paddingHorizontal="$6"
            hoverStyle={{ backgroundColor: '$primaryHover' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
          <YStack height="$4" />
        </YStack>
      </PageContainer>
      <Footer />
    </>
  );
};
