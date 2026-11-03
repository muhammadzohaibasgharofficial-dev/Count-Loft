/**
 * Count Loft — Breadcrumbs Formatter Helper
 * Pure TypeScript utility for normalizing and building breadcrumb hierarchies.
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Validates and normalizes breadcrumb hierarchies.
 * Ensures the root item is always 'Home' ('/') and the last item has no href (representing current page).
 *
 * @param items - Array of intermediate/current breadcrumb items
 * @returns Complete breadcrumb array starting with Home
 */
export function buildBreadcrumbs(items: { label: string; href?: string }[]): BreadcrumbItem[] {
  const root: BreadcrumbItem = { label: 'Home', href: '/' };

  if (!items || items.length === 0) {
    return [root];
  }

  const normalized = items.map((item, index) => {
    const isLast = index === items.length - 1;
    return {
      label: item.label.trim(),
      // Last item represents the active page and should not be an active link
      href: isLast ? undefined : item.href?.trim()
    };
  });

  return [root, ...normalized];
}
