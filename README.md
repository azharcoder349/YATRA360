# ExploreLocal — AI-Powered Local Tourism Platform

> **"Every place has a story. Discover the stories hidden around you."**  
> *Explore Local. Experience More.*

---

## 🌟 Overview

**ExploreLocal** is a production-grade, AI-powered local tourism discovery platform dedicated to uncovering lesser-known cultural sanctuaries, subterranean stepwells, meteorite crater lakes, living artisan hamlets, and sacred forest shrines across India.

Mainstream travel platforms funnel over 80% of travelers to the same 2% of overcrowded commercial sites. ExploreLocal decentralizes tourism by putting forgotten heritage architectures, regional crafts, and rural communities directly onto the traveler's map with real geographic proximity, audio storytelling, and personalized AI itineraries.

---

## ✨ Core Features

### 1. 🔍 Hidden Gems Discovery (The Heart of ExploreLocal)
- **Verified Archival Integrity:** Strict policy against fabricated historical facts, fake coordinates, or generated reviews.
- **Rich Heritage Database:** 20+ deeply documented destinations across 10+ states (Lepakshi's hanging pillar, Chand Baori's 3,500 geometric steps, Lonar Meteorite Crater Lake, Bateshwar's 200 reassembled Chambal shrines, Raghurajpur's Pattachitra painters, Mawlynnong's living root bridges, etc.).
- **Category Filters:** Sacred Temples, Historical Forts & Stepwells, Untouched Nature, Lakes & Wetlands, Cultural Crafts, Local Fairs & Festivals, Hidden Villages.
- **State & Region Filtering:** Search by name, city, district, state, or theme tags.
- **Clear Verification Badging:** Explicit visual distinction between *Verified ASI/Geo-Heritage Sites*, *Sample Demo Records*, and *Community Submissions (Pending Verification)*.

### 2. 📍 Explore Near Me (Real Geolocation Proximity)
- **Browser Geolocation API Integration:** Requests device GPS with accurate latitude and longitude.
- **Haversine Distance Engine:** Computes real road/great-circle distances in kilometers to every destination in real time.
- **Interactive Leaflet Map:** Custom color-coded map pins for each category, interactive popups with thumbnail photos, distance badges, and one-tap **Google Maps navigation links**.
- **Transparent Privacy & Manual Fallbacks:** If location permission is denied, users can instantly select from popular Indian city presets (Pune, Jaipur, Bengaluru, Hyderabad, Gwalior, Almora, Wayanad, etc.) or input custom locations.

### 3. 🤖 AI Smart Trip Planner
- **Personalized Itinerary Synthesizer:** Tailored to starting city, available time (*Half Day, Full Day, Weekend*), budget tier (*Budget Backpacker, Comfort Explorer, Heritage Immersion*), interests, and travel style.
- **Dual AI Architecture:**
  - **Google Gemini 1.5 Flash:** High-speed live AI generation when an API key is provided.
  - **Intelligent Offline Rule Engine:** Deterministic, reliable rule-based fallback that generates rich itineraries with authentic local food pairings and accurate budget calculations when no API key is present.
  - **Zero Fake APIs:** Truthful attribution badges indicate which engine produced the itinerary.
- **Itemized Budget Breakdown:** Transparent transport, authentic meals, entry ticket, and local artisan buffer costs in INR (₹).
- **Export & Storage:** Save itineraries to device localStorage, print-friendly styling, and shareable links.

### 4. 🧭 Local Explorer AI Guide
- **Context-Aware Travel Companion:** Answers questions about historical origins, architectural genius, local etiquette, and authentic regional delicacies.
- **Destination Context Locking:** Automatically frames questions to the destination currently being viewed.
- **Folklore vs. History Separation:** Strictly distinguishes between archeological records and sacred oral legends.
- **Session Message History:** Smooth, conversational UI with quick-prompt chips.

### 5. 📖 Visual Destination Details & Audio Narration
- **Cinematic Photography:** High-resolution galleries with graceful fallback handling.
- **Built-in Audio Story Narrator:** Leverages the native **Web Speech API** (`window.speechSynthesis`) to recite destination stories aloud for accessibility and immersion.
- **Cultural & History Deep-Dives:** "Why It's a Hidden Gem", visiting timings, regional food specialties, and direct Google Maps directions.

### 6. 🤝 Community Contribution ("Add a Hidden Gem")
- **Empowering Local Storytellers:** Community submission form for residents to submit local stepwells, viewpoints, or shrines.
- **File Upload & Image URL Preview:** Accepts local image uploads via `FileReader` or direct URLs.
- **Archival Integrity:** Automatically flags new user submissions as **"Pending Verification"** and preserves them in `localStorage`.

### 7. ❤️ Saved Favorites & User History
- **Persistent Bookmarks:** Save and remove favorite destinations using browser `localStorage`.
- **Recently Viewed Tracking:** Remembers recently browsed destinations across sessions.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React.js 18 with Vite 6 |
| **Styling & Theme** | Tailwind CSS (Warm cream, forest green & earthy terracotta palette) |
| **Typography** | Playfair Display (Serif headings) & Plus Jakarta Sans (Body) |
| **Icons** | Lucide React |
| **Maps & Geospatial** | Leaflet with CartoDB Voyager tiles |
| **AI Integration** | Google Gemini 1.5 Flash REST API + Offline Deterministic Rule Engine |
| **Audio** | Web Speech API (`SpeechSynthesisUtterance`) |
| **Effects** | Canvas Confetti for community submissions |
| **Persistence** | Browser LocalStorage API |
| **Deployment** | Vercel SPA configuration (`vercel.json`) |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/explorelocal.git
cd explorelocal
```

### 2. Install dependencies
```bash
npm install
```

### 3. (Optional) Set up Gemini API Key
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note:** The Gemini API key is **100% optional**. If omitted, ExploreLocal automatically runs with its intelligent built-in rule-based travel engine. You can also paste an API key directly into the in-app AI settings modal at runtime!

### 4. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Build for production
```bash
npm run build
```

---

## ☁️ Deployment

### Deploying on Vercel

ExploreLocal includes pre-configured `vercel.json` rewrites for single-page routing:

#### Option A: Vercel CLI
```bash
npm i -g vercel
vercel
```

#### Option B: Vercel Dashboard (GitHub Import)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `explorelocal` repository.
4. Set Build Command to `npm run build` and Output Directory to `dist`.
5. (Optional) Under **Environment Variables**, add:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `your_gemini_api_key`
6. Click **Deploy**.

---

## 📁 Project Architecture

```
d:\YATRA360/
├── index.html                   # HTML entry point, Leaflet CSS & Google Fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Custom cream/forest/terracotta theme extensions
├── postcss.config.js            # PostCSS configuration
├── vercel.json                  # Vercel SPA rewrite rules
├── .env.example                 # Environment variable template
├── .gitignore                   # Git exclusion rules
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application orchestrator & navigation
│   ├── index.css                # Tailwind directives & custom map styles
│   ├── data/
│   │   ├── categories.js        # Category definitions, colors & state filters
│   │   └── destinations.js      # Curated heritage database & demo samples
│   ├── services/
│   │   ├── gemini.js            # Gemini 1.5 Flash client & fallback handler
│   │   ├── ruleBasedPlanner.js  # Intelligent rule-based itinerary generator
│   │   ├── ruleBasedGuide.js    # Conversational local knowledge base
│   │   ├── geolocation.js       # Haversine distance, GPS & city presets
│   │   └── storage.js           # LocalStorage helpers (favorites, community gems, keys)
│   └── components/
│       ├── common/
│       │   ├── Navbar.jsx           # Responsive header & mobile menu drawer
│       │   ├── Footer.jsx           # Social impact links & tagline
│       │   ├── DestinationCard.jsx  # Travel magazine destination card
│       │   ├── Badge.jsx            # Category & archival verification badges
│       │   ├── InteractiveMap.jsx   # Interactive Leaflet map with custom pins
│       │   ├── Toast.jsx            # Animated notification toasts
│       │   ├── ApiKeyModal.jsx      # In-app AI key configuration modal
│       │   └── AudioNarration.jsx   # Text-to-speech audio story player
│       ├── home/
│       │   ├── HeroSection.jsx      # Cinematic hero with search & GPS CTA
│       │   ├── LiveDiscovery.jsx    # Live discovery tabs & featured cards
│       │   ├── ImpactSection.jsx    # Social impact of local tourism
│       │   └── HowItWorks.jsx       # 3-step guide for mindful explorers
│       ├── gems/
│       │   └── HiddenGemsPage.jsx   # Full filterable gems catalog
│       ├── nearMe/
│       │   └── NearMeView.jsx       # Geolocation list + Leaflet map view
│       ├── planner/
│       │   ├── TripPlannerView.jsx  # AI itinerary questionnaire & saved plans
│       │   └── ItineraryCard.jsx    # Visual timeline, food tips & budget card
│       ├── guide/
│       │   └── LocalGuideChat.jsx   # Local Explorer AI chat interface
│       ├── details/
│       │   └── DestinationModal.jsx # Rich destination detail & gallery modal
│       ├── community/
│       │   └── AddGemModal.jsx      # Community gem contribution form
│       └── favorites/
│           └── FavoritesView.jsx    # Saved bookmarks & recently viewed
```

---

## 🛡️ Responsible Heritage Guidelines

- **Leave No Trace:** Carry reusable water containers when visiting rural eco-sites.
- **Respect Sanctums:** Dress modestly and respect photography restrictions in ancient temples.
- **Support Local Communities:** Buy crafts and produce directly from artisans and village stalls.

---

## 📜 License

Created with passion for cultural heritage preservation. Open source under the [MIT License](LICENSE).

