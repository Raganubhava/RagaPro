import { TamaguiProvider, Button, YStack } from 'tamagui'
import config from './tamagui.config'

export const MyComponent = () => (
  <TamaguiProvider config={config}>
    <YStack>
      <Button>Hello</Button>
    </YStack>
  </TamaguiProvider>
)
