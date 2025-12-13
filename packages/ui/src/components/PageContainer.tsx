import { YStack } from 'tamagui';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <YStack
      width="100%"
      maxWidth={1300}
      marginHorizontal="auto"
      paddingHorizontal="$6"
      paddingBottom="$12"
      marginTop="$6"
      gap="$6"
      overflow="visible"
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
