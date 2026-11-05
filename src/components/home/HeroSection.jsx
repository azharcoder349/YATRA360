import React, { useState } from 'react';
import { Search, MapPin, Compass, Sparkles, Navigation, ArrowRight } from 'lucide-react';

export default function HeroSection({
  onSearch,
  onExploreNearMe,
  onExploreGems,
  isLoadingLocation = false
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-4 border border-forest-900/10 shadow-warm-lg">
      
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
          alt="Majestic Indian Heritage Architecture"
          className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-1000 ease-out"
        />
        {/* Multilayer gradient: dark forest green at bottom & left, subtle warm amber top */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-900/75 to-forest-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center text-white space-y-8">
        
        {/* Top Mission Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/15 backdrop-blur-md border border-cream-200/20 text-xs font-semibold text-amber-200 shadow-sm animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Hidden Heritage Discovery Platform</span>
        </div>

        {/* Headline & Subtitle */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-cream-50 drop-shadow-md">
            Discover the <span className="text-amber-300 italic font-serif">Extraordinary</span> Around You.
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-cream-100/90 font-light leading-relaxed">
            From hidden temples to unexplored destinations, discover the stories, culture and beauty waiting just around the corner.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-float border border-cream-200/40 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-3 w-full">
              <Search className="w-5 h-5 text-forest-700 shrink-0" />
              <input
                type="text"
                placeholder="Search by city, temple, stepwell, crater lake, or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 bg-transparent text-gray-900 placeholder-gray-400 text-sm font-medium focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Search Tags */}
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-xs text-cream-200 font-medium">
            <span className="text-cream-300/80">Trending:</span>
            {['Lepakshi', 'Chand Baori', 'Lonar Crater', 'Orchha', 'Bhigwan Flamingos'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  if (onSearch) onSearch(tag);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-cream-100 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={onExploreNearMe}
            disabled={isLoadingLocation}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-forest-950 font-bold text-sm tracking-wide shadow-warm hover:shadow-warm-lg flex items-center justify-center gap-2.5 transition-all transform active:scale-95"
          >
            <Navigation className={`w-4 h-4 text-forest-900 fill-forest-900 ${isLoadingLocation ? 'animate-spin' : ''}`} />
            <span>{isLoadingLocation ? 'Finding your GPS coords...' : 'Explore Near Me'}</span>
          </button>

          <button
            type="button"
            onClick={onExploreGems}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-cream-50/15 hover:bg-cream-50/25 border border-cream-100/30 text-white font-semibold text-sm backdrop-blur-md shadow-warm flex items-center justify-center gap-2.5 transition-all"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>Explore Hidden Gems</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="pt-8 border-t border-cream-100/15 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">20+</div>
            <div className="text-[11px] text-cream-200 uppercase tracking-wider font-medium">Curated Hidden Gems</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">100%</div>
            <div className="text-[11px] text-cream-200 uppercase tracking-wider font-medium">Verified Historical Lore</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">GPS</div>
            <div className="text-[11px] text-cream-200 uppercase tracking-wider font-medium">Proximity Sorting</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">AI</div>
            <div className="text-[11px] text-cream-200 uppercase tracking-wider font-medium">Smart Trip Itineraries</div>
          </div>
        </div>

      </div>
    </div>
  );
}

