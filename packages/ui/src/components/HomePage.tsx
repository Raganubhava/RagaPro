import { useState } from 'react';
import { YStack, XStack, Paragraph, Button, Spinner } from 'tamagui';
import { RagaSearchBar } from './RagaSearchBar';
import { PageContainer } from './PageContainer';
import { RagaCard } from './RagaCard';
import { ChatBotPanel } from './ChatBotPanel';
import { Raga } from '@raga/data';

const API_BASE_URL = 'https://localhost:44308/api';

const getRagaFromAPI = async (ragaName: string): Promise<Raga> => {
  const url = `${API_BASE_URL}/raga/${ragaName}`;
  console.log('🔍 Fetching raga from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Success - Raga data:', data);
    return data;
  } catch (err) {
    console.error('❌ Fetch error details:', err);
    throw err;
  }
};

export const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<Raga | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

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

    try {
      const result = await getRagaFromAPI(searchText.trim());
      setSearchResult(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      console.error('Search error:', errorMsg);
      setError(`Could not find raga "${searchText.trim()}". ${errorMsg}`);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <YStack flex={1} justifyContent="flex-start" alignItems="center" gap="$6" paddingTop="$6">
        {/* Header with right-aligned chatbot */}
        <YStack width="100%" maxWidth={1100} position="relative" alignItems="center">
          <YStack gap="$2" alignItems="center">
            <Paragraph fontSize="$9" fontWeight="700" color="$primary">
              Search Ragas
            </Paragraph>
            <Paragraph fontSize="$lg" color="$textSecondary" textAlign="center">
              Enter a raga name to explore its musical characteristics
            </Paragraph>
          </YStack>
          <YStack
            position="absolute"
            top={0}
            right={-70}
            $sm={{
              position: 'relative',
              top: undefined,
              right: undefined,
              alignItems: 'center',
              marginTop: '$3',
            }}
          >
            <ChatBotPanel />
          </YStack>
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
              ⚠️ Oops!
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
            <RagaCard raga={searchResult} />
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
  );
};
