import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input, Paragraph, Spinner, XStack, YStack, useThemeName } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';
import { API_ENDPOINTS } from '../constants/api';
import { HINDUSTANI_RAGAS } from '../constants/hindustaniRagas';
import { useApiClient } from '../hooks/useApi';
import { HindustaniRaga, HindustaniRagaCard } from './HindustaniRagaCard';

export const HindustaniRagasPage = () => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedRaga, setSelectedRaga] = useState<HindustaniRaga | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingName, setLoadingName] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [letterFilter, setLetterFilter] = useState<string | null>(null);
  const [ragas, setRagas] = useState<string[]>(HINDUSTANI_RAGAS);
  const api = useApiClient();
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const darkBackground = '#0B1026';
  const darkSurface = '#12183A';

  useEffect(() => {
    let isMounted = true;
    const loadRagas = async () => {
      try {
        const data = await api.fetchJson<unknown>(API_ENDPOINTS.allHindustaniRagas);
        const names = Array.isArray(data)
          ? data
              .map((item) => (typeof item === 'string' ? item : (item as { ragaName?: string }).ragaName))
              .filter((name): name is string => Boolean(name))
          : [];
        if (isMounted && names.length > 0) {
          setRagas(names);
        }
      } catch {
        // Keep static list on failure.
      }
    };
    loadRagas();
    return () => {
      isMounted = false;
    };
  }, [api]);

  const sortedRagas = useMemo(
    () => [...ragas].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })),
    [ragas]
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
    setSelectedName(null);
    setSelectedRaga(null);
    setError(null);
  }, [page]);

  const handleSelect = async (name: string) => {
    setSelectedName(name);
    setError(null);
    setLoadingName(name);
    try {
      const data = await api.fetchJson<HindustaniRaga>(API_ENDPOINTS.hindustaniRaga(name));
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

  const listBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E5D6C8';
  const listBg = isDark ? darkSurface : '$surface';
  const activeBg = isDark ? 'rgba(255,255,255,0.08)' : '$secondary';

  return (
    <YStack
      minHeight="100vh"
      backgroundColor={isDark ? darkBackground : '$background'}
      {...(isDark
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage: 'none',
          })}
    >
      <PageContainer>
        <YStack gap="$6" paddingVertical="$6">
          <YStack gap="$2">
            <Paragraph fontSize="$9" fontWeight="800" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
              Hindustani Ragas Index
            </Paragraph>
            <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24} maxWidth={840}>
              Browse Hindustani ragas and click to fetch details.
            </Paragraph>
          </YStack>

        <YStack gap="$3">
          <Input
            placeholder="Filter ragas..."
            value={filterText}
            onChangeText={setFilterText}
            borderColor="$borderSoft"
            backgroundColor={isDark ? darkSurface : '$surface'}
            color={isDark ? '#FFFFFF' : '$textPrimary'}
            placeholderTextColor={isDark ? 'rgba(255,255,255,0.7)' : '$textSoft'}
          />
          <XStack gap="$2" flexWrap="wrap">
            <Button
              size="$2"
              backgroundColor={letterFilter === null ? '$secondary' : isDark ? darkSurface : '$surface'}
              borderColor="$borderSoft"
              borderWidth={1}
              color={isDark ? '#FFFFFF' : '$textPrimary'}
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
                  backgroundColor={isActive ? '$secondary' : isDark ? darkSurface : '$surface'}
                  borderColor="$borderSoft"
                  borderWidth={1}
                  color={isDark ? '#FFFFFF' : '$textPrimary'}
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
          borderWidth={3}
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
                backgroundColor={isActive ? activeBg : isDark ? darkBackground : '$background'}
                borderColor={listBorder}
                borderWidth={3}
                borderRadius="$radius.8"
                paddingVertical="$3"
                paddingHorizontal="$4"
                onPress={() => handleSelect(name)}
                iconAfter={isBusy ? undefined : ChevronRight}
                disabled={isBusy}
                hoverStyle={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f0e8de',
                }}
              >
                <XStack alignItems="center" gap="$3" flex={1}>
                  <Paragraph
                    flex={1}
                    color={isDark ? '#FFFFFF' : '$primaryDeep'}
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
          <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>
            Page {page} of {pageCount} ({filteredRagas.length} ragas)
          </Paragraph>
          <XStack gap="$2">
            <Button
              size="$2"
              backgroundColor={isDark ? darkSurface : '$surface'}
              borderColor="$borderSoft"
              borderWidth={1}
              color={isDark ? '#FFFFFF' : '$textPrimary'}
              disabled={page === 1}
              onPress={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              size="$2"
              backgroundColor={isDark ? darkSurface : '$surface'}
              borderColor="$borderSoft"
              borderWidth={1}
              color={isDark ? '#FFFFFF' : '$textPrimary'}
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
            borderColor={isDark ? 'rgba(255,87,87,0.3)' : '$borderSoft'}
            backgroundColor={isDark ? 'rgba(255,87,87,0.08)' : '$backgroundStrong'}
            borderRadius="$radius.10"
            padding="$4"
            gap="$2"
          >
            <Paragraph fontWeight="700" color="$primaryActive">
              Unable to fetch raga
            </Paragraph>
            <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>{error}</Paragraph>
          </YStack>
        )}

        <div ref={detailsRef} />

        {selectedRaga && (
          <YStack gap="$3">
            <Paragraph fontSize="$7" fontWeight="800" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
              {selectedRaga.ragaName}
            </Paragraph>
            <HindustaniRagaCard raga={selectedRaga} />
          </YStack>
        )}
      </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
