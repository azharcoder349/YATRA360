import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Upload, 
  MapPin, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Image as ImageIcon 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES, STATES } from '../../data/categories';
import { addCommunitySubmission } from '../../services/storage';
import { useToast } from '../common/Toast';

export default function AddGemModal({
  isOpen,
  onClose,
  onGemSubmitted
}) {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    district: '',
    state: 'Maharashtra',
    category: 'temples',
    whySpecial: '',
    shortDescription: '',
    history: '',
    localFood: '',
    bestTimeToVisit: '',
    lat: '',
    lng: '',
    coverImage: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, coverImage: 'Image must be under 4MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, coverImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Destination name is required';
    if (!formData.city.trim()) newErrors.city = 'City or town is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.whySpecial.trim()) newErrors.whySpecial = 'Explain why this is an extraordinary hidden place';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'A brief description is required';

    // Validate coordinates if provided
    if (formData.lat && isNaN(parseFloat(formData.lat))) {
      newErrors.lat = 'Latitude must be a valid number';
    }
    if (formData.lng && isNaN(parseFloat(formData.lng))) {
      newErrors.lng = 'Longitude must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const fallbackImage = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';
    const finalImage = formData.coverImage.trim() || imagePreview || fallbackImage;

    const coordinates = (formData.lat && formData.lng) ? {
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng)
    } : {
      lat: 19.0760, // default centroid
      lng: 72.8777
    };

    const newSubmission = {
      name: formData.name.trim(),
      city: formData.city.trim(),
      district: formData.district.trim(),
      state: formData.state,
      category: formData.category,
      tagline: `Community discovery: ${formData.whySpecial.slice(0, 60)}...`,
      whySpecial: formData.whySpecial.trim(),
      shortDescription: formData.shortDescription.trim(),
      history: formData.history.trim() || 'Oral history submitted by local community member.',
      story: formData.whySpecial.trim(),
      coverImage: finalImage,
      gallery: [finalImage],
      coordinates,
      bestTimeToVisit: formData.bestTimeToVisit.trim() || 'October to March',
      timings: 'Daylight hours',
      entryFee: 'Community managed / Free',
      localFood: formData.localFood.trim() || 'Local regional home-cooked specialties.',
      travelTips: [
        'Community submitted location: Please be respectful of local residential areas.',
        'Carry reusable water containers.'
      ],
      tags: ['Community Gem', formData.category, 'Local Discovery']
    };

    // Save to localStorage
    const savedGem = addCommunitySubmission(newSubmission);

    // Confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    addToast(`"${formData.name}" added under Pending Verification!`, 'success');
    if (onGemSubmitted) onGemSubmitted(savedGem);

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-3xl shadow-float border border-forest-900/10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-800 text-amber-300 flex items-center justify-center border border-forest-700">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">Contribute a Hidden Gem</h3>
              <p className="text-xs text-forest-200">
                Put your village, lesser-known temple, or nature spot on the map
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-forest-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Policy Banner */}
        <div className="px-6 py-3 bg-purple-50 border-b border-purple-200 text-xs text-purple-900 flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-purple-700 shrink-0" />
          <span>
            <strong>Archival Notice:</strong> Submissions are saved locally and marked as <strong>&quot;Pending Verification&quot;</strong> to preserve factual honesty.
          </span>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="block font-bold uppercase tracking-wider text-forest-900">
              Place / Destination Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Kondane Rock-Cut Buddhist Caves"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                errors.name ? 'border-red-400' : 'border-cream-300'
              }`}
            />
            {errors.name && <p className="text-red-600 text-[11px] font-medium">{errors.name}</p>}
          </div>

          {/* Location: City, District, State */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold uppercase tracking-wider text-forest-900">
                City / Village *
              </label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Karjat"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-forest-600"
              />
              {errors.city && <p className="text-red-600 text-[11px] font-medium">{errors.city}</p>}
            </div>

            <div className="space-y-1">
              <label className="block font-bold uppercase tracking-wider text-forest-900">
                District *
              </label>
              <input
                type="text"
                name="district"
                placeholder="e.g. Raigad"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-forest-600"
              />
              {errors.district && <p className="text-red-600 text-[11px] font-medium">{errors.district}</p>}
            </div>

            <div className="space-y-1">
              <label className="block font-bold uppercase tracking-wider text-forest-900">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-forest-600"
              >
                {STATES.filter(s => s !== 'All States').map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="block font-bold uppercase tracking-wider text-forest-900">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-forest-600"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Why Special */}
          <div className="space-y-1">
            <label className="block font-bold uppercase tracking-wider text-forest-900">
              Why is this place special? (The Hidden Wonder Factor) *
            </label>
            <textarea
              name="whySpecial"
              rows={2}
              placeholder="e.g. 1st-century BCE wooden carved octagonal pillars and waterfall descending over the cave entrance during monsoon."
              value={formData.whySpecial}
              onChange={handleInputChange}
              className={`w-full px-3.5 py-2 rounded-xl border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                errors.whySpecial ? 'border-red-400' : 'border-cream-300'
              }`}
            />
            {errors.whySpecial && <p className="text-red-600 text-[11px] font-medium">{errors.whySpecial}</p>}
          </div>

          {/* Complete Description */}
          <div className="space-y-1">
            <label className="block font-bold uppercase tracking-wider text-forest-900">
              Description &amp; Highlights *
            </label>
            <textarea
              name="shortDescription"
              rows={3}
              placeholder="Describe the environment, trail, peacefulness, and key things to notice..."
              value={formData.shortDescription}
              onChange={handleInputChange}
              className={`w-full px-3.5 py-2 rounded-xl border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-forest-600 ${
                errors.shortDescription ? 'border-red-400' : 'border-cream-300'
              }`}
            />
            {errors.shortDescription && <p className="text-red-600 text-[11px] font-medium">{errors.shortDescription}</p>}
          </div>

          {/* Coordinates (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-cream-100 border border-cream-200">
            <div className="space-y-1">
              <label className="block font-bold uppercase tracking-wider text-gray-700">
                Latitude (Optional)
              </label>
              <input
                type="text"
                name="lat"
                placeholder="e.g. 18.8123"
                value={formData.lat}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 rounded-xl border border-cream-300 bg-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold uppercase tracking-wider text-gray-700">
                Longitude (Optional)
              </label>
              <input
                type="text"
                name="lng"
                placeholder="e.g. 73.3456"
                value={formData.lng}
                onChange={handleInputChange}
                className="w-full px-3 py-1.5 rounded-xl border border-cream-300 bg-white text-xs"
              />
            </div>
          </div>

          {/* Image Upload or URL */}
          <div className="space-y-2">
            <label className="block font-bold uppercase tracking-wider text-forest-900">
              Destination Photograph (File Upload or Image URL)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* File upload input */}
              <div className="border-2 border-dashed border-cream-300 rounded-2xl p-4 text-center hover:bg-white transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-6 h-6 text-forest-600 mx-auto mb-1" />
                <span className="font-semibold text-gray-700 block">Click to upload photo</span>
                <span className="text-[10px] text-gray-400">PNG, JPG up to 4MB</span>
              </div>

              {/* Image URL input */}
              <div className="flex flex-col justify-center space-y-1">
                <input
                  type="url"
                  name="coverImage"
                  placeholder="Or paste an image URL here..."
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-white text-xs"
                />
                <span className="text-[10px] text-gray-400">Direct image link (Unsplash, imgur, etc.)</span>
              </div>
            </div>

            {/* Image Preview */}
            {(imagePreview || formData.coverImage) && (
              <div className="relative h-32 w-full rounded-xl overflow-hidden border border-cream-300 mt-2">
                <img
                  src={imagePreview || formData.coverImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Local Food & Visiting Season */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-bold uppercase tracking-wider text-forest-900">
                Local Delicacy Nearby (Optional)
              </label>
              <input
                type="text"
                name="localFood"
                placeholder="e.g. Village jowar bhakri with thecha"
                value={formData.localFood}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold uppercase tracking-wider text-forest-900">
                Best Season to Visit (Optional)
              </label>
              <input
                type="text"
                name="bestTimeToVisit"
                placeholder="e.g. July to October (Monsoon)"
                value={formData.bestTimeToVisit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 border-t border-cream-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-cream-300 text-gray-600 hover:bg-cream-100 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold uppercase tracking-wider shadow-sm flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit for Verification</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

