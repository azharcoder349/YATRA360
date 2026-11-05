import React from 'react';
import { 
  Clock, 
  MapPin, 
  Sparkles, 
  Utensils, 
  IndianRupee, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck, 
  Printer, 
  Share2, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../common/Toast';

export default function ItineraryCard({
  itinerary,
  onSavePlan,
  isSaved = false,
  onSelectDestinationById
}) {
  const { addToast } = useToast();

  if (!itinerary) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Itinerary link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in print:text-black">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-900 text-white shadow-warm-lg space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{itinerary.generatedBy}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-forest-200 hover:text-white transition-colors"
              title="Share Itinerary"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-forest-200 hover:text-white transition-colors"
              title="Print Itinerary"
            >
              <Printer className="w-4 h-4" />
            </button>
            {onSavePlan && (
              <button
                type="button"
                onClick={() => onSavePlan(itinerary)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSaved
                    ? 'bg-amber-400 text-forest-950 font-bold'
                    : 'bg-forest-800 hover:bg-forest-700 text-white border border-forest-700'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'Saved to Plans' : 'Save Itinerary'}</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-cream-50">
            {itinerary.title}
          </h2>
          <p className="text-xs sm:text-sm text-forest-200 mt-1">
            {itinerary.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-cream-100/90 leading-relaxed font-light border-t border-forest-800/80 pt-3">
          {itinerary.summary}
        </p>

        {itinerary.fallbackNotice && (
          <div className="text-[11px] text-amber-300 bg-forest-950/60 p-2.5 rounded-xl border border-forest-800">
            ℹ️ {itinerary.fallbackNotice}
          </div>
        )}
      </div>

      {/* Timeline Stops */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-forest-950 flex items-center gap-2">
          <Clock className="w-5 h-5 text-forest-700" />
          <span>Suggested Timeline &amp; Visiting Order</span>
        </h3>

        <div className="relative border-l-2 border-forest-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {itinerary.stops?.map((stop, idx) => (
            <div key={idx} className="relative space-y-3 group">
              
              {/* Timeline Pin */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-forest-800 text-amber-300 font-bold text-xs flex items-center justify-center border-4 border-[#FAF6F0] shadow-sm">
                {stop.order || idx + 1}
              </div>

              {/* Card Container */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-cream-200 shadow-warm space-y-4 hover:shadow-warm-lg transition-all">
                
                {/* Time & Phase */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream-100 pb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-forest-600" />
                    <span>{stop.time}</span>
                  </span>

                  <span className="text-xs font-semibold text-gray-500">
                    Duration: {stop.duration}
                  </span>
                </div>

                {/* Title & Location */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-600 block">
                    {stop.phase}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
                    {stop.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>{stop.location}</span>
                    {stop.distanceNote && <span>&bull; {stop.distanceNote}</span>}
                  </div>
                </div>

                {/* Activity Description */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {stop.whatToDo}
                </p>

                {/* Why Special Highlight */}
                {stop.whySpecial && (
                  <div className="p-3 rounded-xl bg-forest-50 border border-forest-100 text-xs text-forest-900 leading-snug">
                    <span className="font-bold flex items-center gap-1 text-[11px] text-forest-800 mb-0.5">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Hidden Highlight:
                    </span>
                    <span className="italic">&ldquo;{stop.whySpecial}&rdquo;</span>
                  </div>
                )}

                {/* Food & Cost details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  {stop.foodRecommendation && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900">
                      <Utensils className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Local Food Tip:</span>
                        <span>{stop.foodRecommendation}</span>
                      </div>
                    </div>
                  )}

                  {stop.estimatedCost && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-cream-100 border border-cream-200 text-gray-800">
                      <IndianRupee className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Estimated Expense:</span>
                        <span>{stop.estimatedCost}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Inspect destination link if linked */}
                {stop.destinationRef && onSelectDestinationById && (
                  <div className="pt-2 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectDestinationById(stop.destinationRef)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-forest-800 hover:text-terracotta-600 transition-colors"
                    >
                      <span>View destination story &amp; photos</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Breakdown & Practical Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Budget Card */}
        {itinerary.budgetBreakdown && (
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-warm space-y-4">
            <div className="flex items-center justify-between border-b border-cream-100 pb-3">
              <h4 className="font-serif text-lg font-bold text-forest-950 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-forest-700" />
                <span>Estimated Budget Breakdown</span>
              </h4>
              <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-md bg-forest-50 text-forest-800">
                {itinerary.budgetBreakdown.tier}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-dashed border-gray-100">
                <span className="text-gray-600">Local Transportation (Car/Cab/Fuel)</span>
                <span className="font-bold text-gray-900">₹{itinerary.budgetBreakdown.transportation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-100">
                <span className="text-gray-600">Authentic Food &amp; Refreshments</span>
                <span className="font-bold text-gray-900">₹{itinerary.budgetBreakdown.foodAndBeverages}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-100">
                <span className="text-gray-600">Site Entry &amp; Local Guide Tips</span>
                <span className="font-bold text-gray-900">₹{itinerary.budgetBreakdown.ticketsAndGuides}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-100">
                <span className="text-gray-600">Village Souvenirs &amp; Buffer</span>
                <span className="font-bold text-gray-900">₹{itinerary.budgetBreakdown.souvenirsAndBuffer}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-extrabold text-forest-900 border-t border-forest-200">
                <span>Total Estimated Cost</span>
                <span className="text-base text-forest-800">₹{itinerary.budgetBreakdown.totalEstimated}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 italic">
              {itinerary.budgetBreakdown.disclaimer}
            </p>
          </div>
        )}

        {/* Responsible Travel Tips */}
        {itinerary.responsibleTravelTips && (
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-warm space-y-4">
            <h4 className="font-serif text-lg font-bold text-forest-950 flex items-center gap-2 border-b border-cream-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Responsible Travel &amp; Local Etiquette</span>
            </h4>

            <ul className="space-y-2.5 text-xs text-gray-700">
              {itinerary.responsibleTravelTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

    </div>
  );
}

