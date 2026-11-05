import React, { useState, useEffect } from 'react';
import { Key, Sparkles, Shield, Check, X, ExternalLink, Cpu } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../../services/storage';
import { isGeminiKeyConfigured } from '../../services/gemini';

export default function ApiKeyModal({ isOpen, onClose, onKeyUpdated }) {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeEngine, setActiveEngine] = useState('rule');

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredApiKey();
      setApiKeyInput(stored || '');
      setActiveEngine(isGeminiKeyConfigured() ? 'gemini' : 'rule');
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setStoredApiKey(apiKeyInput.trim());
    setSavedSuccess(true);
    setActiveEngine(isGeminiKeyConfigured() ? 'gemini' : 'rule');
    if (onKeyUpdated) onKeyUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setStoredApiKey('');
    setApiKeyInput('');
    setActiveEngine('rule');
    if (onKeyUpdated) onKeyUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] rounded-2xl shadow-float border border-forest-900/10 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-forest-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800/80 border border-forest-700 flex items-center justify-center text-forest-200">
              <Key className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">AI Engine Configuration</h3>
              <p className="text-xs text-forest-200">Optional Gemini Key or Built-in Offline Fallback</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Active status indicator */}
          <div className="p-4 rounded-xl border bg-white/70 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Travel AI Engine</span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeEngine === 'gemini' 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {activeEngine === 'gemini' ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gemini 1.5 Flash Active</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-3.5 h-3.5 text-amber-700" />
                    <span>Intelligent Rule Engine (Active)</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {activeEngine === 'gemini'
                ? 'Your Gemini API key is configured. Trip planning and guide questions are dynamically processed via Google Gemini 1.5 Flash.'
                : 'No API key needed! ExploreLocal runs with its built-in cultural tourism knowledge engine, providing verified recommendations and rich itineraries offline.'}
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-forest-900 uppercase tracking-wider mb-1.5">
                Custom Gemini API Key (Optional)
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent font-mono"
              />
              <p className="text-[11px] text-gray-500 mt-1.5 flex items-center justify-between">
                <span>Stored securely only in your browser’s localStorage.</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-forest-700 font-semibold hover:underline flex items-center gap-1"
                >
                  Get free key <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Saved Successfully!</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 text-amber-300" />
                    <span>Save Key</span>
                  </>
                )}
              </button>

              {apiKeyInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="py-2.5 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium transition-colors"
                >
                  Clear Key
                </button>
              )}
            </div>
          </form>

          <div className="pt-2 border-t border-gray-200/60 text-[11px] text-gray-500 flex items-center gap-2">
            <Shield className="w-4 h-4 text-forest-600 shrink-0" />
            <span>Never committed to source control or exposed to other users.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

