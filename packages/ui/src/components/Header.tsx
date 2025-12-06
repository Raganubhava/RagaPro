import { useState } from 'react';
import { Menu, Lock } from '@tamagui/lucide-icons';
import { Button, XStack, YStack, Paragraph } from 'tamagui';
import { NavLinkItem } from './NavLinkItem';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavLinkClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <YStack
      tag="header"
      width="100%"
      backgroundColor="$surface"
      borderBottomWidth={1}
      borderColor="$borderLight"
      position="sticky"
      top={0}
      zIndex={50}
      shadowColor="rgba(0,0,0,0.05)"
      shadowOffset={{ height: 2, width: 0 }}
      shadowRadius={6}
    >
      {/* MAIN HEADER BAR */}
      <XStack
        id="headerRoot"
        width="100%"
        maxWidth={1300}
        marginHorizontal="auto"
        paddingHorizontal="$6"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        gap="$6"
        $sm={{ paddingHorizontal: '$4' }}
      >
        {/* LEFT: LOGO + DESKTOP NAV */}
        <XStack
          id="leftCluster"
          alignItems="center"
          gap="$4"
          flexShrink={1}
          minWidth={0}
        >
          {/* Raga logo – clickable */}
          <NavLinkItem to="/" onClick={handleNavLinkClick}>
            <Paragraph
              fontWeight="600"
              color="$primary"
              fontSize="$lg"
              fontFamily="$heading"
              style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Raga
            </Paragraph>
          </NavLinkItem>

          {/* SIMPLE VERTICAL SEPARATOR */}
          <Paragraph
            aria-hidden="true"
            style={{
              borderLeft: '1px solid var(--color-borderLight)',
              height: 20,
              marginLeft: 8,
              marginRight: 8,
            }}
            $sm={{ display: 'none' }}
          />

          {/* DESKTOP NAV – hidden on small screens */}
          <XStack
            id="navItems"
            alignItems="center"
            gap="$5"
            flexShrink={1}
            flexWrap="wrap"      // wrap instead of overlapping if space is tight
            minWidth={0}
            $sm={{ display: 'none' }}
            $gtSm={{ display: 'flex' }}
          >
            <NavLinkItem to="/" onClick={handleNavLinkClick}>Home</NavLinkItem>
            <NavLinkItem to="/learn" onClick={handleNavLinkClick}>Learn Raga</NavLinkItem>
            <NavLinkItem to="/advanced-search" onClick={handleNavLinkClick}>Advanced Search</NavLinkItem>
            <NavLinkItem to="/podcasts" onClick={handleNavLinkClick}>Podcasts</NavLinkItem>
            <NavLinkItem to="/about" onClick={handleNavLinkClick}>About</NavLinkItem>
          </XStack>
        </XStack>

        {/* RIGHT: LOGIN (desktop) + HAMBURGER (mobile) */}
        <XStack
          id="rightArea"
          alignItems="center"
          justifyContent="flex-end"
          gap="$3"
          flexShrink={0}
          minWidth={120}
        >
          {/* LOGIN – md+ */}
          <Button
            size="$3"
            paddingHorizontal="$4"
            borderRadius="$radius.6"
            color="$primary"
            backgroundColor="$surfaceAlt"
            borderWidth={1}
            borderColor="$borderSoft"
            icon={Lock}
            iconAfter={null}
            $sm={{ display: 'none' }}
            $gtSm={{ display: 'flex' }}
            hoverStyle={{
              backgroundColor: '$gold',
              borderColor: '$goldDeep',
              color: '$primaryDeep',
            }}
            animation="bouncy"
          >
            Login
          </Button>

          {/* HAMBURGER – only on small */}
          <Button
            id="hamburgerButton"
            icon={Menu}
            backgroundColor="$surfaceAlt"
            borderWidth={1}
            borderColor="$borderSoft"
            borderRadius="$radius.6"
            padding="$2"
            $sm={{ display: 'flex' }}
            $gtSm={{ display: 'none' }}
            onPress={() => setMenuOpen((prev) => !prev)}
            animation="bouncy"
          />
        </XStack>
      </XStack>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <YStack
          id="mobileMenu"
          backgroundColor="$surface"
          borderBottomWidth={1}
          borderColor="$borderLight"
          padding="$4"
          gap="$2"
          animation="bouncy"
          position="relative"
          zIndex={49}
          $gtSm={{ display: 'none' }}
        >
          <NavLinkItem to="/" onClick={handleNavLinkClick} isMobileMenuItem>Home</NavLinkItem>
          <NavLinkItem to="/learn" onClick={handleNavLinkClick} isMobileMenuItem>Learn Raga</NavLinkItem>
          <NavLinkItem to="/advanced-search" onClick={handleNavLinkClick} isMobileMenuItem>Advanced Search</NavLinkItem>
          <NavLinkItem to="/podcasts" onClick={handleNavLinkClick} isMobileMenuItem>Podcasts</NavLinkItem>
          <NavLinkItem to="/about" onClick={handleNavLinkClick} isMobileMenuItem>About</NavLinkItem>
          <NavLinkItem to="/login" onClick={handleNavLinkClick} isMobileMenuItem>Login</NavLinkItem>
        </YStack>
      )}
    </YStack>
  );
};
