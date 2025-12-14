import { useState } from 'react';
import { Menu, Lock, Sun, Moon } from '@tamagui/lucide-icons';
import { Button, XStack, YStack, Paragraph } from 'tamagui';
import { NavLinkItem } from './NavLinkItem';

interface HeaderProps {
  onToggleTheme: () => void;
  currentTheme: 'light' | 'navy';
}

export const Header = ({ onToggleTheme, currentTheme }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isNavy = currentTheme === 'navy';
  const headerBg = isNavy ? 'rgba(11,16,38,0.9)' : '#FBF8F4';
  const headerBorder = isNavy ? 'rgba(255,255,255,0.12)' : '#E5D6C8';
  const navColor = isNavy ? '#FFFFFF' : '#9C4F3C';

  const handleNavLinkClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <YStack
      tag="header"
      width="100%"
      backgroundColor={headerBg}
      borderBottomWidth={1}
      borderColor={headerBorder}
      position="sticky"
      top={0}
      zIndex={50}
      shadowColor="rgba(0,0,0,0.12)"
      shadowOffset={{ height: 2, width: 0 }}
      shadowRadius={6}
    >
      {/* MAIN HEADER BAR */}
      <XStack
        id="headerRoot"
        width="100%"
        maxWidth={1300}
        marginHorizontal="auto"
        paddingHorizontal="$7"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        gap="$7"
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
          {/* Raga logo clickable */}
          <NavLinkItem
            to="/"
            onClick={handleNavLinkClick}
            colorOverride={isNavy ? '#FFFFFF' : '$primaryDeep'}
          >
            <Paragraph
              fontWeight="600"
              color={isNavy ? '#FFFFFF' : '$primaryDeep'}
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
              borderLeft: `1px solid ${isNavy ? 'rgba(255,255,255,0.3)' : '#E5D6C8'}`,
              height: 20,
              marginLeft: 8,
              marginRight: 8,
            }}
            $sm={{ display: 'none' }}
          />

          {/* DESKTOP NAV — hidden on small screens */}
          <XStack
            id="navItems"
            alignItems="center"
            gap="$5"
            flexShrink={1}
            flexWrap="wrap"
            minWidth={0}
            $sm={{ display: 'none' }}
            $gtSm={{ display: 'flex' }}
          >
            <NavLinkItem to="/" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={600}>
              Home
            </NavLinkItem>
            <NavLinkItem to="/podcasts" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={600}>
              Raga Sessions
            </NavLinkItem>       
            <NavLinkItem to="/learn" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={600}>
              Find Sruti
            </NavLinkItem>
            <NavLinkItem to="/help" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={600}>
              Glossary
            </NavLinkItem>
            <NavLinkItem to="/feedback" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={600}>
              Feedback
            </NavLinkItem>
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
          {/* LOGIN — md+ */}
          <Button
            size="$3"
            paddingHorizontal="$4"
            borderRadius="$radius.6"
            color={isNavy ? '$primary' : '#FFFFFF'}
            backgroundColor={isNavy ? '$surface' : '#9C4F3C'}
            borderWidth={1}
            borderColor={isNavy ? '$primary' : '#9C4F3C'}
            icon={Lock}
            iconAfter={null}
            $sm={{ display: 'none' }}
            $gtSm={{ display: 'flex' }}
            hoverStyle={
              isNavy
                ? {
                    backgroundColor: '$secondary',
                    borderColor: '$secondary',
                    color: '$primaryDeep',
                  }
                : {
                    backgroundColor: '#B45B46',
                    borderColor: '#B45B46',
                    color: '#FFFFFF',
                  }
            }
            animation="bouncy"
          >
            Login
          </Button>

          <Button
            id="themeToggle"
            icon={currentTheme === 'light' ? Moon : Sun}
            backgroundColor="$surface"
            borderWidth={1}
            borderColor="$primaryDeep"
            borderRadius="$radius.6"
            padding="$2"
            onPress={onToggleTheme}
            $sm={{ display: 'none' }}
            $gtSm={{ display: 'flex' }}
            hoverStyle={{ backgroundColor: '$secondary' }}
            animation="bouncy"
          />

          {/* HAMBURGER — only on small */}
          <Button
            id="hamburgerButton"
            icon={Menu}
            backgroundColor="$surface"
            borderWidth={1}
            borderColor="$primaryDeep"
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
          backgroundColor="$primary"
          borderBottomWidth={1}
          borderColor="$primaryDeep"
          padding="$4"
          gap="$3"
          animation="bouncy"
          position="relative"
          zIndex={49}
          $gtSm={{ display: 'none' }}
        >
          <NavLinkItem to="/" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Home</NavLinkItem>
          <NavLinkItem to="/podcasts" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Raga Sessions</NavLinkItem>
          <NavLinkItem to="/learn" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Find Sruti</NavLinkItem>
          <NavLinkItem to="/help" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Glossary</NavLinkItem>
          <NavLinkItem to="/feedback" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Feedback</NavLinkItem>
          <NavLinkItem to="/login" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Login</NavLinkItem>
          <Button
            icon={currentTheme === 'light' ? Moon : Sun}
            backgroundColor="$surface"
            borderWidth={1}
            borderColor="$primaryDeep"
            borderRadius="$radius.6"
            padding="$3"
            onPress={() => {
              onToggleTheme();
              setMenuOpen(false);
            }}
            animation="bouncy"
          >
            <Paragraph color="$primary" fontWeight="600">
              Switch to {currentTheme === 'light' ? 'Navy' : 'Light'} Theme
            </Paragraph>
          </Button>
        </YStack>
      )}
    </YStack>
  );
};
