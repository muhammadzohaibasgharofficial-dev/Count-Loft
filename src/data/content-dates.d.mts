export interface ContentDates { published: string; modified: string; reviewed: string }
export const SITE_LASTMOD: string;
export const DEFAULT_DATES: ContentDates;
export const CONTENT_DATES: Record<string, Partial<ContentDates>>;
export function normalizePath(input: string): string;
export function getDates(path: string): ContentDates;
export function getLastmod(path: string): string;
