import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import { useState } from 'react';
import { TamaguiProvider, Theme, YStack } from 'tamagui';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  tamaguiConfig,
  HomePage,
  LearnRagaPage,
  ListenLearnSingPage,
  AboutPage,
  Header,
  PodcastsPage,
  HelpPage,
  FeedbackPage,
  CarnaticRagasPage,
  HindustaniRagasPage,
} from 'ui';

function App() {
  const [theme, setTheme] = useState<'light' | 'navy'>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'navy' : 'light'));

  const hideScrollbarCss = `
    .hide-scrollbar {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <BrowserRouter>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
        <Theme name={theme}>
          <style>{hideScrollbarCss}</style>
          {/* This YStack is the full viewport height */}
          <YStack f={1} minHeight="100vh" backgroundColor="$background">
            <Header onToggleTheme={toggleTheme} currentTheme={theme} />
            {/* Main content fills available space; footer stays below content */}
            <YStack flex={1} overflow="visible" display="flex">
              <YStack flex={1}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/listen" element={<ListenLearnSingPage />} />
                  <Route path="/learn" element={<LearnRagaPage />} />
                  <Route path="/podcasts" element={<PodcastsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
                  <Route path="/carnatic-ragas" element={<CarnaticRagasPage />} />
                  <Route path="/hindustani-ragas" element={<HindustaniRagasPage />} />
                  <Route path="/login" element={<p>Login Page</p>} />
                </Routes>
              </YStack>
            </YStack>
          </YStack>
        </Theme>
      </TamaguiProvider>
    </BrowserRouter>
  );
}

export default App;
