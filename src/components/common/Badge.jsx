import React from 'react';
import { ShieldCheck, Sparkles, AlertCircle, Clock } from 'lucide-react';

export function StatusBadge({ status, notice }) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm" title={notice || 'Verified Heritage Site'}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Verified Gem</span>
      </span>
    );
  }

  if (status === 'demo') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200" title={notice || 'Sample Demo Record'}>
        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
        <span>Sample Demo</span>
      </span>
    );
  }

  if (status === 'pending_verification') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-900 border border-purple-200" title={notice || 'Community submission awaiting verification'}>
        <Clock className="w-3.5 h-3.5 text-purple-600" />
        <span>Community (Pending)</span>
      </span>
    );
  }

  return null;
}

export function CategoryBadge({ category }) {
  const categoryMap = {
    temples: { label: 'Sacred Temple', bg: 'bg-amber-100 text-amber-900 border-amber-300' },
    historical: { label: 'Heritage & Forts', bg: 'bg-stone-100 text-stone-800 border-stone-300' },
    nature: { label: 'Untouched Nature', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    lakes: { label: 'Lake & Wetland', bg: 'bg-cyan-100 text-cyan-900 border-cyan-300' },
    cultural: { label: 'Living Crafts', bg: 'bg-violet-100 text-violet-900 border-violet-300' },
    festivals: { label: 'Folk Tradition', bg: 'bg-orange-100 text-orange-900 border-orange-300' },
    villages: { label: 'Hidden Village', bg: 'bg-lime-100 text-lime-900 border-lime-300' },
  };

  const current = categoryMap[category] || { label: category, bg: 'bg-gray-100 text-gray-800 border-gray-300' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.bg}`}>
      {current.label}
    </span>
  );
}

