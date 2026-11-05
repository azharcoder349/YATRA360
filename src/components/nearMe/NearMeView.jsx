import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  AlertTriangle, 
  RotateCw, 
  ChevronRight, 
  ExternalLink,
  ShieldAlert,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import InteractiveMap from '../common/InteractiveMap';
import DestinationCard from '../common/DestinationCard';
import { CITY_PRESETS, getGoogleMapsDirectionsUrl } from '../../services/geolocation';

export default function NearMeView({
  userLocation,
  onRequestLocation,
  onSetManualLocation,
  isLoadingLocation,
  locationError,
  destinations = [],
  favorites = [],
  onToggleFav,
  onSelectDestination
}) {
  const [selectedRadiusKm, setSelectedRadiusKm] = useState('all'); // '50', '150', '300', 'all'
  const [manualCityInput, setManualCityInput] = useState('');

  // Filter & sort destinations strictly by distance
  const sortedNearby = [...destinations]
    .filter(d => d.distanceKm !== undefined && d.distanceKm !== null)
    .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

  const filteredByRadius = sortedNearby.filter(d => {
    if (selectedRadiusKm === 'all') return true;
    return (d.distanceKm || 0) <= parseInt(selectedRadiusKm, 10);
  });

  const handleManualPresetSelect = (preset) => {
    onSetManualLocation({
      lat: preset.lat,
      lng: preset.lng,
      source: 'preset',
      cityName: preset.name
    });
  };

  const handleManualInputSubmit = (e) => {
    e.preventDefault();
    if (!manualCityInput.trim()) return;

    // Check if matches preset
    const match = CITY_PRESETS.find(p => p.name.toLowerCase().includes(manualCityInput.toLowerCase().trim()));
    if (match) {
      handleManualPresetSelect(match);
    } else {
      // Default to Jaipur center if not found in predefined list
      onSetManualLocation({
        lat: 26.9124,
        lng: 75.7873,
        source: 'manual',
        cityName: manualCityInput.trim()
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-bold text-forest-800">
            <Navigation className="w-3.5 h-3.5 text-forest-600 fill-forest-600" />
            <span>Browser Geolocation API</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950">
            Explore Near Me
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl">
            Real-time proximity calculation using your device&apos;s GPS or custom city anchor point.
          </p>
        </div>

        {/* GPS Refresh Button */}
        <button
          type="button"
          onClick={onRequestLocation}
          disabled={isLoadingLocation}
          className="self-start md:self-auto px-5 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold flex items-center gap-2 shadow-warm transition-transform active:scale-95 disabled:opacity-60"
        >
          <RotateCw className={`w-4 h-4 text-amber-300 ${isLoadingLocation ? 'animate-spin' : ''}`} />
          <span>{isLoadingLocation ? 'Detecting Location...' : 'Detect My GPS Location'}</span>
        </button>
      </div>

      {/* Geolocation Status / Manual Fallback Bar */}
      <div className="p-5 rounded-3xl bg-white border border-cream-200 shadow-warm space-y-4">
        
        {/* State 1: Active Location Detected */}
        {userLocation ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Active Location Anchor: </span>
                <span>
                  {userLocation.cityName ? userLocation.cityName : `GPS (${userLocation.lat.toFixed(4)}° N, ${userLocation.lng.toFixed(4)}° E)`}
                </span>
                <span className="text-[11px] text-emerald-700 block">
                  {userLocation.source === 'gps' ? 'Accurately acquired via Browser Geolocation API' : 'Manually set city anchor point'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-800">
                Found {filteredByRadius.length} gems nearby
              </span>
            </div>
          </div>
        ) : null}

        {/* State 2: Permission Denied or Error */}
        {locationError && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Location Permission Notice:</span>
              <p className="text-amber-800 leading-relaxed">
                {locationError.message || 'Location permission was not granted. ExploreLocal never pretends to access your coordinates. You can select your city manually below.'}
              </p>
            </div>
          </div>
        )}

        {/* Manual City Selector & Radius Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          
          {/* Quick City Presets */}
          <div className="md:col-span-8 space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              Choose a City or Region Anchor:
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {CITY_PRESETS.map((preset) => {
                const isActive = userLocation?.cityName === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleManualPresetSelect(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-forest-800 text-white shadow-sm'
                        : 'bg-cream-100 text-gray-700 hover:bg-forest-50 hover:text-forest-900 border border-cream-200'
                    }`}
                  >
                    {preset.name.split(',')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance Radius Filter */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              Filter Distance:
            </label>
            <select
              value={selectedRadiusKm}
              onChange={(e) => setSelectedRadiusKm(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50/50 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              <option value="all">Any Distance (Sort by Nearest)</option>
              <option value="50">Within 50 km</option>
              <option value="150">Within 150 km</option>
              <option value="300">Within 300 km</option>
            </select>
          </div>

        </div>

      </div>

      {/* Interactive Leaflet Map Component */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-forest-950 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-forest-700" />
            <span>Interactive Proximity Map</span>
          </h2>
          <span className="text-xs text-gray-500">
            Click pins to inspect or open direct Google Maps directions
          </span>
        </div>

        <InteractiveMap
          destinations={filteredByRadius}
          userLocation={userLocation}
          onSelectDestination={onSelectDestination}
          className="h-[440px] sm:h-[480px] w-full"
        />
      </div>

      {/* Nearby Destination Cards Sorted by Proximity */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-forest-950">
            {userLocation ? 'Destinations Sorted by Distance' : 'All Destinations (Select Location Above)'}
          </h2>
          <span className="text-xs font-semibold text-gray-500">
            {filteredByRadius.length} destinations found
          </span>
        </div>

        {filteredByRadius.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredByRadius.map((dest) => (
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
          <div className="p-12 text-center bg-white rounded-3xl border border-cream-200 space-y-3">
            <Compass className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-gray-800">
              No destinations found within {selectedRadiusKm} km
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try setting the distance filter to &quot;Any Distance&quot; or choose another city anchor like Pune, Jaipur, or Almora.
            </p>
            <button
              type="button"
              onClick={() => setSelectedRadiusKm('all')}
              className="px-4 py-2 rounded-xl bg-forest-800 text-white text-xs font-semibold"
            >
              Show All Distances
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

