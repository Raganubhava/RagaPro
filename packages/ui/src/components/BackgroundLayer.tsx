import { YStack, useMedia } from 'tamagui';
import { TampuraSvg } from './TampuraSvg';

export const BackgroundLayer = () => {
  const media = useMedia();

  return (
    <YStack
      fullscreen
      zi={-1}
      style={{
        background:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 4px)',
      }}
    >
      {media.gtSm && (
        <>
          <TampuraSvg />
          <TampuraSvg mirrored />
        </>
      )}
      {media.sm && <TampuraSvg />}
    </YStack>
  );
};
