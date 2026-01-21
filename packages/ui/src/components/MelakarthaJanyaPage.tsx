import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Paragraph, Spinner, XStack, YStack, useThemeName } from 'tamagui';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { PageContainer } from './PageContainer';
import { Footer } from './Footer';
import { API_ENDPOINTS } from '../constants/api';
import { MELAKARTHA_MAP } from '../constants/swaraMap';
import { useApiClient } from '../hooks/useApi';
import { toRagaSlug } from '../utils/slug';

type JanyaRaga = {
  id: number;
  melakartha: string;
  janyaRaga: string;
  arohana: string;
  avarohana: string;
  chakra: string;
  melakarthaId: number;
  rishabham: string;
  gandharam: string;
  madhyamam: string;
  panchamam: string;
  daivatam: string;
  nishadam: string;
};

export const MelakarthaJanyaPage = () => {
  const { id } = useParams();
  const melaId = Number(id);
  const api = useApiClient();
  const navigate = useNavigate();
  const themeName = useThemeName();
  const isDark = themeName?.toLowerCase().includes('dark');
  const darkBackground = '#0B1026';
  const darkSurface = '#12183A';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [janyaList, setJanyaList] = useState<JanyaRaga[]>([]);

  const melakarthaName = MELAKARTHA_MAP[melaId];

  useEffect(() => {
    let isMounted = true;
    const loadJanya = async () => {
      if (!Number.isFinite(melaId) || melaId <= 0) {
        setError('Invalid Melakartha id.');
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await api.fetchJson<JanyaRaga[]>(API_ENDPOINTS.janyaByMela(melaId));
        if (isMounted) {
          setJanyaList(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to load janya ragas.';
        if (isMounted) {
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadJanya();
    return () => {
      isMounted = false;
    };
  }, [api, melaId]);

  const sortedJanya = useMemo(
    () => [...janyaList].sort((a, b) => a.janyaRaga.localeCompare(b.janyaRaga, 'en')),
    [janyaList]
  );

  const listBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E5D6C8';
  const listBg = isDark ? darkSurface : '$surface';

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
          <Button
            alignSelf="flex-start"
            size="$2"
            icon={ChevronLeft}
            backgroundColor={isDark ? darkSurface : '$surface'}
            borderColor="$borderSoft"
            borderWidth={1}
            color={isDark ? '#FFFFFF' : '$textPrimary'}
            onPress={() => window.history.back()}
          >
            Back to Melakartha
          </Button>

          <YStack gap="$2">
            <Paragraph fontSize="$9" fontWeight="800" color={isDark ? '#FFFFFF' : '$primaryDeep'}>
              {melakarthaName ? `${melakarthaName} Janya Ragas` : 'Melakartha Janya Ragas'}
            </Paragraph>
            <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'} lineHeight={24} maxWidth={900}>
              {melakarthaName
                ? `Melakartha ${melaId} (${melakarthaName}) and its janya ragas.`
                : 'Explore janya ragas grouped by Melakartha.'}
            </Paragraph>
          </YStack>

          {loading && (
            <XStack alignItems="center" gap="$3">
              <Spinner size="small" color="$primary" />
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>Loading janya ragas...</Paragraph>
            </XStack>
          )}

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
                Unable to fetch janya ragas
              </Paragraph>
              <Paragraph color={isDark ? '#FFFFFF' : '$textSecondary'}>{error}</Paragraph>
            </YStack>
          )}

          {!loading && !error && (
            <YStack
              backgroundColor={listBg}
              borderWidth={3}
              borderColor={listBorder}
              borderRadius="$radius.12"
              padding="$4"
              gap="$3"
            >
              <YStack gap="$2">
                {sortedJanya.map((item) => {
                  return (
                    <XStack
                      key={item.id}
                      borderWidth={1}
                      borderColor={listBorder}
                      backgroundColor={isDark ? darkBackground : '$background'}
                      borderRadius="$radius.6"
                      paddingVertical="$3"
                      paddingHorizontal="$4"
                      gap="$3"
                      flexWrap="wrap"
                    >
                      <Paragraph
                        flex={1}
                        color={isDark ? '#FFFFFF' : '$primaryDeep'}
                        fontWeight="700"
                        textDecorationLine="underline"
                        onPress={() => navigate(`/melakartha-janya/${toRagaSlug(item.janyaRaga)}?melaId=${melaId}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.janyaRaga}
                      </Paragraph>
                    </XStack>
                  );
                })}
              </YStack>
            </YStack>
          )}
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
