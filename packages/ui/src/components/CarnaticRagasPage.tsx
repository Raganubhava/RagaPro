import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input, Paragraph, Spinner, XStack, YStack, useThemeName } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { PageContainer } from './PageContainer';
import { API_ENDPOINTS } from '../constants/api';
import { CARNATIC_RAGAS } from '../constants/carnaticRagas';
import { useApiClient } from '../hooks/useApi';
import { Raga } from '@raga/data';
import { RagaCard } from './RagaCard';

export const CarnaticRagasPage = () => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedRaga, setSelectedRaga] = useState<Raga | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingName, setLoadingName] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [letterFilter, setLetterFilter] = useState<string | null>(null);
  const api = useApiClient();
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');

  const sortedRagas = useMemo(
    () => [...CARNATIC_RAGAS].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })),
    []
  );
  const filteredRagas = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    let list = sortedRagas;
    if (letterFilter) {
      list = list.filter((name) => name.toUpperCase().startsWith(letterFilter));
    }
    if (!query) return list;
    return list.filter((name) => name.toLowerCase().includes(query));
  }, [filterText, sortedRagas, letterFilter]);

  const PAGE_SIZE = 15;
  const pageCount = Math.max(1, Math.ceil(filteredRagas.length / PAGE_SIZE));
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filterText, letterFilter]);

  const pageSlice = useMemo(
    () => filteredRagas.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page, filteredRagas]
  );

  useEffect(() => {
    // Avoid showing stale selection when switching pages.
    setSelectedName(null);
    setSelectedRaga(null);
    setError(null);
  }, [page]);

  const handleSelect = async (name: string) => {
    setSelectedName(name);
    setError(null);
    setLoadingName(name);
    try {
      const data = await api.fetchJson<Raga>(API_ENDPOINTS.raga(name));
      setSelectedRaga(data);
      setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load raga details.';
      setError(`Could not load "${name}". ${message}`);
      setSelectedRaga(null);
    } finally {
      setLoadingName(null);
    }
  };

  const listBorder = isNavy ? 'rgba(255,255,255,0.08)' : '#E5D6C8';
  const listBg = isNavy ? 'rgba(255,255,255,0.03)' : '$surface';
  const activeBg = isNavy ? 'rgba(255,255,255,0.08)' : '$secondary';

  return (
    <PageContainer>
      <YStack gap="$6" paddingVertical="$6">
        <YStack gap="$2">
          <Paragraph fontSize="$9" fontWeight="800" color={isNavy ? '#FFFFFF' : '$primaryDeep'}>
            Carnatic Ragas Index
          </Paragraph>
          <Paragraph color="$textSecondary" lineHeight={24} maxWidth={840}>
            Browse every Carnatic raga in our catalog. Click a raga to fetch details.
          </Paragraph>
        </YStack>

        <YStack gap="$3">
          <Input
            placeholder="Filter ragas..."
            value={filterText}
            onChangeText={setFilterText}
            borderColor="$borderSoft"
            backgroundColor="$surface"
          />
          <XStack gap="$2" flexWrap="wrap">
            <Button
              size="$2"
              backgroundColor={letterFilter === null ? '$secondary' : '$surface'}
              borderColor="$borderSoft"
              borderWidth={1}
              onPress={() => setLetterFilter(null)}
            >
              All
            </Button>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
              const hasNames = sortedRagas.some((name) => name.toUpperCase().startsWith(letter));
              const isActive = letterFilter === letter;
              return (
                <Button
                  key={letter}
                  size="$2"
                  backgroundColor={isActive ? '$secondary' : '$surface'}
                  borderColor="$borderSoft"
                  borderWidth={1}
                  disabled={!hasNames}
                  onPress={() => setLetterFilter(letter)}
                >
                  {letter}
                </Button>
              );
            })}
          </XStack>
        </YStack>

        <YStack
          backgroundColor={listBg}
          borderWidth={1}
          borderColor={listBorder}
          borderRadius="$radius.12"
          padding="$4"
          gap="$2"
        >
          {pageSlice.map((name) => {
            const isActive = selectedName === name;
            const isBusy = loadingName === name;
            return (
              <Button
                key={name}
                justifyContent="space-between"
                backgroundColor={isActive ? activeBg : '$background'}
                borderColor={listBorder}
                borderWidth={1}
                borderRadius="$radius.8"
                paddingVertical="$3"
                paddingHorizontal="$4"
                onPress={() => handleSelect(name)}
                iconAfter={isBusy ? undefined : ChevronRight}
                disabled={isBusy}
              >
                <XStack alignItems="center" gap="$3" flex={1}>
                  <Paragraph
                    flex={1}
                    color={isNavy ? '#FFFFFF' : '$primaryDeep'}
                    fontWeight="700"
                    letterSpacing={0.2}
                  >
                    {name}
                  </Paragraph>
                  {isBusy && <Spinner size="small" color="$primary" />}
                </XStack>
              </Button>
            );
          })}
        </YStack>

        <XStack alignItems="center" justifyContent="space-between" gap="$3" flexWrap="wrap">
          <Paragraph color="$textSecondary">
            Page {page} of {pageCount} ({filteredRagas.length} ragas)
          </Paragraph>
          <XStack gap="$2">
            <Button
              size="$2"
              backgroundColor="$surface"
              borderColor="$borderSoft"
              borderWidth={1}
              disabled={page === 1}
              onPress={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              size="$2"
              backgroundColor="$surface"
              borderColor="$borderSoft"
              borderWidth={1}
              disabled={page === pageCount}
              onPress={() => setPage((p) => Math.min(pageCount, p + 1))}
            >
              Next
            </Button>
          </XStack>
        </XStack>

        {error && (
          <YStack
            borderWidth={1}
            borderColor={isNavy ? 'rgba(255,87,87,0.3)' : '$borderSoft'}
            backgroundColor={isNavy ? 'rgba(255,87,87,0.08)' : '$backgroundStrong'}
            borderRadius="$radius.10"
            padding="$4"
            gap="$2"
          >
            <Paragraph fontWeight="700" color="$primaryActive">
              Unable to fetch raga
            </Paragraph>
            <Paragraph color="$textSecondary">{error}</Paragraph>
          </YStack>
        )}

        <div ref={detailsRef} />

        {selectedRaga && (
          <YStack gap="$3">
            <Paragraph fontSize="$7" fontWeight="800" color={isNavy ? '#FFFFFF' : '$primaryDeep'}>
              {selectedRaga.ragaName}
            </Paragraph>
            <RagaCard raga={selectedRaga} />
          </YStack>
        )}
      </YStack>
    </PageContainer>
  );
};
