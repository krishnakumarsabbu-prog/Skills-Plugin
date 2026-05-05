import React, { useState, useEffect, useCallback } from 'react';
import SkillCard from './SkillCard';
import { ToastContainer } from './Toast';
import type { ToastMessage } from './Toast';
import vscode from '../vscode';

export interface Skill {
  id: string;
  name: string;
  fileCount: number;
  status: 'Not Installed' | 'Installed';
}

type Tab = 'all' | 'installed' | 'not-installed';

let toastCounter = 0;

const EmptyState = ({ hasSkills }: { hasSkills: boolean }) => (
  <div className="py-20 flex flex-col items-center justify-center gap-5">
    <div className="empty-illustration relative w-32 h-32">
      {/* Concentric rings */}
      <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-pulse-slow" />
      <div className="absolute inset-4 rounded-full border border-blue-500/15 animate-pulse-slow" style={{ animationDelay: '0.3s' }} />
      <div className="absolute inset-8 rounded-full border border-blue-500/20 animate-pulse-slow" style={{ animationDelay: '0.6s' }} />
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900/60 to-cyan-900/40 border border-white/10 flex items-center justify-center shadow-glow-sm">
          {hasSkills ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )}
        </div>
      </div>
    </div>
    <div className="text-center">
      <div className="text-base font-semibold text-white mb-1">
        {hasSkills ? 'No matching skills' : 'No skills found'}
      </div>
      <div className="text-sm text-slate-500 max-w-[260px] leading-relaxed">
        {hasSkills
          ? 'Try adjusting your search or filter to find what you\'re looking for.'
          : 'No skills found in resources/.github/skills/ — check that your skills directory is set up correctly.'}
      </div>
    </div>
    {!hasSkills && (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/8 border border-blue-500/15 text-xs text-blue-400 font-mono">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        resources/.github/skills/
      </div>
    )}
  </div>
);

const LoadingSpinner = () => (
  <div className="py-20 flex flex-col items-center justify-center gap-4">
    <div className="relative w-16 h-16">
      {/* Outer ring */}
      <svg className="absolute inset-0 animate-spin-slow" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="rgba(59,130,246,0.15)" strokeWidth="2" />
        <path d="M32 4 A28 28 0 0 1 60 32" stroke="url(#spinGrad)" strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="spinGrad" x1="32" y1="4" x2="60" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 flex items-center justify-center animate-pulse">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 text-slate-500 text-sm">
      <span>Loading skills</span>
      <span className="loading-dots">
        <span>.</span><span>.</span><span>.</span>
      </span>
    </div>
  </div>
);

export default function Dashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [installingSkills, setInstallingSkills] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [refreshSpin, setRefreshSpin] = useState(false);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === 'skillsLoaded') {
        setSkills(
          message.skills.map((s: { name: string; fileCount: number; status: string }) => ({
            id: s.name,
            name: s.name,
            fileCount: s.fileCount,
            status: s.status as Skill['status'],
          }))
        );
        setLoading(false);
        setError(null);
      } else if (message.command === 'skillsError') {
        setError(message.message);
        setLoading(false);
        addToast({ type: 'error', title: 'Failed to load skills', description: message.message });
      } else if (message.command === 'skillInstalled') {
        const skillName: string = message.skillName;
        setSkills((prev) =>
          prev.map((s) => (s.id === skillName ? { ...s, status: 'Installed' } : s))
        );
        setInstallingSkills((prev) => {
          const next = new Set(prev);
          next.delete(skillName);
          return next;
        });
        addToast({ type: 'success', title: 'Skill Installed Successfully', description: `"${skillName}" is ready to use in your workspace.` });
      } else if (message.command === 'skillInstallError') {
        const skillName: string = message.skillName;
        setInstallingSkills((prev) => {
          const next = new Set(prev);
          next.delete(skillName);
          return next;
        });
        addToast({ type: 'error', title: 'Installation Failed', description: `Could not install "${skillName}". Please try again.` });
      }
    };

    window.addEventListener('message', handler);
    vscode?.postMessage({ command: 'loadSkills' });
    return () => window.removeEventListener('message', handler);
  }, [addToast]);

  const totalSkills = skills.length;
  const installedCount = skills.filter((s) => s.status === 'Installed').length;
  const notInstalledCount = skills.filter((s) => s.status === 'Not Installed').length;

  const filtered = skills.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'installed' && s.status === 'Installed') ||
      (activeTab === 'not-installed' && s.status === 'Not Installed');
    return matchSearch && matchTab;
  });

  const handleInstall = (id: string) => {
    setInstallingSkills((prev) => new Set(prev).add(id));
    vscode?.postMessage({ command: 'installSkill', skillName: id });
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setRefreshSpin(true);
    setTimeout(() => setRefreshSpin(false), 600);
    vscode?.postMessage({ command: 'loadSkills' });
  };

  const statCards = [
    {
      value: loading ? '—' : String(totalSkills),
      label: 'Total Skills',
      iconColor: '#60a5fa',
      bgColor: 'rgba(59,130,246,0.1)',
      borderColor: 'rgba(59,130,246,0.2)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      value: loading ? '—' : String(installedCount),
      label: 'Installed',
      iconColor: '#4ade80',
      bgColor: 'rgba(16,185,129,0.1)',
      borderColor: 'rgba(16,185,129,0.2)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      value: loading ? '—' : String(notInstalledCount),
      label: 'Not Installed',
      iconColor: '#f87171',
      bgColor: 'rgba(239,68,68,0.1)',
      borderColor: 'rgba(239,68,68,0.2)',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      value: 'Just now',
      label: 'Last Sync',
      iconColor: '#fbbf24',
      bgColor: 'rgba(245,158,11,0.1)',
      borderColor: 'rgba(245,158,11,0.2)',
      isText: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Top Header */}
      <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Skill Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Browse and install powerful Copilot skills into your workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card border border-white/5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-[11px] text-slate-400 font-mono">resources/.github/skills</span>
          </div>
          <button
            onClick={handleRefresh}
            className="refresh-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none"
          >
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'transform 0.6s ease', transform: refreshSpin ? 'rotate(360deg)' : 'rotate(0deg)' }}
            >
              <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mx-8 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 px-8 py-5">
        {statCards.map((card, i) => (
          <div
            key={card.label}
            className="stat-card flex items-center gap-4 px-4 py-4 rounded-2xl"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300"
              style={{ background: card.bgColor, border: `1px solid ${card.borderColor}` }}
            >
              {card.icon}
            </div>
            <div>
              <div className={`font-bold text-white ${card.isText ? 'text-sm' : 'text-2xl'}`}>{card.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div className="flex items-center gap-4 px-8 pb-4">
        <div className="flex-1 relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search skills by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center tab-group rounded-xl overflow-hidden p-0.5 gap-0.5">
          {(['all', 'installed', 'not-installed'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer border-none outline-none whitespace-nowrap
                ${activeTab === tab ? 'tab-active text-white' : 'text-slate-500 hover:text-slate-300 bg-transparent'}`}
            >
              {tab === 'all' ? 'All' : tab === 'installed' ? 'Installed' : 'Not Installed'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 pb-4">
        <div className="table-container rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="table-header grid grid-cols-[2fr_100px_130px_140px] gap-4 px-5 py-3">
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Skill Name</div>
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Files</div>
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Status</div>
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Action</div>
          </div>

          {/* Loading State */}
          {loading && <LoadingSpinner />}

          {/* Rows */}
          {!loading && filtered.map((skill, i) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isInstalled={skill.status === 'Installed'}
              isInstalling={installingSkills.has(skill.id)}
              isLast={i === filtered.length - 1}
              rowIndex={i}
              onInstall={handleInstall}
            />
          ))}

          {/* Empty State */}
          {!loading && filtered.length === 0 && !error && (
            <EmptyState hasSkills={skills.length > 0} />
          )}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="mx-8 mb-6 flex items-center justify-between px-5 py-4 rounded-2xl footer-bar border border-blue-500/10">
        <div className="flex items-center gap-3">
          <div className="text-yellow-400 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Install any skill with one click and supercharge your Copilot experience!
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Skills will be copied to your workspace{' '}
              <span className="font-mono text-slate-400">.github/skills/</span> directory
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            ~/workspace/.github
          </div>
          <button className="open-folder-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border-none transition-all">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            Open .github Folder
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
