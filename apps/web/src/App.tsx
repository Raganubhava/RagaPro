import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import { lazy, Suspense, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
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
  CARNATIC_RAGAS,
  HINDUSTANI_RAGAS,
  MELAKARTHA_MAP,
} from 'ui';
import { Seo } from './Seo';
import { CarnaticRagaDetailPage, HindustaniRagaDetailPage } from './RagaDetailPages';

const LazyMelakarthaRagasPage = lazy(() =>
  import('ui').then((module) => ({ default: module.MelakarthaRagasPage }))
);
const LazyMelakarthaJanyaPage = lazy(() =>
  import('ui').then((module) => ({ default: module.MelakarthaJanyaPage }))
);
const LazyMelakarthaJanyaDetailPage = lazy(() =>
  import('./RagaDetailPages').then((module) => ({ default: module.MelakarthaJanyaDetailPage }))
);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.localStorage.getItem('raga.theme') === 'dark' ? 'dark' : 'light';
  });
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('raga.theme', theme);
  }, [theme]);

  const hideScrollbarCss = `
    .hide-scrollbar {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;
  const themeBodyCss =
    theme === 'dark'
      ? 'body { color: #FFFFFF; background-color: #0B1026; }'
      : 'body { color: #3E2B23; background-color: #FBEDCB; }';
  const baseUrl = 'https://raganidhi.com';
  const ogImage = `${baseUrl}/RagaNidhi2.png`;
  const defaultDescription =
    'Welcome RagaNidhi.com - Carnatic Raga and Hindustani discovery and learning made easy!';
  const homeKeywords =
    'raga search engine, carnatic raga search, hindustani raga search, indian classical music ragas, raga finder, arohana avarohana, raga lakshana, vadi samvadi, swara sancharas, carnatic music learning, hindustani music learning, raga discovery, raga database, ai raga search, ai music bot, indian classical music ai, raga identification, learn ragas online, raga compositions, melakarta ragas, janya ragas, hindustani thaat system, raga theory, classical music education india';
  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Raganidhi',
      url: baseUrl,
      logo: ogImage,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Raganidhi',
      url: baseUrl,
      description: defaultDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/carnatic-ragas?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
  const pageJsonLd = (name: string, url: string, description = defaultDescription) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url,
    description,
  });
  const itemListJsonLd = (name: string, url: string, items: readonly string[]) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item,
      },
    })),
  });
  const melakarthaNames = Object.values(MELAKARTHA_MAP);
  const melakarthaFallback = <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
          <Theme name={theme}>
            <style>{hideScrollbarCss + themeBodyCss}</style>
            {/* This YStack is the full viewport height */}
            <YStack f={1} minHeight="100vh" backgroundColor="$background">
              <Header onToggleTheme={toggleTheme} currentTheme={theme} />
              {/* Main content fills available space; footer stays below content */}
              <YStack flex={1} overflow="visible" display="flex">
                <YStack flex={1}>
                  <Routes>
                    <Route
                      path="/"
                      element={(
                        <Seo
                          title="RagaNidhi – Discover and Learn Indian Classical Music Ragas"
                          description={defaultDescription}
                          keywords={homeKeywords}
                          url={baseUrl}
                          imageUrl={ogImage}
                          robots="index,follow"
                          jsonLd={homeJsonLd}
                        >
                          <HomePage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/listen"
                      element={(
                        <Seo
                          title="Listen Learn Sing | RagaNidhi"
                          description={defaultDescription}
                          url={`${baseUrl}/listen`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('Listen Learn Sing', `${baseUrl}/listen`)}
                        >
                          <ListenLearnSingPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/learn"
                      element={(
                        <Seo
                          title="Learn Raga | RagaNidhi"
                          description={defaultDescription}
                          url={`${baseUrl}/learn`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('Learn Raga', `${baseUrl}/learn`)}
                        >
                          <LearnRagaPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/podcasts"
                      element={(
                        <Seo
                          title="Raga Sessions | RagaNidhi"
                          description={defaultDescription}
                          url={`${baseUrl}/podcasts`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('Raga Sessions', `${baseUrl}/podcasts`)}
                        >
                          <PodcastsPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/about"
                      element={(
                        <Seo
                          title="About | RagaNidhi"
                          description={defaultDescription}
                          url={`${baseUrl}/about`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('About RagaNidhi', `${baseUrl}/about`)}
                        >
                          <AboutPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/help"
                      element={(
                        <Seo
                          title="How to Use Raganidhi | Help & FAQ"
                          description="Learn how to search and explore Carnatic and Hindustani ragas using Raganidhi."
                          url={`${baseUrl}/help`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('Help', `${baseUrl}/help`)}
                        >
                          <HelpPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/feedback"
                      element={(
                        <Seo
                          title="Feedback | RagaNidhi"
                          description={defaultDescription}
                          url={`${baseUrl}/feedback`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('Feedback', `${baseUrl}/feedback`)}
                          robots="noindex,nofollow"
                        >
                          <FeedbackPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/carnatic-ragas"
                      element={(
                        <Seo
                          title="Carnatic Ragas List with Details | Raganidhi"
                          description="Browse Carnatic ragas with scales, parent ragas, and compositions. A structured ragas reference for learners and musicians."
                          url={`${baseUrl}/carnatic-ragas`}
                          imageUrl={ogImage}
                          jsonLd={[
                            pageJsonLd(
                              'Carnatic Ragas List with Details',
                              `${baseUrl}/carnatic-ragas`,
                              'Browse Carnatic ragas with scales, parent ragas, and compositions. A structured ragas reference for learners and musicians.',
                            ),
                            itemListJsonLd('Carnatic Ragas', `${baseUrl}/carnatic-ragas`, CARNATIC_RAGAS),
                          ]}
                        >
                          <CarnaticRagasPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/melakartha-ragas"
                      element={(
                        <Seo
                          title="Melakartha Ragas List with Details | Raganidhi"
                          description="Explore the 72 Melakartha ragas with their parent scales and classifications."
                          url={`${baseUrl}/melakartha-ragas`}
                          imageUrl={ogImage}
                          jsonLd={[
                            pageJsonLd(
                              'Melakartha Ragas List with Details',
                              `${baseUrl}/melakartha-ragas`,
                              'Explore the 72 Melakartha ragas with their parent scales and classifications.',
                            ),
                            itemListJsonLd('Melakartha Ragas', `${baseUrl}/melakartha-ragas`, melakarthaNames),
                          ]}
                        >
                          <Suspense fallback={melakarthaFallback}>
                            <LazyMelakarthaRagasPage />
                          </Suspense>
                        </Seo>
                      )}
                    />
                    <Route
                      path="/melakartha-ragas/:id"
                      element={(
                        <Seo
                          title="Melakartha Janya Ragas | Raganidhi"
                          description="Browse janya ragas for a Melakartha raga."
                          url={`${baseUrl}/melakartha-ragas`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('Melakartha Janya Ragas', `${baseUrl}/melakartha-ragas`)}
                        >
                          <Suspense fallback={melakarthaFallback}>
                            <LazyMelakarthaJanyaPage />
                          </Suspense>
                        </Seo>
                      )}
                    />
                    <Route path="/carnatic-ragas/:slug" element={<CarnaticRagaDetailPage />} />
                    <Route
                      path="/melakartha-janya/:slug"
                      element={(
                        <Suspense fallback={melakarthaFallback}>
                          <LazyMelakarthaJanyaDetailPage />
                        </Suspense>
                      )}
                    />
                    <Route
                      path="/hindustani-ragas"
                      element={(
                        <Seo
                          title="Hindustani Ragas List with Details | Raganidhi"
                          description="Explore Hindustani ragas with time of performance, structure, and key phrases for students and performers."
                          url={`${baseUrl}/hindustani-ragas`}
                          imageUrl={ogImage}
                          jsonLd={[
                            pageJsonLd(
                              'Hindustani Ragas List with Details',
                              `${baseUrl}/hindustani-ragas`,
                              'Explore Hindustani ragas with time of performance, structure, and key phrases for students and performers.',
                            ),
                            itemListJsonLd('Hindustani Ragas', `${baseUrl}/hindustani-ragas`, HINDUSTANI_RAGAS),
                          ]}
                        >
                          <HindustaniRagasPage />
                        </Seo>
                      )}
                    />
                    <Route path="/hindustani-ragas/:slug" element={<HindustaniRagaDetailPage />} />
                    <Route
                      path="/login"
                      element={(
                        <Seo
                          title="Login | RagaNidhi"
                          description={defaultDescription}
                          url={`${baseUrl}/login`}
                          imageUrl={ogImage}
                          jsonLd={pageJsonLd('Login', `${baseUrl}/login`)}
                          robots="noindex,nofollow"
                        >
                          <p>Login Page</p>
                        </Seo>
                      )}
                    />
                  </Routes>
                </YStack>
              </YStack>
            </YStack>
          </Theme>
        </TamaguiProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
