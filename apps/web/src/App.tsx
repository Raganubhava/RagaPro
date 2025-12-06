import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import { TamaguiProvider, YStack } from 'tamagui';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  tamaguiConfig,
  HomePage,
  LearnRagaPage,
  AdvancedSearchPage,
  AboutPage,
  Header,
  Footer,
  PodcastsPage,
} from 'ui';

function App() {
  return (
    <BrowserRouter>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        {/* This YStack is the full viewport height */}
        <YStack f={1} minHeight="100vh" backgroundColor="$background">
          <Header />
          {/* This inner YStack takes up the remaining space and is scrollable */}
          <YStack flex={1} overflowY="auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/learn" element={<LearnRagaPage />} />
              <Route path="/advanced-search" element={<AdvancedSearchPage />} />
              <Route path="/podcasts" element={<PodcastsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<p>Login Page</p>} />
            </Routes>
            <Footer />
          </YStack>
        </YStack>
      </TamaguiProvider>
    </BrowserRouter>
  );
}

export default App;
