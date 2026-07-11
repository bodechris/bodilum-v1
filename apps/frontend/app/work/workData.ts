export type WorkMediaItem = {
  src?: string;
  alt: string;
  caption?: string;
  position?: string;
  fit?: "cover" | "contain";
  layout?: "wide" | "tall" | "standard";
};

export type WorkProject = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: "Digital" | "Brand" | "Motion" | "Product";
  year: string;
  status?: string;
  services: string[];
  summary: string;
  intro: string;
  challenge: string;
  response: string;
  outcome: string;
  cover?: string;
  coverPosition?: string;
  thumbnail?: string;
  thumbnailPosition?: string;
  accent: string;
  surface: string;
  textColor: "light" | "dark";
  media: WorkMediaItem[];
  credits: Array<{ role: string; name: string }>;
};

export const workProjects: WorkProject[] = [
  {
    slug: "biznesxpo-microsites",
    number: "01",
    title: "BiznesXpo Microsites",
    shortTitle: "BiznesXpo",
    category: "Digital",
    year: "2026",
    status: "Ongoing",
    services: [
      "AI product design",
      "Platform development",
      "Advanced web design",
      "3D art direction",
    ],
    summary:
      "An AI-powered microsite system that turns a small business profile, brand assets, products and documents into a polished digital presence.",
    intro:
      "BiznesXpo Microsites give small businesses a credible, brand-led web presence without forcing every founder through the cost, delay and complexity of a traditional website project.",
    challenge:
      "Most small businesses already have enough information to tell a strong story, but that information is scattered across WhatsApp, PDFs, social profiles, invoices and product images. The challenge was to design a system that could collect those fragments and turn them into a coherent, premium digital destination.",
    response:
      "We designed a modular microsite language built around reusable content blocks, brand-aware styling, responsive commerce and service sections, document connections, mobile sharing and AI-assisted setup. The visual direction combines clear product thinking with expressive 3D metaphors that make the platform feel useful, imaginative and distinct.",
    outcome:
      "The system helps businesses launch faster, present themselves more credibly and share one focused destination through WhatsApp, NFC cards, social channels and client conversations.",
    cover: "/portfolios/bx-microsites/Xpo-Office-MoreScreens_1C.webp",
    coverPosition: "center center",
    accent: "#6f57ff",
    surface: "#e9eef5",
    textColor: "dark",
    media: [
      {
        src: "/portfolios/bx-microsites/3dOfficesV2.webp",
        alt: "Isometric digital office representing a BiznesXpo business microsite",
        caption: "A business presence imagined as a compact digital office.",
      },
      {
        src: "/portfolios/bx-microsites/Xpo-Office-MoreScreens_1C.webp",
        alt: "BiznesXpo microsite shown across desktop and mobile screens",
        caption: "Responsive business storytelling across every important screen.",
      },
      {
        src: "/portfolios/bx-microsites/Xpo-Office-MoreScreens2.webp",
        alt: "Colourful BiznesXpo business identity and microsite screens",
        caption: "Brand-aware layouts adapt to different businesses and visual identities.",
      },
      {
        src: "/portfolios/bx-microsites/Xpo-Office-MoreScreens3.webp",
        alt: "Restaurant microsite concept with digital storefront screens",
        caption: "The same modular system expands from services to hospitality and retail.",
      },
      {
        src: "/portfolios/bx-microsites/microsite-1.webp",
        alt: "Premium beauty and wellness microsite presentation",
        caption: "A more cinematic expression for image-led premium brands.",
      },
    ],
    credits: [
      { role: "Creative direction", name: "Bodilum" },
      { role: "Product design", name: "Bodilum / BiznesXpo" },
      { role: "AI + platform engineering", name: "Bodilum / BiznesXpo" },
      { role: "3D design + motion", name: "Bodilum" },
    ],
  },
  {
    slug: "bobobo-ai-challenger",
    number: "02",
    title: "Bobobo — Your AI Challenger",
    shortTitle: "Bobobo",
    category: "Product",
    year: "2026",
    status: "In development",
    services: [
      "AI character system",
      "Brand identity",
      "Motion design",
      "WebGL development",
      "Three.js + React Three Fiber",
    ],
    summary:
      "A playful AI rival who challenges players across familiar games, reacts in real time and turns every match into a memorable relationship.",
    intro:
      "Bobobo is not simply a game opponent. He is a smart, funny and emotionally expressive challenger designed to make strategy games feel personal, social and endlessly replayable.",
    challenge:
      "Traditional digital board games often become visually repetitive and emotionally flat. We needed to create a character-led system that could add humour, tension and personality without interrupting the clarity or pace of live gameplay.",
    response:
      "The experience begins like a conversation: the player calls or messages Bobobo, receives a confident challenge response and enters a game. During play, restrained expressions, gestures and text banter communicate his state of mind. A flexible 3D character, motion language and AI behaviour system allow Bobobo to grow across games and stories.",
    outcome:
      "The result is a recognisable entertainment IP with room to expand from Ludo and Chess into puzzles, social challenges, spectator modes and a broader interactive universe.",
    cover: "/portfolios/bobobo/bobobo-11.webp",
    coverPosition: "center 40%",
    accent: "#7c4dff",
    surface: "#161020",
    textColor: "light",
    media: [
      {
        src: "/portfolios/bobobo/bobobo-12.webp",
        alt: "Full-body character render of Bobobo",
        caption: "A friendly silhouette with enough visual attitude to become instantly recognisable.",
      },
      {
        src: "/portfolios/bobobo/bobobo-14.webp",
        alt: "Bobobo pointing to his glasses",
        caption: "Intelligence is communicated through behaviour, not only dialogue.",
      },
      {
        src: "/portfolios/bobobo/bobobo-13.webp",
        alt: "Bobobo raising one finger against an orange background",
        caption: "A compact motion vocabulary for challenge, thought and celebration.",
      },
      {
        src: "/portfolios/bobobo/bobobo-7.webp",
        alt: "Bobobo thinking against a green background",
        caption: "Quiet reaction states keep the character present during strategic play.",
      },
      {
        src: "/portfolios/bobobo/bobobo-3.webp",
        alt: "Bobobo laughing",
        caption: "Expressive humour helps every win, loss and comeback feel specific.",
      },
      {
        src: "/portfolios/bobobo/bobobo-4.webp",
        alt: "Bobobo reacting in surprise",
        caption: "Readable expressions designed for fast in-game feedback.",
      },
      {
        src: "/portfolios/bobobo/bobobo-10.webp",
        alt: "Bobobo winking on a blue background",
        caption: "A confident rival with warmth rather than hostility.",
      },
      {
        src: "/portfolios/bobobo/bobobo-15.webp",
        alt: "Bobobo character portrait on a purple background",
        caption: "A brand system built to move between games, stories and campaigns.",
      },
      {
        src: "/portfolios/bobobo/bobobo-6.webp",
        alt: "Bobobo winking against a pale background",
      },
      {
        src: "/portfolios/bobobo/bobobo-9.webp",
        alt: "Bobobo adjusting his glasses against a red background",
      },
    ],
    credits: [
      { role: "Concept + creative direction", name: "Bodilum / Jekasere" },
      { role: "Character design", name: "Bodilum" },
      { role: "AI behaviour design", name: "Bodilum / Jekasere" },
      { role: "Real-time development", name: "Bodilum / Jekasere" },
    ],
  },
  {
    slug: "naija-fashion-index",
    number: "03",
    title: "Naija Fashion Index",
    shortTitle: "Naija Fashion Index",
    category: "Digital",
    year: "2026",
    status: "Concept in development",
    services: [
      "Brand identity",
      "Cultural research",
      "Motion design",
      "WebGL development",
      "Three.js + React Three Fiber",
    ],
    summary:
      "A living digital archive for Nigerian fashion, designers, garments, eras and cultural influence, expressed through an immersive editorial runway.",
    intro:
      "Naija Fashion Index is conceived as a discoverable visual record of Nigerian fashion — part archive, part exhibition and part cinematic web experience.",
    challenge:
      "Nigerian fashion is broad, historically layered and constantly evolving, yet much of its story is fragmented across individual designers, magazines, social feeds and private collections. The experience needed to feel rigorous enough for an archive and alive enough for contemporary fashion culture.",
    response:
      "We developed a runway-led visual language where stylised characters, garments, materials and cultural references become entry points into deeper stories. Editorial typography, controlled camera movement and real-time 3D scenes connect profiles, timelines, textile studies and immersive lookbooks without reducing the work to a conventional database.",
    outcome:
      "The platform can become a growing cultural index for audiences, researchers and designers while presenting Nigerian fashion with the scale, confidence and craft of an international exhibition.",
    cover: "/portfolios/naija-fashion-index/naija-fashion-index-18.webp",
    coverPosition: "center 32%",
    accent: "#7b52ff",
    surface: "#120f17",
    textColor: "light",
    media: [
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-0.webp",
        alt: "Male Nigerian fashion character entering a dark runway",
        caption: "The archive opens through character, silhouette and movement.",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-3.webp",
        alt: "Close portrait of a female Nigerian fashion character",
        caption: "Accessories, hair and adornment are treated as cultural information.",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-4.webp",
        alt: "Two Nigerian fashion characters walking together",
        caption: "Contemporary looks are framed as part of a wider evolving index.",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-8.webp",
        alt: "Over-the-shoulder runway composition",
        caption: "Camera positions make the viewer feel physically present in the exhibition.",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-9.webp",
        alt: "Nigerian fashion character wearing ceremonial-inspired headwear",
        caption: "Historic references are reinterpreted rather than copied literally.",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-16.webp",
        alt: "Contact sheet of Nigerian fashion character studies",
        caption: "A modular cast supports designers, eras, regions and garment stories.",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-19.webp",
        alt: "Fashion character in a pale agbada-inspired garment",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-22.webp",
        alt: "Rear runway view of a purple Nigerian fashion garment",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-7.webp",
        alt: "Side view of two fashion characters on a runway",
      },
      {
        src: "/portfolios/naija-fashion-index/naija-fashion-index-14.webp",
        alt: "Female fashion character in a sculptural magenta garment",
      },
    ],
    credits: [
      { role: "Concept + creative direction", name: "Bodilum" },
      { role: "Identity + editorial design", name: "Bodilum" },
      { role: "3D design + motion", name: "Bodilum" },
      { role: "Real-time experience", name: "Bodilum / Jekasere" },
    ],
  },
  {
    slug: "afrochess",
    number: "04",
    title: "Afrochess",
    shortTitle: "Afrochess",
    category: "Product",
    year: "2026",
    status: "Concept in development",
    services: [
      "Experience design",
      "3D character system",
      "Motion design",
      "WebGL development",
      "Three.js + React Three Fiber",
    ],
    summary:
      "A cinematic strategy experience where African royal powers, warriors, artefacts and architectural traditions replace the conventional European chess language.",
    intro:
      "Afrochess reimagines one of the world's most recognisable games through African histories, kingdoms, symbols and material culture.",
    challenge:
      "The objective was not to decorate a conventional chess set with surface motifs. Every piece needed a clear strategic silhouette, a believable cultural logic and enough visual unity to feel like one premium world rather than a collection of unrelated references.",
    response:
      "We designed kings, queens, guardians, cavalry and architectural fortresses as sculptural families. Black stone, gold detail, controlled gobo light and ceremonial camera movement transform each move into theatre. The digital experience leaves space for stories behind the pieces and future kingdoms with their own boards and visual systems.",
    outcome:
      "Afrochess creates a globally legible game with an unmistakably African point of view, capable of growing into a playable product, cinematic web experience and collectible design universe.",
    cover: "/portfolios/afrochess/afrochess-0.webp",
    coverPosition: "center center",
    accent: "#c99a3b",
    surface: "#070707",
    textColor: "light",
    media: [
      {
        src: "/portfolios/afrochess/afrochess-3.webp",
        alt: "Afrochess board photographed from a low three-quarter angle",
        caption: "A strategy board staged as a monumental ceremonial arena.",
      },
      {
        src: "/portfolios/afrochess/afrochess-10.webp",
        alt: "Top view of the complete Afrochess board",
        caption: "The system remains readable from the most functional camera angle.",
      },
      {
        src: "/portfolios/afrochess/afrochess-7.webp",
        alt: "Afrochess pieces in dramatic window light",
        caption: "Restrained gobo light gives each encounter weight without obscuring play.",
      },
      {
        src: "/portfolios/afrochess/afrochess-8.webp",
        alt: "Complete Afrochess royal assembly",
        caption: "Distinct silhouettes form one coherent sculptural family.",
      },
      {
        src: "/portfolios/afrochess/afrochess-13.webp",
        alt: "Afrochess king piece",
        caption: "Royal authority is carried through stance, scale and ceremonial detail.",
      },
      {
        src: "/portfolios/afrochess/afrochess-18.webp",
        alt: "Afrochess queen piece",
        caption: "The queen balances elegance, intelligence and battlefield presence.",
      },
      {
        src: "/portfolios/afrochess/afrochess-26.webp",
        alt: "Afrochess knight piece",
        caption: "The cavalry keeps the familiar knight logic while establishing a new identity.",
      },
      {
        src: "/portfolios/afrochess/afrochess-14.webp",
        alt: "Afrochess architectural rook piece",
        caption: "Fortified architecture replaces the conventional European tower.",
      },
      {
        src: "/portfolios/afrochess/afrochess-23.webp",
        alt: "Afrochess shield-bearing pawn piece",
      },
      {
        src: "/portfolios/afrochess/afrochess-6.webp",
        alt: "Over-the-shoulder view across the Afrochess board",
      },
    ],
    credits: [
      { role: "Concept + creative direction", name: "Bodilum / Jekasere" },
      { role: "Game + piece design", name: "Bodilum" },
      { role: "3D look development", name: "Bodilum" },
      { role: "Real-time experience", name: "Bodilum / Jekasere" },
    ],
  },
  {
    slug: "unscripted-with-nompumelelo",
    number: "05",
    title: "Unscripted with Nompumelelo",
    shortTitle: "Unscripted",
    category: "Brand",
    year: "2026",
    status: "Identity + motion system",
    services: [
      "Brand strategy",
      "Full brand identity",
      "Broadcast design",
      "Motion design",
      "Campaign system",
    ],
    summary:
      "A candid, editorial identity and motion system for a conversation platform built around culture, personal stories and unfiltered perspectives.",
    intro:
      "Unscripted with Nompumelelo is a conversation-led media platform designed to feel personal, culturally grounded and confident across video, audio, social media and live audience touchpoints.",
    challenge:
      "The identity needed to hold serious commentary, intimate human stories and energetic guest moments without becoming visually rigid or slipping into the familiar visual language of conventional talk shows.",
    response:
      "We built the system around an expressive handwritten wordmark, a microphone-led visual signature, a muted sage and charcoal palette, generous editorial typography and flexible portrait compositions. The identity extends through title animation, episode artwork, channel covers, social templates, stationery and merchandise.",
    outcome:
      "A recognisable media identity that gives every interview, campaign and content excerpt a consistent voice while leaving enough space for the personality of each guest and conversation.",
    cover:
      "/portfolios/unscripted-with-nompumelelo/photo-design-1b.webp",
    coverPosition: "center center",
    thumbnail:
      "/portfolios/unscripted-with-nompumelelo/design-8.webp",
    thumbnailPosition: "center center",
    accent: "#a9b58a",
    surface: "#171a17",
    textColor: "light",
    media: [
      {
        src: "/portfolios/unscripted-with-nompumelelo/logo-animation.mp4",
        alt: "Animated Unscripted with Nompumelelo logo",
        caption: "A compact title animation designed for programme openings, social excerpts and transitions.",
        layout: "wide",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/design-12.webp",
        alt: "Unscripted microphone poster in charcoal and sage",
        caption: "The microphone becomes a recurring visual signature across the system.",
        layout: "tall",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/design-13.webp",
        alt: "Unscripted microphone poster in green",
        caption: "A restrained palette keeps the identity calm, credible and ownable.",
        layout: "tall",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/photo-design-1b.webp",
        alt: "Unscripted with Nompumelelo hero campaign artwork",
        caption: "Portrait-led campaign frames put the host and the conversation at the centre.",
        layout: "wide",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/photo-design-9---b.webp",
        alt: "Purple Unscripted host campaign banner",
        caption: "Flexible colour moments create variety without losing recognition.",
        layout: "wide",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/photo-design-3a---2.webp",
        alt: "Square Unscripted portrait artwork",
        caption: "The identity scales naturally into social-first formats.",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/moodboard-afrocentric.webp",
        alt: "Afrocentric visual research moodboard",
        caption: "Early visual research explored cultural texture, confidence and contemporary African expression.",
        layout: "tall",
        fit: "contain",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/bizcard-1.webp",
        alt: "Unscripted with Nompumelelo business card system",
        caption: "The broadcast identity extends into considered physical brand applications.",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/youtube-cover.webp",
        alt: "Unscripted with Nompumelelo YouTube channel cover",
        caption: "A dark, cinematic channel presence for long-form viewing.",
        layout: "wide",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/watch-and-listen-1.webp",
        alt: "Watch and listen campaign artwork",
        caption: "Platform calls-to-action remain clear across YouTube, Spotify and social channels.",
        layout: "wide",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/tshirt-1.webp",
        alt: "Unscripted branded hoodie mockup",
        caption: "The wordmark and microphone symbol translate into a simple merchandise language.",
      },
      {
        src: "/portfolios/unscripted-with-nompumelelo/letterhead.webp",
        alt: "Unscripted with Nompumelelo letterhead",
        caption: "A quiet stationery system supports the more expressive broadcast moments.",
        layout: "tall",
        fit: "contain",
      },
    ],
    credits: [
      { role: "Creative direction", name: "Bodilum" },
      { role: "Brand strategy + identity", name: "Bodilum" },
      { role: "Broadcast + campaign system", name: "Bodilum" },
      { role: "Motion design", name: "Bodilum" },
    ],
  },
  {
    slug: "bahati",
    number: "06",
    title: "Bahati",
    shortTitle: "Bahati",
    category: "Brand",
    year: "2026",
    status: "Brand identity direction",
    services: [
      "Brand strategy",
      "Full brand identity",
      "Packaging direction",
      "Campaign art direction",
    ],
    summary:
      "A botanical scalp-care identity that combines restorative ritual, natural ingredients and quiet premium confidence.",
    intro:
      "Bahati is positioned as a considered scalp-care brand where healthy hair begins with a more intentional relationship with the scalp, ingredients and daily ritual.",
    challenge:
      "The category is crowded with clinical claims on one side and generic natural beauty codes on the other. Bahati needed to feel grounded in nature while retaining the precision, trust and desirability of a modern premium care system.",
    response:
      "We explored a family of organic marks before developing a refined botanical direction supported by elegant typography, deep forest greens, mineral neutrals and warm metallic detail. Packaging studies, product still life and campaign compositions establish a tactile world of leaves, stone, fabric and restorative calm.",
    outcome:
      "A flexible identity foundation that can support a complete scalp-care range, premium packaging, ecommerce, retail campaigns and educational product storytelling.",
    cover: "/portfolios/bahati/logo-application-Artboard 17.webp",
    coverPosition: "center center",
    accent: "#d8c39b",
    surface: "#17241d",
    textColor: "light",
    media: [
      {
        src: "/portfolios/bahati/logo-application-Artboard 18.webp",
        alt: "Bahati scalp-care product family in a botanical setting",
        caption: "A complete care range presented as one calm, premium product family.",
        layout: "wide",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 12.webp",
        alt: "Bahati scalp oil dropper on a wet leaf",
        caption: "Natural ingredients and restorative moisture shape the product world.",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 14.webp",
        alt: "Bahati bottle and packaging still life",
        caption: "Packaging balances botanical warmth with clear, contemporary hierarchy.",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 17.webp",
        alt: "Bahati scalp-care jars and nourishing scalp oil",
        caption: "Forest green, taupe and soft mineral tones create a grounded premium palette.",
        layout: "wide",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 15.webp",
        alt: "Close crop of Bahati green product bottle",
        caption: "Metallic detailing adds restraint and polish at close range.",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 11.webp",
        alt: "Bahati scalp serum bottle amongst leaves and stone",
        caption: "Campaign still life connects care, nature and tactile ritual.",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 9.webp",
        alt: "Bahati dropper bottle in soft directional light",
        caption: "Quiet light and generous space make the product feel considered rather than over-styled.",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 16.webp",
        alt: "Bahati botanical logo lockup",
        caption: "The selected mark combines a leaf, scalp and growth into one concise symbol.",
        fit: "contain",
      },
      {
        src: "/portfolios/bahati/logo-application-Artboard 26.webp",
        alt: "Bahati product bottle with blush fabric and natural wood",
        caption: "The system can shift towards softer campaign moments while retaining recognition.",
        layout: "wide",
      },
      {
        src: "/portfolios/bahati/logo-discovery-Artboard 4.webp",
        alt: "Bahati early symbol exploration",
        caption: "The discovery stage tested multiple ways to express care, renewal and healthy growth.",
        fit: "contain",
      },
      {
        src: "/portfolios/bahati/logo-discovery-Artboard 16.webp",
        alt: "Bahati logo construction exploration",
        caption: "Form studies refined the balance between organic character and commercial clarity.",
        fit: "contain",
      },
      {
        src: "/portfolios/bahati/copyAsset 1-80.webp",
        alt: "Bahati primary logo on a warm neutral background",
        caption: "A restrained primary lockup closes the identity system.",
        layout: "wide",
        fit: "contain",
      },
    ],
    credits: [
      { role: "Creative direction", name: "Bodilum" },
      { role: "Brand strategy + identity", name: "Bodilum" },
      { role: "Packaging direction", name: "Bodilum" },
      { role: "Campaign art direction", name: "Bodilum" },
    ],
  },
  {
    slug: "branamatv-kids-app",
    number: "07",
    title: "BranamaTV Kids Mobile App",
    shortTitle: "BranamaTV Kids",
    category: "Product",
    year: "2026",
    status: "Product + visual direction",
    services: [
      "Product design",
      "React Native",
      "Mobile development",
      "Illustration system",
    ],
    summary:
      "A playful mobile entertainment direction that makes African children’s shows, games and creative learning feel easy to discover and joyful to explore.",
    intro:
      "BranamaTV Kids is conceived as a colourful, child-friendly mobile destination for African entertainment, playful learning and age-appropriate creative discovery.",
    challenge:
      "The experience needed to feel energetic enough for children, clear enough for independent navigation and reassuring enough for parents, while creating a visual language broad enough to hold programmes, games and educational activities.",
    response:
      "We developed a bold illustrated world built from expressive faces, hand-drawn marks, oversized type and distinct colour environments. The React Native product direction uses the same visual cues to separate watching, playing and creating into simple, memorable journeys.",
    outcome:
      "A friendly visual and product foundation for a mobile platform that can grow across shows, games, learning activities, profiles and parent-managed viewing.",
    cover: "/portfolios/branamatv/img-13.webp",
    coverPosition: "center center",
    accent: "#f5df16",
    surface: "#0d3444",
    textColor: "light",
    media: [
      {
        src: "/portfolios/branamatv/img-14.webp",
        alt: "BranamaTV Kids lets play campaign frame",
        caption: "Large expressions and direct language create an immediate invitation to play.",
        layout: "wide",
      },
      {
        src: "/portfolios/branamatv/img-13.webp",
        alt: "BranamaTV Kids ready to have fun campaign frame",
        caption: "Friendly illustrated forms establish a world that feels active and approachable.",
        layout: "wide",
      },
      {
        src: "/portfolios/branamatv/img-15.webp",
        alt: "BranamaTV Kids fun shows everyday campaign frame",
        caption: "Each content mode receives its own simple colour environment and graphic rhythm.",
        layout: "wide",
      },
      {
        src: "/portfolios/branamatv/img-16.webp",
        alt: "BranamaTV Kids games that teach campaign frame",
        caption: "Learning is positioned through play rather than through a classroom aesthetic.",
        layout: "wide",
      },
      {
        src: "/portfolios/branamatv/img-17.webp",
        alt: "BranamaTV Kids learn and create campaign frame",
        caption: "Creative activities broaden the experience beyond passive viewing.",
        layout: "wide",
      },
    ],
    credits: [
      { role: "Creative + product direction", name: "Bodilum" },
      { role: "Visual identity + illustration", name: "Bodilum" },
      { role: "React Native development", name: "Bodilum" },
    ],
  },
  {
    slug: "100-motion-design-shorts",
    number: "08",
    title: "100 Motion Design Shorts",
    shortTitle: "100 Motion Shorts",
    category: "Motion",
    year: "2026",
    status: "Ongoing study",
    services: ["Design", "3D motion", "Look development", "Animation"],
    summary:
      "An ongoing collection of one hundred short-form 3D studies exploring material, typography, simulation, rhythm and African visual memory.",
    intro:
      "The series is a disciplined motion practice: one hundred compact experiments designed to improve craft while building a broader library of visual ideas for Bodilum.",
    challenge:
      "Create enough constraints for consistency while leaving every short room to discover a new material, movement, technique or visual metaphor.",
    response:
      "Each study is treated as a small complete world, moving from a clear visual premise through look development, animation, lighting, rendering and sound-aware editing.",
    outcome:
      "A growing motion archive that sharpens technical range and creates reusable visual language for future brand films, identities and digital experiences.",
    accent: "#ff6f40",
    surface: "#26170f",
    textColor: "light",
    media: [],
    credits: [
      { role: "Design + direction", name: "Bodilum" },
      { role: "3D + animation", name: "Bodilum" },
    ],
  },
  {
    slug: "yossi-beauty",
    number: "09",
    title: "Yossi Beauty",
    shortTitle: "Yossi Beauty",
    category: "Brand",
    year: "2026",
    services: ["Brand strategy", "Full brand identity", "Campaign design"],
    summary:
      "A confident beauty identity built around healthy growth, protective rituals and editorial campaign energy.",
    intro:
      "Yossi is a social-first beauty system for a modern hair and personal-care brand that wants to feel expressive, stylish and commercially ready.",
    challenge:
      "Beauty feeds are crowded with similar visual codes. Yossi needed enough softness to communicate care, enough confidence to stand apart and enough structure to remain consistent across products, campaigns and digital touchpoints.",
    response:
      "A refined wordmark, warm neutral palette, deep green accents and close editorial portraiture create a grounded but aspirational world. The system expands through campaign headlines, product stories, service moments, social content and digital commerce layouts.",
    outcome:
      "The identity gives Yossi a recognisable foundation for launches, content, packaging concepts, website sections and a growing beauty community.",
    cover: "/images/beauty-yossi/yossi-2560-1440.webp",
    coverPosition: "center center",
    accent: "#244f3d",
    surface: "#eee3d2",
    textColor: "dark",
    media: [
      { src: "/images/beauty-yossi/yossi-img-10.webp", alt: "Yossi brand strategy and typography board" },
      { src: "/images/beauty-yossi/yossi-img-12.webp", alt: "Yossi healthy hair campaign image" },
      { src: "/images/beauty-yossi/yossi-img-16.webp", alt: "Yossi protective styles campaign image" },
      { src: "/images/beauty-yossi/yossi-img-20.webp", alt: "Yossi crown and growth campaign image" },
      { src: "/images/beauty-yossi/yossi-img-29.webp", alt: "Yossi complete identity presentation" },
      { src: "/images/beauty-yossi/yossi-img-30.webp", alt: "Yossi website design system" },
      { src: "/images/beauty-yossi/yossi-img-31.webp", alt: "Yossi product and ecommerce pages" },
      { src: "/images/beauty-yossi/yossi-img-32.webp", alt: "Yossi editorial website screens" },
      { src: "/images/beauty-yossi/yossi-img-4.webp", alt: "Yossi fabric wordmark mockup" },
      { src: "/images/beauty-yossi/yossi-img-5.webp", alt: "Yossi premium stationery mockup" },
    ],
    credits: [
      { role: "Strategy + creative direction", name: "Bodilum" },
      { role: "Identity design", name: "Bodilum" },
      { role: "Campaign system", name: "Bodilum" },
    ],
  },
  {
    slug: "savanah-nest",
    number: "10",
    title: "Savanah Nest",
    shortTitle: "Savanah Nest",
    category: "Brand",
    year: "2026",
    services: ["Brand strategy", "Full brand identity", "Property campaign system"],
    summary:
      "A calm, premium real-estate identity that presents property as comfort, confidence and long-term value.",
    intro:
      "Savanah Nest is a nature-led identity direction for a property business that wants to feel established, peaceful and desirable from the first interaction.",
    challenge:
      "The property market often defaults to loud luxury or generic corporate language. The brand needed to feel premium and trustworthy while retaining warmth, space and a clear sense of home.",
    response:
      "A deep navy base, warm metallic accents, spacious layouts and lifestyle-led photography create a measured visual world. The system carries naturally across listings, brochures, social campaigns, digital profiles and sales presentations.",
    outcome:
      "Savanah Nest communicates modern living and investment confidence without losing the emotional idea of belonging.",
    cover: "/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp",
    coverPosition: "center center",
    accent: "#cbb679",
    surface: "#0b1a37",
    textColor: "light",
    media: [
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-1.webp", alt: "Savanah Nest property campaign" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-4.webp", alt: "Savanah Nest business card mockup" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-5.webp", alt: "Savanah Nest stationery application" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-6.webp", alt: "Savanah Nest brand collateral" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-9.webp", alt: "Savanah Nest digital brand application" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-10.webp", alt: "Savanah Nest mobile and social screens" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-13.webp", alt: "Savanah Nest identity strategy" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-14.webp", alt: "Savanah Nest campaign composition" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-15.webp", alt: "Savanah Nest digital property screens" },
      { src: "/images/real-estate-savanah-nest/savanah-nest-img-20.webp", alt: "Savanah Nest property metrics design" },
    ],
    credits: [
      { role: "Strategy + creative direction", name: "Bodilum" },
      { role: "Identity design", name: "Bodilum" },
      { role: "Campaign + applications", name: "Bodilum" },
    ],
  },
  {
    slug: "moria-beauty",
    number: "11",
    title: "Moria Beauty",
    shortTitle: "Moria Beauty",
    category: "Brand",
    year: "2026",
    services: ["Brand strategy", "Full brand identity", "Campaign design"],
    summary:
      "A soft, refined skincare identity centred on melanin, everyday ritual and quiet confidence.",
    intro:
      "Moria is designed for a beauty and wellness brand that wants to feel premium, feminine and trustworthy without becoming cold or overly clinical.",
    challenge:
      "The identity needed to hold both emotional self-care messaging and practical product communication while remaining distinctive across a crowded skincare landscape.",
    response:
      "Graceful typography, generous spacing, mint and blush colour fields, close portraiture and tactile product moments form a calm editorial system. Campaign language turns routine into ritual and product benefits into expressions of confidence.",
    outcome:
      "Moria gains a flexible visual world for product launches, social campaigns, ecommerce, packaging concepts and customer education.",
    cover: "/images/beauty-moria/mori-logo-bg-3.webp",
    coverPosition: "center center",
    accent: "#83c7b5",
    surface: "#f2d9e1",
    textColor: "dark",
    media: [
      { src: "/images/beauty-moria/moria-img-10.webp", alt: "Moria beauty campaign portrait" },
      { src: "/images/beauty-moria/moria-img-13.webp", alt: "Moria evening reset campaign" },
      { src: "/images/beauty-moria/moria-img-17.webp", alt: "Moria glow campaign portrait" },
      { src: "/images/beauty-moria/moria-img-24.webp", alt: "Moria mint campaign design" },
      { src: "/images/beauty-moria/moria-img-29.webp", alt: "Moria beauty campaign layout" },
      { src: "/images/beauty-moria/moria-img-30.webp", alt: "Moria product campaign" },
      { src: "/images/beauty-moria/moria-img-35.webp", alt: "Moria complete campaign system" },
      { src: "/images/beauty-moria/moria-img-36.webp", alt: "Moria website design" },
      { src: "/images/beauty-moria/moria-img-39.webp", alt: "Moria ecommerce screens" },
      { src: "/images/beauty-moria/moria-img-40.webp", alt: "Moria stationery application" },
    ],
    credits: [
      { role: "Strategy + creative direction", name: "Bodilum" },
      { role: "Identity design", name: "Bodilum" },
      { role: "Campaign + digital system", name: "Bodilum" },
    ],
  },
  {
    slug: "mormon",
    number: "12",
    title: "Mormon",
    shortTitle: "Mormon",
    category: "Brand",
    year: "2026",
    services: ["Brand strategy", "Full brand identity", "Digital property system"],
    summary:
      "A polished real-estate identity built for premium property, investment confidence and a Pan-African growth story.",
    intro:
      "Mormon is a commercially mature identity for a property business that needs to feel established, investment-ready and visually memorable.",
    challenge:
      "The brand had to communicate luxury and structure across listings, developments, company profiles and digital tools without relying on familiar real-estate clichés.",
    response:
      "A compact geometric mark, high-contrast typography, warm architectural imagery and a black, cream and bronze palette create a precise but inviting system. The identity expands from stationery and signage into dashboards, campaigns and a substantial corporate website language.",
    outcome:
      "Mormon can present premium homes, developments and advisory services with one consistent voice across Africa and international markets.",
    cover: "/images/real-estate-mormon/mormon-2560-1440.webp",
    coverPosition: "center center",
    accent: "#b98a5f",
    surface: "#15110e",
    textColor: "light",
    media: [
      { src: "/images/real-estate-mormon/mormon-img-2.webp", alt: "Mormon real estate logo presentation" },
      { src: "/images/real-estate-mormon/mormon-img-15.webp", alt: "Mormon architectural brand pattern" },
      { src: "/images/real-estate-mormon/mormon-img-20.webp", alt: "Mormon luxury architectural campaign" },
      { src: "/images/real-estate-mormon/mormon-img-28.webp", alt: "Mormon digital property dashboard" },
      { src: "/images/real-estate-mormon/mormon-img-30.webp", alt: "Mormon website dashboard design" },
      { src: "/images/real-estate-mormon/mormon-img-34.webp", alt: "Mormon residential property campaign" },
      { src: "/images/real-estate-mormon/mormon-img-39.webp", alt: "Mormon complete digital identity system" },
      { src: "/images/real-estate-mormon/mormon-img-40.webp", alt: "Mormon luxury property campaign" },
      { src: "/images/real-estate-mormon/mormon-img-50.webp", alt: "Mormon website experience" },
      { src: "/images/real-estate-mormon/mormon-img-51.webp", alt: "Mormon website gallery system" },
      { src: "/images/real-estate-mormon/mormon-img-59.webp", alt: "Mormon brand team presentation" },
      { src: "/images/real-estate-mormon/mormon-img-61.webp", alt: "Mormon premium property company profile" },
    ],
    credits: [
      { role: "Strategy + creative direction", name: "Bodilum" },
      { role: "Identity design", name: "Bodilum" },
      { role: "Digital + campaign system", name: "Bodilum" },
    ],
  },
];

export function getWorkProject(slug: string) {
  const resolvedSlug =
    slug === "unscripted-with-nompumelo"
      ? "unscripted-with-nompumelelo"
      : slug;

  return workProjects.find((project) => project.slug === resolvedSlug);
}

export function getNextWorkProject(slug: string) {
  const resolvedSlug =
    slug === "unscripted-with-nompumelo"
      ? "unscripted-with-nompumelelo"
      : slug;
  const currentIndex = workProjects.findIndex(
    (project) => project.slug === resolvedSlug,
  );

  if (currentIndex === -1) return workProjects[0];
  return workProjects[(currentIndex + 1) % workProjects.length];
}
