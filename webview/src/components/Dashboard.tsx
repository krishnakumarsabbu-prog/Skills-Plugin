import React, { useState } from 'react';
import SkillCard from './SkillCard';

export interface Skill {
  id: string;
  name: string;
  description: string;
  shortDesc: string;
  files: number;
  category: string;
  categoryColor: string;
  badge?: 'Recommended' | 'Essential';
  iconColor: string;
  iconBg: string;
  installed?: boolean;
}

const skills: Skill[] = [
  {
    id: 'backend-architect',
    name: 'Backend Architect',
    description: 'Advanced prompts for system design, architecture patterns, and backend best practices.',
    shortDesc: 'Design scalable backend systems with best practices',
    files: 8,
    category: 'Architecture',
    categoryColor: 'bg-blue-900/40 text-blue-400',
    badge: 'Recommended',
    iconColor: '#60a5fa',
    iconBg: 'bg-blue-900/60',
    installed: false,
  },
  {
    id: 'clean-code',
    name: 'Clean Code',
    description: 'Prompts focused on clean code principles, refactoring, and code quality improvement.',
    shortDesc: 'Write clean, maintainable and efficient code',
    files: 6,
    category: 'Code Quality',
    categoryColor: 'bg-emerald-900/40 text-emerald-400',
    badge: 'Essential',
    iconColor: '#4ade80',
    iconBg: 'bg-emerald-900/60',
    installed: true,
  },
  {
    id: 'debugging-pro',
    name: 'Debugging Pro',
    description: 'Smart debugging prompts, error analysis, and troubleshooting strategies.',
    shortDesc: 'Master debugging with systematic approach',
    files: 7,
    category: 'Development',
    categoryColor: 'bg-red-900/40 text-red-400',
    badge: 'Essential',
    iconColor: '#f87171',
    iconBg: 'bg-red-900/60',
    installed: false,
  },
  {
    id: 'api-builder',
    name: 'API Builder',
    description: 'RESTful API design, documentation, validation and testing prompts.',
    shortDesc: 'Build robust APIs with best practices',
    files: 5,
    category: 'API',
    categoryColor: 'bg-sky-900/40 text-sky-400',
    iconColor: '#38bdf8',
    iconBg: 'bg-sky-900/60',
    installed: true,
  },
  {
    id: 'security-guardian',
    name: 'Security Guardian',
    description: 'Security best practices, vulnerability scanning, and secure coding prompts.',
    shortDesc: 'Secure your applications and protect against vulnerabilities',
    files: 6,
    category: 'Security',
    categoryColor: 'bg-orange-900/40 text-orange-400',
    iconColor: '#fb923c',
    iconBg: 'bg-orange-900/60',
    installed: false,
  },
  {
    id: 'test-automation',
    name: 'Test Automation',
    description: 'Unit testing, integration testing, and automation framework prompts.',
    shortDesc: 'Automated testing and quality assurance prompts',
    files: 5,
    category: 'Testing',
    categoryColor: 'bg-pink-900/40 text-pink-400',
    iconColor: '#e879f9',
    iconBg: 'bg-pink-900/60',
    installed: true,
  },
  {
    id: 'ui-designer',
    name: 'UI Designer',
    description: 'Modern UI/UX design patterns, component structure, and accessibility prompts.',
    shortDesc: 'Build stunning user interfaces with best practices',
    files: 9,
    category: 'Design',
    categoryColor: 'bg-violet-900/40 text-violet-400',
    iconColor: '#a78bfa',
    iconBg: 'bg-violet-900/60',
    installed: false,
  },
  {
    id: 'devops-pro',
    name: 'DevOps Pro',
    description: 'CI/CD pipeline setup, containerization, and infrastructure automation prompts.',
    shortDesc: 'Automate your deployment and infrastructure workflow',
    files: 10,
    category: 'DevOps',
    categoryColor: 'bg-teal-900/40 text-teal-400',
    iconColor: '#2dd4bf',
    iconBg: 'bg-teal-900/60',
    installed: false,
  },
];

type Tab = 'all' | 'installed' | 'not-installed';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [installedSkills, setInstalledSkills] = useState<Set<string>>(
    new Set(skills.filter((s) => s.installed).map((s) => s.id))
  );

  const totalSkills = skills.length;
  const installedCount = installedSkills.size;
  const notInstalledCount = totalSkills - installedCount;

  const filtered = skills.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const isInstalled = installedSkills.has(s.id);
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'installed' && isInstalled) ||
      (activeTab === 'not-installed' && !isInstalled);
    return matchSearch && matchTab;
  });

  const handleToggleInstall = (id: string) => {
    setInstalledSkills((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
            <span className="text-[11px] text-slate-400 font-mono">~/.copilot-master/.github/skills</span>
          </div>
          <button className="refresh-btn flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 px-8 py-5">
        <div className="stat-card flex items-center gap-4 px-4 py-4 rounded-2xl">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{totalSkills}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Total Skills</div>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 px-4 py-4 rounded-2xl">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{installedCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Installed</div>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 px-4 py-4 rounded-2xl">
          <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{notInstalledCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Not Installed</div>
          </div>
        </div>

        <div className="stat-card flex items-center gap-4 px-4 py-4 rounded-2xl">
          <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Just now</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Last Sync</div>
          </div>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex items-center gap-4 px-8 pb-4">
        <div className="flex-1 relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search skills by name, description or tags..."
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
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer border-none outline-none whitespace-nowrap
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
          <div className="table-header grid grid-cols-[2fr_3fr_100px_130px_140px] gap-4 px-5 py-3">
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Skill Name</div>
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Description</div>
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Files</div>
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Status</div>
            <div className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Action</div>
          </div>

          {/* Rows */}
          {filtered.map((skill, i) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isInstalled={installedSkills.has(skill.id)}
              isLast={i === filtered.length - 1}
              onToggle={handleToggleInstall}
            />
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-slate-600 text-sm">No skills match your search.</div>
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
    </div>
  );
}
