import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

export type View = 'dashboard' | 'installed' | 'settings';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #080b14 0%, #0a0e1c 50%, #06091a 100%)' }}>
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-1 overflow-auto main-content">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView !== 'dashboard' && (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 text-sm gap-2">
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
