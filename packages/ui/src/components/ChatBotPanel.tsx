import { useEffect, useMemo, useState } from 'react';
import { Button, Paragraph, TextArea, XStack, YStack, Spinner } from 'tamagui';
import { API_ENDPOINTS } from '../constants/api';

export const ChatBotPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentCount, setSentCount] = useState(0);

  const maxLength = 600;
  const injectionPattern = /\b(select|insert|update|delete|drop|alter|truncate)\b/i;
  const blockedWords = /\b(abuse|abusive|asshole|bastard|bitch|bloody|bullshit|crap|damn|dick|fuck|fucking|idiot|jerk|moron|nonsense|obscene|pervert|porn|pornographic|racist|sex|sexual|shit|stupid|suck|trash|ugly|violence|violent|vulgar|whore)\b/i;
  const sanitize = useMemo(
    () => (text: string) =>
      text
        .replace(/[\u0000-\u001F\u007F]+/g, '') // strip control chars
        .replace(/<[^>]*>/g, '') // drop html tags
        .trim(),
    []
  );

  // Inject a lightweight glitter keyframe only once to avoid perf costs.
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
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const botText = data?.answer ?? data?.message ?? '';
      setResponse(botText || 'No response received.');
      setSentCount((c) => c + 1);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      setError(`Could not reach RagaBot. ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack
      width={320}
      maxWidth={360}
      flexShrink={0}
      alignSelf="flex-start"
      $sm={{
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
      }}
      gap="$3"
      padding="$4"
      backgroundColor="$surfaceAlt"
      borderRadius="$radius.10"
      borderWidth={1}
      borderColor="$borderSoft"
      shadowColor="rgba(0,0,0,0.06)"
      shadowRadius={6}
      shadowOffset={{ height: 2, width: 0 }}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Paragraph
          fontSize="$6"
          fontFamily="$body"
          fontWeight="700"
          letterSpacing={0.2}
          color="$primary"
        >
          RagaBot 🤖
        </Paragraph>
        <Button
          size="$3"
          backgroundColor="transparent"
          color="$primary"
          borderWidth={1}
          borderColor="$primary"
          onPress={() => setIsOpen((prev) => !prev)}
          hoverStyle={{ backgroundColor: '$surface', color: '$primaryDeep' }}
          animation="bouncy"
        >
          {isOpen ? 'Hide' : 'Chat'}
        </Button>
      </XStack>

      {isOpen && (
        <YStack gap="$3">
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
