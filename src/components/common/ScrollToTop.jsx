import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Scrolls window to top on route change (pathname change)
 * Usage: Place inside <Router> but outside <Routes>
 */
export default function ScrollToTop({ smooth = true }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }, [pathname, smooth]);

  return null;
}
