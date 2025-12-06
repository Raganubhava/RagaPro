import React from 'react';
import { Text, XStack, useMedia } from 'tamagui';
import { NavLink } from 'react-router-dom';

interface NavLinkItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  isMobileMenuItem?: boolean;
}

export const NavLinkItem = ({
  to,
  children,
  onClick,
  isMobileMenuItem,
}: NavLinkItemProps) => {
  const media = useMedia();

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
            color={isActive ? '$primaryDeep' : '$textPrimary'}
            fontSize="$3"
            fontFamily="$body"
            lineHeight={20}
            hoverStyle={
              !media.sm
                ? {
                    color: '$primary',
                  }
                : undefined
            }
            textDecorationLine={!media.sm && isActive ? 'underline' : 'none'}
          >
            {children}
          </Text>
        </XStack>
      )}
    </NavLink>
  );
};
