import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './layout';
const Home = lazy(() => import('./pages/home'));
const Network = lazy(() => import('./pages/Network'));
const TokenList = lazy(() => import('./pages/TokenList'));

export default function AppRouter() {
  const LoadingMessage = () => <div>Loading..,</div>;

  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<LoadingMessage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/network" element={<Network />} />
          <Route path="/tokens" element={<TokenList />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}
