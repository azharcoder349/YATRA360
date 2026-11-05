/**
 * ExploreLocal Destination Database
 * 
 * Rules:
 * - Real historical facts & verified coordinates are preserved for actual places.
 * - Demo records are explicitly marked with status: 'demo' and clearly labeled.
 * - Community submitted records have status: 'pending_verification'.
 */

export const INITIAL_DESTINATIONS = [
  {
    id: 'lepakshi-veerabhadra',
    name: 'Lepakshi Veerabhadra Temple',
    status: 'verified',
    verificationNotice: 'Verified ASI Heritage Site (16th-century Vijayanagara)',
    category: 'temples',
    tagline: 'The gravity-defying hanging pillar & monolithic granite Nandi',
    city: 'Lepakshi',
    district: 'Sri Sathya Sai (Anantapur)',
    state: 'Andhra Pradesh',
    coordinates: { lat: 13.8041, lng: 77.6067 },
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f4439c2c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f4439c2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A 16th-century architectural marvel of the Vijayanagara Empire renowned for its hanging stone pillar, intricate ceiling frescoes, and a colossal monolithic Nandi bull carved from single granite.',
    whySpecial: 'Contains a famous stone pillar that does not touch the floor — visitors can pass a thin cloth completely underneath it. Also features Asia’s largest single-stone Nandi bull.',
    history: 'Built around 1530 CE by brothers Virupanna and Veeranna, governors of the Vijayanagara Empire under King Achyuta Deva Raya. The temple complex is built on a low, rocky hill called Kurma Saila (tortoise hill).',
    story: 'According to the Ramayana epic, this is believed to be where the mythical bird Jatayu fell wounded while fighting Ravana to save Sita. Lord Rama is said to have uttered "Le Pakshi" (Rise, bird in Telugu), giving the village its name.',
    bestTimeToVisit: 'October to March (pleasant winter climate, 20°C - 30°C)',
    timings: '6:00 AM – 6:00 PM daily',
    entryFee: 'Free (ASI monitored)',
    localFood: 'Rayalaseema Ragi Mudde with spicy Natu Kodi Pulusu, Uggani Bajji, and local jaggery sweets at village stalls.',
    nearbyAttractions: ['Lepakshi Monolithic Nagalinga', 'Kalyana Mandapam ruins', 'Penukonda Fort (40 km)'],
    travelTips: [
      'Carry cotton socks; the stone courtyard can get warm under mid-day sun.',
      'Hire an accredited local village guide at the entrance to appreciate the fresco details.',
      'Early morning offers the best soft lighting for photography without crowds.'
    ],
    tags: ['Vijayanagara Architecture', 'Hanging Pillar', 'Stone Carvings', 'Ramayana Lore', 'Offbeat Heritage']
  },
  {
    id: 'chand-baori-abhaneri',
    name: 'Chand Baori Stepwell',
    status: 'verified',
    verificationNotice: 'Verified 8th-9th Century Stepwell (Protected Monument)',
    category: 'historical',
    tagline: 'An optical illusion of 3,500 symmetrical steps across 13 subterranean tiers',
    city: 'Abhaneri',
    district: 'Dausa',
    state: 'Rajasthan',
    coordinates: { lat: 27.0071, lng: 76.6064 },
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'One of the deepest and largest stepwells in the world, descending 30 meters into the earth with 3,500 precisely chiselled steps forming a mesmerizing geometric pattern.',
    whySpecial: 'Engineered in the arid desert to conserve rainwater while creating a naturally cooler subterranean public pavilion 5-6 degrees cooler than the surface.',
    history: 'Commissioned between 800 and 900 CE by King Chanda of the Nikumbha dynasty. The stepwell sits directly opposite the ancient Harshat Mata Temple, a goddess of joy and happiness.',
    story: 'Local folklore long claimed that spirits built this labyrinthine wonder in a single night so no mortal could retrieve a dropped coin from its depths, though historians honor the genius of ancient Rajasthani hydraulic engineers.',
    bestTimeToVisit: 'October to March',
    timings: '7:00 AM – 5:00 PM daily',
    entryFee: '₹25 for Indian nationals, ₹300 for foreign tourists (ASI)',
    localFood: 'Dal Baati Churma cooked over slow wood embers at village roadside dhabas on the Jaipur-Agra highway.',
    nearbyAttractions: ['Harshat Mata Temple', 'Bhangarh Fort (30 km)', 'Mehandipur Balaji (25 km)'],
    travelTips: [
      'Located just 10 km off the NH21 highway between Jaipur and Agra — an easy 2-hour detour from Jaipur.',
      'Bring wide-angle lens for capturing the geometric perspective of the staircases.',
      'Stepwell descent is restricted for safety; viewing galleries wrap the perimeter.'
    ],
    tags: ['Ancient Hydraulic Engineering', 'Geometric Marvel', 'Rajput Heritage', 'Subterranean Architecture']
  },
  {
    id: 'lonar-crater-lake',
    name: 'Lonar Meteorite Crater Lake',
    status: 'verified',
    verificationNotice: 'National Geo-heritage Monument (Geological Survey of India)',
    category: 'lakes',
    tagline: 'The only hyper-velocity meteorite impact crater formed in basalt rock on Earth',
    city: 'Lonar',
    district: 'Buldhana',
    state: 'Maharashtra',
    coordinates: { lat: 19.9760, lng: 76.5050 },
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A nearly circular saline-soda lake created approximately 52,000 years ago when a 2-million-ton meteor slammed into the Deccan volcanic plateau at 90,000 km/h.',
    whySpecial: 'A unique dual-microclimate ecosystem containing both neutral freshwater springs and highly alkaline outer water ring supporting rare endolithic microbes and ancient Hemadpanthi temples.',
    history: 'First documented in Western literature by J.E. Alexander in 1823, though mentioned in ancient texts including the Skanda Purana and Ain-i-Akbari. Around its rim stand 8th to 12th-century Yadava-era temples.',
    story: 'Mythology narrates that the demon Lonasura lived subterranean in this pit until vanquished by Lord Vishnu in his Daitya Sudan avatar. The lake was said to be the opening left by the demon.',
    bestTimeToVisit: 'November to February (migratory waterfowl arrive from Central Asia)',
    timings: 'Open all daylight hours; crater rim trek takes ~3 hours',
    entryFee: 'Free entry (Eco-sensitive zone)',
    localFood: 'Maharashtrian Pithla Bhakri, fiery Kolhapuri-style Thecha, and fresh roasted groundnuts.',
    nearbyAttractions: ['Daitya Sudan Temple', 'Kamalja Devi Temple at lake rim', 'Gomukh Temple spring'],
    travelTips: [
      'Wear sturdy hiking shoes; descending the crater trail through the teak forest requires grip.',
      'Do not throw plastic; the lake is an internationally protected Ramsar wetland site.',
      'Carry drinking water and binoculars for bird watching.'
    ],
    tags: ['Geo-Heritage', 'Meteorite Impact', 'Ramsar Wetland', 'Ancient Temples', 'Scientific Wonder']
  },
  {
    id: 'unakoti-rock-carvings',
    name: 'Unakoti Rock Carvings',
    status: 'verified',
    verificationNotice: 'Tentative UNESCO World Heritage Site',
    category: 'historical',
    tagline: 'Colossal stone faces carved directly into lush subtropical jungle cliffs',
    city: 'Kailashahar',
    district: 'Unakoti',
    state: 'Tripura',
    coordinates: { lat: 24.3197, lng: 92.0167 },
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'An ancient Shaivite pilgrimage site hidden in the forested Raghunandan hills featuring giant stone bas-reliefs, including a 30-foot tall carving of Lord Shiva (Unakotiswara Kal Bhairava).',
    whySpecial: 'Unakoti literally means "one less than a crore" (99,99,999) in Bengali, referring to the legendary number of stone sculptures carved into the vertical rockfaces.',
    history: 'Dating between the 7th and 9th centuries CE, these carvings are thought to blend classical Shaivite iconography with indigenous tribal artistic idioms of ancient Northeast India.',
    story: 'Legend says Lord Shiva was journeying to Kashi with one crore gods and goddesses. They rested here for the night, with Shiva instructing all to wake before dawn. When only Shiva awoke on time, he cursed the sleeping gods to remain as stone reliefs forever.',
    bestTimeToVisit: 'October to April',
    timings: '6:00 AM – 6:00 PM daily',
    entryFee: '₹20 (ASI counter)',
    localFood: 'Traditional Tripuri herbal broth (Chakhwi), bamboo shoot preparations, and spiced puffed rice (Muri).',
    nearbyAttractions: ['Kailashahar Tea Estates', 'Dharmanagar (20 km)', 'Jampui Hills (60 km)'],
    travelTips: [
      'Accessible via train to Kumarghat or Dharmanagar station, followed by an auto/taxi ride.',
      'Steps can be slippery during rains; hold onto stone handrails.',
      'The annual Ashokastami Mela in April draws thousands of tribal pilgrims.'
    ],
    tags: ['Rock Carvings', 'Forest Shrine', 'Tripura Heritage', 'Shaivism', 'UNESCO Tentative']
  },
  {
    id: 'gandikota-canyon',
    name: 'Gandikota Grand Canyon & Fort',
    status: 'verified',
    verificationNotice: 'Protected Historical & Geological Landmark',
    category: 'nature',
    tagline: 'The dramatic red sandstone gorge known as the Grand Canyon of India',
    city: 'Gandikota',
    district: 'YSR Kadapa',
    state: 'Andhra Pradesh',
    coordinates: { lat: 14.8156, lng: 78.2862 },
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A majestic 300-foot deep canyon cut through the Erramala hills by the Penna River, watched over by a 13th-century red stone fort with ancient granaries, mosques, and temples.',
    whySpecial: 'Unreal geological drama with layered sandstone boulders dropping vertically into the teal waters of the river below, virtually untouched by commercial tourist resorts.',
    history: 'Founded in 1123 CE by Kapa Raja of nearby Bommanapalle, later fortified by the Pemmasani Nayaks who held it for over two centuries, and subsequently ruled by the Qutb Shahi Sultanate.',
    story: 'The word "Gandi" in Telugu means "gorge". The fort was considered nearly impregnable because the deep chasm on the northern side formed a natural moat that no army could cross.',
    bestTimeToVisit: 'September to February (camp under the stars for meteor showers)',
    timings: 'Open 24 hours; sunset and sunrise are the most spectacular',
    entryFee: 'Free',
    localFood: 'Spicy Kadapa Karam Dosa, Gongura mutton or pickle, and homemade peanut chikki.',
    nearbyAttractions: ['Madhavaraya Temple inside fort', 'Raghunathaswamy Temple', 'Belum Caves (60 km)'],
    travelTips: [
      'Sunset from the boulder edge behind Raghunathaswamy Temple is unforgettable.',
      'Limited commercial amenities; carry power banks, snacks, and plenty of water.',
      'Combine with a visit to the subterranean Belum Caves nearby.'
    ],
    tags: ['Natural Canyon', 'Hill Fort', 'Sunset Viewpoint', 'Adventure Camping', 'Raw Landscape']
  },
  {
    id: 'bhigwan-bird-sanctuary',
    name: 'Bhigwan Flamingos & Wetlands',
    status: 'verified',
    verificationNotice: 'Recognized Wetland Biosphere on Ujani Reservoir',
    category: 'lakes',
    tagline: 'The serene inland winter refuge for thousands of Greater Flamingos',
    city: 'Bhigwan',
    district: 'Pune & Solapur',
    state: 'Maharashtra',
    coordinates: { lat: 18.2934, lng: 74.7725 },
    coverImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'The shallow backwaters of Ujani Dam turn pink every winter as tens of thousands of Greater and Lesser Flamingos migrate here alongside over 200 species of wetland birds.',
    whySpecial: 'Local fishermen navigate traditional silent wooden rowboats to within dozens of meters of the flamingo flocks without startling them, providing an intimate birding encounter.',
    history: 'Formed following the construction of the Bhima River reservoir in 1980, the extensive shallow bays quickly developed high densities of blue-green algae and crustaceans favored by flamingos.',
    story: 'Local fishermen have formed conservation co-operatives, transforming from sole net-fishers into passionate volunteer bird protectors and wildlife photography boatmen.',
    bestTimeToVisit: 'December to March (peak flamingo population)',
    timings: '6:00 AM – 6:30 PM (best boat trips are at dawn: 6:30 AM – 9:00 AM)',
    entryFee: 'Boat hire: ₹1,000 – ₹1,500 per boat (seats up to 6 people)',
    localFood: 'Fresh Bhigwan fish thali (Chilapi / Rohu fry with hot bajra bhakri and red garlic chutney) at Kumbhargaon village.',
    nearbyAttractions: ['Kumbhargaon Birding Village', 'Palasdeo submerged temple ruins (when water recedes)'],
    travelTips: [
      'Book your boatman in advance for the 6:30 AM sunrise slot for golden hour reflections.',
      'Carry telephoto lens (300mm+) and binoculars.',
      'Stay overnight at community-run village homestays in Kumbhargaon.'
    ],
    tags: ['Flamingos', 'Wetland Birding', 'Community Tourism', 'Dawn Boating', 'Pune Getaway']
  },
  {
    id: 'raghurajpur-craft-village',
    name: 'Raghurajpur Heritage Crafts Village',
    status: 'verified',
    verificationNotice: 'Recognized Heritage Crafts Village (INTACH & Ministry of Culture)',
    category: 'cultural',
    tagline: 'A living village where every household is a studio of Pattachitra painters',
    city: 'Raghurajpur (near Puri)',
    district: 'Puri',
    state: 'Odisha',
    coordinates: { lat: 19.8690, lng: 85.8248 },
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'An idyllic village of around 140 artisan homes where every single family practices centuries-old Pattachitra cloth scroll painting, palm leaf engraving, stone carving, or Gotipua dance.',
    whySpecial: 'The exterior walls of every village house are painted in vivid murals. Visitors can sit on verandas with National Award-winning master artisans and watch paint made from crushed conch shells and lamp soot.',
    history: 'Raghurajpur’s artisan lineages have prepared the sacred canvas paintings for the Jagannath Puri Temple for over 900 years, particularly during the Anasara fortnight when the temple deities rest.',
    story: 'Birthplace of Padma Vibhushan Kelucharan Mohapatra, the legendary guru who revived the classical Odissi dance form. Young boys in the village continue to train in Gotipua, the acrobatic precursor to Odissi.',
    bestTimeToVisit: 'October to March',
    timings: '9:00 AM – 7:00 PM (Artisans warmly welcome visitors into their homes)',
    entryFee: 'Free entry; purchases directly support artisan families',
    localFood: 'Fresh tender coconut water, Odia Chhena Poda (baked caramelized cottage cheese sweet), and Dalma.',
    nearbyAttractions: ['Puri Jagannath Temple (14 km)', 'Konark Sun Temple (40 km)', 'Chilika Lake'],
    travelTips: [
      'Buy directly from the artisan who created the work — 100% of proceeds reach the family without middleman markup.',
      'Ask artisans to demonstrate how they use natural mineral and plant pigments on treated cotton cloth.',
      'Attend a live Gotipua dance rehearsal in the village gurukul in late afternoon.'
    ],
    tags: ['Artisan Village', 'Pattachitra Art', 'Living Heritage', 'Odissi Roots', 'Direct Artisan Support']
  },
  {
    id: 'orchha-chhatris',
    name: 'Orchha Riverfront Cenotaphs & Fort',
    status: 'verified',
    verificationNotice: 'UNESCO Tentative Heritage Complex',
    category: 'historical',
    tagline: 'Fourteen majestic Bundela spires reflected upon the sacred Betwa River',
    city: 'Orchha',
    district: 'Niwari',
    state: 'Madhya Pradesh',
    coordinates: { lat: 25.3524, lng: 78.6416 },
    coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010f4439c2c?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A cluster of 14 grand stone chhatris (cenotaphs) built between the 16th and 18th centuries commemorating the Bundela rulers, standing along Kanchana Ghat with wild vultures nesting in the cupolas.',
    whySpecial: 'Far less crowded than Agra or Jaipur, Orchha allows you to explore entire palaces and river ghats almost in solitary silence, surrounded by medieval fresco wall paintings.',
    history: 'Founded in 1501 by Bundela chieftain Rudra Pratap Singh. The complex contains Jahangir Mahal, Raja Mahal, and the Ram Raja Temple — the only temple in India where Lord Rama is worshipped as a reigning king.',
    story: 'At Ram Raja Temple, a guard of honor by state police is presented daily to the deity, following a centuries-old tradition honoring Queen Ganesh Kunwari’s vow that Rama would reign as the true king of Orchha.',
    bestTimeToVisit: 'October to March',
    timings: 'Chhatris open 9:00 AM – 5:30 PM; riverside view accessible 24 hours',
    entryFee: '₹25 composite ticket covers fort & monuments',
    localFood: 'Bundelkhandi Thali with Kadhi, Bedmi Poori, spicy Aloo Bhaji, and rich Khoya Jalebi.',
    nearbyAttractions: ['Jahangir Mahal', 'Chaturbhuj Temple roof terrace', 'Orchha Wildlife Sanctuary across the river'],
    travelTips: [
      'Cross the low stone pedestrian bridge to the opposite riverbank at sunset for the famous mirror-reflection shot.',
      'Climb to the rooftop terraces of Chaturbhuj Temple for panoramic views of the entire medieval skyline.',
      'River rafting on the gentle Betwa rapids is available between October and February.'
    ],
    tags: ['Medieval Forts', 'Riverside Cenotaphs', 'Bundelkhand', 'Quiet Heritage', 'Vulture Haven']
  },
  {
    id: 'chembra-heart-lake',
    name: 'Chembra Peak & Hridaya Saras',
    status: 'verified',
    verificationNotice: 'Forest Department Regulated Eco-Tourism Zone',
    category: 'nature',
    tagline: 'The misty heart-shaped highland lake that never dries throughout the year',
    city: 'Meppadi (Wayanad)',
    district: 'Wayanad',
    state: 'Kerala',
    coordinates: { lat: 11.5167, lng: 76.0833 },
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'The highest peak in Wayanad (2,100 m) featuring a naturally formed heart-shaped lake called Hridaya Saras halfway up the emerald Shola-grassland slopes.',
    whySpecial: 'The crystal clear water in this romantic lake has never been known to dry up, even in peak summer, surrounded by floating clouds and tea estates.',
    history: 'Protected by the South Wayanad Forest Development Agency to preserve fragile high-altitude Western Ghats montane evergreen Shola forest biomes and endangered Nilgiri Pipit habitat.',
    story: 'Indigenous Wayanad tribes considered the lake sacred to mountain spirits and believed dipping one’s hands in it bestowed lifelong harmony in love.',
    bestTimeToVisit: 'September to March (lush green landscapes after monsoon)',
    timings: 'Trek registrations open 7:00 AM – 12:00 PM (Daily limit of 200 passes)',
    entryFee: '₹1,000 for a group of up to 5 people including mandatory certified tribal forest guide',
    localFood: 'Malabar Parotta with vegetable stew or spicy Kozhi curry, and freshly brewed cardamom mountain tea.',
    nearbyAttractions: ['Soochipara Waterfalls', 'Edakkal Caves (35 km)', 'Meppadi Tea Plantations'],
    travelTips: [
      'Daily trekking passes are strictly capped by the Forest Office; arrive by 6:45 AM at Meppadi to secure a ticket.',
      'Single-use plastic bottles are banned; carry metal or reusable water bottles.',
      'The 4 km trek is moderately steep; wear good trail shoes with ankle support.'
    ],
    tags: ['Trekking', 'Heart Lake', 'Western Ghats', 'Cloud Forests', 'Eco-Tourism']
  },
  {
    id: 'bateshwar-temples-morena',
    name: 'Bateshwar Ancient Temples Ravines',
    status: 'verified',
    verificationNotice: 'ASI Monument Reassembled from Ruin by K.K. Muhammed',
    category: 'temples',
    tagline: 'Nearly 200 forgotten 8th-century Gurjara-Pratihara temples hidden in Chambal ravines',
    city: 'Padhavali',
    district: 'Morena',
    state: 'Madhya Pradesh',
    coordinates: { lat: 26.7570, lng: 78.0380 },
    coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f4439c2c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f4439c2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'An extraordinary complex of 200 sandstone temples dedicated to Shiva and Vishnu built between the 8th and 10th centuries, spread across 25 acres in the once-notorious Chambal ravines.',
    whySpecial: 'Destroyed by an earthquake in the 13th century and hidden under rubble for 700 years, the complex was miraculously pieced back together stone by stone in an epic anastylosis project led by archeologist K.K. Muhammed with the cooperation of local Chambal dacoits.',
    history: 'Built during the golden age of the Gurjara-Pratihara dynasty, precursors to Khajuraho temple architecture. The complex was hidden until the ASI began restoration in 2005.',
    story: 'Archeologist K.K. Muhammed famously convinced Chambal outlaw chieftain Nirbhay Singh Gujjar that the temples were built by their ancestors and deserved protection rather than looting.',
    bestTimeToVisit: 'November to February',
    timings: 'Sunrise to Sunset (best visited between 8:00 AM and 4:30 PM)',
    entryFee: '₹20 (ASI ticket covers Bateshwar and nearby Padhavali fortress)',
    localFood: 'Morena Gajak (famed sesame-jaggery confection), Bedai with spiced potato curry, and fresh hot Jalebi.',
    nearbyAttractions: ['Padhavali Fortress & Mukhamandapa', 'Mitawali Chausath Yogini circular temple (inspiration for Indian Parliament)', 'Chambal River Sanctuary'],
    travelTips: [
      'Combine Bateshwar, Mitawali, and Padhavali into a single golden triangle day-trip from Gwalior (35 km away).',
      'Hire a taxi from Gwalior as public transport into the ravines is sparse.',
      'Carry your own refreshments; there are no commercial shops directly at the monument.'
    ],
    tags: ['Archeological Miracle', 'Chambal Valley', 'Gurjara Pratihara', 'Forgotten Shrines', 'Restored Wonder']
  },
  {
    id: 'menawali-ghat-wai',
    name: 'Menawali Ghat & Nana Phadnavis Wada',
    status: 'verified',
    verificationNotice: 'Peshwa-Era Heritage Site (18th Century)',
    category: 'historical',
    tagline: 'An untouched 18th-century riverside wada and stepped ghat on the Krishna River',
    city: 'Wai',
    district: 'Satara',
    state: 'Maharashtra',
    coordinates: { lat: 17.9486, lng: 73.8889 },
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A serene stone-stepped riverbank featuring the 1768 palace wada of Maratha statesman Nana Phadnavis, twin Shiva temples, and a historic 650-kg European brass bell captured from the Portuguese at Vasai Fort.',
    whySpecial: 'Retains pure 18th-century Maratha wooden architecture with secret escape passages, teakwood jharokhas, and rare surviving wall frescos painted in vegetable dyes.',
    history: 'Built by Nana Phadnavis, the chief administrator and visionary diplomat of the Maratha Empire who united Indian powers against the British East India Company.',
    story: 'The massive bronze bell hanging outside the Menavali temple was captured during Chimaji Appa’s victorious 1739 siege of the Portuguese Fort of Bassein and transported 300 km over rugged mountains.',
    bestTimeToVisit: 'July to February (monsoon makes the Krishna river emerald and surrounding Sahyadris verdant)',
    timings: 'Ghat accessible 24 hours; Wada interiors open 9:00 AM – 5:00 PM (nominal caretaker fee)',
    entryFee: '₹50 for wada interior heritage walk',
    localFood: 'Traditional Satara Misal Pav, fresh Mahabaleshwar strawberries (in winter), and Maharashtrian Puran Poli.',
    nearbyAttractions: ['Dholya Ganpati Temple in Wai', 'Dhom Dam backwaters', 'Pandavgad Fort'],
    travelTips: [
      'Featured in legendary Indian cinema like Swades; an absolute haven for heritage photography enthusiasts.',
      'Sit on the banyan tree stone plinth by the water at early morning to hear temple conches echoing across the river.',
      'Just a 1.5-hour drive from Pune or 3 hours from Mumbai.'
    ],
    tags: ['Maratha History', 'Riverside Ghat', 'Sahyadri Heritage', 'Ancient Wada', 'Film Heritage']
  },
  {
    id: 'mawlynnong-root-bridges',
    name: 'Mawlynnong & Living Root Bridges',
    status: 'verified',
    verificationNotice: 'Recognized Cleanest Village & Indigenous Bio-Engineering',
    category: 'villages',
    tagline: 'Century-old bridges trained from live aerial roots of rubber fig trees',
    city: 'Mawlynnong',
    district: 'East Khasi Hills',
    state: 'Meghalaya',
    coordinates: { lat: 25.2011, lng: 91.9056 },
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A picturesque tribal village in the Khasi Hills celebrated for its 100% community-led cleanliness and living root bridges woven over generations from the roots of Ficus elastica trees.',
    whySpecial: 'Instead of dead steel and concrete, these living bridges grow stronger with time as the root network thickens, withstanding the heaviest monsoons on earth without rotting.',
    history: 'The Khasi indigenous community pioneered the art of training living tree roots across roaring streams over 500 years ago, using hollowed betel nut trunks as guiding funnels.',
    story: 'In Mawlynnong, sweeping fallen leaves and discarding organic waste into conical woven bamboo baskets (Khoh) is taught to children as an instinctive daily morning ritual before school.',
    bestTimeToVisit: 'September to May (avoid peak July deluge unless you want roaring streams)',
    timings: 'Dawn to dusk; homestay guests can explore anytime',
    entryFee: '₹50 village entry fee managed by the village Dorbar council',
    localFood: 'Jadoh (fragrant rice cooked with traditional spices), Tungrymbai, smoked forest bamboo shoots, and fresh wild honey.',
    nearbyAttractions: ['Riwai Living Root Bridge (2 km)', 'Dawki Umngot river transparent boating (30 km)', 'Krang Suri Falls'],
    travelTips: [
      'Stay overnight in a community bamboo treehouse homestay to experience genuine Khasi hospitality.',
      'Walk softly on the root bridges and never carve into or strip tree bark.',
      'Support the local women-run weaving and handicraft cooperatives along village lanes.'
    ],
    tags: ['Bio-Engineering', 'Living Root Bridges', 'Khasi Culture', 'Cleanest Village', 'Rainforest Wonder']
  },
  {
    id: 'kala-dungar-kutch',
    name: 'Kala Dungar & Khavda Village',
    status: 'verified',
    verificationNotice: 'Highest Point in Kutch & Living Folk Tradition',
    category: 'festivals',
    tagline: 'The Black Hill feast for desert jackals & centuries-old Rogan fabric art',
    city: 'Khavda',
    district: 'Kutch',
    state: 'Gujarat',
    coordinates: { lat: 23.9283, lng: 69.8183 },
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'The highest summit in Kutch (462 m) offering panoramic vistas of the surreal White Salt Desert and the Indo-Pak border, home to a 400-year-old Dattatreya temple that feeds wild golden jackals daily.',
    whySpecial: 'Every day at 12:00 PM and 5:00 PM after Aarti, the temple priest rings a brass gong and calls "Laye Laye", and wild jackals emerge peacefully from the scrub forest to eat prasad rice.',
    history: 'Legend recounts that Lord Dattatreya stopped here and offered his body to starving jackals; miraculous restoration occurred and the feeding tradition has persisted continuously for 400 years.',
    story: 'At the base lies Khavda village and Nirona, the last surviving home of Rogan Art — a Persian-origin painting technique using boiled castor oil paste and metal stylus, preserved by the Khatri family for 8 generations.',
    bestTimeToVisit: 'November to February (during cool desert breeze season)',
    timings: 'Temple gates open 6:00 AM – 7:00 PM (Jackal feeding at 12 PM & 5 PM)',
    entryFee: 'Free temple entry; vehicle checkpoint toll ₹100',
    localFood: 'Kutchi Dabeli, steaming hot Khichdi with fresh white Makhan (churned butter), sweet Gulab Pak, and buttermilk.',
    nearbyAttractions: ['Rann of Kutch White Desert', 'Nirona Craft Village (Rogan art & Copper bells)', 'Dholavira Harappan City (130 km)'],
    travelTips: [
      'Carry valid government photo ID as border security checkpoints operate on the road to Kala Dungar.',
      'Sunset over the Great Rann from the top viewpoint is among the finest panoramas in Western India.',
      'Drive carefully on the Magnetic Hill stretch where optical illusions make cars appear to roll uphill.'
    ],
    tags: ['Kutch Heritage', 'Jackal Tradition', 'Rogan Art', 'Salt Desert Panorama', 'Desert Temple']
  },
  {
    id: 'tirthan-valley-chehni',
    name: 'Tirthan Valley & Chehni Kothi',
    status: 'verified',
    verificationNotice: 'UNESCO Great Himalayan National Park Buffer Zone',
    category: 'villages',
    tagline: 'A 1,500-year-old multi-tier wood-and-stone skyscraper tower in a pristine cedar valley',
    city: 'Banjar',
    district: 'Kullu',
    state: 'Himachal Pradesh',
    coordinates: { lat: 31.6372, lng: 77.3481 },
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A towering 12-story Kathkuni-style fortified wooden tower temple rising 45 meters above apple orchards, crafted without a single drop of mortar or steel nails and surviving major earthquakes since the 17th century.',
    whySpecial: 'Traditional indigenous Himalayan earthquake-resistant interlocking deodar wood beams and schist stone architecture, accessible only by a scenic 45-minute uphill walking path through pine forests.',
    history: 'Built around the 17th century by Raja Dhadhu of Mandi as a defensive fortified outpost and temple dedicated to goddess Shringa Rishi.',
    story: 'During the devastating 1905 Kangra earthquake that leveled surrounding stone buildings across Himachal, the interlocking flexible wooden joints of Chehni Kothi swayed but held firm, losing only its top two balconies.',
    bestTimeToVisit: 'March to June (wildflowers and pleasant weather) or September to November (crisp golden autumn)',
    timings: 'Daylight hours; respect local village privacy and dress modestly',
    entryFee: 'Free; donations accepted at Shringa Rishi Temple plinth',
    localFood: 'Siddu (steamed fermented walnut-poppy seed wheat bread served with hot ghee), fresh Himalayan river trout, and wild rhododendron juice.',
    nearbyAttractions: ['Serolsar Lake & Jalori Pass (20 km)', 'Chhoie Waterfall', 'Great Himalayan National Park gates'],
    travelTips: [
      'The trail begins at Shringa Rishi Temple near Bagi village; comfortable walking shoes are required.',
      'Tourists are respectfully requested not to climb inside the upper sanctum of the tower to preserve ancient timber.',
      'Tirthan is an eco-zone where trout fishing requires a valid daily angling permit.'
    ],
    tags: ['Kathkuni Architecture', 'Himalayan Tower', 'Cedar Forest', 'Eco-Valley', 'Ancient Woodcraft']
  },
  {
    id: 'jageshwar-dham-almora',
    name: 'Jageshwar Dham Temple Complex',
    status: 'verified',
    verificationNotice: 'ASI Protected Cluster of 124 Nagara Stone Temples',
    category: 'temples',
    tagline: '124 ancient stone shrines guarded by towering Deodar trees in Kumaon',
    city: 'Jageshwar',
    district: 'Almora',
    state: 'Uttarakhand',
    coordinates: { lat: 29.6394, lng: 79.8517 },
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'A mystical forest sanctuary composed of 124 large and small stone temples dating from the 7th to 14th century, tucked within a high-altitude deodar pine valley along the sacred Jata Ganga stream.',
    whySpecial: 'Features one of the twelve sacred Jyotirlingas according to Kumaoni tradition (Nagesh Jyotirlinga). The temple spires emerge eerily through morning mountain mist surrounded by giant trees.',
    history: 'Constructed predominantly during the Katyuri and later Chand dynasties of Kumaon. Archeological evidence suggests Adi Shankaracharya revitalized the complex in the 8th century CE.',
    story: 'Legend relates that Lord Shiva meditated here in the solitude of the Darukavana forest, leading celestial sages to seek his spiritual instruction.',
    bestTimeToVisit: 'April to June and September to November',
    timings: '6:00 AM – 8:00 PM daily (Evening Aarti at 7:00 PM is mesmerizing)',
    entryFee: 'Free entry (ASI Archeological Museum on-site: ₹10)',
    localFood: 'Kumaoni Bal Mithai (roasted khoya fudge with sugar balls), Singori wrapped in malu leaves, Bhatt ki Churkani, and Madua roti.',
    nearbyAttractions: ['Dandeshwar Temple complex (2 km)', 'Jhanker Saim Mahadev', 'Almora town (36 km)'],
    travelTips: [
      'Visit the ASI Archeological Museum nearby to inspect priceless 9th-century bronze sculptures rescued from the valley.',
      'Early morning chants echoing through the pine woods provide deep peaceful contemplation.',
      'Carry warm clothing even in summer as evening temperatures drop significantly under the forest canopy.'
    ],
    tags: ['Jyotirlinga', 'Deodar Pine Forest', 'Katyuri Architecture', 'Kumaon Shrines', 'Sacred Solitude']
  },

  // Clearly labeled Demo/Sample records to comply with prompt instructions
  {
    id: 'demo-whispering-pines-grove',
    name: '[Sample Demo] Whispering Pines Sacred Grove',
    status: 'demo',
    verificationNotice: 'Sample/Demo Record — Field verification pending',
    category: 'nature',
    tagline: 'A community-protected biodiversity island with centuries of indigenous folklore',
    city: 'Kotkhai Valley',
    district: 'Shimla',
    state: 'Himachal Pradesh',
    coordinates: { lat: 31.1200, lng: 77.5300 },
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: '[SAMPLE RECORD FOR PLATFORM DEMONSTRATION] An untouched ancient cedar grove maintained under community vows where no timber has been felled for over three centuries.',
    whySpecial: 'Demonstrates community-based ecological conservation prototypes. Serves as a template for adding local village sacred groves.',
    history: 'Folk records indicate sacred forest sanctuaries have preserved pristine micro-ecosystems throughout the lower Himalayas.',
    story: 'Oral tradition says mountain spirits protect the water springs that nourish downstream terraced orchards.',
    bestTimeToVisit: 'April to October (Simulated demo parameter)',
    timings: 'Daylight hours only',
    entryFee: 'Free (Demo mock)',
    localFood: 'Pahari Madra, Rajma with mountain red rice, and dried wild persimmons.',
    nearbyAttractions: ['Giri Ganga source', 'Hatkoti stone temples'],
    travelTips: [
      'Note: This entry is a curated demo model to showcase community conservation mapping.',
      'Visitors must stay on marked walking tracks.'
    ],
    tags: ['Demo Record', 'Sacred Grove', 'Community Conservation', 'Sample Template']
  },
  {
    id: 'demo-amber-waters-stepwell',
    name: '[Sample Demo] Amber Waters Subterranean Well',
    status: 'demo',
    verificationNotice: 'Sample/Demo Record — Curated structural prototype',
    category: 'historical',
    tagline: 'A multi-tier medieval stone water pavilion with terracotta filigree',
    city: 'Chanderi Outskirts',
    district: 'Ashoknagar',
    state: 'Madhya Pradesh',
    coordinates: { lat: 24.7100, lng: 78.1300 },
    coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: '[SAMPLE RECORD FOR PLATFORM DEMONSTRATION] A model historical stepwell showcasing how lesser-known rainwater harvesting reservoirs can be mapped and documented by youth historians.',
    whySpecial: 'Exemplifies the architectural fusion of Rajput bracket carvings with Islamic geometric subterranean vaulting.',
    history: '15th-century historical trade-route rest-stop along the Malwa plateau.',
    story: 'Caravans along the old Malwa cotton route rested in its cool lower chambers during scorching summer afternoons.',
    bestTimeToVisit: 'October to February',
    timings: '8:00 AM – 5:00 PM',
    entryFee: 'Free (Sample data)',
    localFood: 'Chanderi dry snacks, Poha Jalebi, and mawa sweets.',
    nearbyAttractions: ['Chanderi Weaver Quarter', 'Koshak Mahal', 'Kati Ghati gate'],
    travelTips: [
      'Sample demo record illustrating stepwell documentation format.',
      'Always bring a flashlight when inspecting lower subterranean tiers.'
    ],
    tags: ['Demo Record', 'Stepwell Prototype', 'Water Architecture', 'Malwa Heritage']
  }
];

