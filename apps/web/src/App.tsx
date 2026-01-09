import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

import { useState } from 'react';
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
} from 'ui';
import { Seo } from './Seo';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

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
    'Search Indian classical music ragas (Carnatic or Hindustani). Explore detailed information for hundreds of ragas.';
  const homeJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'RagaNidhi',
      url: baseUrl,
      logo: ogImage,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'RagaNidhi',
      url: baseUrl,
      description: defaultDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/?q={search_term_string}`,
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
                          title="RagaNidhi | Search Indian Classical Music Ragas"
                          description={defaultDescription}
                          url={baseUrl}
                          imageUrl={ogImage}
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
                          title="Help | RagaNidhi"
                          description={defaultDescription}
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
                          title="Carnatic Ragas Index | RagaNidhi"
                          description="Search Carnatic ragas and explore detailed information, swaras, and raga structure."
                          url={`${baseUrl}/carnatic-ragas`}
                          imageUrl={ogImage}
                          jsonLd={[
                            pageJsonLd(
                              'Carnatic Ragas Index',
                              `${baseUrl}/carnatic-ragas`,
                              'Search Carnatic ragas and explore detailed information, swaras, and raga structure.',
                            ),
                            itemListJsonLd('Carnatic Ragas', `${baseUrl}/carnatic-ragas`, CARNATIC_RAGAS),
                          ]}
                        >
                          <CarnaticRagasPage />
                        </Seo>
                      )}
                    />
                    <Route
                      path="/hindustani-ragas"
                      element={(
                        <Seo
                          title="Hindustani Ragas Index | RagaNidhi"
                          description="Search Hindustani ragas and explore detailed information, swaras, and raga structure."
                          url={`${baseUrl}/hindustani-ragas`}
                          imageUrl={ogImage}
                          jsonLd={[
                            pageJsonLd(
                              'Hindustani Ragas Index',
                              `${baseUrl}/hindustani-ragas`,
                              'Search Hindustani ragas and explore detailed information, swaras, and raga structure.',
                            ),
                            itemListJsonLd('Hindustani Ragas', `${baseUrl}/hindustani-ragas`, HINDUSTANI_RAGAS),
                          ]}
                        >
                          <HindustaniRagasPage />
                        </Seo>
                      )}
                    />
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
