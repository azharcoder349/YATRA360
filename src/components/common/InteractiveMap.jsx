import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Navigation, ExternalLink, MapPin } from 'lucide-react';
import { getGoogleMapsDirectionsUrl, formatDistance } from '../../services/geolocation';

export default function InteractiveMap({
  destinations = [],
  userLocation = null,
  selectedDestination = null,
  onSelectDestination = null,
  className = 'h-[460px] w-full',
  center = null,
  zoom = 6
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default to central India center
      const defaultCenter = center || (userLocation ? [userLocation.lat, userLocation.lng] : [21.7679, 78.8718]);
      const initialZoom = zoom || (userLocation ? 10 : 5);

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: initialZoom,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // CartoDB Positron / OSM tiles for a clean, elegant aesthetic that fits our warm theme
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when destinations or userLocation changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const bounds = L.latLngBounds();

    // 1. Add User Location Marker (if available)
    if (userLocation && userLocation.lat && userLocation.lng) {
      const userLatLng = [userLocation.lat, userLocation.lng];
      bounds.extend(userLatLng);

      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
          <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background-color: rgba(45, 106, 79, 0.25); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="width: 16px; height: 16px; border-radius: 9999px; background-color: #1B4332; border: 3px solid #FAF6EF; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const userMarker = L.marker(userLatLng, { icon: userIcon, zIndexOffset: 1000 }).addTo(markersLayer);
      userMarker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; text-align: center; padding: 4px;">
          <div style="font-weight: 700; color: #1B4332;">Your Current Location</div>
          <div style="font-size: 11px; color: #64748B;">Showing hidden gems around you</div>
        </div>
      `);
    }

    // 2. Add Destination Markers
    destinations.forEach((dest) => {
      if (!dest.coordinates?.lat || !dest.coordinates?.lng) return;

      const latLng = [dest.coordinates.lat, dest.coordinates.lng];
      bounds.extend(latLng);

      const isSelected = selectedDestination && selectedDestination.id === dest.id;

      // Color scheme based on category
      const colorMap = {
        temples: '#D97706',   // amber
        historical: '#B45309',// terracotta
        nature: '#15803D',    // emerald
        lakes: '#0891B2',     // cyan
        cultural: '#7C3AED',  // purple
        festivals: '#EA580C', // orange
        villages: '#65A30D',  // olive
      };
      const pinColor = colorMap[dest.category] || '#1B4332';

      const customIcon = L.divIcon({
        className: 'custom-destination-marker',
        html: `
          <div style="
            background-color: ${isSelected ? '#1B4332' : pinColor};
            color: #ffffff;
            width: ${isSelected ? '38px' : '30px'};
            height: ${isSelected ? '38px' : '30px'};
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            border: 2px solid #FAF6EF;
            transition: all 0.2s ease;
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          ">
            <svg style="width: ${isSelected ? '18px' : '15px'}; height: ${isSelected ? '18px' : '15px'}; fill: none; stroke: currentColor; stroke-width: 2.2;" viewBox="0 0 24 24">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `,
        iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
        iconAnchor: [isSelected ? 19 : 15, isSelected ? 19 : 15]
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(markersLayer);

      const directionsUrl = getGoogleMapsDirectionsUrl(dest.coordinates.lat, dest.coordinates.lng, dest.name);

      const popupHtml = document.createElement('div');
      popupHtml.className = 'p-1 font-sans';
      popupHtml.innerHTML = `
        <div style="width: 220px; font-family: inherit;">
          <img src="${dest.coverImage}" alt="${dest.name}" style="width: 100%; height: 95px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" onerror="this.src='https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'" />
          <div style="font-weight: 700; color: #1B4332; font-size: 13px; line-height: 1.2; margin-bottom: 3px;">
            ${dest.name}
          </div>
          <div style="font-size: 11px; color: #64748B; margin-bottom: 4px;">
            📍 ${dest.city}, ${dest.state}
          </div>
          ${dest.distanceKm !== undefined && dest.distanceKm !== null ? `
            <div style="display: inline-block; background-color: #ECFDF5; color: #065F46; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 9999px; margin-bottom: 8px;">
              ${formatDistance(dest.distanceKm)}
            </div>
          ` : ''}
          <div style="display: flex; gap: 6px; margin-top: 6px;">
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background-color: #1B4332; color: #ffffff; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 3px;">
              Directions ↗
            </a>
            <button id="btn-inspect-${dest.id}" style="background-color: #E2F0EA; color: #1B4332; border: none; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer;">
              Details
            </button>
          </div>
        </div>
      `;

      // Attach click on inspect button inside popup
      marker.bindPopup(popupHtml);
      marker.on('popupopen', () => {
        const inspectBtn = document.getElementById(`btn-inspect-${dest.id}`);
        if (inspectBtn && onSelectDestination) {
          inspectBtn.onclick = () => onSelectDestination(dest);
        }
      });

      marker.on('click', () => {
        if (onSelectDestination) {
          onSelectDestination(dest);
        }
      });
    });

    // Fit map bounds if we have points
    if (bounds.isValid() && destinations.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [destinations, userLocation, selectedDestination]);

  // Recenter helper
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    if (userLocation?.lat && userLocation?.lng) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 11, { animate: true });
    } else if (destinations.length > 0 && destinations[0].coordinates) {
      mapInstanceRef.current.setView([destinations[0].coordinates.lat, destinations[0].coordinates.lng], 9, { animate: true });
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-forest-900/10 shadow-warm">
      <div ref={mapContainerRef} className={className} />
      
      {/* Quick Controls Floating Bar */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleRecenter}
          className="p-2.5 rounded-xl bg-white/95 text-forest-800 shadow-md border border-forest-900/10 hover:bg-forest-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          title="Recenter Map"
        >
          <Navigation className="w-4 h-4 text-forest-700" />
          <span className="hidden sm:inline">Recenter</span>
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 z-[400] hidden sm:flex items-center gap-2 p-2 px-3 rounded-xl bg-white/90 backdrop-blur-sm border border-forest-900/10 text-[11px] font-medium text-gray-700 shadow-sm">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block"></span> Nature/Gems</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block"></span> Sacred</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] inline-block"></span> You</span>
      </div>
    </div>
  );
}

