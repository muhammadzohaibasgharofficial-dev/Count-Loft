/**
 * Count Loft — URL State Utilities
 * Encodes and decodes calculator inputs into shareable query strings.
 */

export type QueryParamsMap = Record<string, string | number | boolean | undefined | null>;

/**
 * Encodes a key-value map into a clean query string.
 */
export function encodeStateToQuery(state: QueryParamsMap): string {
  const params = new URLSearchParams();

  for (const [key, val] of Object.entries(state)) {
    if (val !== undefined && val !== null && val !== '') {
      params.set(key, String(val));
    }
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

/**
 * Decodes the current browser query string into a key-value record.
 */
export function decodeQueryState(searchString?: string): Record<string, string> {
  const query = searchString !== undefined
    ? searchString
    : (typeof window !== 'undefined' ? window.location.search : '');

  const params = new URLSearchParams(query);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Updates the browser's URL address bar without reloading the page.
 */
export function updateBrowserUrl(state: QueryParamsMap): void {
  if (typeof window === 'undefined' || !window.history) {
    return;
  }

  const newQuery = encodeStateToQuery(state);
  const newUrl = `${window.location.pathname}${newQuery}`;

  window.history.replaceState({ ...window.history.state, ...state }, '', newUrl);
}
