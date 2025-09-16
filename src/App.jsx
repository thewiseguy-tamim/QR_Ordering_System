import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Navigation from './components/layout/Navigation.jsx';
import Footer from './components/layout/Footer.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';

const MenuPage = lazy(() => import('./pages/MenuPage.jsx'));
const CartPageRoute = lazy(() => import('./pages/CartPage.jsx'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

export default function App() {
  // Smooth page transitions when route changes
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [stage, setStage] = useState('in'); // 'in' | 'out'

  // Reduce motion for users who prefer it
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (location.pathname !== displayedLocation.pathname) {
      // Animate current page out
      setStage('out');
      const t = setTimeout(() => {
        // Swap to the new route and animate in
        setDisplayedLocation(location);
        setStage('in');
        // Keep UX snappy
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      }, prefersReduced ? 0 : 220); // outbound duration
      return () => clearTimeout(t);
    }
  }, [location, displayedLocation, prefersReduced]);

  const transitionBase =
    'transform-gpu transition-all ease-[cubic-bezier(.22,1,.36,1)] ' +
    (prefersReduced ? 'duration-[1ms]' : 'duration-300');

  const transitionState =
    stage === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <main className="pt-14 pb-28">
        <div className={`${transitionBase} ${transitionState}`}>
          <Suspense fallback={<div className="p-6"><LoadingSpinner /></div>}>
            {/* Render the previous route while animating out, then swap */}
            <Routes location={displayedLocation}>
              <Route path="/" element={<Navigate to="/menu" replace />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPageRoute />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Navigation />
      <Footer />
    </div>
  );
}