import React from 'react';
import '../styles/app.css';
import './app.i18n';
import AppRouter from './AppRouter';

// containerBuilder();

export default function App() {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}
