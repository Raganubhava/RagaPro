import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Checkbox, Label, Paragraph, Spinner, XStack, YStack, useThemeName } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import { RagaSearchBar } from './RagaSearchBar';
import { PageContainer } from './PageContainer';
import { RagaCard } from './RagaCard';
import { ChatBotPanel } from './ChatBotPanel';
import { Footer } from './Footer';
import { Raga } from '@raga/data';
import { HindustaniRaga, HindustaniRagaCard } from './HindustaniRagaCard';
import { CARNATIC_RAGAS } from '../constants/carnaticRagas';
import { HINDUSTANI_RAGAS, isHindustaniRaga } from '../constants/hindustaniRagas';
import { API_ENDPOINTS } from '../constants/api';
import { useApiClient } from '../hooks/useApi';
import { toRagaSlug } from '../utils/slug';

type RagaSystem = 'carnatic' | 'hindustani';

export const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<Raga | HindustaniRaga | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSystem, setLastSystem] = useState<RagaSystem>('carnatic');
  const [systemFilters, setSystemFilters] = useState<Record<RagaSystem, boolean>>({
    hindustani: true,
    carnatic: true,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const searchSectionRef = useRef<HTMLDivElement | null>(null);
  const chatBotRef = useRef<HTMLDivElement | null>(null);
  const api = useApiClient();
  const scrollToChatBot = () => chatBotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const isValidQuery = (value: string) => /^[A-Za-z\s'-]+$/.test(value);
  const blockedWords = /\b(abuse|abusive|asshole|bastard|bitch|bloody|bullshit|crap|damn|dick|fuck|fucking|idiot|jerk|moron|nonsense|obscene|pervert|porn|pornographic|racist|sex|sexual|shit|stupid|suck|trash|ugly|violence|violent|vulgar|whore)\b/i;

  const getRagaFromAPI = useCallback(
    async (ragaName: string, system: RagaSystem): Promise<Raga | HindustaniRaga> => {
      const url = system === 'hindustani' ? API_ENDPOINTS.hindustaniRaga(ragaName) : API_ENDPOINTS.raga(ragaName);
      return api.fetchJson<Raga | HindustaniRaga>(url);
    },
    [api]
  );

  const parseQuery = (value: string) => {
    const trimmed = value.trim();
    const match = trimmed.match(/\(([^)]+)\)\s*$/);
    let systemOverride: RagaSystem | null = null;
    let cleaned = trimmed;
    if (match) {
      const tag = match[1].toLowerCase();
      if (tag.includes('hindustani')) systemOverride = 'hindustani';
      if (tag.includes('carnatic')) systemOverride = 'carnatic';
      cleaned = trimmed.replace(/\s*\([^)]+\)\s*$/, '').trim();
    }
    cleaned = cleaned.replace(/\s+/g, ' ');
    return { cleaned, systemOverride, original: trimmed };
  };

  const handleScrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearch = async (overrideQuery?: string, overrideSystem?: RagaSystem | null) => {
    setShowSuggestions(false);
    const query = overrideQuery ?? searchText;
    const parsed = parseQuery(query);
    const parsedQuery = {
      ...parsed,
      systemOverride: overrideSystem ?? parsed.systemOverride,
    };
    if (parsedQuery.cleaned === '') {
      setSearchResult(null);
      setError('Please enter a raga name to search.');
      setHasSearched(false);
      return;
    }

    if (!isValidQuery(parsedQuery.cleaned)) {
      setError('Please enter letters, spaces, apostrophes, or hyphens only (A-Z).');
      setSearchResult(null);
      setHasSearched(false);
      return;
    }

    if (blockedWords.test(parsedQuery.cleaned)) {
      setError('This is a sacred site for ragas. Please avoid inappropriate content and search for a raga name.');
      setSearchResult(null);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    const normalizedQuery = parsedQuery.cleaned;
    const queryCandidates =
      parsedQuery.original && parsedQuery.original !== normalizedQuery
        ? [normalizedQuery, parsedQuery.original]
        : [normalizedQuery];
    const selectedSystems: RagaSystem[] = [];
    if (systemFilters.hindustani) selectedSystems.push('hindustani');
    if (systemFilters.carnatic) selectedSystems.push('carnatic');
    const systemsToSearch = parsedQuery.systemOverride
      ? [parsedQuery.systemOverride]
      : selectedSystems.length === 0
      ? (['hindustani', 'carnatic'] as const)
      : selectedSystems;

    if (systemsToSearch.length === 2) {
      const prioritizedSystems: RagaSystem[] = isHindustaniRaga(normalizedQuery)
        ? ['hindustani', 'carnatic']
        : ['carnatic', 'hindustani'];

      let lastErr: unknown = null;
        try {
          for (const system of prioritizedSystems) {
            try {
              let result: Raga | HindustaniRaga | null = null;
              let systemErr: unknown = null;
              for (const candidate of queryCandidates) {
                try {
                  result = await getRagaFromAPI(candidate, system);
                  break;
                } catch (candidateErr) {
                  systemErr = candidateErr;
                }
              }
              if (!result) throw systemErr;
              setLastSystem(system);
              setSearchResult(result);
              return;
            } catch (systemErr) {
              lastErr = systemErr;
            }
          }

          setError(`Could not find raga "${normalizedQuery}". Please check the spelling or try another raga.`);
          setSearchResult(null);
        } finally {
          setIsLoading(false);
        }
        return;
      }

    const targetSystem: RagaSystem = systemsToSearch[0];

    try {
      let result: Raga | HindustaniRaga | null = null;
      let lastErr: unknown = null;
      for (const candidate of queryCandidates) {
        try {
          result = await getRagaFromAPI(candidate, targetSystem);
          break;
        } catch (candidateErr) {
          lastErr = candidateErr;
        }
      }
      if (!result) throw lastErr;
      setLastSystem(targetSystem);
      setSearchResult(result);
    } catch (err) {
      const label = targetSystem === 'hindustani' ? 'Hindustani' : 'Carnatic';
      setError(`Could not find raga "${normalizedQuery}" in the ${label} catalog. Please try another name.`);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const heroBorder = isDark ? 'rgba(255,255,255,0.12)' : '#E5D6C8';
  const suggestions = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return [];
    const maxItems = 8;
    const matches: Array<{ name: string; system: RagaSystem }> = [];
    const addMatches = (names: readonly string[], system: RagaSystem) => {
      for (const name of names) {
        if (matches.length >= maxItems) return;
        if (name.toLowerCase().startsWith(query)) {
          matches.push({ name, system });
        }
      }
    };
    addMatches(CARNATIC_RAGAS, 'carnatic');
    addMatches(HINDUSTANI_RAGAS, 'hindustani');
    return matches;
  }, [searchText]);
  const handleSuggestionSelect = (name: string, system: RagaSystem) => {
    setSearchText(name);
    setError(null);
    setHasSearched(false);
    setShowSuggestions(false);
    handleSearch(name, system);
  };
  const detailPath =
    searchResult && lastSystem
      ? `/${lastSystem === 'hindustani' ? 'hindustani-ragas' : 'carnatic-ragas'}/${toRagaSlug(searchResult.ragaName)}`
      : '';

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target || !searchSectionRef.current) return;
      if (!searchSectionRef.current.contains(target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      position="relative"
      overflow="hidden"
      color={isDark ? '#F5F7FF' : '$textPrimary'}
      {...(isDark
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage:
              "none",
          })}
    >
      <PageContainer>
        <YStack
          flex={1}
          gap="$7"
          paddingTop="$5"
          paddingBottom="$8"
          $sm={{
            paddingHorizontal: '$3',
            gap: '$6',
          }}
        >
          {/* Search first */}
          <XStack
            ref={searchSectionRef}
            width="100%"
            maxWidth={880}
            alignSelf="center"
            gap="$4"
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isDark ? 'rgba(255,255,255,0.04)' : '#F7E7CF'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isDark ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.1)'}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 4 }}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            $sm={{
              flexDirection: 'column',
              padding: '$4',
              gap: '$4',
            }}
          >
            <YStack gap="$3" flex={1} minWidth={260} maxWidth={640} alignItems="center">
              <Paragraph
                fontFamily="$body"
                fontWeight="800"
                letterSpacing={0.4}
                fontSize="$6"
                color={isDark ? '#FFFFFF' : '$primaryDeep'}
                textAlign="center"
                $sm={{ fontSize: '$5' }}
              >
                RagaNidhi — The Living Library of 3,300+ Indian Classical Ragas
              </Paragraph>
              <Paragraph
                color={isDark ? '#FFFFFF' : '$textSecondary'}
                fontSize="$4"
                fontWeight="700"
                lineHeight={24}
                textAlign="center"
                $sm={{ fontSize: '$3' }}
              >
                रञ्जकः स्वरसन्दर्भः राग इत्यभिधीयते।
              </Paragraph>
              <Paragraph
                color={isDark ? '#FFFFFF' : '$textSecondary'}
                fontSize="$4"
                lineHeight={24}
                textAlign="center"
                $sm={{ fontSize: '$3' }}
              >
                Enter a Carnatic or Hindustani raga name and click Search. Scroll down to view the raga details.
              </Paragraph>
              <RagaSearchBar
                value={searchText}
                onChange={(val) => {
                  setSearchText(val);
                  setShowSuggestions(val.trim().length > 0);
                  if (error) setError(null);
                }}
                onSearch={() => handleSearch()}
                suggestions={showSuggestions ? suggestions : []}
                onSelectSuggestion={handleSuggestionSelect}
              />
              <XStack gap="$4" alignItems="center" justifyContent="center" flexWrap="wrap">
                <Paragraph fontWeight="700" color={isDark ? '#FFFFFF' : '$primary'} fontSize="$4">
                  Tradition
                </Paragraph>
                <XStack gap="$3" alignItems="center" flexWrap="wrap" justifyContent="center">
                  {(['hindustani', 'carnatic'] as const).map((systemKey) => (
                    <XStack key={systemKey} alignItems="center" gap="$2">
                      <Checkbox
                        id={`tradition-${systemKey}`}
                        size="$3"
                        checked={systemFilters[systemKey]}
                        onCheckedChange={(val) =>
                          setSystemFilters((prev) => ({
                            ...prev,
                            [systemKey]: val === true,
                          }))
                        }
                        backgroundColor="$background"
                        borderColor={heroBorder}
                      >
                        <Checkbox.Indicator>
                          <Check size="$1" />
                        </Checkbox.Indicator>
                      </Checkbox>
                      <Label htmlFor={`tradition-${systemKey}`} color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3">
                        {systemKey === 'hindustani' ? 'Hindustani' : 'Carnatic'}
                      </Label>
                    </XStack>
                  ))}
                </XStack>
              </XStack>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontSize="$3" marginTop="$1">
                Tip: Choose traditions above (Hindustani/Carnatic) to control where we search first.
              </Paragraph>
            </YStack>

            {/* Reserved for future content next to the search box */}
          </XStack>

          {/* Loading State */}
          {isLoading && (
            <YStack gap="$3" alignItems="center" paddingTop="$4">
              <Spinner size="large" color="$primary" />
              <Paragraph fontSize="$lg" color={isDark ? '#FFFFFF' : '$textSecondary'}>
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
              backgroundColor={isDark ? 'rgba(255,87,87,0.08)' : '$backgroundStrong'}
              borderRadius="$10"
              maxWidth={600}
              marginHorizontal="auto"
              borderWidth={1}
              borderColor={isDark ? 'rgba(255,87,87,0.25)' : '$borderSoft'}
            >
              <Paragraph fontSize="$lg" color="$primaryActive" fontWeight="700">
                Oops!
              </Paragraph>
              <Paragraph fontSize="$md" color={isDark ? '#FFFFFF' : '$text'} textAlign="center">
                {error}
              </Paragraph>
              <Paragraph fontSize="$sm" color={isDark ? '#FFFFFF' : '$textSoft'} textAlign="center">
                Try another spelling or switch traditions; the assistant can also help you find nearby matches.
              </Paragraph>
              <Button
                marginTop="$2"
                onPress={() => setError(null)}
                backgroundColor="$primary"
                color="$background"
                size="$3"
              >
                Dismiss
              </Button>
            </YStack>
          )}

          {/* Success State - Show Raga Details */}
          {searchResult && !isLoading && !error && (
            <YStack width="100%" maxWidth={800} marginHorizontal="auto" gap="$4">
              <YStack
                alignItems="center"
                gap="$2"
                padding="$3"
                borderRadius="$radius.10"
                backgroundColor={isDark ? 'rgba(255,255,255,0.06)' : '#DFF5E6'}
                borderWidth={1}
                borderColor={isDark ? 'rgba(255,255,255,0.1)' : '$borderSoft'}
                shadowColor={isDark ? 'rgba(0,0,0,0.24)' : 'rgba(0,0,0,0.06)'}
                shadowRadius={8}
                shadowOffset={{ width: 0, height: 3 }}
              >
                <Paragraph fontSize="$sm" color={isDark ? '#FFFFFF' : '$textSecondary'} textAlign="center" letterSpacing={0.5}>
                  Found raga
                </Paragraph>
                <Paragraph
                  fontSize="$8"
                  fontWeight="800"
                  color={isDark ? '#FFFFFF' : '$primaryDeep'}
                  textAlign="center"
                  letterSpacing={0.8}
                >
                  {searchResult.ragaName}
                </Paragraph>
              </YStack>
              {lastSystem === 'hindustani' && 'thaat' in searchResult ? (
                <HindustaniRagaCard raga={searchResult} onAskAI={scrollToChatBot} />
              ) : (
                <RagaCard raga={searchResult as Raga} onAskAI={scrollToChatBot} />
              )}
              {detailPath && (
                <Paragraph
                  asChild
                  color={isDark ? '#FFFFFF' : '$textSecondary'}
                  textDecorationLine="underline"
                  alignSelf="center"
                >
                  <a href={detailPath}>Open full page</a>
                </Paragraph>
              )}
              <Button
                onPress={() => {
                  setSearchResult(null);
                  setSearchText('');
                  setHasSearched(false);
                  setShowSuggestions(false);
                  handleScrollToSearch();
                }}
                backgroundColor="$secondary"
                color={isDark ? '#FFFFFF' : '$text'}
                size="$3"
                alignSelf="center"
                paddingHorizontal="$5"
              >
                Search another raga
              </Button>
            </YStack>
          )}

          {/* No Results Message */}
          {hasSearched && !searchResult && !isLoading && !error && (
            <Paragraph fontSize="$lg" color={isDark ? '#FFFFFF' : '$textSecondary'} marginTop="$4" textAlign="center">
              Enter a raga name and search to get started
            </Paragraph>
          )}

          {/* AI guide and mission side-by-side */}
          <XStack
            gap="$4"
            flexWrap="wrap"
            justifyContent="center"
            paddingTop="$2"
            alignItems="stretch"
          >
            <YStack
              ref={chatBotRef}
              padding="$4"
              borderRadius="$radius.12"
              backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : '#F6E8CC'}
              borderWidth={1}
              borderColor={heroBorder}
              gap="$3"
              width="100%"
              maxWidth={520}
              shadowColor={isDark ? 'rgba(0,0,0,0.24)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              flexGrow={1}
            >
              <Paragraph fontFamily="$heading" fontSize="$7" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
                AI Raga Guide
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24} fontSize="$4">
                Ask raga related questions. The Raga bot waiting for you :)
              </Paragraph>
              <ChatBotPanel />
            </YStack>

            <YStack
              padding="$4"
              borderRadius="$radius.12"
              backgroundColor={isDark ? 'rgba(255,255,255,0.05)' : '#F6E8CC'}
              borderWidth={1}
              borderColor={heroBorder}
              gap="$3"
              width="100%"
              maxWidth={520}
              shadowColor={isDark ? 'rgba(0,0,0,0.24)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              flexGrow={1}
            >
              <Paragraph fontFamily="$heading" fontSize="$7" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
                Mission — RagaNidhi
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22} fontSize="$4">
                RagaNidhi is an open-ended project dedicated to the discovery and learning of Indian classical music ragas. It brings Carnatic and Hindustani traditions closer together for listeners who approach with open ears.
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={22} fontSize="$4">
                By combining expert insights from renowned artists with knowledge drawn from music history, theory, and performance practice, RagaNidhi enables intelligent exploration and a deeper understanding of ragas across both traditions.
              </Paragraph>
            </YStack>
          </XStack>
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
