export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  discipline: string;
  lead: string;
  summary: string;
  contribution: string[];
  evidence: string[];
  hero: string;
  heroAlt: string;
  accent: "forest" | "clay" | "ochre" | "blue" | "ink";
  images: ProjectImage[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "kafart",
    title: "KAFART",
    period: "2023 - present",
    discipline: "Strategic communications, digital infrastructure, curatorial coordination",
    lead:
      "Building the public voice and digital memory of a multidisciplinary cultural platform in Northern Nigeria.",
    summary:
      "At the Kaduna Fashion and Art Exhibition, I lead communications planning across festival editions and related programmes. The work moves between research, programme delivery, publishing and the systems that help a cultural institution remain useful between events.",
    contribution: [
      "Built KAFART's trilingual website in English, French and Hausa, including the festival archive, exhibitor directory and open-call portal.",
      "Initiated the KAFART and Kaduna Museum augmented-reality integration and coordinated curatorial and technical contributors around one visitor journey.",
      "Planned communications across three festival editions and the 2025 British Council Abuja Pop-Up, then authored the official post-event report.",
      "Co-curated Hands of Resilience, supported Into the Art of Making and moderated a 2024 conversation on heritage, sustainability and the next generation of African creatives.",
    ],
    evidence: [
      "Five festival editions archived online",
      "100+ creatives represented by the platform",
      "Three-language public website",
      "Museum, festival and digital teams coordinated",
    ],
    hero: "/assets/kafart-hands-of-resilience.jpg",
    heroAlt:
      "Muhammad speaking with visitors inside the Hands of Resilience exhibition",
    accent: "forest",
    images: [
      {
        src: "/assets/kafart-website.png",
        alt: "The KAFART website homepage for the sixth edition",
        caption:
          "The live KAFART website, built as a multilingual home for editions, exhibitors and open calls.",
      },
      {
        src: "/assets/kafart-hands-of-resilience.jpg",
        alt: "Muhammad guiding visitors through an exhibition",
        caption:
          "Public engagement at Hands of Resilience, a 2023 exhibition shaped around the research of KAFART's pan-African contributors.",
      },
      {
        src: "/assets/kafart-panel.jpg",
        alt: "Muhammad moderating a KAFART panel with two guests",
        caption:
          "Moderating Future Forward at KAFART 2024, a discussion on heritage, sustainability, technology and African creative practice.",
      },
    ],
    links: [
      { label: "Visit KAFART", href: "https://kafartng.org/" },
      {
        label: "Read the 2025 press coverage",
        href: "https://cdn.businessday.ng/wp-content/uploads/2025/07/BD_20250712.pdf",
      },
    ],
  },
  {
    slug: "subject-to-climate",
    title: "SubjectToClimate Youth Engagement Committee",
    period: "2025",
    discipline: "Youth engagement, facilitation, communications systems",
    lead:
      "Leading the first youth committee of a climate education nonprofit from recruitment insight to an international kickoff.",
    summary:
      "During my Climate Curve Constellations Fellowship placement at SubjectToClimate, I worked across brand communications, engagement and programme systems. The Youth Engagement Committee became the clearest expression of that work: students were invited to shape how climate change is taught, rather than appear only as the audience for it.",
    contribution: [
      "Led the organisation's first Youth Engagement Committee and facilitated its kickoff with students from the United States, Jordan, South Korea and Nigeria.",
      "Introduced the committee to SubjectToClimate's work with K-12 educators and designed participation around personal climate stories.",
      "Used a cause-and-effect breakout activity and the Hero's Journey framework to help students connect systems thinking with narrative.",
      "Supported outreach tracking, reorganised Airtable and Google Sheets workflows and helped establish a more usable evidence base for engagement work.",
    ],
    evidence: [
      "Four countries represented at kickoff",
      "First committee of its kind at SubjectToClimate",
      "Student stories connected to classroom materials",
      "Remote facilitation across time zones",
    ],
    hero: "/assets/yec-presentation.jpg",
    heroAlt:
      "A presentation slide explaining the Youth Engagement Committee with Muhammad visible on the call",
    accent: "clay",
    images: [
      {
        src: "/assets/yec-presentation.jpg",
        alt: "Youth Engagement Committee presentation during a video call",
        caption:
          "Introducing how student stories would inform a showcase and climate learning materials.",
      },
      {
        src: "/assets/yec-committee.jpg",
        alt: "Youth Engagement Committee members in a video call grid",
        caption:
          "The inaugural committee brought together young people across four countries.",
      },
    ],
    links: [
      {
        label: "Visit SubjectToClimate",
        href: "https://subjecttoclimate.org/",
      },
    ],
  },
  {
    slug: "editorial-work",
    title: "The Revue and Aké Review",
    period: "2022 - 2023",
    discipline: "Editorial development, writing, cultural research",
    lead:
      "Turning volunteer research and original writing into durable editorial records of art, fashion and cultural life.",
    summary:
      "The Revue is where my institutional communications practice first became editorial work. Across the 2022 and 2023 issues, I supported selection and editing, wrote features and helped bring research contributions into a coherent publication. In 2023, Aké Review published my non-fiction piece Good Old Days.",
    contribution: [
      "Served as Associate Articles Editor for The Revue 2022 and Associate Editor for the 2023 issue.",
      "Edited submissions and helped shape research contributions into publishable cultural features.",
      "Published Black White Men and Colour and Pizzazz in the Arts & Fashion of Africa in the 2022 issue.",
      "Published Good Old Days in the print edition of Aké Review 2023.",
    ],
    evidence: [
      "Two editions edited",
      "Editorial credits documented in both issues",
      "Original fiction, non-fiction and cultural features",
      "Research translated for public audiences",
    ],
    hero: "/assets/ake-good-old-days.jpg",
    heroAlt: "The printed Good Old Days page in Aké Review 2023",
    accent: "ochre",
    images: [
      {
        src: "/assets/revue-2022-cover.png",
        alt: "Cover of The Revue 2022",
        caption: "The Revue 2022.",
        fit: "contain",
      },
      {
        src: "/assets/revue-2022-credits.png",
        alt: "Credits page of The Revue 2022 listing Muhammad Al-amin Yusha'u",
        caption:
          "The 2022 credits list Muhammad Al-amin Yusha'u as Associate Articles Editor and contributing writer.",
        fit: "contain",
      },
      {
        src: "/assets/revue-2023-cover.png",
        alt: "Cover of The Revue 2023",
        caption: "The Revue 2023.",
        fit: "contain",
      },
      {
        src: "/assets/revue-2023-credits.png",
        alt: "Credits page of The Revue 2023 listing Muhammad Al-amin Yusha'u",
        caption:
          "The 2023 credits record editorial and communications responsibilities.",
        fit: "contain",
      },
      {
        src: "/assets/revue-2023-feature-1.png",
        alt: "Opening page of a Revue 2023 feature about Tuareg craft",
        caption:
          "The Pick: Crafty Items - Housewares and Keepsakes, a 2023 feature on Tuareg material culture.",
        fit: "contain",
      },
      {
        src: "/assets/revue-2023-feature-2.png",
        alt: "Second page of a Revue 2023 feature about Tuareg craft",
        caption: "The second spread of the feature.",
        fit: "contain",
      },
      {
        src: "/assets/ake-good-old-days.jpg",
        alt: "The printed Good Old Days page in Aké Review 2023",
        caption:
          "Good Old Days in Aké Review 2023, a short non-fiction piece about memory, family and returning.",
      },
    ],
    links: [
      {
        label: "Aké Arts and Book Festival",
        href: "https://akefestival.org/",
      },
    ],
  },
  {
    slug: "alama",
    title: "Alama",
    period: "2025 - present",
    discipline: "Early-stage concept, cultural technology, research",
    lead:
      "An offline-first concept for helping African craft communities document and protect cultural work.",
    summary:
      "Alama explores how USSD, community validation and AI-assisted verification might make cultural intellectual-property tools more accessible to informal creators. It remains an early-stage concept focused on problem definition, community fit and responsible technical choices.",
    contribution: [
      "Developed the concept around feature-phone access, community validation and cultural sovereignty.",
      "Framed a licensing pathway between informal creators and diaspora buyers without assuming smartphone access.",
      "Presented the idea through the DOWA, ConnectED Diaspora and NiDCOM Startup Challenge.",
      "Placed second in the 2025 challenge and used the feedback to refine the problem statement and founder-product fit.",
    ],
    evidence: [
      "Second place in a national startup challenge",
      "Offline-first service concept",
      "Community validation at the centre",
      "No claims of a launched product or users",
    ],
    hero: "/assets/alama-runner-up.jpg",
    heroAlt: "Alama second-place winner announcement",
    accent: "blue",
    images: [
      {
        src: "/assets/alama-runner-up.jpg",
        alt: "Second-place announcement for the Alama concept",
        caption:
          "Alama placed second in the 2025 Building, Breaking and Believing in Nigeria Startup Challenge.",
      },
    ],
    links: [
      {
        label: "View the public concept post",
        href: "https://www.instagram.com/p/DSSLSkWiAkS/",
      },
    ],
  },
  {
    slug: "budanza",
    title: "Budanza",
    period: "2025",
    discipline: "Brand identity, visual system",
    lead:
      "A restrained identity for a real-estate advisory brand built from a modular B monogram.",
    summary:
      "Budanza is a compact brand-identity engagement for a real-estate and development company. I developed a geometric monogram, repeat pattern and business-card system that could sit comfortably across advisory and property-facing materials.",
    contribution: [
      "Created a modular B monogram from a repeatable triangular unit.",
      "Extended the mark into a simple pattern system for print applications.",
      "Prepared light and dark business-card directions with a restrained material palette.",
    ],
    evidence: [
      "Logo and pattern system",
      "Print-ready business-card direction",
      "Light and dark applications",
    ],
    hero: "/assets/budanza-brand.jpg",
    heroAlt: "Budanza business card mockup",
    accent: "ink",
    images: [
      {
        src: "/assets/budanza-brand.jpg",
        alt: "Budanza business card identity in warm grey",
        caption:
          "The monogram, repeat pattern and a light business-card application.",
      },
    ],
    links: [],
  },
];

export const experience = [
  {
    period: "2026",
    role: "Curatorial Assistant",
    place: "Abuja Art Fair",
    detail:
      "Supporting curator Aisha Aliyu-Bima with research, programme coordination, communications and documentation.",
  },
  {
    period: "2023 - now",
    role: "Strategic Communications Lead",
    place: "KAFART",
    detail:
      "Leading communications planning and public-facing digital systems across festival editions and related programmes.",
  },
  {
    period: "2025",
    role: "Brand Communications and Engagement Fellow",
    place: "SubjectToClimate / Climate Curve",
    detail:
      "Led the inaugural Youth Engagement Committee and strengthened engagement tracking and communications workflows.",
  },
  {
    period: "2025",
    role: "Kaduna State Focal Person and Rapporteur",
    place: "Northern Creatives Conference",
    detail:
      "Built and managed a stakeholder pipeline spanning more than 100 government, media and creative-sector contacts.",
  },
  {
    period: "2022 - 2024",
    role: "Editorial Assistant and Associate Editor",
    place: "The Revue",
    detail:
      "Edited submissions, curated cultural research and contributed original fiction and features.",
  },
];

export const recognition = [
  "Better Futures Fellow, Critical Explorations Initiative",
  "Second place, DOWA x ConnectED Diaspora x NiDCOM Startup Challenge",
  "Climate Curve Constellations Fellow",
  "Deputy Cohort Lead, AMS 4.0 Creative Industries and Cultural Preservation cohort",
  "Two-cycle YELF mentee in creative writing",
];
