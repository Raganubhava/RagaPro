import { Mic } from '@tamagui/lucide-icons';
import { Button, Input, Paragraph, XStack, YStack } from 'tamagui';

interface RagaSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const RagaSearchBar = ({
  value,
  onChange,
  onSearch,
}: RagaSearchBarProps) => {
  return (
    <YStack
      alignItems="center"
      gap="$5"
      padding="$4"
      width="100%"
      maxWidth={600}
      marginHorizontal="auto"
      $sm={{ maxWidth: '90%' }}
    >
      <XStack
        alignItems="center"
        width="100%"
        height={54}
        borderWidth={2}
        borderColor="$primary"
        borderRadius="$radius.999"
        paddingHorizontal="$5"
        backgroundColor="$surface"
        hoverStyle={{ borderColor: '$primaryHover' }}
        focusWithinStyle={{
          borderColor: '$primaryHover',
        }}
        animation="bouncy"
        $sm={{ height: 42, paddingHorizontal: '$4' }}
      >
        <Input
          unstyled
          flex={1}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onSearch}
          placeholder="Search for a Raga..."
          placeholderTextColor="$textSecondary"
          color="$textPrimary"
          fontFamily="$heading"
          fontSize="$6"
          borderWidth={0}
          backgroundColor="transparent"
          focusStyle={{
            outlineWidth: 0,
            outlineColor: 'transparent',
            borderWidth: 0,
            shadowColor: 'transparent',
          }}
        />
      </XStack>

      <Button
        theme="active"
        size="$4"
        onPress={onSearch}
        width="60%"
        minWidth={180}
        paddingHorizontal={20}
        alignSelf="center"
        backgroundColor="$primary"
        borderWidth={2}
        borderColor="$primaryDeep"
        color="$surface"
        shadowColor="rgba(0,0,0,0.12)"
        shadowOffset={{ width: 0, height: 4 }}
        shadowRadius={10}
        hoverStyle={{
          backgroundColor: '$primaryHover',
          borderColor: '$primaryHover',
          shadowColor: 'rgba(0,0,0,0.16)',
        }}
        animation="bouncy"
        $sm={{ width: '100%', minWidth: 0 }}
      >
        Search
      </Button>
    </YStack>
  );
};
