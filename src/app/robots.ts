import { MetadataRoute } from 'next';
import { env } from '@libs';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
    ],
    sitemap: `${env.SITE_DOMAIN}/sitemap.xml`,
    host: env.SITE_DOMAIN,
  };
}
