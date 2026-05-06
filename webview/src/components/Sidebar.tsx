import React from 'react';
import type { View } from '../App';
import { useTheme } from '../ThemeContext';

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

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'installed', label: 'Installed Skills', icon: <InstalledIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

interface Props {
  activeView: View;
  onNavigate: (v: View) => void;
}

export default function Sidebar({ activeView, onNavigate }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <aside className="sidebar w-[220px] flex flex-col shrink-0 relative">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 sidebar-header-border">
        <div className="w-10 h-10 rounded-xl logo-gradient flex items-center justify-center shrink-0 shadow-glow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold leading-tight tracking-wider" style={{ color: 'var(--text-primary)' }}>DCT COPILOT</div>
          <div className="text-[11px] font-bold leading-tight tracking-wider gradient-text">SKILLS</div>
        </div>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-none outline-none
              ${activeView === item.id ? 'nav-active' : ''}`}
          >
            <span style={{ color: activeView === item.id ? 'var(--nav-icon-active)' : 'var(--nav-icon)' }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Source Location */}
      <div className="mx-3 mb-3 p-3 rounded-xl source-card">
        <div className="text-[9px] font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--text-xfaint)' }}>Source Location</div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono truncate flex-1" style={{ color: 'var(--text-muted)' }}>~/.copilot-master/.github/skills</span>
          <button className="transition-colors shrink-0 border-none bg-transparent cursor-pointer p-0" style={{ color: 'var(--text-faint)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Promo card */}
      <div className="mx-3 mb-4 p-4 rounded-xl promo-card relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={isDark ? 'white' : '#1d4ed8'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-yellow-500 mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <p className="text-[11px] leading-relaxed relative z-10 font-medium" style={{ color: isDark ? '#cbd5e1' : '#1e3a5f' }}>
          One click install to bring powerful Copilot skills into your workspace
        </p>
        <div className="mt-3 flex justify-end opacity-70">
          <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
            <ellipse cx="24" cy="24" rx="20" ry="10" fill="#3b82f6" opacity="0.3"/>
            <path d="M24 4 L8 12 L24 20 L40 12 Z" fill="#60a5fa" opacity="0.6"/>
            <path d="M14 26 L24 30 L34 26" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 text-[10px]" style={{ color: 'var(--text-xfaint)' }}>
        Ready to install amazing skills
      </div>
    </aside>
  );
}
