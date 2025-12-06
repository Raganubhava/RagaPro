import { useState } from 'react';
import { Paragraph, XStack, YStack } from 'tamagui';
import { PageContainer } from './PageContainer';
import { PodcastCard } from './PodcastCard';
import { PodcastPlayer } from './PodcastPlayer';
import { AnimatePresence, MotiView } from 'moti';

const podcastEpisodes = [
  { id: 1, title: 'The Genius of Tyagaraja', imageUrl: 'https://placehold.co/200x200/8B3A50/FAF7F2?text=Ep+1', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Exploring Kalyani Raga', imageUrl: 'https://placehold.co/200x200/D8B169/3D2E2E?text=Ep+2', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'The Ragas of Dikshitar', imageUrl: 'https://placehold.co/200x200/A8D8CC/3D2E2E?text=Ep+3', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  // ... more episodes
];

export const PodcastsPage = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <PageContainer>
      <YStack gap="$6">
        <AnimatePresence>
          {selectedEpisode && (
            <MotiView
              from={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ type: 'spring' }}
            >
              <PodcastPlayer episode={selectedEpisode} />
            </MotiView>
          )}
        </AnimatePresence>

        <YStack gap="$3">
          <Paragraph fontFamily="$heading" fontSize="$8" color="$primary">
            Podcast Episodes
          </Paragraph>
          <XStack
            gap="$6"
            paddingVertical="$4"
            overflowX="auto"
            style={{ scrollbarWidth: 'none' }} // Hide scrollbar
          >
            {podcastEpisodes.map((ep) => (
              <PodcastCard key={ep.id} episode={ep} onPress={() => setSelectedEpisode(ep)} />
            ))}
          </XStack>
        </YStack>
      </YStack>
    </PageContainer>
  );
};
