import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Mobile',
          'Bingbot',
          'DuckDuckGo',
          'Slurp',
          'Yandex',
          'Baiduspider',
          'Qwantify',
        ],
        allow: [
          '/',
          '/properties',
          '/properties/*',
          '/projects',
          '/projects/*',
          '/locations',
          '/locations/*',
          '/about',
          '/services',
          '/contact',
          '/privacy-policy',
          '/terms-and-conditions',
          '/assets/',
        ],
        disallow: ['/admin', '/admin/*', '/api/', '/api/*'],
      },
      {
        userAgent: [
          'Google-Extended',
          'Gemini',
          'VertexBot',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'GrokBot',
          'xAI',
          'Applebot',
          'Applebot-Extended',
          'Amazonbot',
          'cohere-ai',
          'Meta-ExternalAgent',
          'Bytespider',
          'YouBot',
          'DuckAssistBot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/properties/*', '/projects/*', '/locations/*'],
        disallow: ['/admin', '/admin/*', '/api/', '/api/*'],
      },
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'SemrushBot-SA',
          'MJ12bot',
          'DotBot',
          'PetalBot',
          'BLEXBot',
          'DataForSeoBot',
          'Rogerbot',
          'MegaIndex',
          'Spinn3r',
        ],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
