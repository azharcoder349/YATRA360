import React from 'react';
import { Compass, Heart, ShieldCheck, Sparkles, MapPin, Mail, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate, onOpenAddGem }) {
  return (
    <footer className="bg-forest-950 text-cream-100 border-t border-forest-900 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-900/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-forest-800 text-amber-300 flex items-center justify-center border border-forest-700">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-extrabold text-white tracking-tight">
                Explore<span className="text-terracotta-400">Local</span>
              </span>
            </div>

            <p className="font-serif italic text-base text-cream-200">
              &ldquo;Every place has a story. Discover the stories hidden around you.&rdquo;
            </p>

            <p className="text-xs text-forest-200 leading-relaxed max-w-sm">
              ExploreLocal is an authentic AI-powered tourism platform designed to decentralize travel, spotlight forgotten heritage architectures, stepwells, sacred groves, and directly uplift rural artisan economies.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-forest-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dedicated to verified cultural facts &amp; zero manufactured reviews.</span>
            </div>
          </div>

          {/* Discover Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300">
              Discover
            </h4>
            <ul className="space-y-2 text-xs text-forest-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gems')}
                  className="hover:text-white transition-colors"
                >
                  All Hidden Gems
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('near-me')}
                  className="hover:text-white transition-colors"
                >
                  Gems Near Me (GPS)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gems')}
                  className="hover:text-white transition-colors"
                >
                  Sacred Temples
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gems')}
                  className="hover:text-white transition-colors"
                >
                  Ancient Stepwells
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gems')}
                  className="hover:text-white transition-colors"
                >
                  Crater Lakes &amp; Wetlands
                </button>
              </li>
            </ul>
          </div>

          {/* AI & Features */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300">
              AI Tools
            </h4>
            <ul className="space-y-2 text-xs text-forest-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('planner')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Smart Trip Planner</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/30 text-emerald-300">AI</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('guide')}
                  className="hover:text-white transition-colors"
                >
                  Local Explorer AI Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('favorites')}
                  className="hover:text-white transition-colors"
                >
                  Saved Favorites
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAddGem}
                  className="hover:text-white transition-colors text-terracotta-300 font-semibold"
                >
                  + Add a Hidden Gem
                </button>
              </li>
            </ul>
          </div>

          {/* Mission & Impact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300">
              Social Impact
            </h4>
            <p className="text-xs text-forest-200 leading-relaxed">
              Mainstream platforms funnel 80% of travelers to just 2% of locations. By exploring locally, your travel spending flows directly into village homestays, rural guides, and generational handicraft lineages.
            </p>
            <div className="p-3 rounded-xl bg-forest-900 border border-forest-800 text-[11px] text-amber-200/90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Preserving living oral histories across India.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest-400">
          <div>
            &copy; {new Date().getFullYear()} ExploreLocal. All rights reserved.
          </div>

          <div className="font-serif italic text-cream-200 text-sm font-semibold tracking-wide">
            &ldquo;Explore Local. Experience More.&rdquo;
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>&bull;</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Discovery
            </span>
            <span>&bull;</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              ASI Attribution
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

