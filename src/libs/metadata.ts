import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { getLocale } from 'next-intl/server';

import { env } from '@libs';

import { TemplateString } from './types';

export class AppMetadata {
  private entityMetaData: {
    /**
     * The document title.
     */
    title: string | TemplateString;
    /**
     * The document description, and optionally the OpenGraph and twitter descriptions.
     */
    description: string;
    [k: string]: any;
  };

  public readonly metadataBase: Metadata = {
    /**
     * The base path and origin for absolute urls for various metadata links such as OpenGraph images.
     */
    metadataBase: new URL(env.SITE_DOMAIN),
    generator: 'TOT',
    /**
     * The application name.
     */
    applicationName: env.SITE_NAME,
    referrer: 'origin-when-cross-origin',
    keywords: [
      'Online Shopping',
      'E-commerce Platform',
      'Retail Marketplace',
      'Digital Retail',
      'Shop Online',
      'E-shop',
      'E-commerce Store',
      'Retailer Online',
      'Digital Shopping',
      'Online Retail Platform',
      'Web Store',
      'E-commerce Business',
      'Retailer Website',
      'Digital Marketplace',
      'Online Retailer',
      'E-commerce Solutions',
      'Retail E-shop',
      'Digital Store',
      'E-commerce Marketing',
      'Retail Online Presence',
    ],
    authors: [{ name: 'TOT' }, { name: 'totplatform', url: 'https://totplatform.com' }],
    /**
     * The creator of the document.
     */
    creator: 'TOT Team',
    /**
     * The publisher of the document.
     */
    publisher: 'totplatform',
    /**
     * The canonical and alternate URLs for the document.
     * @example
     * ```tsx
     * { canonical: "https://example.com" }
     * <link rel="canonical" href="https://example.com" />
     *
     * { canonical: "https://example.com", hreflang: { "en-US": "https://example.com/en-US" } }
     * */
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    /**
     * The robots setting for the document.
     *
     * @see https://developer.mozilla.org/docs/Glossary/Robots.txt
     * @example
     * ```tsx
     * "index, follow"
     * <meta name="robots" content="index, follow" />
     *
     * { index: false, follow: false }
     * <meta name="robots" content="noindex, nofollow" />
     * ```
     */
    robots: {
      follow: true,
      index: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
    openGraph: {
      type: 'website',
    },
  };

  constructor(title: string | TemplateString, description: string, index: boolean = true) {
    this.entityMetaData = index
      ? { title, description }
      : {
          title,
          description,
          robots: {
            follow: true,
            index: false,
            googleBot: {
              index: false,
              follow: true,
              noimageindex: true,
              'max-video-preview': -1,
              'max-image-preview': 'large',
              'max-snippet': -1,
            },
          },
        };
  }
  /**
   * Builds the metadata object based on the provided default options.
   *If defaultOptions is 'none', the method returns an object with the title and description properties taken from the class instance.
    If defaultOptions is 'withDefault', the method returns the metadataBase object as it is.
   * @param defaultOptions - The default options for building the metadata object.
   *                         Possible values are 'withDefault', or 'none'.
   * @default 'none'
   * @returns The built metadata object based on the default options.
   */
  build(defaultOptions: 'withDefault' | 'none' = 'none'): Metadata {
    switch (defaultOptions) {
      case 'none':
        return this.entityMetaData as Metadata;
      case 'withDefault':
        return { ...this.metadataBase, ...this.entityMetaData } as Metadata;
    }
  }

  async bindOG(OpenGraph?: OpenGraph) {
    const _defaultLocale = await getLocale();

    const _ogParams: OpenGraph = {
      type: 'website',
      title: env.SITE_NAME,
      description: env[`SITE_DESCRIPTION_${_defaultLocale === 'en' ? 'EN' : 'AR'}`],
      url: env.SITE_DOMAIN,
      siteName: env.SITE_NAME,
      locale: _defaultLocale,
      ...OpenGraph,
    };

    this.entityMetaData.openGraph = _ogParams;
  }
}
