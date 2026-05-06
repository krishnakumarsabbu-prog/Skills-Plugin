import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './ThemeContext';

export type View = 'dashboard' | 'installed' | 'settings';

function AppInner() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-1 overflow-auto main-content">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView !== 'dashboard' && (
          <div className="flex flex-col items-center justify-center h-full text-sm gap-2" style={{ color: 'var(--text-faint)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Coming soon
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
