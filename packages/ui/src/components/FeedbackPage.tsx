import { useState } from 'react';
import { Button, Input, Paragraph, TextArea, XStack, YStack } from 'tamagui';
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

      setMessage('Thank you! Your feedback has been submitted.');
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
    <>
      <PageContainer>
        <YStack
          gap="$5"
          maxWidth={680}
          width="100%"
          alignSelf="center"
          paddingBottom="$12"
          $sm={{
            paddingHorizontal: '$3',
            gap: '$4',
          }}
        >
          <YStack gap="$2">
            <Paragraph fontFamily="$heading" fontSize="$9" color="$primary" $sm={{ fontSize: '$7' }}>
              Share Your Feedback
            </Paragraph>
            <Paragraph fontSize="$4" color="$textSecondary" $sm={{ fontSize: '$3' }}>
              Sign in to submit feedback.
            </Paragraph>
          </YStack>

          {!isAdmin && (
            <YStack gap="$3" padding="$4" backgroundColor="$surfaceAlt" borderRadius="$radius.10" borderWidth={1} borderColor="$borderSoft">
              {!showLogin ? (
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
              <YStack gap="$3" padding="$4" backgroundColor="$surfaceAlt" borderRadius="$radius.10" borderWidth={1} borderColor="$borderSoft">
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
              <YStack height="$4" />
            </YStack>
          )}
        </YStack>
      </PageContainer>
      <Footer />
    </>
  );
};
