import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../styles/app.css';
import Spinner from './components/common/Spinner';
import { Footer, Header } from './layout';

const Home = lazy(() => import('./pages/home'));
const Network = lazy(() => import('./pages/Network'));
const TokenList = lazy(() => import('./pages/TokenList'));
const Swap = lazy(() => import('./pages/Swap'));
const Transfer = lazy(() => import('./pages/Transfer'));
const PreviousClaim = lazy(() => import('./pages/PreviousClaim'));

export default function AppRouter() {
  const LoadingMessage = () => (
    <div className="loading">
      <Spinner size="lg"></Spinner>
    </div>
  );

  return (
    <BrowserRouter>
      <Header />

      <Suspense fallback={<LoadingMessage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/network" element={<Network />} />
          <Route path="/tokens" element={<TokenList />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/previousclaim" element={<PreviousClaim />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}
