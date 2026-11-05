import React from 'react';
import { HeartHandshake, Shield, Sparkles, Sprout, Users, MapPin } from 'lucide-react';

export default function ImpactSection() {
  const impacts = [
    {
      icon: Users,
      title: 'Decentralizing Tourism',
      description: 'Over 80% of travel spending flows to just a handful of overcrowded landmarks. We redirect conscious explorers to authentic rural hamlets.'
    },
    {
      icon: HeartHandshake,
      title: 'Direct Artisan Livelihoods',
      description: 'Connecting you directly to master craftsmen in weaving and painting villages like Raghurajpur and Kutch with zero intermediary commission.'
    },
    {
      icon: Sprout,
      title: 'Preserving Living Traditions',
      description: 'Documenting centuries of oral history, sacred groves, and vernacular water architectures before they disappear from public consciousness.'
    },
    {
      icon: Shield,
      title: 'Ethical & Verified Information',
      description: 'Zero fake AI hallucinations or fabricated claims. Every verified listing respects ASI standards and local cultural sensitivities.'
    }
  ];

  return (
    <section className="bg-forest-900 text-cream-50 py-20 px-4 sm:px-6 lg:px-8 my-12 rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-warm-lg">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Social Mission</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Exploring Local Changes Everything
          </h2>
          <p className="text-sm sm:text-base text-forest-200 leading-relaxed font-light">
            Tourism shouldn’t just consume places — it should nourish the people who have safeguarded culture and stone for centuries.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-forest-800/80 border border-forest-700/60 space-y-3 hover:bg-forest-800 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-700/60 text-amber-300 flex items-center justify-center border border-forest-600/40">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-forest-200 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Impact Quote Box */}
        <div className="p-8 rounded-2xl bg-forest-950/60 border border-forest-800/80 text-center max-w-2xl mx-auto space-y-2">
          <p className="font-serif italic text-lg sm:text-xl text-cream-100">
            &ldquo;When you visit a hidden village temple or rural stepwell, your footprint creates appreciation that preserves it for the next thousand years.&rdquo;
          </p>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
            — The ExploreLocal Collective
          </span>
        </div>

      </div>
    </section>
  );
}

