import React from 'react';
import { Heart, Compass, History, ArrowRight, Trash2 } from 'lucide-react';
import DestinationCard from '../common/DestinationCard';

export default function FavoritesView({
  favorites = [],
  destinations = [],
  recentlyViewedIds = [],
  onToggleFav,
  onSelectDestination,
  onExploreGems
}) {
  // Matched favorite destinations
  const favoriteDestinations = destinations.filter(d => favorites.includes(d.id));

  // Matched recently viewed destinations
  const recentDestinations = destinations.filter(d => 
    recentlyViewedIds.includes(d.id) && !favorites.includes(d.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
          <Heart className="w-3.5 h-3.5 fill-current text-rose-600" />
          <span>Saved Places ({favorites.length})</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950">
          Your Curated Collection
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl">
          All your saved hidden sanctuaries, stepwells, and artisan hamlets stored securely on your device.
        </p>
      </div>

      {/* Favorites List */}
      {favoriteDestinations.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-cream-200 pb-3">
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Saved Gems ({favoriteDestinations.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {favoriteDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                isFav={true}
                onToggleFav={onToggleFav}
                onSelect={onSelectDestination}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 sm:p-16 text-center bg-white rounded-3xl border border-cream-200 shadow-warm space-y-5 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-gray-900">
              No Favorite Places Saved Yet
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              When exploring hidden gems, click the heart icon on any card to bookmark it here for your future journeys.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreGems}
            className="px-6 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs uppercase tracking-wider shadow-warm transition-transform active:scale-95 flex items-center gap-2 mx-auto"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>Discover Hidden Gems</span>
          </button>
        </div>
      )}

      {/* Recently Viewed Section */}
      {recentDestinations.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-cream-200">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-forest-700" />
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Recently Viewed Places
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                isFav={favorites.includes(dest.id)}
                onToggleFav={onToggleFav}
                onSelect={onSelectDestination}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

