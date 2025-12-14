import { useEffect, useState } from 'react';
import { AlertCircle, FileText, Headphones, PlayCircle, Filter, SkipBack, SkipForward } from '@tamagui/lucide-icons';
import { Button, Paragraph, Spinner, XStack, YStack } from 'tamagui';
import { PageContainer } from './PageContainer';
import { AudioPlayer } from './AudioPlayer';
import { Footer } from './Footer';

type SessionFile = {
  fileName: string;
  fileType: string;
  fileData?: string | null;
};

type MediaCategory = 'all' | 'pdf' | 'audio' | 'video' | 'other';

const API_FILE_URL = 'https://localhost:44308/api/Archive/with-data';

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
  const pageSize = 6;

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_FILE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
    // fallback: base64
    openBlobInNewTab(url, mimeType);
  };

  return (
    <YStack minHeight="100vh" justifyContent="space-between" width="100%">
      <PageContainer>
        <YStack
          gap="$5"
          paddingVertical="$4"
          $sm={{
            paddingHorizontal: '$3',
            gap: '$4',
          }}
        >
          <YStack gap="$3">
            <Paragraph fontFamily="$heading" fontSize="$8" color="$primary">
              Raga Sessions
            </Paragraph>
            <Paragraph color="$textSecondary" fontSize="$4">
              PDF lesson notes, audio practice tracks, and video sessions fetched from your archive API.
            </Paragraph>
          </YStack>

          {/* Filters */}
          <XStack
            gap="$2"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="flex-start"
            width="100%"
            $sm={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '$2',
            }}
          >
            <XStack gap="$2" alignItems="center">
              <Filter size={16} color="$textSecondary" />
              <Paragraph color="$textSecondary" fontSize="$3">
                Filter by type
              </Paragraph>
            </XStack>
            {(['all', 'pdf', 'audio', 'video'] as MediaCategory[]).map((item) => (
              <Button
                key={item}
                size="$2"
                backgroundColor={category === item ? '$primary' : '$surface'}
                color={category === item ? '$background' : '$textPrimary'}
                borderWidth={1}
                borderColor={category === item ? '$primary' : '$borderSoft'}
                onPress={() => {
                  setCategory(item);
                  setPage(1);
                }}
              >
                {item === 'all' ? 'All' : item.toUpperCase()}
              </Button>
            ))}
          </XStack>

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
              backgroundColor="$backgroundStrong"
              borderRadius="$10"
              borderWidth={1}
              borderColor="$borderSoft"
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
                {sessionFiles.length > 0 ? (
                  (() => {
                    const filtered = sessionFiles.filter((f) => {
                      if (!f.fileData || !isUrl(f.fileData)) return false;
                      const cat = categorizeFile(f.fileType);
                      return category === 'all' ? cat !== 'other' : cat === category;
                    });
                    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
                    const currentPage = Math.min(page, totalPages);
                    const start = (currentPage - 1) * pageSize;
                    const pageItems = filtered.slice(start, start + pageSize);

                    return (
                      <>
                        {pageItems.map((file, index) => {
                          const mimeType = getMimeType(file.fileType);
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
                              backgroundColor="$surfaceAlt"
                              borderRadius="$radius.10"
                              borderWidth={1}
                              borderColor="$borderSoft"
                              width="100%"
                              maxWidth={360}
                              hoverStyle={{ transform: [{ scale: 1.01 }] }}
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

                        {/* Pagination */}
                        {filtered.length > pageSize && (
                          <XStack gap="$2" alignItems="center" justifyContent="center" width="100%">
                            <Button
                              size="$2"
                              icon={SkipBack}
                              disabled={currentPage === 1}
                              onPress={() => setPage((p) => Math.max(1, p - 1))}
                            />
                            <Paragraph color="$textSecondary">
                              Page {currentPage} of {Math.ceil(filtered.length / pageSize)}
                            </Paragraph>
                            <Button
                              size="$2"
                              icon={SkipForward}
                              disabled={currentPage >= Math.ceil(filtered.length / pageSize)}
                              onPress={() => setPage((p) => Math.min(Math.ceil(filtered.length / pageSize), p + 1))}
                            />
                          </XStack>
                        )}
                      </>
                    );
                  })()
                ) : (
                  <Paragraph color="$textSecondary">
                    No sessions available yet. Add files to the archive to see them here.
                  </Paragraph>
                )}
              </XStack>
            </YStack>
          )}
        </YStack>
      </PageContainer>
      <Footer />
    </YStack>
  );
};
