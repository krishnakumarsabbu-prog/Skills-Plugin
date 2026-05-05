import React, { useState } from 'react';
import type { Skill } from './Dashboard';

interface Props {
  skill: Skill;
  viewMode: 'list' | 'grid';
  isLast: boolean;
}

function SkillIcon({ color, bg }: { color: string; bg: string }) {
  return (
    <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    </div>
  );
}

export default function SkillCard({ skill, viewMode, isLast }: Props) {
  const [installed, setInstalled] = useState(false);

  if (viewMode === 'grid') {
    return (
      <div className="p-4 rounded-xl bg-[#13161f] border border-[#1e2332] hover:border-[#2d3748] transition-all">
        <div className="flex items-start gap-3 mb-3">
          <SkillIcon color={skill.iconColor} bg={skill.iconBg} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white text-sm">{skill.name}</span>
              {skill.badge && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${skill.badge === 'Recommended' ? 'bg-[#1e3a5f] text-[#60a5fa]' : 'bg-[#1a2e1a] text-[#4ade80]'}`}>
                  {skill.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">{skill.shortDesc}</p>
          </div>
        </div>
        <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">{skill.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-[#64748b]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              {skill.files} files
            </span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${skill.categoryColor}`}>
              {skill.category}
            </span>
          </div>
          <button
            onClick={() => setInstalled(!installed)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer
              ${installed ? 'bg-[#1a2e1a] text-[#4ade80]' : 'bg-[#1d4ed8] text-white hover:bg-[#2563eb]'}`}
          >
            {installed ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Installed
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Install
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-[2fr_3fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 bg-[#13161f] hover:bg-[#161b27] transition-colors ${!isLast ? 'border-b border-[#1e2332]' : ''}`}>
      {/* Name */}
      <div className="flex items-center gap-3 min-w-0">
        <SkillIcon color={skill.iconColor} bg={skill.iconBg} />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">{skill.name}</span>
            {skill.badge && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${skill.badge === 'Recommended' ? 'bg-[#1e3a5f] text-[#60a5fa]' : 'bg-[#1a2e1a] text-[#4ade80]'}`}>
                {skill.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748b] mt-0.5 truncate">{skill.shortDesc}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">{skill.description}</p>

      {/* Files */}
      <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        {skill.files} files
      </div>

      {/* Category */}
      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full text-center ${skill.categoryColor}`}>
        {skill.category}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setInstalled(!installed)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer min-w-[80px] justify-center
            ${installed ? 'bg-[#1a2e1a] text-[#4ade80]' : 'bg-[#1d4ed8] text-white hover:bg-[#2563eb]'}`}
        >
          {installed ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Installed
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Install
            </>
          )}
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#94a3b8] hover:bg-[#1e2332] transition-all border-none cursor-pointer bg-transparent">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
