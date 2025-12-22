import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, FileText, Filter, Headphones, PlayCircle, SkipBack, SkipForward } from '@tamagui/lucide-icons';
import { Button, Paragraph, Spinner, XStack, YStack, useThemeName } from 'tamagui';
import { PageContainer } from './PageContainer';
import { AudioPlayer } from './AudioPlayer';
import { Footer } from './Footer';
import { API_ENDPOINTS } from '../constants/api';

type SessionFile = {
  fileName: string;
  fileType: string;
  fileData?: string | null;
};

type MediaCategory = 'all' | 'pdf' | 'audio' | 'video' | 'other';

const getMimeType = (fileType: string) => {
  const normalized = fileType.toLowerCase();
  if (normalized.includes('pdf')) return 'application/pdf';
  if (normalized.includes('mp3') || normalized.includes('audio')) return 'audio/mpeg';
  if (normalized.includes('mp4') || normalized.includes('video')) return 'video/mp4';
  return 'application/octet-stream';
};

const getMimeTypeFromUrl = (url?: string | null) => {
  if (!url) return 'application/octet-stream';
  const lower = url.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.mp3')) return 'audio/mpeg';
  if (lower.endsWith('.mp4')) return 'video/mp4';
  return 'application/octet-stream';
};

const getIconForType = (fileType: string) => {
  const normalized = fileType.toLowerCase();
  if (normalized.includes('pdf')) return FileText;
  if (normalized.includes('mp3') || normalized.includes('audio')) return Headphones;
  if (normalized.includes('mp4') || normalized.includes('video')) return PlayCircle;
  return PlayCircle;
};

const categorizeFile = (fileType: string): MediaCategory => {
  const normalized = fileType.toLowerCase();
  if (normalized.includes('pdf')) return 'pdf';
  if (normalized.includes('mp3') || normalized.includes('audio')) return 'audio';
  if (normalized.includes('mp4') || normalized.includes('video')) return 'video';
  return 'other';
};

const openBlobInNewTab = (base64: string, mimeType: string) => {
  try {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i += 1) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (err) {
    console.error('Failed to open file in new tab', err);
  }
};

const isUrl = (value?: string | null) => {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

export const PodcastsPage = () => {
  const [sessionFiles, setSessionFiles] = useState<SessionFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<MediaCategory>('all');
  const [page, setPage] = useState(1);
  const themeName = useThemeName();
  const isNavy = themeName?.toLowerCase().includes('navy');
  const pageSize = 6;

  const filteredItems = useMemo(() => {
    return sessionFiles.filter((f) => {
      if (!f.fileData || !isUrl(f.fileData)) return false;
      const cat = categorizeFile(f.fileType);
      return category === 'all' ? cat !== 'other' : cat === category;
    });
  }, [sessionFiles, category]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filteredItems.slice(start, start + pageSize);

  const counts = useMemo(() => {
    const base = { all: 0, pdf: 0, audio: 0, video: 0 };
    filteredItems.forEach((f) => {
      base.all += 1;
      const cat = categorizeFile(f.fileType);
      if (cat === 'pdf') base.pdf += 1;
      if (cat === 'audio') base.audio += 1;
      if (cat === 'video') base.video += 1;
    });
    return base;
  }, [filteredItems]);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.archiveWithData, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setSessionFiles(
          data
            .filter((item) => Boolean(item?.fileData))
            .map((item) => ({
              fileName: item.fileName,
              fileType: item.fileType ?? '',
              fileData: item.fileData,
            }))
        );
      } else {
        throw new Error('Unexpected data format from /Archive');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to load Raga sessions';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleOpenLink = (url: string, mimeType: string) => {
    if (!url) return;
    const isDirectUrl = isUrl(url);
    if (mimeType === 'application/pdf' || isDirectUrl) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    openBlobInNewTab(url, mimeType);
  };

  const heroBorder = isNavy ? 'rgba(255,255,255,0.12)' : '#E5D6C8';

  return (
    <YStack
      minHeight="100vh"
      backgroundColor="$background"
      color={isNavy ? '#F5F7FF' : '$textPrimary'}
      {...(isNavy
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
          gap="$6"
          paddingTop="$5"
          paddingBottom="$8"
          $sm={{
            paddingHorizontal: '$3',
            gap: '$5',
          }}
        >
          {/* Hero and filters combined */}
          <YStack
            width="100%"
            padding="$5"
            borderRadius="$radius.12"
            backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.92)'}
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isNavy ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 6 }}
            gap="$4"
            $sm={{
              padding: '$4',
              gap: '$3',
            }}
          >
            <XStack
              gap="$5"
              alignItems="flex-start"
              justifyContent="space-between"
              flexWrap="wrap"
              $sm={{ flexDirection: 'column', gap: '$3' }}
            >
              <YStack gap="$3" flex={1} minWidth={260}>
                <Paragraph fontFamily="$heading" fontSize="$9" color={isNavy ? '#FFFFFF' : '$primaryDeep'}>
                  Raga Sessions
                </Paragraph>
                <Paragraph color="$textSecondary" fontSize="$4" lineHeight={26}>
                  Curated PDFs, audio tracks, and video lessons pulled live from your archive—ready for practice on any device.
                </Paragraph>
                <XStack gap="$3" flexWrap="wrap">
                  <Button
                    size="$4"
                    backgroundColor="$primary"
                    color="$surface"
                    paddingHorizontal="$6"
                    onPress={fetchSessions}
                    hoverStyle={{ backgroundColor: '$primaryHover' }}
                  >
                    Refresh library
                  </Button>
                  <Button
                    size="$4"
                    backgroundColor={isNavy ? '$surface' : '$surfaceAlt'}
                    color="$primary"
                    borderWidth={1}
                    borderColor={heroBorder}
                    paddingHorizontal="$6"
                    onPress={() => {
                      setCategory('all');
                      setPage(1);
                    }}
                  >
                    Clear filters
                  </Button>
                </XStack>
              </YStack>

              <XStack gap="$3" flexWrap="wrap" flexShrink={0}>
                {[
                  { label: 'Total', value: counts.all },
                  { label: 'PDFs', value: counts.pdf },
                  { label: 'Audio', value: counts.audio },
                  { label: 'Video', value: counts.video },
                ].map((item) => (
                  <YStack
                    key={item.label}
                    padding="$3"
                    borderRadius="$radius.10"
                    backgroundColor={isNavy ? 'rgba(255,255,255,0.04)' : '$surface'}
                    borderWidth={1}
                    borderColor={heroBorder}
                    minWidth={120}
                  >
                    <Paragraph color="$textSecondary" fontSize="$3">
                      {item.label}
                    </Paragraph>
                    <Paragraph color={isNavy ? '#FFFFFF' : '$primary'} fontWeight="800" fontSize="$5">
                      {item.value}
                    </Paragraph>
                  </YStack>
                ))}
              </XStack>
            </XStack>

            {/* Filters */}
            <YStack gap="$3">
              <XStack gap="$2" alignItems="center">
                <Filter size={16} color="$textSecondary" />
                <Paragraph color="$textSecondary" fontSize="$3">
                  Filter by type
                </Paragraph>
              </XStack>
              <XStack gap="$2" flexWrap="wrap">
                {(['all', 'pdf', 'audio', 'video'] as MediaCategory[]).map((item) => (
                  <Button
                    key={item}
                    size="$2"
                    backgroundColor={category === item ? '$primary' : '$surface'}
                    color={category === item ? '$background' : '$textPrimary'}
                    borderWidth={1}
                    borderColor={category === item ? '$primary' : heroBorder}
                    onPress={() => {
                      setCategory(item);
                      setPage(1);
                    }}
                  >
                    {item === 'all' ? 'All' : item.toUpperCase()}
                  </Button>
                ))}
              </XStack>
            </YStack>
          </YStack>

          {loading && (
            <YStack gap="$3" alignItems="center" padding="$4">
              <Spinner size="large" color="$primary" />
              <Paragraph color="$textSecondary">Loading Raga Sessions...</Paragraph>
            </YStack>
          )}

          {error && !loading && (
            <YStack
              gap="$3"
              padding="$4"
              backgroundColor={isNavy ? 'rgba(255,87,87,0.08)' : '$backgroundStrong'}
              borderRadius="$10"
              borderWidth={1}
              borderColor={isNavy ? 'rgba(255,87,87,0.25)' : '$borderSoft'}
            >
              <XStack gap="$2" alignItems="center">
                <AlertCircle color="$primaryActive" />
                <Paragraph fontWeight="700" color="$primaryActive">
                  Could not load sessions
                </Paragraph>
              </XStack>
              <Paragraph color="$textPrimary">{error}</Paragraph>
              <Button onPress={fetchSessions} backgroundColor="$primary" color="$background" size="$3">
                Retry
              </Button>
            </YStack>
          )}

          {!loading && !error && (
            <YStack gap="$4">
              <XStack
                gap="$4"
                flexWrap="wrap"
                justifyContent="flex-start"
                width="100%"
                $sm={{
                  flexDirection: 'column',
                  gap: '$3',
                }}
              >
                {filteredItems.length > 0 ? (
                  <>
                    {pageItems.map((file, index) => {
                      const mimeType = getMimeType(file.fileType) || getMimeTypeFromUrl(file.fileData);
                      const Icon = getIconForType(file.fileType);
                      const isPdf = mimeType === 'application/pdf';
                      const isAudio = mimeType.startsWith('audio/');
                      const isVideo = mimeType.startsWith('video/');
                      const fileUrl = file.fileData as string;

                      return (
                        <YStack
                          key={`${file.fileName}-${index}`}
                          gap="$3"
                          padding="$4"
                          backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surfaceAlt'}
                          borderRadius="$radius.10"
                          borderWidth={1}
                          borderColor={heroBorder}
                          width="100%"
                          maxWidth={360}
                          hoverStyle={{ transform: [{ scale: 1.01 }], borderColor: '$primary' }}
                          animation="bouncy"
                        >
                          <XStack alignItems="center" justifyContent="space-between">
                            <XStack alignItems="center" gap="$3">
                              <Icon color="$primary" />
                              <Paragraph fontWeight="700" fontSize="$5" color="$textPrimary">
                                {file.fileName}
                              </Paragraph>
                            </XStack>
                            <Paragraph
                              paddingHorizontal="$2"
                              paddingVertical="$1"
                              borderRadius="$6"
                              backgroundColor="$primarySoft"
                              color="$primary"
                              fontSize="$2"
                            >
                              {file.fileType}
                            </Paragraph>
                          </XStack>

                          {isPdf && (
                            <Button
                              onPress={() => handleOpenLink(fileUrl, mimeType)}
                              backgroundColor="$primary"
                              color="$background"
                              size="$3"
                              hoverStyle={{ backgroundColor: '$primaryActive', color: '$background' }}
                            >
                              View / Download
                            </Button>
                          )}

                          {isAudio && (
                            <YStack gap="$2">
                              <AudioPlayer src={fileUrl} />
                              <Button
                                size="$2"
                                variant="outlined"
                                borderColor="$borderSoft"
                                onPress={() => handleOpenLink(fileUrl, mimeType)}
                                hoverStyle={{ backgroundColor: '$background', borderColor: '$primary', color: '$primary' }}
                              >
                                Open Link
                              </Button>
                            </YStack>
                          )}

                          {isVideo && (
                            <YStack gap="$2">
                              <Paragraph color="$textSecondary" fontSize="$2">
                                Video preview
                              </Paragraph>
                              <video
                                controls
                                style={{
                                  width: '100%',
                                  borderRadius: 12,
                                  backgroundColor: 'rgba(0,0,0,0.1)',
                                }}
                                src={fileUrl}
                              />
                              <Button
                                size="$2"
                                variant="outlined"
                                borderColor="$borderSoft"
                                onPress={() => handleOpenLink(fileUrl, mimeType)}
                                hoverStyle={{ backgroundColor: '$background', borderColor: '$primary', color: '$primary' }}
                              >
                                Open Link
                              </Button>
                            </YStack>
                          )}

                          {!isPdf && !isAudio && !isVideo && (
                            <Paragraph color="$textSecondary">Unsupported file type</Paragraph>
                          )}
                        </YStack>
                      );
                    })}

                    {filteredItems.length > pageSize && (
                      <XStack gap="$2" alignItems="center" justifyContent="center" width="100%">
                        <Button
                          size="$2"
                          icon={SkipBack}
                          disabled={currentPage === 1}
                          onPress={() => setPage((p) => Math.max(1, p - 1))}
                        />
                        <Paragraph color="$textSecondary">
                          Page {currentPage} of {totalPages}
                        </Paragraph>
                        <Button
                          size="$2"
                          icon={SkipForward}
                          disabled={currentPage >= totalPages}
                          onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                        />
                      </XStack>
                    )}
                  </>
                ) : (
                  <Paragraph color="$textSecondary">
                    No sessions available yet. Add files to the archive to see them here.
                  </Paragraph>
                )}
              </XStack>
            </YStack>
          )}

          <YStack
            gap="$3"
            padding="$4"
            backgroundColor={isNavy ? 'rgba(255,255,255,0.05)' : '$surface'}
            borderRadius="$radius.12"
            borderWidth={1}
            borderColor={heroBorder}
            shadowColor={isNavy ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 4 }}
            $sm={{ padding: '$3' }}
          >
            <Paragraph fontWeight="800" color={isNavy ? '#FFFFFF' : '$primaryDeep'} fontSize="$5">
              Note
            </Paragraph>
            <Paragraph color="$textSecondary" lineHeight={22}>
              Raga sessions are presentations or raga related content in audio or PDF files. You can submit a request to add your content.
            </Paragraph>
            <Button
              asChild
              backgroundColor="$primary"
              color="$surface"
              paddingHorizontal="$5"
              size="$3"
              borderRadius="$radius.8"
              hoverStyle={{ backgroundColor: '$primaryHover' }}
            >
              <a href="/feedback" style={{ fontWeight: 800, fontSize: '16px', letterSpacing: 0.2 }}>
                Submit Feedback
              </a>
            </Button>
          </YStack>
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
