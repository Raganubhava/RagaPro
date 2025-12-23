import { useState } from 'react';
import { Menu, Lock, Sun, Moon } from '@tamagui/lucide-icons';
import { Button, XStack, YStack, Paragraph, Input } from 'tamagui';
import { NavLinkItem } from './NavLinkItem';
import { API_ENDPOINTS } from '../constants/api';

interface HeaderProps {
  onToggleTheme: () => void;
  currentTheme: 'light' | 'navy';
}

export const Header = ({ onToggleTheme, currentTheme }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupLoginName, setSignupLoginName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupMessage, setSignupMessage] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const isNavy = currentTheme === 'navy';
  const headerBg = isNavy ? 'rgba(11,16,38,0.9)' : '#FBF8F4';
  const headerBorder = isNavy ? 'rgba(255,255,255,0.12)' : '#E5D6C8';
  const navColor = isNavy ? '#FFFFFF' : '#9C4F3C';

  const handleNavLinkClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleLogin = async () => {
    if (!loginUsername || !loginPassword) {
      setLoginError('Enter username and password.');
      return;
    }
    setIsLoggingIn(true);
    setLoginError(null);
    setLoginMessage(null);
    try {
      const res = await fetch(API_ENDPOINTS.authLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const token = data?.token;
      if (!token) {
        throw new Error('Login failed: token missing.');
      }
      localStorage.setItem('raga.authToken', token);
      setLoginMessage('Logged in successfully.');
      setLoginError(null);
      setLoginOpen(false);
      setLoginPassword('');
      setShowSignup(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setLoginError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async () => {
    setSignupError(null);
    setSignupMessage(null);
    if (!signupLoginName || !signupEmail || !signupPassword) {
      setSignupError('Login name, email, and password are required.');
      return;
    }
    setIsSigningUp(true);
    try {
      const res = await fetch(API_ENDPOINTS.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginName: signupLoginName,
          email: signupEmail,
          password: signupPassword,
          firstName: signupFirstName,
          lastName: signupLastName,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      setSignupMessage('Signup successful. You may now login.');
      setSignupError(null);
      setShowSignup(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      setSignupError(msg);
    } finally {
      setIsSigningUp(false);
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
            <NavLinkItem to="/" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={700} fontSize="$4" letterSpacing={0.3}>
              Home
            </NavLinkItem>
            <NavLinkItem to="/podcasts" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={700} fontSize="$4" letterSpacing={0.3}>
              Raga Sessions
            </NavLinkItem>       
            <NavLinkItem to="/listen" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={700} fontSize="$4" letterSpacing={0.3}>
              Listen Learn Sing
            </NavLinkItem>
            <NavLinkItem to="/help" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={700} fontSize="$4" letterSpacing={0.3}>
                Help
            </NavLinkItem>
            <NavLinkItem to="/feedback" onClick={handleNavLinkClick} colorOverride={navColor} fontWeight={700} fontSize="$4" letterSpacing={0.3}>
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
          {/* Login hidden for now */}

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
          <NavLinkItem to="/about" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">About</NavLinkItem>
          <NavLinkItem to="/podcasts" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Raga Sessions</NavLinkItem>
          <NavLinkItem to="/listen" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Listen Learn Sing</NavLinkItem>
          <NavLinkItem to="/help" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Help</NavLinkItem>
          <NavLinkItem to="/feedback" onClick={handleNavLinkClick} isMobileMenuItem colorOverride="#FFFFFF">Feedback</NavLinkItem>
          {/* Login hidden for now */}
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

      {loginOpen && !showSignup && (
        <YStack
          position="absolute"
          top={70}
          right={16}
          backgroundColor="$surface"
          borderRadius="$radius.10"
          borderWidth={1}
          borderColor="$borderSoft"
          padding="$4"
          gap="$3"
          shadowColor="rgba(0,0,0,0.1)"
          shadowRadius={10}
          shadowOffset={{ width: 0, height: 4 }}
          maxWidth={320}
          zIndex={60}
        >
          <Paragraph fontWeight="700" color="$primary">
            Login
          </Paragraph>
          <Input
            placeholder="Username"
            value={loginUsername}
            onChangeText={setLoginUsername}
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />
          {loginError && <Paragraph color="$primaryActive">{loginError}</Paragraph>}
          {loginMessage && <Paragraph color="$primary">{loginMessage}</Paragraph>}
          <XStack gap="$2" justifyContent="space-between" alignItems="center">
            <Button size="$2" onPress={() => setLoginOpen(false)} borderColor="$borderSoft" borderWidth={1} backgroundColor="$surface">
              Cancel
            </Button>
            <XStack gap="$2">
              <Button size="$2" borderColor="$borderSoft" borderWidth={1} backgroundColor="$surface" onPress={() => setShowSignup(true)}>
                Signup
              </Button>
              <Button size="$2" backgroundColor="$primary" color="$surface" onPress={handleLogin} disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </Button>
            </XStack>
          </XStack>
        </YStack>
      )}

      {loginOpen && showSignup && (
        <YStack
          position="absolute"
          top={70}
          right={16}
          backgroundColor="$surface"
          borderRadius="$radius.10"
          borderWidth={1}
          borderColor="$borderSoft"
          padding="$4"
          gap="$3"
          shadowColor="rgba(0,0,0,0.1)"
          shadowRadius={10}
          shadowOffset={{ width: 0, height: 4 }}
          maxWidth={320}
          zIndex={60}
        >
          <Paragraph fontWeight="700" color="$primary">
            Signup
          </Paragraph>
          <Input
            placeholder="Login Name"
            value={signupLoginName}
            onChangeText={setSignupLoginName}
            autoCapitalize="none"
          />
          <Input
            placeholder="Email"
            value={signupEmail}
            onChangeText={setSignupEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="Password"
            value={signupPassword}
            onChangeText={setSignupPassword}
            secureTextEntry
          />
          <Input
            placeholder="First Name (optional)"
            value={signupFirstName}
            onChangeText={setSignupFirstName}
          />
          <Input
            placeholder="Last Name (optional)"
            value={signupLastName}
            onChangeText={setSignupLastName}
          />
          {signupError && <Paragraph color="$primaryActive">{signupError}</Paragraph>}
          {signupMessage && <Paragraph color="$primary">{signupMessage}</Paragraph>}
          <XStack gap="$2" justifyContent="space-between" alignItems="center">
            <Button size="$2" onPress={() => { setShowSignup(false); setSignupError(null); setSignupMessage(null); }} borderColor="$borderSoft" borderWidth={1} backgroundColor="$surface">
              Back
            </Button>
            <Button size="$2" backgroundColor="$primary" color="$surface" onPress={handleSignup} disabled={isSigningUp}>
              {isSigningUp ? 'Signing up...' : 'Signup'}
            </Button>
          </XStack>
        </YStack>
      )}

      {loginOpen && showSignup && (
        <YStack
          position="absolute"
          top={70}
          right={16}
          backgroundColor="$surface"
          borderRadius="$radius.10"
          borderWidth={1}
          borderColor="$borderSoft"
          padding="$4"
          gap="$3"
          shadowColor="rgba(0,0,0,0.1)"
          shadowRadius={10}
          shadowOffset={{ width: 0, height: 4 }}
          maxWidth={320}
          zIndex={60}
        >
          <Paragraph fontWeight="700" color="$primary">
            Signup
          </Paragraph>
          <Input placeholder="Login Name" value={signupLoginName} onChangeText={setSignupLoginName} autoCapitalize="none" />
          <Input placeholder="Email" value={signupEmail} onChangeText={setSignupEmail} keyboardType="email-address" />
          <Input placeholder="Password" value={signupPassword} onChangeText={setSignupPassword} secureTextEntry />
          <Input placeholder="First Name (optional)" value={signupFirstName} onChangeText={setSignupFirstName} />
          <Input placeholder="Last Name (optional)" value={signupLastName} onChangeText={setSignupLastName} />
          {signupError && <Paragraph color="$primaryActive">{signupError}</Paragraph>}
          {signupMessage && <Paragraph color="$primary">{signupMessage}</Paragraph>}
          <XStack gap="$2" justifyContent="space-between" alignItems="center">
            <Button size="$2" onPress={() => { setShowSignup(false); setSignupError(null); }} borderColor="$borderSoft" borderWidth={1} backgroundColor="$surface">
              Back
            </Button>
            <Button size="$2" backgroundColor="$primary" color="$surface" onPress={handleSignup} disabled={isSigningUp}>
              {isSigningUp ? 'Signing up...' : 'Signup'}
            </Button>
          </XStack>
        </YStack>
      )}
    </YStack>
  );
};
