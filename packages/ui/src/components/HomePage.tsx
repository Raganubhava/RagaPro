import { useRef, useState } from 'react';
import { Button, Paragraph, Spinner, YStack, useThemeName } from 'tamagui';
import { RagaSearchBar } from './RagaSearchBar';
import { PageContainer } from './PageContainer';
import { RagaCard } from './RagaCard';
import { ChatBotPanel } from './ChatBotPanel';
import { Footer } from './Footer';
import { Raga } from '@raga/data';
import { HindustaniRagaCard, HindustaniRaga } from './HindustaniRagaCard';
import { isHindustaniRaga } from '../constants/hindustaniRagas';

const API_BASE_URL = 'https://localhost:44308/api';
type RagaSystem = 'carnatic' | 'hindustani';

const getRagaFromAPI = async (ragaName: string, system: RagaSystem): Promise<Raga | HindustaniRaga> => {
  const endpoint = system === 'hindustani' ? 'HindustaniRaga' : 'raga';
  const url = `${API_BASE_URL}/${endpoint}/${encodeURIComponent(ragaName)}`;
  console.log('Fetching raga from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Success - Raga data:', data);
    return data;
  } catch (err) {
    console.error('Fetch error details:', err);
    throw err;
  }
};

export const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<Raga | HindustaniRaga | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSystem, setLastSystem] = useState<RagaSystem>('carnatic');
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');
  const searchSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      setSearchResult(null);
      setError(null);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    const normalizedQuery = searchText.trim();
    const system: RagaSystem = isHindustaniRaga(normalizedQuery) ? 'hindustani' : 'carnatic';

    try {
      // Try Hindustani first when it matches the list; otherwise go straight to Carnatic.
      const primarySystem: RagaSystem = system;
      try {
        const result = await getRagaFromAPI(normalizedQuery, primarySystem);
        setLastSystem(primarySystem);
        setSearchResult(result);
      } catch (primaryErr) {
        // If Hindustani fails (e.g., Carnatic-only raga like Todi), fall back to Carnatic.
        if (primarySystem === 'hindustani') {
          try {
            const fallbackResult = await getRagaFromAPI(normalizedQuery, 'carnatic');
            setLastSystem('carnatic');
            setSearchResult(fallbackResult);
          } catch (fallbackErr) {
            const msg = fallbackErr instanceof Error ? fallbackErr.message : 'Unknown error';
            setError(`Could not find raga "${normalizedQuery}" in Hindustani or Carnatic catalogs. ${msg}`);
            setSearchResult(null);
          }
        } else {
          const msg = primaryErr instanceof Error ? primaryErr.message : 'Unknown error';
          setError(`Could not find raga "${normalizedQuery}" in Carnatic catalog. ${msg}`);
          setSearchResult(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      {...(isNavy
        ? {
            backgroundImage:
              'linear-gradient(180deg, rgba(11,16,38,0.78) 0%, rgba(11,16,38,0.84) 40%, rgba(11,16,38,0.9) 100%)',
          }
        : {
            backgroundImage:
              "linear-gradient(180deg, #f9f5ef 0%, #f3eee7 100%), url('/hampi.jpg')",
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: 'center, 32px 32px',
            backgroundSize: 'cover, 380px auto',
          })}
    >
      <PageContainer>
      <YStack
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
        gap="$4"
        paddingTop="$4"
        $sm={{
          paddingHorizontal: '$3',
          gap: '$3',
        }}
      >
        {/* Right-aligned chatbot */}
        <YStack width="100%" maxWidth={1100} position="relative" alignItems="center">
          <YStack
            position="absolute"
            top={0}
            right={-70}
            $sm={{
              position: 'relative',
              top: undefined,
              right: undefined,
              alignItems: 'center',
              marginBottom: '$3',
            }}
          >
            <ChatBotPanel />
          </YStack>
        </YStack>

        {/* Hero heading */}
        <YStack alignItems="center" gap="$2" paddingTop="$2">
          <YStack alignItems="center" gap="$1">
            <Paragraph
              fontFamily="$body"
              fontSize="$8"
              color="$primary"
              textAlign="center"
              letterSpacing={0.25}
              fontWeight="800"
              $sm={{ fontSize: '$6' }}
            >
              Discover Carnatic and Hindustani Ragas
            </Paragraph>
            <Paragraph
              fontFamily="$body"
              fontSize="$5"
              color="$textSecondary"
              textAlign="center"
              letterSpacing={0.15}
              $sm={{ fontSize: '$4' }}
            >
              Your companion for learning, practicing, and exploring Indian classical music
            </Paragraph>
          </YStack>
          <img
            src="/hampi.jpg"
            alt="Hampi temple"
            style={{
              width: 'min(280px, 80vw)',
              height: 'auto',
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              objectFit: 'cover',
            }}
          />
        </YStack>

        {/* Search Bar */}
        <RagaSearchBar
          value={searchText}
          onChange={setSearchText}
          onSearch={handleSearch}
        />

        {/* Loading State */}
        {isLoading && (
          <YStack gap="$3" alignItems="center" paddingTop="$6">
            <Spinner size="large" color="$primary" />
            <Paragraph fontSize="$lg" color="$textSecondary">
              Loading raga details...
            </Paragraph>
          </YStack>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <YStack
            gap="$3"
            alignItems="center"
            padding="$4"
            backgroundColor="$backgroundStrong"
            borderRadius="$10"
            maxWidth={500}
            marginTop="$4"
          >
            <Paragraph fontSize="$lg" color="$primaryActive" fontWeight="600">
              Oops!
            </Paragraph>
            <Paragraph fontSize="$md" color="$text" textAlign="center">
              {error}
            </Paragraph>
            <Paragraph fontSize="$sm" color="$textSoft" textAlign="center">
              Make sure the API server is running and check the browser console (F12) for details.
            </Paragraph>
            <Button
              marginTop="$2"
              onPress={() => setError(null)}
              backgroundColor="$primary"
              color="$background"
              size="$3"
            >
              Try Again
            </Button>
          </YStack>
        )}

        {/* Success State - Show Raga Details */}
        {searchResult && !isLoading && !error && (
          <YStack width="100%" maxWidth={700} marginTop="$4" gap="$4">
            <Paragraph fontSize="$sm" color="$textSecondary" textAlign="center">
              Found raga: <Paragraph fontWeight="700" color="$primary">{searchResult.ragaName}</Paragraph>
            </Paragraph>
            {lastSystem === 'hindustani' && 'thaat' in searchResult ? (
              <HindustaniRagaCard raga={searchResult} />
            ) : (
              <RagaCard raga={searchResult as Raga} />
            )}
            <Button
              onPress={() => {
                setSearchResult(null);
                setSearchText('');
                setHasSearched(false);
              }}
              backgroundColor="$secondary"
              color="$text"
              size="$3"
            >
              Search Another Raga
            </Button>
          </YStack>
        )}

        {/* No Results Message */}
        {hasSearched && !searchResult && !isLoading && !error && (
          <Paragraph fontSize="$lg" color="$textSecondary" marginTop="$6">
            Enter a raga name and search to get started
          </Paragraph>
        )}
      </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
