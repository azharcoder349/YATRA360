import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Clock, 
  IndianRupee, 
  MapPin, 
  Layers, 
  RotateCw, 
  Bookmark, 
  Check, 
  AlertCircle,
  HelpCircle,
  Key
} from 'lucide-react';
import { generateAiItinerary, isGeminiKeyConfigured } from '../../services/gemini';
import { saveItinerary, getSavedItineraries, deleteSavedItinerary } from '../../services/storage';
import { useToast } from '../common/Toast';
import ItineraryCard from './ItineraryCard';

export default function TripPlannerView({
  onSelectDestinationById,
  onOpenApiKeyModal
}) {
  const { addToast } = useToast();
  const isKeyPresent = isGeminiKeyConfigured();

  // Form State
  const [startCity, setStartCity] = useState('Jaipur, Rajasthan');
  const [destinationArea, setDestinationArea] = useState('Forgotten Stepwells & Desert Hamlets');
  const [timeAvailable, setTimeAvailable] = useState('full-day'); // 'half-day', 'full-day', 'weekend'
  const [budgetLevel, setBudgetLevel] = useState('moderate');     // 'budget', 'moderate', 'heritage'
  const [travelStyle, setTravelStyle] = useState('culture-seeker'); // 'culture-seeker', 'peaceful', 'friends', 'family'
  const [selectedInterests, setSelectedInterests] = useState(['temples', 'historical']);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [savedPlans, setSavedPlans] = useState(() => getSavedItineraries());
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' or 'saved'

  // Predefined interests
  const interestOptions = [
    { id: 'temples', label: 'Sacred Temples & Shrines' },
    { id: 'historical', label: 'Ancient Forts & Stepwells' },
    { id: 'nature', label: 'Untouched Valleys & Canyons' },
    { id: 'lakes', label: 'Crater Lakes & Wetlands' },
    { id: 'cultural', label: 'Artisans & Handicraft Hamlets' },
    { id: 'villages', label: 'Quiet Mountain / Stone Villages' },
  ];

  const toggleInterest = (id) => {
    setSelectedInterests(prev => 
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(item => item !== id) : prev
        : [...prev, id]
    );
  };

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const plan = await generateAiItinerary({
        startCity,
        destinationArea,
        timeAvailable,
        budgetLevel,
        interests: selectedInterests,
        travelStyle
      });
      setCurrentItinerary(plan);
      addToast(
        plan.engine === 'gemini_api'
          ? 'Personalized itinerary created with Gemini 1.5 Flash!'
          : 'Personalized itinerary crafted by ExploreLocal Rule Engine!',
        'success'
      );
    } catch (err) {
      console.error('Plan generation failed', err);
      addToast('Error generating plan. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCurrentPlan = (plan) => {
    const saved = saveItinerary(plan);
    setSavedPlans(getSavedItineraries());
    addToast('Itinerary saved to your device!', 'success');
  };

  const handleDeletePlan = (planId) => {
    const updated = deleteSavedItinerary(planId);
    setSavedPlans(updated);
    addToast('Saved itinerary removed.', 'info');
  };

  const isCurrentSaved = currentItinerary && savedPlans.some(p => p.id === currentItinerary.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-bold text-forest-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Smart Trip Planner</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950">
            Personalized Local Itinerary Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl">
            Create balanced, unhurried cultural journeys tailored to your budget, time, and appetite for the offbeat.
          </p>
        </div>

        {/* Engine Status Pill */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isKeyPresent
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Engine: {isKeyPresent ? 'Google Gemini 1.5 Flash' : 'Offline Rule Engine (Active)'}</span>
          </button>

          {savedPlans.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'planner' ? 'saved' : 'planner')}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-cream-200 text-xs font-semibold text-gray-700 hover:bg-forest-50 flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Saved Plans ({savedPlans.length})</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'saved' ? (
        /* Saved Itineraries View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Your Saved Itineraries
            </h2>
            <button
              type="button"
              onClick={() => setActiveTab('planner')}
              className="text-xs font-bold text-forest-800 hover:underline"
            >
              &larr; Back to Planner Generator
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {savedPlans.map((plan) => (
              <div key={plan.id} className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    type="button"
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
                <ItineraryCard
                  itinerary={plan}
                  onSelectDestinationById={onSelectDestinationById}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Planner Form & Generated Output */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Questionnaire */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-cream-200 shadow-warm space-y-6">
            <div className="border-b border-cream-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-forest-950">
                Plan Your Journey
              </h3>
              <p className="text-xs text-gray-500">
                Answer a few quick preferences to generate a tailored route.
              </p>
            </div>

            <form onSubmit={handleGeneratePlan} className="space-y-5">
              
              {/* Starting City */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
                  1. Starting City / Base Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-forest-700 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Jaipur, Bengaluru, Gwalior, Wayanad..."
                    value={startCity}
                    onChange={(e) => setStartCity(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Destination Area / Theme */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
                  2. Destination Area or Exploration Theme
                </label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-forest-700 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ancient stepwells, Chambal ravines, Crater lakes..."
                    value={destinationArea}
                    onChange={(e) => setDestinationArea(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Available Time */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
                  3. Available Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'half-day', label: 'Half Day', sub: '4–5 Hours' },
                    { id: 'full-day', label: 'Full Day', sub: '8–10 Hours' },
                    { id: 'weekend', label: 'Weekend', sub: '2 Days' },
                  ].map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setTimeAvailable(option.id)}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        timeAvailable === option.id
                          ? 'bg-forest-800 text-white border-forest-800 shadow-sm'
                          : 'bg-cream-50/60 border-cream-200 text-gray-700 hover:bg-forest-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{option.label}</div>
                      <div className="text-[10px] opacity-75">{option.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
                  4. Budget Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Budget', est: '₹500–1.5k' },
                    { id: 'moderate', label: 'Comfort', est: '₹1.5k–4k' },
                    { id: 'heritage', label: 'Immersion', est: '₹4k+' },
                  ].map(tier => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setBudgetLevel(tier.id)}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        budgetLevel === tier.id
                          ? 'bg-forest-800 text-white border-forest-800 shadow-sm'
                          : 'bg-cream-50/60 border-cream-200 text-gray-700 hover:bg-forest-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.label}</div>
                      <div className="text-[10px] opacity-75">{tier.est}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
                  5. Travel Style
                </label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                >
                  <option value="culture-seeker">Culture &amp; Architecture Explorer</option>
                  <option value="peaceful">Peaceful, Unhurried &amp; Reflective</option>
                  <option value="family">Family with Children or Elders</option>
                  <option value="friends">Adventurous Friends &amp; Photography</option>
                </select>
              </div>

              {/* Interests (Multi-select) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
                  6. Select Interests
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {interestOptions.map(item => {
                    const isSelected = selectedInterests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleInterest(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-forest-950 font-bold border border-amber-500 shadow-sm'
                            : 'bg-cream-100 text-gray-700 border border-cream-200 hover:bg-forest-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm hover:shadow-warm-lg transition-all active:scale-98 disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Synthesizing Cultural Route...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate My AI Travel Plan</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Generated Itinerary or Empty State */}
          <div className="lg:col-span-7">
            {currentItinerary ? (
              <ItineraryCard
                itinerary={currentItinerary}
                onSavePlan={handleSaveCurrentPlan}
                isSaved={isCurrentSaved}
                onSelectDestinationById={onSelectDestinationById}
              />
            ) : (
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-cream-200 shadow-warm text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center mx-auto border border-forest-100">
                  <Sparkles className="w-8 h-8 text-amber-500" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="font-serif text-2xl font-bold text-gray-900">
                    Your Personalized Itinerary Will Appear Here
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Choose your starting location, time, and budget on the left and click &quot;Generate My AI Travel Plan&quot;.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-forest-50/60 border border-forest-100/70 text-xs text-forest-900 max-w-sm mx-auto text-left space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-forest-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>What You&apos;ll Receive:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-600 text-[11px]">
                    <li>Suggested visiting order &amp; timings</li>
                    <li>Estimated transit distances</li>
                    <li>Authentic local culinary suggestions</li>
                    <li>Transparent budget calculation</li>
                    <li>Responsible cultural etiquette guidelines</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

