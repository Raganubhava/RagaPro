import { Paragraph, XStack } from 'tamagui';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <XStack
      tag="footer"
      justifyContent="center"
      alignItems="center"
      paddingVertical="$3"
      borderTopWidth={1}
      borderTopColor="$borderLight"
      backgroundColor="transparent"
    >
      <Paragraph size="$1" color="$textSecondary" o={0.7}>
        © {currentYear} Raga App. All rights reserved.
      </Paragraph>
    </XStack>
  );
};
