import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

export type View = 'dashboard' | 'installed' | 'explorer' | 'settings' | 'about';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <div className="flex h-screen bg-[#0f1117] text-[#e2e8f0] overflow-hidden">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-1 overflow-auto">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView !== 'dashboard' && (
          <div className="flex items-center justify-center h-full text-[#64748b] text-sm">
            Coming soon
          </div>
        )}
      </main>
    </div>
  );
}
