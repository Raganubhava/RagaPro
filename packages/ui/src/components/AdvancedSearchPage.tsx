import { useState, useEffect } from 'react';
import { H3, Paragraph, YStack } from 'tamagui';
import { RagaSearchBar } from './RagaSearchBar';
import { PageContainer } from './PageContainer';
import { RagaCardSkeletonGrid } from './RagaCardSkeletonGrid';
import { TopRagasGrid } from './TopRagasGrid';
import { sampleRagas } from '@raga/data';

export const AdvancedSearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<typeof sampleRagas>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(sampleRagas);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    console.log('Advanced searching for: ' + searchText);
  };

  return (
    <PageContainer>
      <YStack flex={1} alignItems="center" gap="$4">
        <H3 fontFamily="$heading" color="$primary">
          Advanced Search
        </H3>
        <RagaSearchBar
          value={searchText}
          onChange={setSearchText}
          onSearch={handleSearch}
        />
        <Paragraph color="$textSecondary">
          Find ragas by name, scale, or mood.
        </Paragraph>

        <YStack width="100%" marginTop="$6">
          {isLoading ? (
            <RagaCardSkeletonGrid />
          ) : (
            <TopRagasGrid ragas={data} />
          )}
        </YStack>
      </YStack>
    </PageContainer>
  );
};
