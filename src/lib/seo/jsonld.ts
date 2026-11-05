/**
 * Count Loft — JSON-LD Structured Data Generators
 * Generates schema.org compliant metadata for WebApplication, FAQPage, and BreadcrumbList.
 */

import { SITE_URL, SITE_NAME, absoluteUrl } from './site';
import { getDates, normalizePath } from '../../data/content-dates.mjs';

export interface BreadcrumbJsonLdItem {
  name: string;
  item?: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbJsonLdItem[], siteUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => {
      const url = crumb.item ? (crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`) : siteUrl;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: url
      };
    })
  };
}

export interface FaqJsonLdItem {
  question: string;
  answer: string;
}

export function generateFaqJsonLd(faqs: FaqJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export interface WebApplicationJsonLdOptions {
  name: string;
  description: string;
  url: string;
  category: string;
}

export function generateWebApplicationJsonLd(options: WebApplicationJsonLdOptions) {
  // Dates come from src/data/content-dates.mjs and match the visible "Published" / "Last updated" lines
  const dates = getDates(normalizePath(options.url));
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.name,
    applicationCategory: options.category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    description: options.description,
    url: absoluteUrl(options.url),
    datePublished: dates.published,
    dateModified: dates.modified,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/favicon.svg')
  };
}
