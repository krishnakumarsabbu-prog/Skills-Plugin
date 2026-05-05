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
}

const skills: Skill[] = [
  {
    id: 'backend-architect',
    name: 'Backend Architect',
    description: 'Advanced prompts for system design, architecture patterns, and backend best practices.',
    shortDesc: 'Design scalable backend systems with best practices',
    files: 8,
    category: 'Architecture',
    categoryColor: 'bg-[#1e3a5f] text-[#60a5fa]',
    badge: 'Recommended',
    iconColor: '#60a5fa',
    iconBg: 'bg-[#1e3a5f]',
  },
  {
    id: 'clean-code',
    name: 'Clean Code',
    description: 'Prompts focused on clean code principles, refactoring, and code quality improvement.',
    shortDesc: 'Write clean, maintainable and efficient code',
    files: 6,
    category: 'Code Quality',
    categoryColor: 'bg-[#1a2e1a] text-[#4ade80]',
    badge: 'Essential',
    iconColor: '#4ade80',
    iconBg: 'bg-[#1a2e1a]',
  },
  {
    id: 'debugging-pro',
    name: 'Debugging Pro',
    description: 'Smart debugging prompts, error analysis, and troubleshooting strategies.',
    shortDesc: 'Master debugging with systematic approach',
    files: 7,
    category: 'Development',
    categoryColor: 'bg-[#2d1a1a] text-[#f87171]',
    badge: 'Essential',
    iconColor: '#f87171',
    iconBg: 'bg-[#2d1a1a]',
  },
  {
    id: 'api-builder',
    name: 'API Builder',
    description: 'RESTful API design, documentation, validation and testing prompts.',
    shortDesc: 'Build robust APIs with best practices',
    files: 5,
    category: 'API',
    categoryColor: 'bg-[#1e2d3d] text-[#38bdf8]',
    iconColor: '#38bdf8',
    iconBg: 'bg-[#1e2d3d]',
  },
  {
    id: 'security-guardian',
    name: 'Security Guardian',
    description: 'Security best practices, vulnerability scanning, and secure coding prompts.',
    shortDesc: 'Secure your applications and protect against vulnerabilities',
    files: 6,
    category: 'Security',
    categoryColor: 'bg-[#2d1f1a] text-[#fb923c]',
    iconColor: '#fb923c',
    iconBg: 'bg-[#2d1f1a]',
  },
  {
    id: 'test-automation',
    name: 'Test Automation',
    description: 'Unit testing, integration testing, and automation framework prompts.',
    shortDesc: 'Automated testing and quality assurance prompts',
    files: 5,
    category: 'Testing',
    categoryColor: 'bg-[#2d1a2d] text-[#e879f9]',
    iconColor: '#e879f9',
    iconBg: 'bg-[#2d1a2d]',
  },
];

type ViewMode = 'list' | 'grid';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const categories = ['All Categories', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filtered = skills.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All Categories' || s.category === category;
    return matchSearch && matchCat;
  });

  const installed = 3;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 border-b border-[#1e2332]">
        <h1 className="text-3xl font-bold text-white tracking-tight">Skill Dashboard</h1>
        <p className="text-sm text-[#64748b] mt-1">Browse and install powerful Copilot skills into your workspace</p>

        {/* Stats */}
        <div className="flex gap-4 mt-6">
          <div className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-[#13161f] border border-[#1e2332] flex-1 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-[#1e2d3d] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{skills.length}</div>
              <div className="text-xs text-[#64748b]">Total Skills</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-[#13161f] border border-[#1e2332] flex-1 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-[#1a2e1a] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{installed}</div>
              <div className="text-xs text-[#64748b]">Installed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-8 py-4">
        {/* Search */}
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search skills by name, description or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#13161f] border border-[#1e2332] text-sm text-[#e2e8f0] placeholder-[#475569] outline-none focus:border-[#3b82f6] transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none pl-8 pr-8 py-2.5 rounded-lg bg-[#13161f] border border-[#1e2332] text-sm text-[#e2e8f0] outline-none focus:border-[#3b82f6] transition-colors cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* View mode toggle */}
        <div className="flex bg-[#13161f] border border-[#1e2332] rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 transition-colors border-none cursor-pointer ${viewMode === 'list' ? 'bg-[#1e3a5f] text-[#3b82f6]' : 'text-[#64748b] hover:text-[#e2e8f0] bg-transparent'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 transition-colors border-none cursor-pointer ${viewMode === 'grid' ? 'bg-[#1e3a5f] text-[#3b82f6]' : 'text-[#64748b] hover:text-[#e2e8f0] bg-transparent'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Skill list */}
      <div className="flex-1 overflow-auto px-8 pb-4">
        {viewMode === 'list' ? (
          <div className="rounded-xl border border-[#1e2332] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_3fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-[#0d1018] border-b border-[#1e2332]">
              <div className="text-[10px] font-semibold text-[#475569] tracking-widest uppercase">Skill Name</div>
              <div className="text-[10px] font-semibold text-[#475569] tracking-widest uppercase">Description</div>
              <div className="text-[10px] font-semibold text-[#475569] tracking-widest uppercase">Files</div>
              <div className="text-[10px] font-semibold text-[#475569] tracking-widest uppercase">Category</div>
              <div className="w-24" />
            </div>
            {filtered.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} viewMode="list" isLast={i === filtered.length - 1} />
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center text-[#475569] text-sm">No skills match your search.</div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((skill) => (
              <SkillCard key={skill.id} skill={skill} viewMode="grid" isLast={false} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 py-16 text-center text-[#475569] text-sm">No skills match your search.</div>
            )}
          </div>
        )}
      </div>

      {/* Footer banner */}
      <div className="mx-8 mb-6 flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r from-[#1a2744] to-[#0f1a2e] border border-[#1e3a5f]">
        <div className="flex items-start gap-3">
          <div className="text-[#f59e0b] mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Install any skill with one click and supercharge your Copilot experience!
            </div>
            <div className="text-xs text-[#64748b] mt-0.5">
              Skills will be copied to your workspace <span className="font-mono text-[#475569]">.github/skills/</span> directory
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e3a5f] text-[#60a5fa] text-sm font-medium hover:bg-[#1d4ed8] hover:text-white transition-all border-none cursor-pointer shrink-0 ml-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh Skills
        </button>
      </div>
    </div>
  );
}
