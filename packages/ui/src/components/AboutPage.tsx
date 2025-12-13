import { H3, Paragraph, YStack, Button } from 'tamagui';
import { PageContainer } from './PageContainer';
import { useNavigate } from 'react-router-dom';

export const AboutPage = () => {
  const navigate = useNavigate();

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
        alignItems="center"
      >
        <H3 fontFamily="$heading" color="$primary" alignSelf="center">
          About
        </H3>
        <Paragraph color="$textSecondary" lineHeight={24} textAlign="center">
          Learn more about the app and share feedback on the Feedback page.
        </Paragraph>
        <Button
          onPress={() => navigate('/feedback')}
          backgroundColor="$primary"
          color="$surface"
          paddingHorizontal="$5"
          paddingVertical="$3"
          borderRadius="$radius.8"
          hoverStyle={{ backgroundColor: '$primaryHover' }}
        >
          Go to Feedback
        </Button>
      </YStack>
    </PageContainer>
  );
};
