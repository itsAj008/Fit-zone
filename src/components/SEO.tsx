import { Helmet } from 'react-helmet-async';
import { seoConfig, generateJsonLd, getPageTitle, getPageDescription } from '../utils/seoHelpers';

interface SEOProps {
  title?: string;
  description?: string;
  page?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title, 
  description, 
  page, 
  image = `${seoConfig.siteUrl}/og-image.jpg`,
  url = seoConfig.siteUrl 
}: SEOProps) => {
  const pageTitle = title || getPageTitle(page);
  const pageDescription = description || getPageDescription(page);
  const jsonLd = generateJsonLd();

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
