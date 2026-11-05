import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Bot, 
  MapPin, 
  Sparkles, 
  Layers, 
  Compass, 
  PlusCircle, 
  Key, 
  Heart,
  MessageCircle,
  X
} from 'lucide-react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HeroSection from './components/home/HeroSection';
import LiveDiscovery from './components/home/LiveDiscovery';
import ImpactSection from './components/home/ImpactSection';
import HowItWorks from './components/home/HowItWorks';
import HiddenGemsPage from './components/gems/HiddenGemsPage';
import NearMeView from './components/nearMe/NearMeView';
import TripPlannerView from './components/planner/TripPlannerView';
import LocalGuideChat from './components/guide/LocalGuideChat';
import DestinationModal from './components/details/DestinationModal';
import AddGemModal from './components/community/AddGemModal';
import ApiKeyModal from './components/common/ApiKeyModal';
import FavoritesView from './components/favorites/FavoritesView';
import { ToastProvider, useToast } from './components/common/Toast';

import { INITIAL_DESTINATIONS } from './data/destinations';
import { 
  getFavorites, 
  toggleFavorite, 
  getCommunitySubmissions,
  getRecentlyViewed,
  recordRecentlyViewed,
  getStoredLocation,
  setStoredLocation
} from './services/storage';
import { 
  getBrowserLocation, 
  calculateDistanceKm, 
  CITY_PRESETS 
} from './services/geolocation';

function MainApp() {
  const { addToast } = useToast();

  // Navigation State: 'home', 'gems', 'near-me', 'planner', 'guide', 'favorites'
  const [currentTab, setCurrentTab] = useState('home');
  const [initialSearchQuery, setInitialSearchQuery] = useState('');

  // Destination Data (Curated + Community Submissions)
  const [communityGems, setCommunityGems] = useState(() => getCommunitySubmissions());
  
  // User Location State
  const [userLocation, setUserLocation] = useState(() => getStoredLocation());
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // User Preferences & Activity
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [recentlyViewed, setRecentlyViewed] = useState(() => getRecentlyViewed());

  // Modals & Panels
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isAddGemOpen, setIsAddGemOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isGuideDrawerOpen, setIsGuideDrawerOpen] = useState(false);
  const [guideContextDestination, setGuideContextDestination] = useState(null);

  // Combine curated + community destinations and compute distance
  const allDestinations = useMemo(() => {
    const rawList = [...INITIAL_DESTINATIONS, ...communityGems];

    return rawList.map(item => {
      let distanceKm = null;
      if (userLocation?.lat && userLocation?.lng && item.coordinates?.lat && item.coordinates?.lng) {
        distanceKm = calculateDistanceKm(
          userLocation.lat,
          userLocation.lng,
          item.coordinates.lat,
          item.coordinates.lng
        );
      }
      return {
        ...item,
        distanceKm
      };
    });
  }, [communityGems, userLocation]);

  // Request Browser Geolocation
  const handleRequestLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      const loc = await getBrowserLocation();
      setUserLocation(loc);
      setStoredLocation(loc);
      addToast('Location acquired! Distances updated.', 'success');
    } catch (err) {
      console.warn('Geolocation error:', err);
      setLocationError(err);
      addToast(err.message || 'Location access was denied.', 'info');
    } finally {
      setIsLoadingLocation(false);
    }
  }, [addToast]);

  // Set Manual City Location
  const handleSetManualLocation = useCallback((loc) => {
    setUserLocation(loc);
    setStoredLocation(loc);
    setLocationError(null);
    addToast(`Anchor set to ${loc.cityName || 'custom coordinates'}`, 'success');
  }, [addToast]);

  // Toggle Favorite
  const handleToggleFavorite = useCallback((id) => {
    const { updated, added } = toggleFavorite(id);
    setFavorites(updated);
    addToast(added ? 'Saved to your favorites!' : 'Removed from favorites.', added ? 'success' : 'info');
  }, [addToast]);

  // Inspect Destination Details
  const handleSelectDestination = useCallback((dest) => {
    setSelectedDestination(dest);
    recordRecentlyViewed(dest.id);
    setRecentlyViewed(getRecentlyViewed());
  }, []);

  // Inspect by ID (from Itinerary stop)
  const handleSelectDestinationById = useCallback((id) => {
    const found = allDestinations.find(d => d.id === id);
    if (found) {
      handleSelectDestination(found);
    }
  }, [allDestinations, handleSelectDestination]);

  // Handle Home Search Submission
  const handleHomeSearch = useCallback((query) => {
    setInitialSearchQuery(query);
    setCurrentTab('gems');
  }, []);

  // Handle "Explore Near Me" Click from Hero or Nav
  const handleExploreNearMe = useCallback(async () => {
    setCurrentTab('near-me');
    if (!userLocation) {
      await handleRequestLocation();
    }
  }, [userLocation, handleRequestLocation]);

  // Ask AI Guide with Destination Focus
  const handleAskAiAboutDestination = useCallback((dest) => {
    setGuideContextDestination(dest);
    setIsGuideDrawerOpen(true);
  }, []);

  // Community Gem Submitted
  const handleGemSubmitted = useCallback((newGem) => {
    setCommunityGems(getCommunitySubmissions());
    setSelectedDestination(newGem);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-gray-900 selection:bg-forest-700 selection:text-white">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        favoritesCount={favorites.length}
        onOpenAddGem={() => setIsAddGemOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Main Page Views */}
      <main className="flex-1">
        
        {/* VIEW 1: HOMEPAGE */}
        {currentTab === 'home' && (
          <div className="space-y-6">
            <HeroSection
              onSearch={handleHomeSearch}
              onExploreNearMe={handleExploreNearMe}
              onExploreGems={() => {
                setInitialSearchQuery('');
                setCurrentTab('gems');
              }}
              isLoadingLocation={isLoadingLocation}
            />

            <LiveDiscovery
              destinations={allDestinations}
              favorites={favorites}
              onToggleFav={handleToggleFavorite}
              onSelectDestination={handleSelectDestination}
              onViewAllGems={() => {
                setInitialSearchQuery('');
                setCurrentTab('gems');
              }}
              userLocation={userLocation}
            />

            <HowItWorks
              onExploreNearMe={handleExploreNearMe}
              onOpenPlanner={() => setCurrentTab('planner')}
            />

            <ImpactSection />
          </div>
        )}

        {/* VIEW 2: HIDDEN GEMS DIRECTORY */}
        {currentTab === 'gems' && (
          <HiddenGemsPage
            destinations={allDestinations}
            favorites={favorites}
            onToggleFav={handleToggleFavorite}
            onSelectDestination={handleSelectDestination}
            userLocation={userLocation}
            initialSearch={initialSearchQuery}
          />
        )}

        {/* VIEW 3: EXPLORE NEAR ME */}
        {currentTab === 'near-me' && (
          <NearMeView
            userLocation={userLocation}
            onRequestLocation={handleRequestLocation}
            onSetManualLocation={handleSetManualLocation}
            isLoadingLocation={isLoadingLocation}
            locationError={locationError}
            destinations={allDestinations}
            favorites={favorites}
            onToggleFav={handleToggleFavorite}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {/* VIEW 4: AI SMART TRIP PLANNER */}
        {currentTab === 'planner' && (
          <TripPlannerView
            onSelectDestinationById={handleSelectDestinationById}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          />
        )}

        {/* VIEW 5: LOCAL EXPLORER AI GUIDE */}
        {currentTab === 'guide' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <LocalGuideChat
              currentDestination={guideContextDestination}
              onClearDestinationContext={() => setGuideContextDestination(null)}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 6: FAVORITES */}
        {currentTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            destinations={allDestinations}
            recentlyViewedIds={recentlyViewed}
            onToggleFav={handleToggleFavorite}
            onSelectDestination={handleSelectDestination}
            onExploreGems={() => {
              setInitialSearchQuery('');
              setCurrentTab('gems');
            }}
          />
        )}

      </main>

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={Boolean(selectedDestination)}
        onClose={() => setSelectedDestination(null)}
        isFav={selectedDestination ? favorites.includes(selectedDestination.id) : false}
        onToggleFav={handleToggleFavorite}
        onAskAiAboutDestination={handleAskAiAboutDestination}
        userLocation={userLocation}
      />

      {/* Community Add Gem Modal */}
      <AddGemModal
        isOpen={isAddGemOpen}
        onClose={() => setIsAddGemOpen(false)}
        onGemSubmitted={handleGemSubmitted}
      />

      {/* AI Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyUpdated={() => {}}
      />

      {/* Floating AI Guide Button (Bottom Right) */}
      {currentTab !== 'guide' && (
        <button
          type="button"
          onClick={() => setIsGuideDrawerOpen(true)}
          className="fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-float border border-forest-700/80 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 group"
          aria-label="Open AI Cultural Guide"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-forest-900" />
          </div>
          <span className="hidden sm:inline">Ask Local Explorer AI</span>
        </button>
      )}

      {/* Floating Guide Drawer / Slide-Over */}
      {isGuideDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:w-[480px] h-[85vh] sm:h-[680px] shadow-float">
            <LocalGuideChat
              currentDestination={guideContextDestination}
              onClearDestinationContext={() => setGuideContextDestination(null)}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
              isDrawer={true}
              onCloseDrawer={() => setIsGuideDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer
        onNavigate={setCurrentTab}
        onOpenAddGem={() => setIsAddGemOpen(true)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}

