import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { H2, Paragraph, Spinner, Button, XStack, YStack, useThemeName } from 'tamagui';
import {
  API_ENDPOINTS,
  CARNATIC_RAGAS,
  HINDUSTANI_RAGAS,
  MelakarthaJanyaDetailCard,
  MelakarthaJanyaDetail,
  MELAKARTHA_MAP,
  PageContainer,
  Footer,
  RagaCard,
  HindustaniRagaCard,
  toRagaSlug,
  useApiClient,
  fetchAudioSource,
} from 'ui';
import { Seo } from './Seo';
import type { Raga } from '@raga/data';
import type { HindustaniRaga } from 'ui';

const baseUrl = 'https://raganidhi.com';
const ogImage = `${baseUrl}/RagaNidhi2.png`;

const resolveNameFromSlug = (slug: string, list: readonly string[]) => {
  const normalized = slug.trim().toLowerCase();
  const match = list.find((name) => toRagaSlug(name) === normalized);
  if (match) return match;
  return decodeURIComponent(slug).replace(/-/g, ' ');
};

const isValidSlug = (slug: string) => {
  const normalized = slug.trim();
  if (normalized.length === 0 || normalized.length > 50) return false;
  return /^[a-z-]+$/i.test(normalized);
};

const buildCarnaticJsonLd = (raga: Raga, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MusicComposition',
  name: raga.ragaName,
  genre: 'Carnatic',
  description: raga.description || undefined,
  url,
});

const buildHindustaniJsonLd = (raga: HindustaniRaga, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MusicComposition',
  name: raga.ragaName,
  genre: 'Hindustani',
  description: raga.description || undefined,
  url,
});

export const CarnaticRagaDetailPage = () => {
  const { slug } = useParams();
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const [raga, setRaga] = useState<Raga | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const api = useApiClient();

  const ragaName = useMemo(() => {
    if (!slug || !isValidSlug(slug)) return '';
    return resolveNameFromSlug(slug, CARNATIC_RAGAS);
  }, [slug]);

  useEffect(() => {
    if (!ragaName) {
      setLoading(false);
      if (slug && !isValidSlug(slug)) {
        setError('Invalid raga name.');
      }
      return;
    }
    let cancelled = false;
    const loadRaga = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.fetchJson<Raga>(API_ENDPOINTS.raga(ragaName));
        let swaraSancharamAudio: string | null = null;
        try {
          swaraSancharamAudio = await fetchAudioSource(
            api.fetchRaw,
            API_ENDPOINTS.swaraSancharamAudio(ragaName)
          );
        } catch {
          // Swara sancharam audio is optional; ignore failures.
        }
        if (cancelled) return;
        setRaga({
          ...data,
          // Prefer dedicated endpoint, but preserve audio from main payload if present.
          swaraSancharamAudio:
            swaraSancharamAudio ?? data.swaraSancharamAudio ?? data.swarasancharam_audio ?? null,
        });
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Unable to load raga.');
        setRaga(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadRaga();
    return () => {
      cancelled = true;
    };
  }, [api, ragaName]);

  const pageTitle = raga ? `${raga.ragaName} | Raganidhi` : 'Carnatic Raga | Raganidhi';
  const pageDescription =
    raga?.description ||
    'Explore Carnatic raga details including arohana, avarohana, compositions, and key phrases.';
  const pageUrl = `${baseUrl}/carnatic-ragas/${slug ?? ''}`;

  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      url={pageUrl}
      imageUrl={ogImage}
      jsonLd={raga ? buildCarnaticJsonLd(raga, pageUrl) : undefined}
    >
      <YStack
        minHeight="100vh"
        backgroundColor="$background"
        color={isDark ? '#F5F7FF' : '$textPrimary'}
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
          <YStack gap="$5" paddingVertical="$6">
            <H2 color={isDark ? '#FFFFFF' : '$primaryDeep'}>
              Raga: {ragaName || 'Carnatic Raga'}
            </H2>

            {loading && (
              <XStack gap="$2" alignItems="center">
                <Spinner size="small" color="$primary" />
                <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>Loading raga details...</Paragraph>
              </XStack>
            )}

            {error && (
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>
                {error === 'Invalid raga name.'
                  ? 'Please use letters only (A-Z) and keep the name under 50 characters.'
                  : 'Unable to load this raga. Please check the spelling or go back to the index.'}
              </Paragraph>
            )}

            {raga && <RagaCard raga={raga} />}

            <Paragraph
              asChild
              color={isDark ? '#FFFFFF' : '$textSecondary'}
              textDecorationLine="underline"
              alignSelf="flex-start"
            >
              <a href="/carnatic-ragas">Back to Carnatic Ragas</a>
            </Paragraph>
          </YStack>
        </PageContainer>
        <Footer />
      </YStack>
    </Seo>
  );
};

export const HindustaniRagaDetailPage = () => {
  const { slug } = useParams();
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const [raga, setRaga] = useState<HindustaniRaga | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const ragaName = useMemo(() => {
    if (!slug || !isValidSlug(slug)) return '';
    return resolveNameFromSlug(slug, HINDUSTANI_RAGAS);
  }, [slug]);

  useEffect(() => {
    if (!ragaName) {
      setLoading(false);
      if (slug && !isValidSlug(slug)) {
        setError('Invalid raga name.');
      }
      return;
    }
    setLoading(true);
    setError(null);
    fetch(API_ENDPOINTS.hindustaniRaga(ragaName))
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HindustaniRaga>;
      })
      .then(setRaga)
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load raga.'))
      .finally(() => setLoading(false));
  }, [ragaName]);

  const pageTitle = raga ? `${raga.ragaName} | Raganidhi` : 'Hindustani Raga | Raganidhi';
  const pageDescription =
    raga?.description ||
    'Explore Hindustani raga details including arohan, avarohan, and characteristic phrases.';
  const pageUrl = `${baseUrl}/hindustani-ragas/${slug ?? ''}`;

  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      url={pageUrl}
      imageUrl={ogImage}
      jsonLd={raga ? buildHindustaniJsonLd(raga, pageUrl) : undefined}
    >
      <YStack
        minHeight="100vh"
        backgroundColor="$background"
        color={isDark ? '#F5F7FF' : '$textPrimary'}
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
          <YStack gap="$5" paddingVertical="$6">
            <H2 color={isDark ? '#FFFFFF' : '$primaryDeep'}>
              Raga: {ragaName || 'Hindustani Raga'}
            </H2>

            {loading && (
              <XStack gap="$2" alignItems="center">
                <Spinner size="small" color="$primary" />
                <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>Loading raga details...</Paragraph>
              </XStack>
            )}

            {error && (
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>
                {error === 'Invalid raga name.'
                  ? 'Please use letters only (A-Z) and keep the name under 50 characters.'
                  : 'Unable to load this raga. Please check the spelling or go back to the index.'}
              </Paragraph>
            )}

            {raga && <HindustaniRagaCard raga={raga} />}

            <Paragraph
              asChild
              color={isDark ? '#FFFFFF' : '$textSecondary'}
              textDecorationLine="underline"
              alignSelf="flex-start"
            >
              <a href="/hindustani-ragas">Back to Hindustani Ragas</a>
            </Paragraph>
          </YStack>
        </PageContainer>
        <Footer />
      </YStack>
    </Seo>
  );
};

export const MelakarthaJanyaDetailPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const [raga, setRaga] = useState<MelakarthaJanyaDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const melaId = Number(new URLSearchParams(location.search).get('melaId'));
  const melakarthaName = Number.isFinite(melaId) ? MELAKARTHA_MAP[melaId] : undefined;
  const headingBg = isDark ? 'rgba(255,255,255,0.06)' : '#F6E8CC';
  const headingBorder = isDark ? 'rgba(255,255,255,0.14)' : '#E2C6A4';

  const slugValue = useMemo(() => {
    if (!slug || !isValidSlug(slug)) return '';
    return slug.trim().toLowerCase();
  }, [slug]);

  useEffect(() => {
    if (!slugValue) {
      setLoading(false);
      if (slug && !isValidSlug(slug)) {
        setError('Invalid raga name.');
      }
      return;
    }
    if (!Number.isFinite(melaId) || melaId <= 0) {
      setLoading(false);
      setError('Missing Melakartha id. Please open this page from a Melakartha list.');
      return;
    }
    setLoading(true);
    setError(null);
    fetch(API_ENDPOINTS.janyaByMela(melaId))
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<MelakarthaJanyaDetail[]>;
      })
      .then((list) => {
        const match = list.find((item) => toRagaSlug(item.janyaRaga) === slugValue);
        if (!match) {
          throw new Error('Raga not found in this Melakartha list.');
        }
        setRaga(match);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load raga.'))
      .finally(() => setLoading(false));
  }, [melaId, slug, slugValue]);

  const pageTitle = raga ? `${raga.janyaRaga} | Raganidhi` : 'Melakartha Janya Raga | Raganidhi';
  const pageDescription =
    raga?.janyaRaga || 'Explore Melakartha janya raga details including arohana, avarohana, and swarasthanas.';
  const pageUrl = `${baseUrl}/melakartha-janya/${slug ?? ''}`;

  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      url={pageUrl}
      imageUrl={ogImage}
      jsonLd={undefined}
    >
      <YStack
        minHeight="100vh"
        backgroundColor="$background"
        color={isDark ? '#F5F7FF' : '$textPrimary'}
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
          <YStack gap="$5" paddingVertical="$6">
            <YStack
              gap="$2"
              padding="$4"
              borderRadius="$radius.12"
              backgroundColor={headingBg}
              borderWidth={1}
              borderColor={headingBorder}
              shadowColor={isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'}
              shadowRadius={10}
              shadowOffset={{ width: 0, height: 4 }}
            >
              <Paragraph
                textTransform="uppercase"
                letterSpacing={1}
                fontSize="$2"
                fontWeight="700"
                color={isDark ? '#CFE0FF' : '$primaryDeep'}
              >
                Melakartha Janya
              </Paragraph>
              <H2 color={isDark ? '#FFFFFF' : '$primaryDeep'} letterSpacing={0.6}>
                Raga: {raga?.janyaRaga || 'Melakartha Janya Raga'}
              </H2>
              {melakarthaName && (
                <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} fontWeight="600">
                  Melakartha: <strong>{melakarthaName}</strong> (#{melaId})
                </Paragraph>
              )}
            </YStack>

            {loading && (
              <XStack gap="$2" alignItems="center">
                <Spinner size="small" color="$primary" />
                <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>Loading raga details...</Paragraph>
              </XStack>
            )}

            {error && (
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>
                {error === 'Invalid raga name.'
                  ? 'Please use letters only (A-Z) and keep the name under 50 characters.'
                  : 'Unable to load this raga. Please check the spelling or go back to the index.'}
              </Paragraph>
            )}

            {raga && <MelakarthaJanyaDetailCard raga={raga} />}

            <Paragraph
              asChild
              color={isDark ? '#FFFFFF' : '$textSecondary'}
              textDecorationLine="underline"
              alignSelf="flex-start"
            >
              <a href={Number.isFinite(melaId) && melaId > 0 ? `/melakartha-ragas/${melaId}` : '/melakartha-ragas'}>
                Back to Melakartha Ragas
              </a>
            </Paragraph>
          </YStack>
        </PageContainer>
        <Footer />
      </YStack>
    </Seo>
  );
};
