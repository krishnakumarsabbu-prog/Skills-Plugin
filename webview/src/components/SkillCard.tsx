import React from 'react';
import type { Skill } from './Dashboard';

interface Props {
  skill: Skill;
  isInstalled: boolean;
  isInstalling: boolean;
  isLast: boolean;
  onInstall: (id: string) => void;
}

export default function SkillCard({ skill, isInstalled, isInstalling, isLast, onInstall }: Props) {
  return (
    <div className={`skill-row grid grid-cols-[2fr_100px_130px_140px] gap-4 items-center px-5 py-4 transition-all duration-150 ${!isLast ? 'border-b border-white/[0.04]' : ''}`}>
      {/* Name */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-blue-900/60 flex items-center justify-center shrink-0 border border-white/10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <div className="min-w-0">
          <span className="font-semibold text-white text-sm block truncate">{skill.name}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block truncate font-mono">{skill.name}</span>
        </div>
      </div>

      {/* Files */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        {skill.fileCount} files
      </div>

      {/* Status */}
      {isInstalled ? (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Installed
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-500/10 text-slate-500 border border-slate-500/20 w-fit">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          Not Installed
        </span>
      )}

      {/* Action */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onInstall(skill.id)}
          disabled={isInstalling}
          className={`install-btn flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-none ${isInstalled ? 'installed' : ''} ${isInstalling ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isInstalling ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Installing...
            </>
          ) : isInstalled ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Reinstall
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Install
            </>
          )}
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 transition-all border-none cursor-pointer bg-transparent">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}


export default SkillCard