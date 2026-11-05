/**
 * LocalStorage management for ExploreLocal
 */

const STORAGE_KEYS = {
  FAVORITES: 'explorelocal_favorites_v1',
  COMMUNITY_GEMS: 'explorelocal_community_gems_v1',
  RECENTLY_VIEWED: 'explorelocal_recent_v1',
  SAVED_PLANS: 'explorelocal_saved_itineraries_v1',
  CUSTOM_API_KEY: 'explorelocal_gemini_key_v1',
  USER_LOCATION_PREF: 'explorelocal_location_pref_v1'
};

// Safe JSON parser
function safeGet(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error(`Failed to read ${key} from localStorage`, e);
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage`, e);
  }
}

/* ==================== FAVORITES ==================== */

export function getFavorites() {
  return safeGet(STORAGE_KEYS.FAVORITES, []);
}

export function isFavorite(id) {
  const favs = getFavorites();
  return favs.includes(id);
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  let updated;
  let added = false;
  if (favs.includes(id)) {
    updated = favs.filter(item => item !== id);
  } else {
    updated = [id, ...favs];
    added = true;
  }
  safeSet(STORAGE_KEYS.FAVORITES, updated);
  return { updated, added };
}

/* ==================== COMMUNITY SUBMISSIONS ==================== */

export function getCommunitySubmissions() {
  return safeGet(STORAGE_KEYS.COMMUNITY_GEMS, []);
}

export function addCommunitySubmission(submission) {
  const list = getCommunitySubmissions();
  const newGem = {
    ...submission,
    id: `community-${Date.now()}`,
    status: 'pending_verification',
    verificationNotice: 'Community Submitted — Pending Field Verification',
    submittedAt: new Date().toISOString(),
  };
  const updated = [newGem, ...list];
  safeSet(STORAGE_KEYS.COMMUNITY_GEMS, updated);
  return newGem;
}

/* ==================== RECENTLY VIEWED ==================== */

export function getRecentlyViewed() {
  return safeGet(STORAGE_KEYS.RECENTLY_VIEWED, []);
}

export function recordRecentlyViewed(id) {
  if (!id) return;
  const recent = getRecentlyViewed().filter(item => item !== id);
  const updated = [id, ...recent].slice(0, 10);
  safeSet(STORAGE_KEYS.RECENTLY_VIEWED, updated);
}

/* ==================== SAVED ITINERARIES ==================== */

export function getSavedItineraries() {
  return safeGet(STORAGE_KEYS.SAVED_PLANS, []);
}

export function saveItinerary(plan) {
  const plans = getSavedItineraries();
  const entry = {
    ...plan,
    savedAt: new Date().toISOString()
  };
  const updated = [entry, ...plans];
  safeSet(STORAGE_KEYS.SAVED_PLANS, updated);
  return entry;
}

export function deleteSavedItinerary(planId) {
  const plans = getSavedItineraries().filter(p => p.id !== planId);
  safeSet(STORAGE_KEYS.SAVED_PLANS, plans);
  return plans;
}

/* ==================== API KEY PREFERENCE ==================== */

export function getStoredApiKey() {
  try {
    return localStorage.getItem(STORAGE_KEYS.CUSTOM_API_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredApiKey(key) {
  try {
    if (!key) {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_API_KEY);
    } else {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_API_KEY, key.trim());
    }
  } catch (e) {
    console.error('Failed to store API key', e);
  }
}

/* ==================== USER LOCATION PREFERENCE ==================== */

export function getStoredLocation() {
  return safeGet(STORAGE_KEYS.USER_LOCATION_PREF, null);
}

export function setStoredLocation(loc) {
  safeSet(STORAGE_KEYS.USER_LOCATION_PREF, loc);
}

