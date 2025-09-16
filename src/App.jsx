import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <main className="pt-14 pb-24">
        <Suspense fallback={<div className="p-6"><LoadingSpinner /></div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/menu" replace />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPageRoute />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Navigation />
      <Footer />
    </div>
  );
}