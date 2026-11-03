import { describe, it, expect } from 'vitest';
import {
  encodeStateToQuery,
  decodeQueryState
} from '../../../src/lib/url-state/url-state';

describe('URL State Utilities', () => {
  it('encodes state map into query string', () => {
    const query = encodeStateToQuery({ amount: 20000, rate: 6, term: 48 });
    expect(query).toBe('?amount=20000&rate=6&term=48');
  });

  it('omits undefined, null, or empty values', () => {
    const query = encodeStateToQuery({ amount: 100, empty: '', nil: null, undef: undefined });
    expect(query).toBe('?amount=100');
  });

  it('decodes query string into key-value map', () => {
    const parsed = decodeQueryState('?principal=20000&rate=6');
    expect(parsed).toEqual({ principal: '20000', rate: '6' });
  });

  it('handles empty query string safely', () => {
    expect(decodeQueryState('')).toEqual({});
  });
});
