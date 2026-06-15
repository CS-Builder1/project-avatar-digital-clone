/* ═══════════════════════════════════════════════════════════════
   FEARLESS JEWELLERY — Avatar Data
   Shared dataset used by the home gallery and the profile pages.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Standard image sets (which renders exist for each avatar).
  var SETS = {
    full: ['closeup_1', 'closeup_2', 'closeup_3', 'closeup_4',
           'halfbody_1', 'halfbody_2', 'halfbody_3', 'halfbody_4',
           'lifestyle_1', 'lifestyle_2', 'lifestyle_3', 'lifestyle_4'],
    seven: ['closeup_1', 'closeup_2', 'closeup_3',
            'halfbody_1', 'halfbody_2',
            'lifestyle_1', 'lifestyle_2'],
    six: ['closeup_1', 'closeup_2',
          'halfbody_1', 'halfbody_2',
          'lifestyle_1', 'lifestyle_2']
  };

  var DATA = {
    amara: {
      number: '01', name: 'Amara', title: 'The Visionary', group: 'female', hue: 35, set: 'full',
      origin: 'West Africa — Nigerian / Ghanaian',
      profession: 'Self-made Tech Entrepreneur',
      backstory: "Born between Lagos and Accra, Amara rose from a modest upbringing to build one of West Africa's most innovative tech companies. Her vision for accessible technology across the continent has earned her a place among the world's most influential entrepreneurs. She moves through boardrooms and tech summits with the same regal presence her grandmother carried through the markets of Kumasi.",
      personality: "Bold confidence radiates from every gesture. Amara is unapologetically ambitious, fiercely intelligent, and deeply connected to her roots. She leads with both her mind and her heritage — a visionary who sees the future while honoring the past.",
      jewelry: ['Sea Urchin Statement Earrings in 22K Gold', 'Layered Gold Chains'],
      styling: "Warm deep skin tone, sculptural cheekbones, close-cropped natural hair or braided updo. Her look balances power dressing with organic African elegance — architectural silhouettes softened by warm gold accents."
    },
    isla: {
      number: '02', name: 'Isla', title: 'The Cultural Curator', group: 'female', hue: 180, set: 'full',
      origin: 'Caribbean — St. Lucian / Trinidadian',
      profession: 'Award-winning Cultural Anthropologist & Gallery Owner',
      backstory: "Raised between the lush peaks of St. Lucia and the vibrant streets of Port of Spain, Isla grew up immersed in the rich tapestry of Caribbean culture. After earning her doctorate in cultural anthropology, she opened a gallery dedicated to Caribbean and diaspora artists, creating a space where stories of resilience, beauty, and identity are told through art. Her work bridges the ancestral and the contemporary.",
      personality: "Warm, magnetic, and endlessly curious. Isla draws people in with her infectious smile and keeps them with her depth. She is both the storyteller and the story — a woman who carries the rhythm of the Caribbean in everything she does.",
      jewelry: ['Fearless Belly Chain in Gold', 'Sea Urchin Pendant Necklace'],
      styling: "Sun-kissed brown skin, loose natural curls cascading freely, and a warm smile that lights up every room. Her style is effortlessly tropical-luxe — flowing fabrics, vibrant prints, and gold jewelry that catches the Caribbean sun."
    },
    yuki: {
      number: '03', name: 'Yuki', title: 'The Minimalist Rebel', group: 'female', hue: 260, set: 'full',
      origin: 'East Asia — Japanese',
      profession: 'Avant-garde Fashion Designer',
      backstory: "From the quiet precision of Kyoto's artisan workshops to the electric chaos of Tokyo's Harajuku, Yuki forged her aesthetic in the space between tradition and rebellion. Her fashion label challenges conventions — deconstructing classic Japanese silhouettes and reconstructing them with a fearless, modern edge. She has shown at Paris, Milan, and Tokyo Fashion Weeks, always leaving audiences in stunned silence.",
      personality: "Understated power defines Yuki. She speaks softly but her designs scream. Behind the piercing gaze lies a woman of immense discipline, dry humor, and an uncompromising commitment to her craft. Minimalism is not simplicity — it is the art of saying everything with almost nothing.",
      jewelry: ['Single Fearless Architectural Cuff Bracelet', 'Minimalist Gold Ear Cuff'],
      styling: "Porcelain skin, a sharp geometric bob, and a piercing gaze that commands attention without effort. Her wardrobe is monochromatic precision — clean lines, sculptural forms, and a single piece of Fearless gold that becomes the focal point of every look."
    },
    valentina: {
      number: '04', name: 'Valentina', title: 'The Passionate Creator', group: 'female', hue: 15, set: 'seven',
      origin: 'South America — Brazilian / Colombian',
      profession: 'Celebrated Muralist & Community Activist',
      backstory: "Valentina's canvas is the city itself. From the favelas of São Paulo to the colorful barrios of Bogotá, her massive murals tell stories of hope, resistance, and the unbreakable spirit of Latin American women. She paints with the same fire that fuels her activism — organizing community art programs, mentoring young artists, and using her platform to amplify marginalized voices.",
      personality: "Passionate, expressive, and impossible to ignore. Valentina wears her heart on her sleeve and her convictions on the walls. She laughs loudly, loves deeply, and creates with an urgency that comes from knowing art can change the world.",
      jewelry: ['Fearless Organic Gold Statement Necklace', 'Stacking Rings'],
      styling: "Warm olive-bronze skin, thick dark wavy hair that moves with energy, and expressive eyes that burn with passion. Her style is vibrant bohemian-luxe — rich colors, artisan textures, and Fearless gold that feels like wearable art against her sun-warmed skin."
    },
    zara: {
      number: '05', name: 'Zara', title: 'The Elegant Disruptor', group: 'female', hue: 320, set: 'six',
      origin: 'Middle East / North Africa — Moroccan / Lebanese',
      profession: 'Human Rights Lawyer & Fashion Philanthropist',
      backstory: "Zara walks between two worlds with effortless grace — the marbled halls of international courts and the ateliers of Marrakech and Beirut. After a distinguished career in human rights law, she channeled her influence into fashion philanthropy, funding artisan cooperatives and ethical luxury initiatives across the MENA region. She proves that elegance and justice are not mutually exclusive.",
      personality: "Poised, sharp, and devastatingly elegant. Zara disrupts with sophistication — her arguments are as precisely constructed as her wardrobe. Beneath the polished exterior is a fiercely compassionate woman who has seen the world's injustices and chosen to fight them in stilettos.",
      jewelry: ['Ornate Fearless Gold Cuff Bracelet', 'Statement Drop Earrings'],
      styling: "Olive skin, dark striking eyes framed by strong brows, and elegant bone structure that photographs like sculpture. Her style marries MENA opulence with modern minimalism — draped silks, structured blazers, and ornate Fearless gold that whispers of ancient craftsmanship."
    },
    sienna: {
      number: '06', name: 'Sienna', title: 'The Modern Icon', group: 'female', hue: 20, set: 'full',
      origin: 'Northern Europe — Scandinavian / British',
      profession: 'Climate Scientist & Sustainable Luxury Advocate',
      backstory: "Sienna traded the sterile corridors of a climate research institute for the glamorous world of sustainable luxury — not because she left science behind, but because she brought it with her. Her advocacy for ethical sourcing and zero-waste design has reshaped how luxury brands think about sustainability. She is proof that the future of luxury is responsible, beautiful, and non-negotiable.",
      personality: "Thoughtful, articulate, and radiantly composed. Sienna approaches every challenge with scientific precision and a poet's sensitivity. She is the calm voice in the room that everyone listens to — not because she speaks loudest, but because she speaks truest.",
      jewelry: ['Fearless Minimalist Gold Chain Necklace', 'Delicate Sea Urchin Stud Earrings'],
      styling: "Fair skin with a constellation of light freckles, strawberry-blonde hair styled in effortless waves. Her aesthetic is Scandinavian clean meets British tailoring — neutral palettes, impeccable cuts, and Fearless gold that adds warmth to her cool-toned elegance."
    },
    zuri: {
      number: '07', name: 'Zuri', title: 'The Modern Sovereign', group: 'female', hue: 10, set: 'full',
      origin: 'East Africa — Swahili Coast (Kenyan / Tanzanian)',
      profession: 'Luxury Eco-Tourism Pioneer',
      backstory: "Born to wildlife conservationists in East Africa, Zuri spent her childhood in the wild before building a global award-winning luxury eco-lodge brand. Her properties prove that high-end hospitality, deep ecological preservation, and community empowerment can coexist seamlessly. She is a powerhouse in the sustainable travel movement.",
      personality: "Dignified, articulate, and deeply grounded. Zuri possesses a calm, majestic presence. She speaks with the quiet authority of someone who leads with purpose and respects the natural world.",
      jewelry: ['22k Gold Statement Collar Neck Ring', 'Bold Sculptural Gold Ear Cuffs'],
      styling: "Deep mahogany skin with a radiant glow, completely shaved head showing off perfect bone structure and a majestic, tall posture. Styled in structured drapery, sweeping silk capes, and rich warm earth tones like ochre, terracotta, and dark bronze."
    },
    kiran: {
      number: '08', name: 'Kiran', title: 'The Avant-Garde Sculptor', group: 'female', hue: 200, set: 'full',
      origin: 'South Asia — Indian (Mumbai / Berlin)',
      profession: 'Industrial Designer & Metal Sculptor',
      backstory: "Kiran broke traditional family expectations in Mumbai to pursue metalwork and industrial design in Berlin. Today, she creates large-scale brutalist metal sculptures exhibited in galleries across Europe. Her work fuses the structural coldness of steel with the organic, fluid warmth of gold jewelry.",
      personality: "Intensely focused, quiet, and deeply intellectual. Kiran speaks mostly through her art, but when she talks about design, her eyes spark with raw creative fire.",
      jewelry: ['Bold Geometric Gold Stacking Rings', 'Solid Gold Torc Necklace with Textured Ends'],
      styling: "Warm olive skin with golden undertones, completely shaved head, large expressive dark eyes, and strong cheekbones. Minimalist deconstructed tailoring in all-black linen or raw silk, boxy blazers, and zero color except for glowing 22k gold jewelry."
    },
    kai: {
      number: '09', name: 'Kai', title: 'The Maritime Visionary', group: 'male', hue: 140, set: 'six',
      origin: 'Pacific Islands / East Asia (Hawaii / Vietnam)',
      profession: 'Marine Biologist & Sustainable Pearl Farmer',
      backstory: "Raised in a coastal fishing village, Kai earned a scholarship in marine science and turned his passion for the ocean into a boutique blue-economy pearl farming business. His farming methods actively restore damaged coral reefs, proving that commercial luxury and ecological preservation can go hand in hand.",
      personality: "Charismatic, adventurous, and serene. Kai carries the easy, warm confidence of a traveler. He is deeply connected to the marine ecosystems he protects.",
      jewelry: ['Textured Gold Chain with Raw Sea-Urchin Gold Pendant', 'Ocean-Texture Engraved Gold Signet Ring'],
      styling: "Sun-bronzed skin with warm copper undertones, athletic build, short dark hair in a textured crop, and warm eyes. Styled in relaxed coastal luxury: high-quality raw linen shirts in cream/parchment and structured dark charcoal trousers."
    },
    aram: {
      number: '10', name: 'Aram', title: 'The Heritage Architect', group: 'male', hue: 300, set: 'six',
      origin: 'Levant — Lebanese / Syrian (Beirut / Paris)',
      profession: 'Restoration Architect & Museum Designer',
      backstory: "Born into a family of classical musicians, Aram studied architecture in Paris before returning to the Levant to design museums and restore historical ruins. His architectural designs marry ancient geometry with sleek contemporary materials, preserving history while creating space for modern dialogues.",
      personality: "Cultured, strategic, and soft-spoken. Aram has a composed diplomat's presence. He is intensely curious and respects classical heritage and the craftsmanship of the past.",
      jewelry: ['Heavy Textured 22k Gold Power Signet Ring', 'Sculptural Gold Lapel Pin & Link Bracelet'],
      styling: "Olive skin, striking dark almond eyes with thick brows, short neat beard, and sharp jawline. Styled in classic double-breasted blazers, dark grey or black mock necks, and silk pocket squares with a monochromatic dark palette."
    },
    tariq: {
      number: '11', name: 'Tariq', title: 'The Heritage Pioneer', group: 'male', hue: 30, set: 'full',
      origin: 'West Africa — Ghanaian (London / Accra)',
      profession: 'Sustainable Architect & Urban Planner',
      backstory: "Tariq studied architecture at Cambridge before launching his own practice focused on green urban design in London and Accra. He merges traditional African clay and timber building methods with state-of-the-art modern technologies, building cities that exist in harmony with the local climate.",
      personality: "Highly analytical, strategic, and quietly confident. Tariq speaks with structured precision. He is exceptionally passionate about historical preservation and eco-architectural systems.",
      jewelry: ['Heavy Textured 22k Gold Signet Rings', 'Solid Gold Chain Choker'],
      styling: "Deep dark skin with warm undertones, short sharp fade haircut, strong jawline, and a clean neat beard. Styled in classic double-breasted blazers, dark raw linen shirts, and high-necked knitwear to showcase structured chokers."
    },
    malachi: {
      number: '12', name: 'Malachi', title: 'The Rhythmic Curator', group: 'male', hue: 120, set: 'full',
      origin: 'Caribbean — Jamaican (London / Kingston)',
      profession: 'Record Producer & Visual Sound Artist',
      backstory: "A Grammy-nominated producer, Malachi builds visual and audio soundscapes that connect dub reggae roots with classical scoring. He collects traditional sonic archives and uses modern technology to create immersive audio installations, bridging heritage and digital sound design.",
      personality: "Charismatic, relaxed, and deeply philosophical. Malachi speaks with a melodic, low voice. He holds a quiet, magnetic composure and is intensely focused on raw artistic expression.",
      jewelry: ['Layered Textured Gold Chains', 'Detailed Gold Ear Cuffs & Cuff Bracelet'],
      styling: "Luminous dark skin, warm dark eyes, and long mature dreadlocks styled up in an elegant bun with gold threads woven through. Styled in relaxed open-collared silk shirts, velvet blazers, and textured premium fabrics."
    },
    kenji: {
      number: '13', name: 'Kenji', title: 'The Tech Philanthropist', group: 'male', hue: 180, set: 'full',
      origin: 'Mixed — Black / East Asian (San Francisco / Tokyo)',
      profession: 'Venture Capitalist & Incubator Founder',
      backstory: "Kenji Takahashi-Jackson raised seed capital in Tokyo and Silicon Valley to launch an incubator supporting minority-owned tech companies. He uses artificial intelligence models to solve logistics and access issues in developing regions, proving that venture funding can serve humanitarian design.",
      personality: "Highly analytical, strategic, yet exceptionally warm and approachable. Kenji is an energetic speaker who brings a modern, tech-forward outlook to global leadership.",
      jewelry: ['Minimalist Architectural 22k Gold Wrist Cuff', 'Geometric Gold Power Rings & Thin Chain'],
      styling: "Warm golden-brown skin, striking dark eyes, short curly hair styled in a clean taper fade, and defined jawline. Styled in tailored luxury sportswear, structured high-necked sweaters, and modern tech-wear blazers."
    },
    meiling: {
      number: '14', name: 'Mei-Ling', title: 'The Culinary Alchemist', group: 'female', hue: 330, set: 'seven',
      origin: 'Mixed — Black / East Asian (New York / Taipei)',
      profession: 'Michelin-Starred Chef & Culinary Anthropologist',
      backstory: "Mei-Ling Jackson-Tanaka fused her Jamaican and Taiwanese roots into a Michelin-starred fine-dining concept. Her culinary philosophy celebrates global culinary migrations, tracing the deep cultural exchange of agricultural and spice paths between East Asia and the Caribbean islands.",
      personality: "Passionate, vivacious, and highly creative. Mei-Ling speaks with direct warmth and storytelling flair. She possesses boundless curiosity and artistic energy.",
      jewelry: ['Organic Textured Gold Hoop Earrings', 'Stacking Gold Rings & Thin Chains'],
      styling: "Warm caramel skin, dark curly-wavy hair pulled up in a messy bun with gold pins, warm expressive eyes, and elegant bone structure. Styled in draped linen kimonos, silk chef coats in obsidian, and gold hairpins as highlights."
    },
    naomi: {
      number: '15', name: 'Naomi', title: 'The Cyber-Punk Activist', group: 'female', hue: 45, set: 'six',
      origin: 'Indigenous / Scandinavian (Navajo / Diné)',
      profession: 'Digital Fashion Designer & Web Developer',
      backstory: "Naomi merges traditional Navajo weaving patterns with virtual cyber-punk aesthetics in her digital clothing line. Coding decentralized platforms, she fights to protect indigenous intellectual property and digital sovereignty, advocating for indigenous artists in digital design spaces.",
      personality: "Quietly fierce, rebellious, and strategically brilliant. Naomi expresses her activism and complex heritage through virtual digital couture and code.",
      jewelry: ['Sculptural 22k Gold Ear Armor', 'Bold Geometric Gold Neck Torc'],
      styling: "Warm copper skin, striking high cheekbones, intense dark eyes, and a punk-luxe haircut with shaved sides and a long textured dark braid. Styled in deconstructed tailoring, dark leather jackets, and asymmetric black shapes."
    }
  };

  // Display / navigation order (matches the profile numbering 01–15).
  var ORDER = ['amara', 'isla', 'yuki', 'valentina', 'zara', 'sienna', 'zuri',
               'kiran', 'kai', 'aram', 'tariq', 'malachi', 'kenji', 'meiling', 'naomi'];

  function prettyLabel(suffix) {
    var parts = suffix.split('_');
    var kind = { closeup: 'Close-up', halfbody: 'Half-body', lifestyle: 'Lifestyle' }[parts[0]] || parts[0];
    return kind + ' ' + parts[1];
  }

  // Resolve an avatar's ordered image list into {src, label} objects.
  function imagesFor(id) {
    var data = DATA[id];
    if (!data) return [];
    var suffixes = SETS[data.set] || SETS.six;
    return suffixes.map(function (suffix) {
      return { src: 'images/' + id + '_' + suffix + '.png', label: prettyLabel(suffix) };
    });
  }

  window.AVATARS = {
    data: DATA,
    order: ORDER,
    get: function (id) { return DATA[id] || null; },
    imagesFor: imagesFor
  };
})();
