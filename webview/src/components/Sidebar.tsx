import React from 'react';
import type { View } from '../App';

interface NavItem {
  id: View;
  label: string;
  icon: React.ReactNode;
}

const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const InstalledIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);

const ExplorerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

const AboutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'installed', label: 'Installed Skills', icon: <InstalledIcon /> },
  { id: 'explorer', label: 'Source Explorer', icon: <ExplorerIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  { id: 'about', label: 'About', icon: <AboutIcon /> },
];

interface Props {
  activeView: View;
  onNavigate: (v: View) => void;
}

export default function Sidebar({ activeView, onNavigate }: Props) {
  return (
    <aside className="w-60 flex flex-col bg-[#13161f] border-r border-[#1e2332] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1e2332]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#0ea5e9] flex items-center justify-center shrink-0 shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <div>
          <div className="text-xs font-bold text-white leading-tight tracking-wide">COPILOT SKILL</div>
          <div className="text-xs font-bold text-[#3b82f6] leading-tight tracking-wide">INSTALLER</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5 cursor-pointer border-none outline-none
              ${activeView === item.id
                ? 'bg-[#1e3a5f] text-[#3b82f6] shadow-sm'
                : 'text-[#94a3b8] hover:bg-[#1a1f2e] hover:text-[#e2e8f0]'
              }`}
          >
            <span className={activeView === item.id ? 'text-[#3b82f6]' : 'text-[#64748b]'}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Source Location */}
      <div className="mx-3 mb-3 p-3 rounded-lg bg-[#1a1f2e] border border-[#1e2332]">
        <div className="text-[10px] font-semibold text-[#475569] tracking-widest uppercase mb-2">Source Location</div>
        <div className="flex items-center gap-2">
          <span className="text-[#64748b] text-xs font-mono truncate flex-1">~/.copilot-master/.github/skills</span>
          <button className="text-[#64748b] hover:text-[#3b82f6] transition-colors shrink-0 border-none bg-transparent cursor-pointer p-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Promo card */}
      <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-[#1a2744] to-[#0f1a30] border border-[#1e3a5f] relative overflow-hidden">
        <div className="absolute right-2 bottom-2 opacity-20">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-[#f59e0b] mb-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a1 1 0 0 1 .894.553l2.5 5 5.5.8a1 1 0 0 1 .555 1.706l-3.98 3.88.94 5.48a1 1 0 0 1-1.451 1.054L12 17.77l-4.958 2.603a1 1 0 0 1-1.451-1.054l.94-5.48L2.55 9.96A1 1 0 0 1 3.106 8.253l5.5-.8 2.5-5A1 1 0 0 1 12 2z" />
          </svg>
        </div>
        <p className="text-xs text-[#94a3b8] leading-relaxed relative z-10">
          One click install to bring powerful Copilot skills into your workspace
        </p>
      </div>

      {/* Footer status */}
      <div className="px-4 pb-4 text-[10px] text-[#475569]">
        Ready to install amazing skills
      </div>
    </aside>
  );
}
