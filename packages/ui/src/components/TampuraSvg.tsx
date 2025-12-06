import { Svg, Path } from 'react-native-svg';
import { styled, useTheme } from 'tamagui';

const StyledSvg = styled(Svg, {
  name: 'TampuraSvg',
  width: '28vw',
  height: 550,
  maxWidth: 220,
  opacity: 0.07,
  pointerEvents: 'none',
  position: 'absolute',
});

interface TampuraSvgProps {
  mirrored?: boolean;
  color?: string;
}

export const TampuraSvg = ({ mirrored = false, color }: TampuraSvgProps) => {
  const theme = useTheme();
  const fillColor = color || theme.borderSoft?.val || '#D0C2B6';
  const transform = mirrored ? 'scale(-1, 1)' : undefined;

  return (
    <StyledSvg viewBox="0 0 100 400" transform={transform}>
      <Path
        d="M 50,0 C 40,100 40,250 50,300 C 80,350 20,350 50,300 C 60,250 60,100 50,0 Z"
        fill={fillColor}
      />
      <Path
        d="M 50,300 C 10,350 90,350 50,300 C 50,380 50,380 50,400 C 20,410 80,410 50,400 Z"
        fill={fillColor}
      />
    </StyledSvg>
  );
};
