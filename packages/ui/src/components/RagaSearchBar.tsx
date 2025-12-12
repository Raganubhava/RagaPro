import { Mic } from '@tamagui/lucide-icons';
import { Button, Input, Paragraph, XStack, YStack } from 'tamagui';

interface RagaSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onMicClick?: () => void;
}

export const RagaSearchBar = ({
  value,
  onChange,
  onSearch,
  onMicClick,
}: RagaSearchBarProps) => {
  return (
    <YStack
      alignItems="center"
      gap="$6"
      padding="$4"
      width="100%"
      maxWidth={600}
      marginHorizontal="auto"
      $sm={{ maxWidth: '90%' }}
    >
      <Paragraph fontFamily="$heading" fontSize="$9" color="$primary" letterSpacing={0.5}>
        Raga
      </Paragraph>

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
          }}
        />
        <Button
          circular
          icon={Mic}
          color="$primary"
          onPress={onMicClick}
          backgroundColor="transparent"
          borderWidth={0}
          hoverStyle={{ color: '$primaryHover', scale: 1.05 }}
          pressStyle={{ scale: 0.9 }}
          animation="bouncy"
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
        borderWidth={1.5}
        borderColor="$primaryDeep"
        color="$surface"
        hoverStyle={{
          backgroundColor: '$primaryHover',
          borderColor: '$primaryHover',
        }}
        animation="bouncy"
        $sm={{ width: '100%', minWidth: 0 }}
      >
        Search
      </Button>
    </YStack>
  );
};
