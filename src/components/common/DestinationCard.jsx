import React from 'react';
import { Heart, MapPin, Compass, Sparkles, ArrowRight, Navigation } from 'lucide-react';
import { StatusBadge, CategoryBadge } from './Badge';
import { formatDistance, getGoogleMapsDirectionsUrl } from '../../services/geolocation';

export default function DestinationCard({
  destination,
  isFav = false,
  onToggleFav,
  onSelect,
  distance = null,
}) {
  const currentDistance = distance !== null && distance !== undefined ? distance : destination.distanceKm;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFav) {
      onToggleFav(destination.id);
    }
  };

  const handleDirectionsClick = (e) => {
    e.stopPropagation();
    if (destination.coordinates?.lat && destination.coordinates?.lng) {
      const url = getGoogleMapsDirectionsUrl(destination.coordinates.lat, destination.coordinates.lng, destination.name);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(destination)}
      className="group relative flex flex-col bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Cover Image Container */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-forest-900/10">
        <img
          src={destination.coverImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Elegant cultural fallback image if Unsplash fails
            e.target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1.5 flex-wrap">
            <StatusBadge status={destination.status} notice={destination.verificationNotice} />
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all transform active:scale-90 shadow-md ${
              isFav
                ? 'bg-rose-500 text-white'
                : 'bg-black/35 hover:bg-black/55 text-white/90 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Info (Distance & Location) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/95 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">{destination.city}, {destination.state}</span>
          </div>

          {currentDistance !== null && currentDistance !== undefined && (
            <div className="pointer-events-auto flex items-center gap-1 bg-white/95 text-forest-900 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md">
              <Navigation className="w-3 h-3 text-forest-700 fill-forest-700" />
              <span>{formatDistance(currentDistance)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Category & Tagline */}
          <div className="flex items-center justify-between gap-2">
            <CategoryBadge category={destination.category} />
            {destination.bestTimeToVisit && (
              <span className="text-[11px] text-gray-500 font-medium truncate max-w-[150px]">
                {destination.bestTimeToVisit.split('(')[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-forest-700 transition-colors line-clamp-1">
            {destination.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {destination.shortDescription}
          </p>

          {/* "Why This Place is Special" Callout Box */}
          <div className="p-3 rounded-xl bg-forest-50/70 border border-forest-100/80 text-xs text-forest-900 leading-snug">
            <div className="flex items-center gap-1 font-semibold text-forest-800 mb-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
              <span>Why It&apos;s a Hidden Gem:</span>
            </div>
            <p className="line-clamp-2 text-gray-700 italic">
              &ldquo;{destination.whySpecial}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(destination);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors group/btn"
          >
            <span>Explore Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>

          {destination.coordinates?.lat && destination.coordinates?.lng && (
            <button
              type="button"
              onClick={handleDirectionsClick}
              className="p-2 rounded-xl border border-forest-200 text-forest-700 hover:bg-forest-50 transition-colors"
              title="Navigate with Google Maps"
            >
              <Navigation className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

