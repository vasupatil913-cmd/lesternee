import React from 'react';
import { ModuleData } from '../types';
import { ChevronRight, Clock, ShieldAlert } from 'lucide-react';

interface ModuleCardProps {
  module: ModuleData;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-slate-900 text-emerald-400 font-mono text-xs px-2 py-1 rounded border border-emerald-900/50">
          MODULE {module.id.toString().padStart(2, '0')}
        </div>
        <div className="flex items-center text-slate-400 text-xs">
          <Clock size={14} className="mr-1" />
          {module.duration}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
        {module.title}
      </h3>
      
      <div className="space-y-2 mb-4">
        {module.subtopics.slice(0, 2).map((sub, idx) => (
          <div key={idx} className="flex items-center text-slate-400 text-sm">
            <ShieldAlert size={14} className="mr-2 text-emerald-700" />
            <span className="truncate">{sub.title}</span>
          </div>
        ))}
        {module.subtopics.length > 2 && (
          <div className="text-slate-500 text-xs italic pl-6">
            + {module.subtopics.length - 2} more topics...
          </div>
        )}
      </div>

      <div className="flex items-center text-emerald-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
        Start Training <ChevronRight size={16} className="ml-1" />
      </div>
    </div>
  );
};
