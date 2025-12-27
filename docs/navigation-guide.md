# Navigation & Component Map

- Windows setup: docs/setup-windows.md


Quick reference for main menu items, their routes, and the core components that render them. Useful for onboarding or jumping to the right file.

## Web app entry
- `apps/web/src/App.tsx` â€” sets up routing and theme toggle. Imports pages from `packages/ui/src/components`.

## Top navigation (`Header`)
- Component: `packages/ui/src/components/Header.tsx`
- Renders menu links to the routes below and the theme toggle.

## Routes & primary components
- **Home** (`/`)
  - Component: `packages/ui/src/components/HomePage.tsx`
  - Uses: `RagaSearchBar`, `RagaCard`, `HindustaniRagaCard`, `ChatBotPanel`, `Footer`, `PageContainer`.
  - API constants: `packages/ui/src/constants/api.ts`
  - Hindustani name detection: `packages/ui/src/constants/hindustaniRagas.ts`
  - Swara mapping: `packages/ui/src/constants/swaraMap.ts`

- **Carnatic Ragas Index** (`/carnatic-ragas`)
  - Component: `packages/ui/src/components/CarnaticRagasPage.tsx`
  - Data source: `packages/ui/src/constants/carnaticRagas.ts`
  - API fetch: `API_ENDPOINTS.raga` (click a raga to load details via `useApiClient`)
  - Renders details with: `RagaCard.tsx`

- **Hindustani Ragas Index** (`/hindustani-ragas`)
  - Component: `packages/ui/src/components/HindustaniRagasPage.tsx`
  - Data source: `packages/ui/src/constants/hindustaniRagas.ts`
  - API fetch: `API_ENDPOINTS.hindustaniRaga`
  - Renders details with: `HindustaniRagaCard.tsx`

- **Listen / Learn / Sing** (`/listen`)
  - Component: `packages/ui/src/components/ListenLearnSingPage.tsx`
  - CTA links to `/learn`.

- **Learn** (`/learn`)
  - Component: `packages/ui/src/components/LearnRagaPage.tsx`
  - Uses learning content blocks and cards for ragas.

- **Raga Sessions (Podcasts)** (`/podcasts`)
  - Component: `packages/ui/src/components/PodcastsPage.tsx`
  - Card: `PodcastCard.tsx`
  - Player: `PodcastPlayer.tsx`

- **About** (`/about`)
  - Component: `packages/ui/src/components/AboutPage.tsx`

- **Help** (`/help`) â€” formerly â€œGlossaryâ€
  - Component: `packages/ui/src/components/HelpPage.tsx`
  - Contains glossary-style explanations and tips.

- **Feedback** (`/feedback`)
  - Component: `packages/ui/src/components/FeedbackPage.tsx`
  - API endpoints: `packages/ui/src/constants/api.ts` (auth/login, signup, feedback)

- **Header/Footer shared UI**
  - Header: `packages/ui/src/components/Header.tsx`
  - Footer: `packages/ui/src/components/Footer.tsx`
- **AI Raga Bot**
  - Component: `packages/ui/src/components/ChatBotPanel.tsx` (reusable; imported on Home and can be dropped into other pages)

## Shared utilities / constants
- API endpoints: `packages/ui/src/constants/api.ts`
- Swara mapping: `packages/ui/src/constants/swaraMap.ts`
- Hindustani name detection set: `packages/ui/src/constants/hindustaniRagas.ts`
- Theme config: `packages/ui/src/tamagui.config.ts`

## Data types
- Carnatic raga type: `@raga/data` package (imported in `RagaCard.tsx`).
- Hindustani raga type: `packages/ui/src/components/HindustaniRagaCard.tsx` (interface defined inline).

## Layout primitives
- `PageContainer`: `packages/ui/src/components/PageContainer.tsx` (sets max width/padding)
- Global stack components from Tamagui are used across pages (`YStack`, `XStack`, `Paragraph`, etc.).

## Search flow (Home)
1. User types in `RagaSearchBar` (HomePage).
2. `handleSearch` calls API via `useApiClient` using endpoints from `constants/api.ts`.
3. Hindustani vs Carnatic detection uses `isHindustaniRaga` (`constants/hindustaniRagas.ts`).
4. Results render with `RagaCard` (Carnatic) or `HindustaniRagaCard` (Hindustani).
5. â€œAsk AI about this ragaâ€ scrolls to `ChatBotPanel` (`HomePage` `chatBotRef`).

## Styling / theming
- Tamagui config and tokens: `packages/ui/src/tamagui.config.ts`
- Global reset/fonts: imported in `apps/web/src/App.tsx`
