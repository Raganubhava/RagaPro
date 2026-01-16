import { useEffect, useMemo, useState } from 'react';
import { Button, Paragraph, TextArea, XStack, YStack, Spinner, useThemeName } from 'tamagui';
import { API_ENDPOINTS } from '../constants/api';
import { HINDUSTANI_RAGAS } from '../constants/hindustaniRagas';
import { CARNATIC_RAGAS } from '../constants/carnaticRagas';

export const ChatBotPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentCount, setSentCount] = useState(0);
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');

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

  const findLikelyRaga = (text: string) => {
    const lower = text.toLowerCase();
    const hindustaniMatch = HINDUSTANI_RAGAS.find((name) => lower.includes(name.toLowerCase()));
    if (hindustaniMatch) return { system: 'hindustani' as const, name: hindustaniMatch };
    const carnaticMatch = CARNATIC_RAGAS.find((name) => lower.includes(name.toLowerCase()));
    if (carnaticMatch) return { system: 'carnatic' as const, name: carnaticMatch };
    return null;
  };

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
      const target = findLikelyRaga(cleaned);
      const endpoint = target?.system === 'hindustani' ? API_ENDPOINTS.chatBotHindustani : API_ENDPOINTS.chatBot;

      const payload = target
        ? { message: cleaned, ragaName: target.name, system: target.system }
        : { message: cleaned };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
      maxWidth={isDark ? 520 : 560}
      alignSelf="stretch"
      gap="$3"
      padding="$5"
      backgroundColor={isDark ? 'rgba(18,24,58,0.9)' : 'rgba(255,255,255,0.92)'}
      borderRadius="$radius.12"
      borderWidth={2}
      borderColor={isDark ? 'rgba(255,255,255,0.14)' : '$borderSoft'}
      shadowColor={isDark ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.08)'}
      shadowRadius={12}
      shadowOffset={{ height: 4, width: 0 }}
      style={{
        backgroundImage: isDark
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
            color={isDark ? '#FFFFFF' : '$primaryDeep'}
          >
            AI Raga Guide
          </Paragraph>
          <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
            Fast answers about any raga
          </Paragraph>
        </YStack>
        <Button
          size="$3"
          backgroundColor={isDark ? 'rgba(255,255,255,0.06)' : '$surface'}
          color={isDark ? '#FFFFFF' : '$primary'}
          borderWidth={1}
          borderColor={isDark ? 'rgba(255,255,255,0.18)' : '$borderSoft'}
          onPress={() => setIsOpen((prev) => !prev)}
          hoverStyle={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '$surfaceAlt' }}
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
                backgroundColor={isDark ? 'rgba(255,255,255,0.08)' : '$surface'}
                color={isDark ? '#FFFFFF' : '$textPrimary'}
                borderWidth={1}
                borderColor={isDark ? 'rgba(255,255,255,0.14)' : '$borderSoft'}
                maxWidth="100%"
                flexShrink={1}
                alignSelf="flex-start"
                style={{ whiteSpace: 'normal', textAlign: 'left' }}
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
              <Paragraph fontSize="$3" color={isDark ? '#FFFFFF' : '$textSecondary'}>
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
