import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Heart, 
  PlusCircle, 
  Menu, 
  X, 
  Key, 
  Bot, 
  Layers
} from 'lucide-react';
import { isGeminiKeyConfigured } from '../../services/gemini';

export default function Navbar({
  currentTab,
  onNavigate,
  favoritesCount = 0,
  onOpenAddGem,
  onOpenApiKeyModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAiActive = isGeminiKeyConfigured();

  const navItems = [
    { id: 'home', label: 'Discover', icon: Compass },
    { id: 'gems', label: 'Hidden Gems', icon: Layers },
    { id: 'near-me', label: 'Near Me', icon: MapPin },
    { id: 'planner', label: 'AI Trip Planner', icon: Sparkles, badge: 'AI' },
    { id: 'guide', label: 'Local Explorer AI', icon: Bot },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: favoritesCount },
  ];

  const handleNavClick = (tabId) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-cream-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-11 h-11 rounded-2xl bg-forest-800 text-cream-50 flex items-center justify-center shadow-warm border border-forest-700/60 transition-transform group-hover:scale-105">
              <Compass className="w-6 h-6 text-amber-300 transition-transform group-hover:rotate-45" />
            </div>
            <div>
              <span className="font-serif text-2xl font-extrabold tracking-tight text-forest-900 flex items-center gap-1.5">
                Explore<span className="text-terracotta-600">Local</span>
              </span>
              <span className="block text-[10px] tracking-widest uppercase font-semibold text-forest-700/80">
                Stories Hidden Around You
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-forest-800 text-white shadow-sm'
                      : 'text-gray-700 hover:text-forest-900 hover:bg-forest-50/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-forest-600'}`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-md bg-amber-400/90 text-forest-950">
                      {item.badge}
                    </span>
                  )}

                  {item.count !== undefined && item.count > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-full bg-terracotta-500 text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Config Modal Button */}
            <button
              type="button"
              onClick={onOpenApiKeyModal}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isAiActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-cream-100 text-gray-700 border-cream-300 hover:bg-cream-200'
              }`}
              title="Configure AI API Key or view engine status"
            >
              <Key className="w-4 h-4 text-amber-600" />
              <span className="hidden xl:inline">{isAiActive ? 'Gemini AI' : 'Rule AI'}</span>
            </button>

            {/* Add Hidden Gem Button */}
            <button
              type="button"
              onClick={onOpenAddGem}
              className="py-2.5 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Hidden Gem</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenAddGem}
              className="sm:hidden p-2 rounded-xl bg-terracotta-600 text-white"
              title="Add Hidden Gem"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 hover:bg-forest-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-200 bg-[#FAF6F0] px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-warm-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-forest-800 text-white'
                    : 'text-gray-800 hover:bg-forest-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-forest-700'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-amber-400 text-forest-950">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-terracotta-500 text-white">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-3 border-t border-cream-300 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApiKeyModal();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-gray-700 bg-white border border-cream-200"
            >
              <Key className="w-5 h-5 text-amber-600" />
              <span>AI Engine: {isAiActive ? 'Gemini 1.5 Flash' : 'Rule-Based Engine'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddGem();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-semibold text-white bg-terracotta-600 hover:bg-terracotta-700 shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Contribute a Hidden Gem</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

