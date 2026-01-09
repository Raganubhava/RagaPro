import { Paragraph, XStack, useThemeName } from 'tamagui';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');

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
      <Paragraph size="$1" color={isDark ? '#FFFFFF' : '$textSecondary'} o={0.7}>
        © {currentYear} RagaNidhi. All rights reserved. 
        {/* Design by MC. */}
      </Paragraph>
    </XStack>
  );
};
