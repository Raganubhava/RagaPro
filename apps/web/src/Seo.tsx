import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  robots?: string;
  children: ReactNode;
};

const SITE_NAME = 'RagaNidhi';

export const Seo = ({ title, description, url, imageUrl, jsonLd, robots = 'index,follow', children }: SeoProps) => (
  <>
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
    {children}
  </>
);
