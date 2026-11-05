import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Heart, 
  Share2, 
  Navigation, 
  Calendar, 
  Clock, 
  IndianRupee, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Bot, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { StatusBadge, CategoryBadge } from '../common/Badge';
import { getGoogleMapsDirectionsUrl, formatDistance } from '../../services/geolocation';
import AudioNarration from '../common/AudioNarration';
import InteractiveMap from '../common/InteractiveMap';
import { useToast } from '../common/Toast';

export default function DestinationModal({
  destination,
  isOpen,
  onClose,
  isFav = false,
  onToggleFav,
  onAskAiAboutDestination,
  userLocation = null,
  onSelectNearbyDestination = null
}) {
  const { addToast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, destination]);

  if (!isOpen || !destination) return null;

  const images = destination.gallery && destination.gallery.length > 0 
    ? [destination.coverImage, ...destination.gallery.filter(img => img !== destination.coverImage)]
    : [destination.coverImage];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} — ExploreLocal`,
        text: `Discover ${destination.name}: ${destination.tagline}`,
        url: window.location.href,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Destination link copied to clipboard!', 'success');
    }
  };

  const directionsUrl = getGoogleMapsDirectionsUrl(
    destination.coordinates?.lat,
    destination.coordinates?.lng,
    destination.name
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Container Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF6F0] rounded-3xl shadow-float border border-forest-900/10 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 px-6 py-3.5 bg-forest-950 text-white flex items-center justify-between border-b border-forest-900">
          <div className="flex items-center gap-2">
            <CategoryBadge category={destination.category} />
            <StatusBadge status={destination.status} notice={destination.verificationNotice} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-forest-200 hover:text-white transition-colors"
              title="Share Destination"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onToggleFav(destination.id)}
              className={`p-2 rounded-xl transition-all ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-forest-900 hover:bg-forest-800 text-forest-200 hover:text-white'
              }`}
              title={isFav ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-forest-300 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Gallery Section */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-forest-950 shadow-warm">
              <img
                src={images[activeImageIndex] || destination.coverImage}
                alt={destination.name}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Title & Tagline in Hero */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-cream-50 drop-shadow-md">
                  {destination.name}
                </h2>
                <p className="text-xs sm:text-sm text-cream-200 font-light italic">
                  {destination.tagline}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-amber-300">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{destination.city}, {destination.district}, {destination.state}</span>
                  {destination.distanceKm !== undefined && destination.distanceKm !== null && (
                    <span className="bg-forest-800 text-white px-2 py-0.2 rounded-full text-[11px] font-bold">
                      {formatDistance(destination.distanceKm)}
                    </span>
                  )}
                </div>
              </div>

              {/* Gallery navigation controls */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] text-white/90 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm font-semibold">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((activeImageIndex + 1) % images.length)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-forest-700 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Row: Audio Story, Ask AI Guide, Navigate */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-cream-200 shadow-sm">
            <AudioNarration
              title={destination.name}
              text={`${destination.shortDescription} ${destination.story || ''}`}
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onAskAiAboutDestination) onAskAiAboutDestination(destination);
                }}
                className="px-3.5 py-2 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-800 border border-forest-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Bot className="w-4 h-4 text-forest-700" />
                <span>Ask AI Guide</span>
              </button>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-300" />
                <span>Navigate in Google Maps ↗</span>
              </a>
            </div>
          </div>

          {/* "Why This Place is a Hidden Gem" Spotlight Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-forest-900 to-forest-800 text-white space-y-2 shadow-warm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>Why It&apos;s a Hidden Gem</span>
            </div>
            <p className="font-serif italic text-base sm:text-lg text-cream-100 leading-relaxed">
              &ldquo;{destination.whySpecial}&rdquo;
            </p>
          </div>

          {/* Complete Description */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-forest-950">
              About This Destination
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {destination.shortDescription}
            </p>
          </div>

          {/* History & Authentic Lore Tabs / Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* History */}
            {destination.history && (
              <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-sm space-y-3">
                <h4 className="font-serif text-base font-bold text-forest-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-forest-700" />
                  <span>Historical &amp; Cultural Importance</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {destination.history}
                </p>
              </div>
            )}

            {/* Living Folklore & Legend */}
            {destination.story && (
              <div className="p-6 rounded-2xl bg-white border border-cream-200 shadow-sm space-y-3">
                <h4 className="font-serif text-base font-bold text-forest-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-terracotta-600" />
                  <span>Living Folklore &amp; Local Legend</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{destination.story}&rdquo;
                </p>
              </div>
            )}

          </div>

          {/* Practical Visiting Details Grid */}
          <div className="p-6 rounded-2xl bg-cream-100 border border-cream-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-forest-700" />
                Best Time to Visit
              </span>
              <p className="font-semibold text-gray-900">{destination.bestTimeToVisit || 'October to March'}</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-forest-700" />
                Visiting Timings
              </span>
              <p className="font-semibold text-gray-900">{destination.timings || 'Sunrise to Sunset'}</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-forest-700" />
                Entry &amp; Access
              </span>
              <p className="font-semibold text-gray-900">{destination.entryFee || 'Free'}</p>
            </div>
          </div>

          {/* Regional Culinary Flavors */}
          {destination.localFood && (
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2 text-xs text-amber-950">
              <span className="font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-amber-700" />
                Authentic Regional Flavors Nearby:
              </span>
              <p className="leading-relaxed">
                {destination.localFood}
              </p>
            </div>
          )}

          {/* Travel Tips & Field Etiquette */}
          {destination.travelTips && destination.travelTips.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest-950">
                Visitor Tips &amp; Cultural Etiquette
              </h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Map with Destination Marker */}
          {destination.coordinates?.lat && destination.coordinates?.lng && (
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest-950 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-forest-700" />
                <span>Geographic Location &amp; Terrain</span>
              </h4>
              <InteractiveMap
                destinations={[destination]}
                userLocation={userLocation}
                className="h-[280px] w-full"
                center={[destination.coordinates.lat, destination.coordinates.lng]}
                zoom={11}
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

