import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './layout';
const Home = lazy(() => import('./pages/home'));

export default function AppRouter() {
  const LoadingMessage = () => <div>Loading..,</div>;

  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<LoadingMessage />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}
