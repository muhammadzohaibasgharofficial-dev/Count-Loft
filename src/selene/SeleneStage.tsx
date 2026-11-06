import {useEffect} from 'react';
import {Earthrise} from './components/Earthrise';
import {useReducedMotion} from './hooks/useReducedMotion';
import {startScroll} from './lib/scroll';

/**
 * Homepage island. Does what SELENE's App.tsx / main.tsx do for the hero:
 * starts the single rAF + Lenis loop and keeps the pinned stage starting at the top.
 */
export default function SeleneStage() {
  const reduced = useReducedMotion();

  useEffect(() => {
    // The pinned stage depends on scroll position; always start at the top
    // (unless the visitor arrived with an in-page #hash).
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => startScroll(reduced), [reduced]);

  return <Earthrise />;
}
