import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Sparkles, 
  SlidersHorizontal, 
  ShieldCheck, 
  Compass, 
  X,
  ArrowUpDown
} from 'lucide-react';
import DestinationCard from '../common/DestinationCard';
import { CATEGORIES, STATES } from '../../data/categories';

export default function HiddenGemsPage({
  destinations = [],
  favorites = [],
  onToggleFav,
  onSelectDestination,
  userLocation = null,
  initialSearch = ''
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('All States');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'verified', 'demo', 'pending_verification'
  const [sortBy, setSortBy] = useState(userLocation ? 'distance' : 'featured');

  // Filter & Sort Logic
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    // Search query (name, city, district, state, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(d => d.category === selectedCategory);
    }

    // State filter
    if (selectedState !== 'All States') {
      result = result.filter(d => d.state === selectedState);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(d => d.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'distance' && userLocation) {
        const distA = a.distanceKm !== undefined && a.distanceKm !== null ? a.distanceKm : 99999;
        const distB = b.distanceKm !== undefined && b.distanceKm !== null ? b.distanceKm : 99999;
        return distA - distB;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // 'featured': verified first, then by name
      if (a.status === 'verified' && b.status !== 'verified') return -1;
      if (b.status === 'verified' && a.status !== 'verified') return 1;
      return 0;
    });

    return result;
  }, [destinations, searchQuery, selectedCategory, selectedState, statusFilter, sortBy, userLocation]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedState('All States');
    setStatusFilter('all');
    setSortBy(userLocation ? 'distance' : 'featured');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedState !== 'All States' || statusFilter !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-bold text-forest-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>The Heart of ExploreLocal</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950">
          Hidden Gems &amp; Forgotten Heritage
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
          Discover sacred stone temples, meteorite crater lakes, subterranean stepwells, and living craft hamlets untouched by mainstream tourism.
        </p>
      </div>

      {/* Filter & Search Control Panel */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-cream-200 shadow-warm space-y-5">
        
        {/* Search Bar & Primary Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          
          {/* Text Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, city, district, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* State / Region Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              {STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Verification Status Selector */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified Heritage Only</option>
              <option value="demo">Demo Samples</option>
              <option value="pending_verification">Community Pending</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              <option value="featured">Curator Picks</option>
              {userLocation && <option value="distance">Proximity (Nearest)</option>}
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="space-y-2 pt-2 border-t border-cream-100">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Filter by Category:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-forest-800 text-white shadow-sm'
                      : 'bg-cream-100 text-gray-700 hover:bg-forest-50 hover:text-forest-900 border border-cream-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between gap-2 pt-2 text-xs text-gray-600 border-t border-cream-100">
            <div>
              Showing <span className="font-bold text-forest-900">{filteredDestinations.length}</span> destinations matching criteria
            </div>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-terracotta-600 hover:underline font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Results Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => (
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
        <div className="p-12 text-center bg-white rounded-3xl border border-cream-200 shadow-sm space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-gray-800">
            No hidden gems matched your search
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            We couldn&apos;t find any destination matching &quot;{searchQuery || selectedCategory}&quot;. Try resetting your filters or exploring another region.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-semibold hover:bg-forest-900 shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Archival Integrity Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Verified Archival Integrity Policy:</span>
          <p className="text-amber-800/90 leading-relaxed">
            ExploreLocal never fabricates historical facts, coordinates, opening hours, or reviews. Real heritage listings are verified through ASI (Archeological Survey of India) and field surveys. Any sample records or community submissions are explicitly marked until verified.
          </p>
        </div>
      </div>

    </div>
  );
}

