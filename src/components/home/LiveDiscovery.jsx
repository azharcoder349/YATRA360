import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Flame, 
  Landmark, 
  Trees, 
  MapPin, 
  Coffee, 
  ArrowRight, 
  Compass,
  SlidersHorizontal 
} from 'lucide-react';
import DestinationCard from '../common/DestinationCard';

export default function LiveDiscovery({
  destinations = [],
  favorites = [],
  onToggleFav,
  onSelectDestination,
  onViewAllGems,
  userLocation = null
}) {
  const [activeTab, setActiveTab] = useState('near_or_gems');

  // Discovery tabs
  const tabs = [
    { id: 'near_or_gems', label: userLocation ? 'Gems Near You' : 'Curator Hidden Picks', icon: userLocation ? MapPin : Sparkles },
    { id: 'popular', label: 'Popular Destinations', icon: Flame },
    { id: 'heritage', label: 'Cultural Heritage', icon: Landmark },
    { id: 'spiritual', label: 'Spiritual Journeys', icon: Sparkles },
    { id: 'nature', label: 'Nature & Adventure', icon: Trees },
    { id: 'experiences', label: 'Local Experiences', icon: Coffee },
  ];

  // Filter destinations based on active tab
  const filteredList = useMemo(() => {
    switch (activeTab) {
      case 'near_or_gems':
        if (userLocation) {
          // Sort by distance
          return [...destinations]
            .filter(d => d.distanceKm !== undefined && d.distanceKm !== null)
            .sort((a, b) => (a.distanceKm || 99999) - (b.distanceKm || 99999))
            .slice(0, 6);
        }
        return destinations.filter(d => d.status === 'verified').slice(0, 6);

      case 'popular':
        // Top architectural and iconic offbeat marvels
        return destinations.filter(d => ['chand-baori-abhaneri', 'lonar-crater-lake', 'orchha-chhatris', 'gandikota-canyon', 'bhigwan-bird-sanctuary', 'lepakshi-veerabhadra'].includes(d.id));

      case 'heritage':
        return destinations.filter(d => d.category === 'historical' || d.category === 'cultural').slice(0, 6);

      case 'spiritual':
        return destinations.filter(d => d.category === 'temples' || d.tags.some(t => t.toLowerCase().includes('sacred') || t.toLowerCase().includes('temple'))).slice(0, 6);

      case 'nature':
        return destinations.filter(d => d.category === 'nature' || d.category === 'lakes').slice(0, 6);

      case 'experiences':
        return destinations.filter(d => d.category === 'villages' || d.category === 'cultural' || d.category === 'festivals').slice(0, 6);

      default:
        return destinations.slice(0, 6);
    }
  }, [activeTab, destinations, userLocation]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
            <Compass className="w-3.5 h-3.5 text-forest-600" />
            <span>Curated Exploration</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest-950">
            Live Destination Discovery
          </h2>
          <p className="text-sm text-gray-600 max-w-xl">
            Lesser-known marvels, subterranean stepwells, living temple rituals, and crater lakes awaiting your footprints.
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllGems}
          className="self-start md:self-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-terracotta-600 transition-colors group"
        >
          <span>View All 20+ Destinations</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? 'bg-forest-800 text-white shadow-warm'
                  : 'bg-white text-gray-700 border border-cream-200 hover:bg-forest-50 hover:text-forest-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-forest-600'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Destinations Cards Grid */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredList.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isFav={favorites.includes(dest.id)}
              onToggleFav={onToggleFav}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-cream-200 p-8 space-y-4">
          <SlidersHorizontal className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-gray-800">No destinations found in this category</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try switching discovery tabs or search using another keyword.
          </p>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-warm-lg">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
            Know a secret place in your hometown?
          </span>
          <h3 className="font-serif text-2xl font-bold text-cream-50">
            Put Your Local Heritage on the Map
          </h3>
          <p className="text-xs text-forest-200 max-w-xl">
            Help local communities get discovered. Submit ancient temples, rural stepwells, or scenic viewpoints to our verified registry.
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAllGems}
          className="px-6 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
        >
          Explore All Hidden Gems
        </button>
      </div>

    </section>
  );
}

