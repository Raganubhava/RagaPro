import { useCallback, useRef, useState } from 'react';
import { Button, Checkbox, Label, Paragraph, Spinner, XStack, YStack, useThemeName } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import { RagaSearchBar } from './RagaSearchBar';
import { PageContainer } from './PageContainer';
import { RagaCard } from './RagaCard';
import { ChatBotPanel } from './ChatBotPanel';
import { Footer } from './Footer';
import { Raga } from '@raga/data';
import { HindustaniRaga, HindustaniRagaCard } from './HindustaniRagaCard';
import { isHindustaniRaga } from '../constants/hindustaniRagas';
import { API_ENDPOINTS } from '../constants/api';
import { useApiClient } from '../hooks/useApi';

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
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');
  const searchSectionRef = useRef<HTMLDivElement | null>(null);
  const chatBotRef = useRef<HTMLDivElement | null>(null);
  const api = useApiClient();

  const isValidQuery = (value: string) => /^[A-Za-z\s]+$/.test(value);
  const blockedWords = /\b(abuse|abusive|asshole|bastard|bitch|bloody|bullshit|crap|damn|dick|fuck|fucking|idiot|jerk|moron|nonsense|obscene|pervert|porn|pornographic|racist|sex|sexual|shit|stupid|suck|trash|ugly|violence|violent|vulgar|whore)\b/i;

  const getRagaFromAPI = useCallback(
    async (ragaName: string, system: RagaSystem): Promise<Raga | HindustaniRaga> => {
      const url = system === 'hindustani' ? API_ENDPOINTS.hindustaniRaga(ragaName) : API_ENDPOINTS.raga(ragaName);
      return api.fetchJson<Raga | HindustaniRaga>(url);
    },
    [api]
  );

  const handleScrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      setSearchResult(null);
      setError('Please enter a raga name to search.');
      setHasSearched(false);
      return;
    }

    if (!isValidQuery(searchText.trim())) {
      setError('Please enter letters and spaces only (A-Z).');
      setSearchResult(null);
      setHasSearched(false);
      return;
    }

    if (blockedWords.test(searchText.trim())) {
      setError('This is a sacred site for ragas. Please avoid inappropriate content and search for a raga name.');
      setSearchResult(null);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    const normalizedQuery = searchText.trim();
    const selectedSystems: RagaSystem[] = [];
    if (systemFilters.hindustani) selectedSystems.push('hindustani');
    if (systemFilters.carnatic) selectedSystems.push('carnatic');
    const systemsToSearch = selectedSystems.length === 0 ? (['hindustani', 'carnatic'] as const) : selectedSystems;

    if (systemsToSearch.length === 2) {
      const prioritizedSystems: RagaSystem[] = isHindustaniRaga(normalizedQuery)
        ? ['hindustani', 'carnatic']
        : ['carnatic', 'hindustani'];

      let lastErr: unknown = null;
      try {
        for (const system of prioritizedSystems) {
          try {
            const result = await getRagaFromAPI(normalizedQuery, system);
            setLastSystem(system);
            setSearchResult(result);
            return;
          } catch (systemErr) {
            lastErr = systemErr;
          }
        }

        const msg = lastErr instanceof Error ? lastErr.message : 'Unknown error';
        setError(`Could not find raga "${normalizedQuery}" in the Hindustani or Carnatic catalogs. ${msg}`);
        setSearchResult(null);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const targetSystem: RagaSystem = systemsToSearch[0];

    try {
      const result = await getRagaFromAPI(normalizedQuery, targetSystem);
      setLastSystem(targetSystem);
      setSearchResult(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      const label = targetSystem === 'hindustani' ? 'Hindustani' : 'Carnatic';
      setError(`Could not find raga "${normalizedQuery}" in the ${label} catalog. ${msg}`);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const heroBorder = isNavy ? 'rgba(255,255,255,0.12)' : '#E5D6C8';

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      position="relative"
      overflow="hidden"
      color={isNavy ? '#F5F7FF' : '$textPrimary'}
      {...(isNavy
        ? {
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(74,118,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,148,255,0.14), transparent 42%), linear-gradient(180deg, rgba(11,16,38,0.9) 0%, rgba(11,16,38,0.95) 100%)',
          }
        : {
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(255,186,120,0.25), transparent 40%), radial-gradient(circle at 82% -4%, rgba(103,174,255,0.2), transparent 38%), linear-gradient(180deg, #f9f5ef 0%, #f3eee7 100%)",
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
            gap="$4"
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isNavy ? 'rgba(255,255,255,0.04)' : '#FFFFFF'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isNavy ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.1)'}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 4 }}
            alignItems="flex-start"
            justifyContent="space-between"
            flexWrap="wrap"
            $sm={{
              flexDirection: 'column',
              padding: '$4',
              gap: '$4',
            }}
          >
            <YStack gap="$3" flex={1} minWidth={260} maxWidth={640} alignItems="center">
              <Paragraph
                fontFamily="$heading"
                fontSize="$8"
                color={isNavy ? '#FFFFFF' : '$primaryDeep'}
                textAlign="center"
                $sm={{ fontSize: '$7' }}
              >
                Search any raga
              </Paragraph>
              <Paragraph color="$textSecondary" fontSize="$4" lineHeight={24} textAlign="center" $sm={{ fontSize: '$3' }}>
                Enter a Carnatic or Hindustani raga name and click Search. Scroll down to view the raga details.
              </Paragraph>
              <RagaSearchBar
                value={searchText}
                onChange={(val) => {
                  setSearchText(val);
                  if (error) setError(null);
                }}
                onSearch={handleSearch}
              />
              <XStack gap="$4" alignItems="center" justifyContent="center" flexWrap="wrap">
                <Paragraph fontWeight="700" color={isNavy ? '#FFFFFF' : '$primary'} fontSize="$4">
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
                      <Label htmlFor={`tradition-${systemKey}`} color="$textSecondary" fontSize="$3">
                        {systemKey === 'hindustani' ? 'Hindustani' : 'Carnatic'}
                      </Label>
                    </XStack>
                  ))}
                </XStack>
              </XStack>
              <Paragraph color="$textSecondary" fontSize="$3" marginTop="$1">
                Tip: Choose traditions above (Hindustani/Carnatic) to control where we search first.
              </Paragraph>
            </YStack>

            <YStack
              ref={chatBotRef}
              width="100%"
              maxWidth={360}
              backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '#FFFFFF'}
              borderWidth={1}
              borderColor={heroBorder}
              borderRadius="$radius.12"
              padding="$4"
              gap="$3"
              shadowColor={isNavy ? 'rgba(0,0,0,0.24)' : 'rgba(0,0,0,0.08)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
              flexShrink={0}
              $sm={{
                width: '100%',
                maxWidth: '100%',
              }}
            >
              <Paragraph fontWeight="800" color={isNavy ? '#FFFFFF' : '$primaryDeep'} fontSize="$5">
                AI Raga Guide
              </Paragraph>
              <Paragraph color="$textSecondary" lineHeight={22} $sm={{ fontSize: '$3' }}>
                Ask raga related questions. The Raga bot waiting for you :)
              </Paragraph>
              <ChatBotPanel />
            </YStack>
          </XStack>

          {/* Loading State */}
          {isLoading && (
            <YStack gap="$3" alignItems="center" paddingTop="$4">
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
              backgroundColor={isNavy ? 'rgba(255,87,87,0.08)' : '$backgroundStrong'}
              borderRadius="$10"
              maxWidth={600}
              marginHorizontal="auto"
              borderWidth={1}
              borderColor={isNavy ? 'rgba(255,87,87,0.25)' : '$borderSoft'}
            >
              <Paragraph fontSize="$lg" color="$primaryActive" fontWeight="700">
                Oops!
              </Paragraph>
              <Paragraph fontSize="$md" color="$text" textAlign="center">
                {error}
              </Paragraph>
              <Paragraph fontSize="$sm" color="$textSoft" textAlign="center">
                Try another spelling or switch systems; the assistant can also help you find nearby matches.
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
                  handleScrollToSearch();
                }}
                backgroundColor="$secondary"
                color="$text"
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
            <Paragraph fontSize="$lg" color="$textSecondary" marginTop="$4" textAlign="center">
              Enter a raga name and search to get started
            </Paragraph>
          )}

          {/* Highlights */}
          <YStack gap="$3" width="100%" paddingTop="$2">
            <Paragraph fontFamily="$heading" fontSize="$7" color={isNavy ? '#FFFFFF' : '$primaryDeep'}>
              Why musicians use RagaPro
            </Paragraph>
            <XStack gap="$3" flexWrap="wrap">
              {[
                {
                  title: 'Precision search',
                  body: 'Understands Hindustani/Carnatic variants and validates spellings so you land on the right raga faster.',
                },
                {
                  title: 'Practice-ready detail',
                  body: 'Arohanam, avarohanam, swaras, and context presented cleanly for quick sessions.',
                },
                {
                  title: 'Guided exploration',
                  body: 'Ask the AI guide for similar ragas, mood suggestions, or corrections mid-practice.',
                },
              ].map((card) => (
                <YStack
                  key={card.title}
                  flexGrow={1}
                  minWidth={220}
                  maxWidth={360}
                  padding="$4"
                  borderRadius="$radius.10"
                  backgroundColor={isNavy ? 'rgba(255,255,255,0.04)' : '#FFFFFF'}
                  borderWidth={1}
                  borderColor={heroBorder}
                  gap="$2"
                >
                  <Paragraph fontWeight="800" color={isNavy ? '#FFFFFF' : '$primary'} fontSize="$5">
                    {card.title}
                  </Paragraph>
                  <Paragraph color="$textSecondary" lineHeight={22}>
                    {card.body}
                  </Paragraph>
                </YStack>
              ))}
            </XStack>
          </YStack>
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
