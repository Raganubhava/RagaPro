import { Paragraph, YStack } from 'tamagui';
import { PageContainer } from './PageContainer';

export const LearnRagaPage = () => {
  return (
    <PageContainer>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$surfaceAlt"
        padding="$6"
        borderRadius="$radius.14"
        borderWidth={1}
        borderColor="$borderSoft"
      >
        <Paragraph
          textAlign="center"
          fontSize="$6"
          color="$textSecondary"
          fontFamily="$heading"
        >
          Want to learn Carnatic music? Come back soon — classes are coming!
        </Paragraph>
      </YStack>
    </PageContainer>
  );
};
