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
      <Paragraph fontFamily="$heading" fontSize="$9" color="$primary">
        Raga
      </Paragraph>

      <XStack
        alignItems="center"
        width="100%"
        height={54}
        borderWidth={1}
        borderColor="$borderSoft"
        borderRadius="$radius.999"
        paddingHorizontal="$4"
        backgroundColor="$surface"
        hoverStyle={{ borderColor: '$goldDeep', shadowRadius: '$soft' }}
        focusWithinStyle={{
          borderColor: '$goldDeep',
          shadowRadius: '$medium',
          shadowColor: 'rgba(216,177,105,0.25)',
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
          hoverStyle={{ color: '$goldDeep', scale: 1.1 }}
          pressStyle={{ scale: 0.9 }}
          animation="bouncy"
        />
      </XStack>

      <Button
        theme="active"
        size="$4"
        onPress={onSearch}
        width="50%"
        minWidth={120}
        paddingHorizontal={20}
        alignSelf="center"
        backgroundColor="$surface"
        borderWidth={1}
        borderColor="$primary"
        color="$primaryDeep"
        hoverStyle={{
          backgroundColor: 'rgba(216,177,105,0.1)',
          borderColor: '$goldDeep',
        }}
        animation="bouncy"
        $sm={{ width: '100%', minWidth: 0 }}
      >
        Search
      </Button>
    </YStack>
  );
};
