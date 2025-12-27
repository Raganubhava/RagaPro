import { useEffect, useMemo, useState } from 'react';
import { Button, Paragraph, TextArea, XStack, YStack, Spinner, useThemeName } from 'tamagui';
import { API_ENDPOINTS } from '../constants/api';

export const ChatBotPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentCount, setSentCount] = useState(0);
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');

  const maxLength = 600;
  const injectionPattern = /\b(select|insert|update|delete|drop|alter|truncate)\b/i;
  const blockedWords = /\b(abuse|abusive|asshole|bastard|bitch|bloody|bullshit|crap|damn|dick|fuck|fucking|idiot|jerk|moron|nonsense|obscene|pervert|porn|pornographic|racist|sex|sexual|shit|stupid|suck|trash|ugly|violence|violent|vulgar|whore)\b/i;
  const sanitize = useMemo(
    () => (text: string) =>
      text
        .replace(/[\u0000-\u001F\u007F]+/g, '')
        .replace(/<[^>]*>/g, '')
        .trim(),
    []
  );

  // Minimal animation only once to avoid repeated style creation.
  useEffect(() => {
    const styleId = 'ragabot-glitter-style';
    if (typeof document === 'undefined' || document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes ragabot-glitter {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .ragabot-glitter {
        background: linear-gradient(120deg, rgba(247,219,171,0.9), rgba(234,193,124,0.8), rgba(247,219,171,0.9));
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: ragabot-glitter 4s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const quickPrompts = [
    'Tell me about Kalyani raga',
    'Give me a short intro to Todi.',
    'What are the swaras in Bhairavi?',
    'What is the arohana/avarohana of Hamsadhwani?',
  ];

  const handleSend = async () => {
    const cleaned = sanitize(prompt);
    if (!cleaned) {
      setError('Please enter a message.');
      return;
    }
    if (cleaned.length > maxLength) {
      setError(`Message too long. Max ${maxLength} characters.`);
      return;
    }
    if (injectionPattern.test(cleaned)) {
      setResponse("I didn't understand what you said. Please ask a raga-related question.");
      setError(null);
      return;
    }
    if (blockedWords.test(cleaned)) {
      setResponse('This is a sacred site for ragas. Please avoid inappropriate content and ask a raga-related question.');
      setError(null);
      return;
    }
    if (sentCount >= 5 && isLoading) {
      setError('Please wait before sending more messages.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(API_ENDPOINTS.chatBot, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: cleaned }),
      });

      if (!res.ok) {
        throw new Error('No response available.');
      }

      const data = await res.json();
      const botText = data?.answer ?? data?.message ?? '';
      setResponse(botText || 'No response received. Please try another question.');
      setSentCount((c) => c + 1);
    } catch (err) {
      setError('No response right now. Please try again or ask a different question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack
      width="100%"
      maxWidth={isNavy ? 520 : 560}
      alignSelf="stretch"
      gap="$3"
      padding="$5"
      backgroundColor={isNavy ? 'rgba(18,24,58,0.9)' : 'rgba(255,255,255,0.92)'}
      borderRadius="$radius.12"
      borderWidth={2}
      borderColor={isNavy ? 'rgba(255,255,255,0.14)' : '$borderSoft'}
      shadowColor={isNavy ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.08)'}
      shadowRadius={12}
      shadowOffset={{ height: 4, width: 0 }}
      style={{
        backgroundImage: isNavy
          ? 'radial-gradient(700px 400px at 20% 10%, rgba(88,129,255,0.18), transparent 55%), radial-gradient(600px 320px at 80% 0%, rgba(255,143,143,0.16), transparent 50%)'
          : 'radial-gradient(700px 400px at 20% 10%, rgba(255,205,167,0.24), transparent 55%), radial-gradient(600px 320px at 80% 0%, rgba(255,183,143,0.2), transparent 50%)',
      }}
    >
      <XStack justifyContent="space-between" alignItems="center" gap="$3" flexWrap="wrap">
        <YStack gap="$1" flexShrink={1}>
          <Paragraph
            fontSize="$6"
            fontFamily="$heading"
            fontWeight="800"
            letterSpacing={0.3}
            color={isNavy ? '#FFFFFF' : '$primaryDeep'}
          >
            AI Raga Guide
          </Paragraph>
          <Paragraph color="$textSecondary" fontSize="$3">
            Fast answers about any raga
          </Paragraph>
        </YStack>
        <Button
          size="$3"
          backgroundColor={isNavy ? 'rgba(255,255,255,0.06)' : '$surface'}
          color={isNavy ? '#FFFFFF' : '$primary'}
          borderWidth={1}
          borderColor={isNavy ? 'rgba(255,255,255,0.18)' : '$borderSoft'}
          onPress={() => setIsOpen((prev) => !prev)}
          hoverStyle={{ backgroundColor: isNavy ? 'rgba(255,255,255,0.1)' : '$surfaceAlt' }}
          animation="bouncy"
        >
          {isOpen ? 'Hide' : 'Open'}
        </Button>
      </XStack>

      {isOpen && (
        <YStack gap="$3">
          <XStack gap="$2" flexWrap="wrap">
            {quickPrompts.map((q) => (
              <Button
                key={q}
                size="$2"
                backgroundColor={isNavy ? 'rgba(255,255,255,0.08)' : '$surface'}
                color="$textPrimary"
                borderWidth={1}
                borderColor={isNavy ? 'rgba(255,255,255,0.14)' : '$borderSoft'}
                onPress={() => setPrompt(q)}
              >
                {q}
              </Button>
            ))}
          </XStack>
          <TextArea
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Ask a question about a raga..."
            placeholderTextColor="$textSecondary"
            backgroundColor="$surface"
            borderColor="$borderSoft"
            color="$textPrimary"
            minHeight={100}
            padding="$3"
            rows={4}
            maxLength={maxLength}
          />
          <Button
            onPress={handleSend}
            backgroundColor="$primary"
            color="$surface"
            borderColor="$primaryDeep"
            borderWidth={1}
            disabled={isLoading}
            hoverStyle={{ backgroundColor: '$primaryHover' }}
            animation="bouncy"
          >
            {isLoading ? <Spinner color="$surface" /> : 'Send'}
          </Button>

          {error && (
            <Paragraph color="$primary" fontSize="$3">
              {error}
            </Paragraph>
          )}

          {response && !error && (
            <YStack
              gap="$2"
              padding="$3"
              backgroundColor="$surface"
              borderRadius="$radius.6"
              borderWidth={1}
              borderColor="$borderLight"
              maxHeight={200}
              overflow="auto"
            >
              <Paragraph fontSize="$3" color="$textSecondary">
                RagaBot says:
              </Paragraph>
              <Paragraph fontSize="$4" color="$textPrimary">
                {response}
              </Paragraph>
            </YStack>
          )}
        </YStack>
      )}
    </YStack>
  );
};
