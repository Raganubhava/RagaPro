import React from 'react';
import { Text, XStack, useMedia } from 'tamagui';
import { NavLink } from 'react-router-dom';

interface NavLinkItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  isMobileMenuItem?: boolean;
  colorOverride?: string;
  fontWeight?: number | string;
  fontSize?: string | number;
  letterSpacing?: number;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textDecorationLine?: 'none' | 'underline';
  fontFamilyOverride?: string;
}

export const NavLinkItem = ({
  to,
  children,
  onClick,
  isMobileMenuItem,
  colorOverride,
  fontWeight,
  fontSize,
  letterSpacing,
  textTransform,
  textDecorationLine,
  fontFamilyOverride,
}: NavLinkItemProps) => {
  const media = useMedia();
  const resolvedWeight = fontWeight ?? 500;
  const resolvedSize = fontSize ?? '$3';
  const resolvedLetterSpacing = letterSpacing ?? 0;
  const resolvedTransform = textTransform ?? 'none';
  const resolvedDecoration = textDecorationLine;
  const resolvedFamily = fontFamilyOverride ?? '$body';

  return (
    <NavLink
      to={to}
      onClick={onClick}
      // Make each link a proper flex item with spacing
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {({ isActive }) => (
        <XStack
          alignItems="center"
          justifyContent="center"
          paddingHorizontal={media.sm && isMobileMenuItem ? '$3' : '$2'}
          paddingVertical={media.sm && isMobileMenuItem ? '$2' : '$1'}
          borderRadius={media.sm && isMobileMenuItem ? '$radius.6' : 0}
          backgroundColor={
            media.sm && isMobileMenuItem && isActive ? '$surfaceAlt' : 'transparent'
          }
          style={{ whiteSpace: 'nowrap' }}
        >
          <Text
            color={colorOverride ?? (isActive ? '$primaryDeep' : '$textPrimary')}
            fontSize={resolvedSize}
            fontFamily={resolvedFamily}
            fontWeight={resolvedWeight}
            letterSpacing={resolvedLetterSpacing}
            textTransform={resolvedTransform}
            lineHeight={20}
            hoverStyle={
              !media.sm
                ? {
                    color: colorOverride ?? '$primaryDeep',
                  }
                : undefined
            }
            textDecorationLine={
              resolvedDecoration ?? (!media.sm && isActive ? 'underline' : 'none')
            }
          >
            {children}
          </Text>
        </XStack>
      )}
    </NavLink>
  );
};
