/**
 * Geolocation & Distance Calculation Services
 */

// Major Indian city anchor presets for manual fallback
export const CITY_PRESETS = [
  { name: 'Pune, Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur, Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Bengaluru, Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad, Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Bhopal / Gwalior, MP', lat: 26.2183, lng: 78.1828 },
  { name: 'Dehradun / Almora, UK', lat: 30.3165, lng: 78.0322 },
  { name: 'Kochi / Wayanad, Kerala', lat: 11.6854, lng: 76.1320 },
  { name: 'Kolkata / Tripura, East', lat: 23.8315, lng: 91.2868 },
  { name: 'Bhubaneswar / Puri, Odisha', lat: 20.2961, lng: 85.8245 },
  { name: 'Shimla / Kullu, HP', lat: 31.9579, lng: 77.1095 },
  { name: 'New Delhi, NCR', lat: 28.6139, lng: 77.2090 },
];

/**
 * Calculate Great-Circle Distance (Haversine formula) in kilometers
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (
    lat1 === undefined || lon1 === undefined ||
    lat2 === undefined || lon2 === undefined ||
    lat1 === null || lon1 === null ||
    lat2 === null || lon2 === null
  ) {
    return null;
  }

  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

/**
 * Format distance in a human-friendly label
 */
export function formatDistance(distanceKm) {
  if (distanceKm === null || distanceKm === undefined) return null;
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m away`;
  }
  return `${distanceKm.toFixed(1)} km away`;
}

/**
 * Get user location from browser Geolocation API with robust timeout
 */
export function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 'NOT_SUPPORTED',
        message: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          source: 'gps'
        });
      },
      (error) => {
        let errorType = 'UNKNOWN';
        let userMessage = 'Unable to access your location.';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorType = 'PERMISSION_DENIED';
            userMessage = 'Location permission was denied. You can still choose your city manually below.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorType = 'POSITION_UNAVAILABLE';
            userMessage = 'Location information is currently unavailable.';
            break;
          case error.TIMEOUT:
            errorType = 'TIMEOUT';
            userMessage = 'Location request timed out.';
            break;
        }

        reject({
          code: errorType,
          message: userMessage,
          originalError: error
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}

/**
 * Generate Google Maps navigation direction URL
 */
export function getGoogleMapsDirectionsUrl(destinationLat, destinationLng, destinationName = '') {
  const query = destinationName ? encodeURIComponent(destinationName) : '';
  return `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&destination_place_id=${query}`;
}

