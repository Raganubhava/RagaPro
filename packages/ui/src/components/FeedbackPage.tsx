import { useState } from 'react';
import { Button, H3, Input, Paragraph, TextArea, XStack, YStack, useThemeName } from 'tamagui';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';
import { API_ENDPOINTS } from '../constants/api';

export const FeedbackPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupLoginName, setSignupLoginName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupMessage, setSignupMessage] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');
  const heroBorder = isNavy ? 'rgba(255,255,255,0.12)' : '#E5D6C8';

  const nameRegex = /^[A-Za-z\s\-']+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const blockedWords = /\b(abuse|abusive|asshole|bastard|bitch|bloody|bullshit|crap|damn|dick|fuck|fucking|idiot|jerk|moron|nonsense|obscene|pervert|porn|pornographic|racist|sex|sexual|shit|stupid|suck|trash|ugly|violence|violent|vulgar|whore)\b/i;

  const handleLogin = async () => {
    setLoginError(null);
    setIsLoggingIn(true);
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
      const jwt = data?.token;
      if (!jwt) {
        throw new Error('Login failed: token missing.');
      }
      setToken(jwt);
      setIsAdmin(true);
      setShowLogin(false);
      setLoginPassword('');
      setLoginError(null);
      setMessage('Logged in. You can now submit feedback.');
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
      setShowSignup(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      setSignupError(msg);
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    if (!email || !feedback) {
      setError('Please provide an email and your feedback.');
      return;
    }

    if (email.length > 254 || !emailRegex.test(email)) {
      setError('Please enter a valid email address (max 254 chars).');
      return;
    }

    if (firstName && (!nameRegex.test(firstName) || firstName.length < 2 || firstName.length > 50)) {
      setError('First name must be 2-50 letters, spaces, hyphens, or apostrophes.');
      return;
    }

    if (lastName && (!nameRegex.test(lastName) || lastName.length < 2 || lastName.length > 50)) {
      setError('Last name must be 2-50 letters, spaces, hyphens, or apostrophes.');
      return;
    }

    if (phoneNumber && phoneNumber.length > 15) {
      setError('Phone number must be 15 characters or fewer.');
      return;
    }

    if (feedback.length < 10 || feedback.length > 1000) {
      setError('Feedback must be between 10 and 1000 characters.');
      return;
    }

    if (blockedWords.test(feedback)) {
      setError('This is a sacred site for ragas. Please avoid inappropriate content.');
      return;
    }

    if (!isAdmin || !token) {
      setError('Admin login required to submit feedback.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(API_ENDPOINTS.feedback, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNumber,
          feedback,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      setMessage('Thank you 🙏! Your feedback has been submitted.');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setFeedback('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      setError(`Could not submit feedback. ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      color={isNavy ? '#F5F7FF' : '$textPrimary'}
      {...(isNavy
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(255,186,120,0.25), transparent 40%), radial-gradient(circle at 82% -4%, rgba(103,174,255,0.2), transparent 38%), linear-gradient(180deg, #f9f5ef 0%, #f3eee7 100%)",
          })}
    >
      <PageContainer>
        <YStack
          gap="$5"
          maxWidth={760}
          width="100%"
          alignSelf="center"
          paddingBottom="$12"
          paddingTop="$5"
          $sm={{
            paddingHorizontal: '$3',
            gap: '$4',
          }}
        >
          <YStack
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.92)'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isNavy ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 6 }}
            gap="$3"
          >
            <Paragraph fontFamily="$heading" fontSize="$9" color={isNavy ? '#FFFFFF' : '$primaryDeep'} $sm={{ fontSize: '$7' }}>
              Share Your Feedback
            </Paragraph>
            <Paragraph fontSize="$4" color="$textSecondary" $sm={{ fontSize: '$3' }}>
              Tell us if you found this website / app useful, and also any suggestions or changes you'd like to see.
            </Paragraph>
          </YStack>

          {!isAdmin && (
            <YStack
              gap="$3"
              padding="$5"
              backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surface'}
              borderRadius="$radius.12"
              borderWidth={1}
              borderColor={heroBorder}
              shadowColor={isNavy ? 'rgba(0,0,0,0.24)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
            >
              {!showLogin ? (
                <XStack gap="$3" alignItems="center" flexWrap="wrap">
                  <Button
                    onPress={() => setShowLogin(true)}
                    backgroundColor="$primary"
                    color="$surface"
                    borderRadius="$radius.6"
                    paddingVertical="$3"
                    alignSelf="flex-start"
                    minWidth={160}
                    paddingHorizontal="$6"
                    hoverStyle={{ backgroundColor: '$primaryHover' }}
                  >
                    Submit Feedback
                  </Button>
                  <Paragraph
                    fontWeight="800"
                    fontSize="$6"
                    lineHeight={28}
                    color={isNavy ? '#FFFFFF' : '$primaryDeep'}
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    Thank you 🙏
                  </Paragraph>
                </XStack>
              ) : showSignup ? (
                <YStack gap="$3">
                  <Paragraph fontWeight="700" color="$primary">
                    Signup
                  </Paragraph>
                  <Input placeholder="Login Name" value={signupLoginName} onChangeText={setSignupLoginName} autoCapitalize="none" />
                  <Input placeholder="Email" value={signupEmail} onChangeText={setSignupEmail} keyboardType="email-address" />
                  <Input placeholder="Password" value={signupPassword} onChangeText={setSignupPassword} secureTextEntry />
                  <Input placeholder="First Name (optional)" value={signupFirstName} onChangeText={setSignupFirstName} />
                  <Input placeholder="Last Name (optional)" value={signupLastName} onChangeText={setSignupLastName} />
                  {signupError && (
                    <Paragraph color="$primaryActive">
                      {signupError}
                    </Paragraph>
                  )}
                  {signupMessage && (
                    <Paragraph color="$primary">
                      {signupMessage}
                    </Paragraph>
                  )}
                  <XStack gap="$2">
                    <Button
                      borderColor="$borderSoft"
                      borderWidth={1}
                      backgroundColor="$surface"
                      color="$text"
                      paddingHorizontal="$5"
                      onPress={() => { setShowSignup(false); setSignupError(null); setSignupMessage(null); }}
                    >
                      Back
                    </Button>
                    <Button
                      onPress={handleSignup}
                      disabled={isSigningUp}
                      backgroundColor="$primary"
                      color="$surface"
                      borderRadius="$radius.6"
                      paddingVertical="$3"
                      minWidth={140}
                      paddingHorizontal="$5"
                      hoverStyle={{ backgroundColor: '$primaryHover' }}
                    >
                      {isSigningUp ? 'Signing up...' : 'Signup'}
                    </Button>
                  </XStack>
                </YStack>
              ) : (
                <YStack gap="$3">
                  <Paragraph fontWeight="700" color="$primary">
                    Login
                  </Paragraph>
                  <Input placeholder="Username" value={loginUsername} onChangeText={setLoginUsername} autoCapitalize="none" />
                  <Input placeholder="Password" value={loginPassword} onChangeText={setLoginPassword} secureTextEntry />
                  {loginError && (
                    <Paragraph color="$primaryActive">
                      {loginError}
                    </Paragraph>
                  )}
                  <XStack gap="$2">
                    <Button
                      onPress={handleLogin}
                      disabled={isLoggingIn}
                      backgroundColor="$primary"
                      color="$surface"
                      borderRadius="$radius.6"
                      paddingVertical="$3"
                      minWidth={140}
                      paddingHorizontal="$5"
                      hoverStyle={{ backgroundColor: '$primaryHover' }}
                    >
                      {isLoggingIn ? 'Signing in...' : 'Login'}
                    </Button>
                    <Paragraph
                      color="$primary"
                      fontWeight="600"
                      textDecorationLine="underline"
                      onPress={() => setShowSignup(true)}
                      cursor="pointer"
                      alignSelf="center"
                    >
                      New user? Please signup
                    </Paragraph>
                  </XStack>
                </YStack>
              )}
            </YStack>
          )}

          {isAdmin && (
            <YStack gap="$4">
              <YStack
                gap="$3"
                padding="$5"
                backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surface'}
                borderRadius="$radius.12"
                borderWidth={1}
                borderColor={heroBorder}
                shadowColor={isNavy ? 'rgba(0,0,0,0.24)' : 'rgba(0,0,0,0.08)'}
                shadowRadius={10}
                shadowOffset={{ width: 0, height: 4 }}
              >
                <Paragraph fontWeight="700" color="$primary">
                  Feedback Form
                </Paragraph>
                <YStack gap="$3">
                  <Input placeholder="Email*" value={email} onChangeText={setEmail} keyboardType="email-address" />
                  <Input placeholder="First Name" value={firstName} onChangeText={setFirstName} />
                  <Input placeholder="Last Name" value={lastName} onChangeText={setLastName} />
                  <Input placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
                  <TextArea placeholder="Your feedback*" value={feedback} onChangeText={setFeedback} minHeight={140} numberOfLines={5} />
                </YStack>
              </YStack>

              {message && (
                <Paragraph color="$primary" fontWeight="700">
                  {message}
                </Paragraph>
              )}
              {error && (
                <Paragraph color="$primaryActive">
                  {error}
                </Paragraph>
              )}

              <Paragraph color="$textSecondary" lineHeight={22}>
                Tell us if you found this website / app useful, and also any suggestions or changes you&apos;d like to see.
              </Paragraph>

              <Button
                onPress={handleSubmit}
                disabled={isSubmitting}
                backgroundColor="$primary"
                color="$surface"
                borderRadius="$radius.6"
                paddingVertical="$3"
                marginBottom="$8"
                alignSelf="flex-start"
                minWidth={160}
                paddingHorizontal="$6"
                hoverStyle={{ backgroundColor: '$primaryHover' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
              <Paragraph fontWeight="800" fontSize="$6" color={isNavy ? '#FFFFFF' : '$primaryDeep'}>
                Thank you 🙏
              </Paragraph>
            </YStack>
          )}

          <YStack
            gap="$3"
            padding="$4"
            backgroundColor="$surfaceAlt"
            borderRadius="$radius.10"
            borderWidth={1}
            borderColor="$borderSoft"
          >
            <H3 fontFamily="$heading" color="$primary">
              About
            </H3>
            <Paragraph color="$textPrimary" lineHeight={24}>
              I&apos;m Bheema Shankar Maruvada, a software developer passionate about building intelligent systems,
              full-stack applications, and tools that enhance productivity and creativity. Over the years, I&apos;ve
              developed solutions across AI, web development, cloud architecture, and automation.
            </Paragraph>
            <Paragraph color="$textSecondary" lineHeight={24}>
              Outside programming, I enjoy exploring Indian classical music, especially Carnatic ragas - the inspiration
              for this Raga App project. My goal is to make learning ragas easier through technology, interactive tools,
              and accessible design.
            </Paragraph>
            <Paragraph color="$textSecondary" lineHeight={24}>
              If you&apos;d like to connect, collaborate, or explore more of my work, visit my website{' '}
              <Paragraph asChild color="$primary" textDecorationLine="underline" fontWeight="700">
                <a href="https://bheemashankar.net/" target="_blank" rel="noreferrer">
                  bheemashankar.net
                </a>
              </Paragraph>{' '}
              or reach out through the contact options provided.
            </Paragraph>
          </YStack>
          <YStack height="$4" />
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};


