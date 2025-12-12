import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import { TamaguiProvider, Theme, YStack } from 'tamagui';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  tamaguiConfig,
  HomePage,
  LearnRagaPage,
  AboutPage,
  HelpPage,
  Header,
  Footer,
  PodcastsPage,
} from 'ui';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'navy'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'navy' : 'light'));
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (theme === 'navy') {
      body.style.backgroundColor = '#0F2F52';
      body.style.color = '#F2E6CF';
    } else {
      body.style.backgroundColor = '';
      body.style.color = '';
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <Theme name={theme}>
          {/* This YStack is the full viewport height */}
          <YStack f={1} minHeight="100vh" backgroundColor="$background">
            <Header onToggleTheme={toggleTheme} currentTheme={theme} />
            {/* This inner YStack takes up the remaining space and is scrollable */}
            <YStack flex={1} overflowY="auto" backgroundColor="$background">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnRagaPage />} />
                <Route path="/podcasts" element={<PodcastsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/help" element={<HelpPage />} />
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
