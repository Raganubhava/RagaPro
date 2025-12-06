import { YStack } from 'tamagui';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <YStack
      flex={1}
      width="100%"
      maxWidth={1300}
      marginHorizontal="auto"
      paddingHorizontal="$6"
      marginTop="$6"
      gap="$6"
      overflow="auto" // Ensure content scrolls
      $sm={{
        paddingHorizontal: '$3',
        marginTop: '$4',
        gap: '$4',
      }}
    >
      {children}
    </YStack>
  );
};
