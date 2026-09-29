/* ==========================================================
   PROJECTS DATA  —  EDIT THIS FILE TO ADD YOUR REAL WORK
   ----------------------------------------------------------
   • There are exactly 5 projects. Keep the array to 5 items.
   • "cover"  = image shown on the card in the grid.
   • "image"  = high-resolution artwork shown inside the popup modal.
   • "caption" = descriptive note / highlight about the artwork.
   • Image files are stored in: assets/projects/project-X/
   ========================================================== */

const PROJECTS = [
  {
    id: "project-1",
    title: "Fruit Bowl — Executive Hiring Campaign",
    category: "Social Media & Editorial",
    year: "2025",
    cover: "assets/projects/project-1/cover.png",
    image: "assets/projects/project-1/image-1.png",
    description:
      "A bold executive recruitment campaign poster and social media visual designed for Fruit Bowl Agency. " +
      "Incorporating high-contrast black-and-white portrait photography, custom oversized outlined typography, " +
      "and dynamic geometric collage elements to craft an authoritative yet avant-garde leadership announcement.",
    details: {
      client: "Fruit Bowl Agency",
      role: "Creative Direction, Poster & Social Design",
      tools: "Photoshop, Illustrator, Figma",
    },
    caption:
      "Monochrome leadership visual featuring custom outlined typography, dynamic motion blur accents, and clean speech bubble lockups tailored for social feeds.",
    images: [
      {
        src: "assets/projects/project-1/image-1.png",
        alt: "Fruit Bowl – Aerith CEO Executive Hiring Campaign Poster",
        caption:
          "Monochrome leadership visual featuring custom outlined typography, dynamic motion blur accents, and clean speech bubble lockups tailored for social feeds.",
      },
    ],
  },
  {
    id: "project-2",
    title: "Fruit Bowl — Management Recruitment",
    category: "Poster & Social Collateral",
    year: "2024",
    cover: "assets/projects/project-2/cover.png",
    image: "assets/projects/project-2/image-1.png",
    description:
      "Contemporary hiring promotional collateral created for Fruit Bowl Agency's Toronto management branch. " +
      "Merges tactile crumpled paper textures with vibrant marigold-yellow fluid accents, continuous line art doodles, " +
      "and crisp corporate typographic hierarchy for impactful social recruitment.",
    details: {
      client: "Fruit Bowl (Toronto Branch)",
      role: "Visual Identity, Campaign Design",
      tools: "Illustrator, Photoshop",
    },
    caption:
      "Tactile paper collage design featuring fluid organic yellow accents, continuous-line art, and Toronto studio contact lockup.",
    images: [
      {
        src: "assets/projects/project-2/image-1.png",
        alt: "Fruit Bowl – Arun Smith Manager Recruitment Poster",
        caption:
          "Tactile paper collage design featuring fluid organic yellow accents, continuous-line art, and Toronto studio contact lockup.",
      },
    ],
  },
  {
    id: "project-3",
    title: "Harman Music App UI",
    category: "UI/UX & Mobile Design",
    year: "2025",
    cover: "assets/projects/project-3/cover.png",
    image: "assets/projects/project-3/image-1.png",
    description:
      "An immersive dark-mode mobile streaming experience designed for Harman Music. " +
      "Features tactile neumorphic player cards, vibrant artist pills, sleek audio waveform branding, " +
      "and a streamlined multi-screen listening interface engineered for modern music lovers.",
    details: {
      client: "Harman Music",
      role: "UI/UX Design, App Art Direction",
      tools: "Figma, Illustrator",
    },
    caption:
      "Three-screen mobile UI showcase: brand splash screen, dynamic playlist feed with artist badges, and dark-mode player interface.",
    images: [
      {
        src: "assets/projects/project-3/image-1.png",
        alt: "Harman Music App – Mobile UI and Player Experience",
        caption:
          "Three-screen mobile UI showcase: brand splash screen, dynamic playlist feed with artist badges, and dark-mode player interface.",
      },
    ],
  },
  {
    id: "project-4",
    title: "Nexora AI — Brand Campaign",
    category: "Tech Poster & Visual Identity",
    year: "2025",
    cover: "assets/projects/project-4/cover.png",
    image: "assets/projects/project-4/image-1.png",
    description:
      "Futuristic tech campaign poster and digital promotional visuals for Nexora AI. " +
      "Contrasts retro 8-bit pixel-grid header graphics with high-fidelity mixed-reality headset imagery, " +
      "framed by bold cyberpunk typography and an electric blue visual language.",
    details: {
      client: "Nexora AI",
      role: "Visual Art Direction, Poster Design",
      tools: "Photoshop, Illustrator, Figma",
    },
    caption:
      "Cyber-blue promotional poster highlighting VR hardware imagery, custom display lettering, and modular pixel-grid brand elements.",
    images: [
      {
        src: "assets/projects/project-4/image-1.png",
        alt: "Nexora AI – Tech Poster and Brand Campaign",
        caption:
          "Cyber-blue promotional poster highlighting VR hardware imagery, custom display lettering, and modular pixel-grid brand elements.",
      },
    ],
  },
  {
    id: "project-5",
    title: "Ember — The Smokehouse",
    category: "Food & Beverage Advertising",
    year: "2024",
    cover: "assets/projects/project-5/cover.png",
    image: "assets/projects/project-5/image-1.png",
    description:
      "Punchy, appetizing promotional advertising campaign for Ember Burgers' signature double-patty smokehouse burger. " +
      "Blends 1970s-inspired vintage chunky display lettering, macro food photography, and clear menu callouts " +
      "for digital ordering and print displays.",
    details: {
      client: "Ember Burgers",
      role: "Advertising & Typography Design",
      tools: "InDesign, Photoshop, Lightroom",
    },
    caption:
      "Vintage 70s-style display typography, rich food photography, and clear pricing lockup created for social and digital menu displays.",
    images: [
      {
        src: "assets/projects/project-5/image-1.png",
        alt: "Ember Burgers – The Smokehouse Campaign Poster",
        caption:
          "Vintage 70s-style display typography, rich food photography, and clear pricing lockup created for social and digital menu displays.",
      },
    ],
  },
];
