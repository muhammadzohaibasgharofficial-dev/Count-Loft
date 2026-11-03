/**
 * Count Loft — JSON-LD Structured Data Generators
 * Generates schema.org compliant metadata for WebApplication, FAQPage, and BreadcrumbList.
 */

export interface BreadcrumbJsonLdItem {
  name: string;
  item?: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbJsonLdItem[], siteUrl: string = 'https://count-loft.com') {
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
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.name,
    applicationCategory: options.category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    description: options.description,
    url: options.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}
