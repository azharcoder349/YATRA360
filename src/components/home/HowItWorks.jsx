import React from 'react';
import { Navigation, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onExploreNearMe, onOpenPlanner }) {
  const steps = [
    {
      step: '01',
      icon: Navigation,
      title: 'Find Hidden Gems Near You',
      description: 'One tap uses your device GPS to scan for lesser-known temples, ancient stepwells, and natural reserves within 5 to 100 kilometers.',
      actionLabel: 'Try Near Me',
      actionFn: onExploreNearMe
    },
    {
      step: '02',
      icon: Sparkles,
      title: 'Generate an AI Travel Plan',
      description: 'Tell our AI assistant your available hours, budget, and travel interests. Get a timed multi-stop itinerary with authentic regional food tips.',
      actionLabel: 'Launch Planner',
      actionFn: onOpenPlanner
    },
    {
      step: '03',
      icon: BookOpen,
      title: 'Immerse in Living Lore',
      description: 'Listen to narrated audio stories, admire architectural details, and navigate with verified Google Maps links with zero commercial hassle.',
      actionLabel: null,
      actionFn: null
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
          Seamless Experience
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-950">
          How ExploreLocal Works
        </h2>
        <p className="text-sm text-gray-600">
          Designed for curious wanderers who value authentic discovery over crowded tourist traps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative p-8 rounded-3xl bg-white border border-cream-200 shadow-warm hover:shadow-warm-lg transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-100 font-bold">
                    <Icon className="w-6 h-6 text-forest-700" />
                  </div>
                  <span className="font-serif text-3xl font-extrabold text-cream-400">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.actionLabel && (
                <button
                  type="button"
                  onClick={item.actionFn}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-terracotta-600 transition-colors pt-2"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

