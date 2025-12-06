import { useState } from 'react';
import { YStack } from 'tamagui';
import { RagaSearchBar } from './RagaSearchBar';
import { PageContainer } from './PageContainer';
import { RagaCard } from './RagaCard';
import { sampleRagas } from '@raga/data';

export const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      // Simulate finding a result
      setSearchResult(sampleRagas[0]);
    } else {
      setSearchResult(null);
    }
  };

  return (
    <PageContainer>
      <YStack flex={1} justifyContent="center" alignItems="center" gap="$6">
        <RagaSearchBar
          value={searchText}
          onChange={setSearchText}
          onSearch={handleSearch}
        />

        {searchResult && (
          <YStack width="100%" maxWidth={600} marginTop="$6">
            <RagaCard raga={searchResult} />
          </YStack>
        )}
      </YStack>
    </PageContainer>
  );
};
