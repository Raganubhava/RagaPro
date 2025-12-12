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
  AboutPage,
  Header,
  Footer,
  PodcastsPage,
} from 'ui';

function App() {
  const [theme, setTheme] = useState<'light' | 'navy'>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'navy' : 'light'));

  return (
    <BrowserRouter>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
        <Theme name={theme}>
          {/* This YStack is the full viewport height */}
          <YStack f={1} minHeight="100vh" backgroundColor="$background">
            <Header onToggleTheme={toggleTheme} currentTheme={theme} />
            {/* This inner YStack takes up the remaining space and is scrollable */}
            <YStack flex={1} overflow="scroll">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnRagaPage />} />
                <Route path="/podcasts" element={<PodcastsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<p>Login Page</p>} />
              </Routes>
              <Footer />
            </YStack>
          </YStack>
        </Theme>
      </TamaguiProvider>
    </BrowserRouter>
  );
}

export default App;
