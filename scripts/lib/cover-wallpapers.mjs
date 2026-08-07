/**
 * Procedural wallpaper fragments for blog covers.
 * Each function returns SVG markup sized to the cover canvas (default 1200×800).
 * Coordinates assume viewBox origin at top-left of the cover.
 */

export const WALLPAPER_IDS = [
  "silk",
  "orbs",
  "facets",
  "drapery",
  "signal",
  "techgrid",
  "webpage",
  "neural",
  "tokens",
  "code",
  "genai",
  "medical",
  "finance",
  "cogwheel",
  "mesh",
  "topo",
  "bloom",
];

const wallpapers = {
  silk: (w, h) => `
    <defs>
      <linearGradient id="sg0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0d1f33"/><stop offset="100%" stop-color="#1a3a5c"/></linearGradient>
      <linearGradient id="sg1" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0%" stop-color="#b8dcff"/><stop offset="55%" stop-color="#3d7ec4"/><stop offset="100%" stop-color="#163a62"/></linearGradient>
      <linearGradient id="sg2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8f2ff"/><stop offset="40%" stop-color="#7aafd8"/><stop offset="100%" stop-color="#2a5078"/></linearGradient>
      <linearGradient id="sg3" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#5a9ad0"/><stop offset="50%" stop-color="#1e4a78"/><stop offset="100%" stop-color="#0a2038"/></linearGradient>
      <linearGradient id="sg4" x1="0.2" y1="0" x2="0.8" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0.55"/><stop offset="100%" stop-color="#6a9ccc" stop-opacity="0.1"/></linearGradient>
      <linearGradient id="sg5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8eb8e0"/><stop offset="100%" stop-color="#244868"/></linearGradient>
      <filter id="sblur1"><feGaussianBlur stdDeviation="12"/></filter>
      <filter id="sblur2"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sg0)"/>
    <ellipse cx="1000" cy="80" rx="360" ry="240" fill="#4a90d0" opacity="0.35" filter="url(#sblur1)"/>
    <ellipse cx="160" cy="720" rx="320" ry="200" fill="#1a4068" opacity="0.5" filter="url(#sblur1)"/>
    <path d="M-100,80 C120,-40 280,320 560,140 S960,-20 1320,180 L1320,840 L-100,840 Z" fill="url(#sg1)" opacity="0.9"/>
    <path d="M-100,220 C180,60 340,420 620,240 S1000,80 1320,300 L1320,840 L-100,840 Z" fill="url(#sg2)" opacity="0.75"/>
    <path d="M-100,340 C220,180 400,540 680,360 S1060,180 1320,400 L1320,840 L-100,840 Z" fill="url(#sg5)" opacity="0.7"/>
    <path d="M-100,460 C260,300 460,660 760,480 S1100,300 1320,520 L1320,840 L-100,840 Z" fill="url(#sg3)" opacity="0.8"/>
    <path d="M-100,580 C300,440 500,740 800,600 S1120,440 1320,640 L1320,840 L-100,840 Z" fill="url(#sg1)" opacity="0.55"/>
    <path d="M-100,100 C200,200 360,40 600,180 S900,320 1320,140" fill="none" stroke="url(#sg4)" stroke-width="28" opacity="0.45" filter="url(#sblur2)"/>
    <path d="M-100,380 C240,280 440,520 720,360 S1040,200 1320,420" fill="none" stroke="#fff" stroke-width="4" opacity="0.2"/>
    <ellipse cx="840" cy="200" rx="180" ry="80" fill="#fff" opacity="0.12" transform="rotate(-25 840 200)"/>
  `,

  orbs: (w, h) => `
    <defs>
      <radialGradient id="obg"><stop offset="0%" stop-color="#3a5570"/><stop offset="100%" stop-color="#121c28"/></radialGradient>
      <radialGradient id="oa"><stop offset="0%" stop-color="#fff"/><stop offset="45%" stop-color="#a8d0f0"/><stop offset="100%" stop-color="#2a5080" stop-opacity="0"/></radialGradient>
      <radialGradient id="ob"><stop offset="0%" stop-color="#e8f4ff"/><stop offset="50%" stop-color="#5a98d0"/><stop offset="100%" stop-color="#102838" stop-opacity="0"/></radialGradient>
      <radialGradient id="oc"><stop offset="0%" stop-color="#c0e0ff"/><stop offset="100%" stop-color="#1a3858" stop-opacity="0"/></radialGradient>
      <radialGradient id="od"><stop offset="0%" stop-color="#fff" stop-opacity="0.9"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <filter id="oblur"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#obg)"/>
    <circle cx="120" cy="100" r="260" fill="url(#ob)" opacity="0.7" filter="url(#oblur)"/>
    <circle cx="1040" cy="80" r="320" fill="url(#oa)" opacity="0.65"/>
    <circle cx="600" cy="400" r="360" fill="url(#ob)" opacity="0.55"/>
    <circle cx="200" cy="680" r="240" fill="url(#oc)" opacity="0.7"/>
    <circle cx="960" cy="640" r="280" fill="url(#oa)" opacity="0.5"/>
    <circle cx="440" cy="160" r="140" fill="url(#oc)" opacity="0.6"/>
    <circle cx="800" cy="240" r="110" fill="url(#oa)" opacity="0.5"/>
    <circle cx="320" cy="400" r="90" fill="url(#ob)" opacity="0.55"/>
    <circle cx="760" cy="600" r="130" fill="url(#oc)" opacity="0.45"/>
    <circle cx="1080" cy="360" r="80" fill="url(#oa)" opacity="0.5"/>
    <circle cx="960" cy="110" r="44" fill="url(#od)"/>
    <circle cx="500" cy="340" r="32" fill="url(#od)" opacity="0.7"/>
    <circle cx="240" cy="600" r="24" fill="url(#od)" opacity="0.8"/>
    <circle cx="800" cy="560" r="20" fill="url(#od)" opacity="0.6"/>
    <circle cx="400" cy="120" r="6" fill="#fff" opacity="0.4"/>
    <circle cx="900" cy="400" r="5" fill="#fff" opacity="0.35"/>
    <circle cx="660" cy="500" r="4" fill="#c8e4ff" opacity="0.5"/>
  `,

  facets: (w, h) => `
    <defs>
      <linearGradient id="fg0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a2838"/><stop offset="100%" stop-color="#0c141c"/></linearGradient>
      <linearGradient id="fh" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0.35"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#fg0)"/>
    <polygon points="0,800 0,320 280,180 400,800" fill="#3a5570"/>
    <polygon points="0,320 180,0 400,80 280,180" fill="#6a90b0"/>
    <polygon points="180,0 560,0 640,100 400,80" fill="#8ab0d0"/>
    <polygon points="280,180 400,80 640,100 560,360 400,800" fill="#4a7098"/>
    <polygon points="640,100 840,20 960,160 760,280 560,360" fill="#7aa4c8"/>
    <polygon points="560,360 760,280 840,480 600,600" fill="#2a4868"/>
    <polygon points="400,800 560,360 600,600 680,800" fill="#5a7a98"/>
    <polygon points="840,20 1200,0 1200,200 960,160" fill="#a0c4e0"/>
    <polygon points="960,160 1200,200 1200,440 1040,400 760,280" fill="#3a6088"/>
    <polygon points="760,280 1040,400 960,640 840,480" fill="#6a98c0"/>
    <polygon points="600,600 840,480 960,640 800,800 680,800" fill="#1e3858"/>
    <polygon points="1040,400 1200,440 1200,800 960,640" fill="#4a7898"/>
    <polygon points="960,640 1200,800 800,800" fill="#2a5070"/>
    <polygon points="440,240 540,200 580,320 480,340" fill="#d0e8ff" opacity="0.45"/>
    <polygon points="800,200 920,180 940,280 820,300" fill="#fff" opacity="0.28"/>
    <polygon points="680,400 780,360 820,460 720,490" fill="#b8d8f0" opacity="0.35"/>
    <polyline points="280,180 400,80 640,100 960,160 1200,200" fill="none" stroke="#fff" stroke-width="2" opacity="0.25"/>
    <polyline points="0,320 280,180 560,360 760,280 1040,400 1200,440" fill="none" stroke="#9ec4e8" stroke-width="1.5" opacity="0.3"/>
    <polygon points="440,240 540,200 580,320 480,340" fill="url(#fh)"/>
  `,

  drapery: (w, h) => `
    <defs>
      <linearGradient id="dbg" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="#4a6a8a"/><stop offset="100%" stop-color="#121c28"/></linearGradient>
      <linearGradient id="df1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0a1520"/><stop offset="40%" stop-color="#6a98c0"/><stop offset="70%" stop-color="#c0daf0"/><stop offset="100%" stop-color="#2a4868"/></linearGradient>
      <linearGradient id="df2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1a3048"/><stop offset="50%" stop-color="#8ab4d8"/><stop offset="100%" stop-color="#152838"/></linearGradient>
      <linearGradient id="df3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#243848"/><stop offset="35%" stop-color="#e0eef8"/><stop offset="65%" stop-color="#5a88b0"/><stop offset="100%" stop-color="#0c1828"/></linearGradient>
      <linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0.35"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <filter id="dblur"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#dbg)"/>
    <path d="M-40,-20 C80,160 60,400 -20,820 L-80,820 L-80,-20 Z" fill="url(#df1)" opacity="0.85"/>
    <path d="M80,-20 C220,180 190,420 110,820 L-20,820 C60,400 80,160 -40,-20 Z" fill="url(#df2)" opacity="0.8"/>
    <path d="M200,-20 C350,200 320,460 250,820 L110,820 C190,420 220,180 80,-20 Z" fill="url(#df3)" opacity="0.75"/>
    <path d="M340,-20 C500,170 470,440 400,820 L250,820 C320,460 350,200 200,-20 Z" fill="url(#df1)" opacity="0.7"/>
    <path d="M490,-20 C660,190 620,480 560,820 L400,820 C470,440 500,170 340,-20 Z" fill="url(#df2)" opacity="0.8"/>
    <path d="M650,-20 C820,160 790,460 720,820 L560,820 C620,480 660,190 490,-20 Z" fill="url(#df3)" opacity="0.75"/>
    <path d="M810,-20 C980,200 950,500 890,820 L720,820 C790,460 820,160 650,-20 Z" fill="url(#df1)" opacity="0.7"/>
    <path d="M970,-20 C1120,180 1100,480 1040,820 L890,820 C950,500 980,200 810,-20 Z" fill="url(#df2)" opacity="0.8"/>
    <path d="M1120,-20 C1240,140 1220,440 1180,820 L1040,820 C1100,480 1120,180 970,-20 Z" fill="url(#df3)" opacity="0.75"/>
    <polygon points="300,0 380,0 320,800 220,800" fill="url(#shaft)" opacity="0.4" filter="url(#dblur)"/>
    <polygon points="680,0 750,0 710,800 620,800" fill="url(#shaft)" opacity="0.3" filter="url(#dblur)"/>
    <polygon points="960,0 1020,0 1000,800 920,800" fill="url(#shaft)" opacity="0.25" filter="url(#dblur)"/>
  `,

  signal: (w, h) => {
    const wave = (y, amp, freq, phase) => {
      let d = `M0 ${y}`;
      for (let x = 0; x <= w; x += 8) {
        d += ` L${x} ${(y + Math.sin((x / w) * freq * Math.PI * 2 + phase) * amp).toFixed(1)}`;
      }
      return d;
    };
    return `
    <defs>
      <linearGradient id="sigbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a3a5c"/><stop offset="100%" stop-color="#0e1c30"/></linearGradient>
      <linearGradient id="sigl" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0073ff" stop-opacity="0"/><stop offset="40%" stop-color="#5ab0ff"/><stop offset="100%" stop-color="#0073ff" stop-opacity="0"/></linearGradient>
      <linearGradient id="sigc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#22d3ee" stop-opacity="0"/><stop offset="50%" stop-color="#67e8f9"/><stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/></linearGradient>
      <linearGradient id="sigv" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0"/><stop offset="50%" stop-color="#c4b5fd"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient>
      <filter id="sigblur"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sigbg)"/>
    <ellipse cx="600" cy="400" rx="560" ry="320" fill="#0073ff" opacity="0.14"/>
    <ellipse cx="200" cy="200" rx="220" ry="160" fill="#22d3ee" opacity="0.1"/>
    <g stroke="#fff" stroke-width="1" opacity="0.07">
      <line x1="0" y1="200" x2="${w}" y2="200"/><line x1="0" y1="400" x2="${w}" y2="400"/><line x1="0" y1="600" x2="${w}" y2="600"/>
      <line x1="300" y1="0" x2="300" y2="${h}"/><line x1="600" y1="0" x2="600" y2="${h}"/><line x1="900" y1="0" x2="900" y2="${h}"/>
    </g>
    <path d="${wave(160, 40, 4, 0)}" fill="none" stroke="#4a7aa0" stroke-width="2" opacity="0.4"/>
    <path d="${wave(240, 55, 5, 1)}" fill="none" stroke="url(#sigc)" stroke-width="3" opacity="0.7"/>
    <path d="${wave(360, 90, 3.5, 0.5)}" fill="none" stroke="url(#sigl)" stroke-width="5" opacity="0.95" filter="url(#sigblur)"/>
    <path d="${wave(360, 90, 3.5, 0.5)}" fill="none" stroke="#c8e4ff" stroke-width="2" opacity="0.75"/>
    <path d="${wave(460, 45, 6, 2)}" fill="none" stroke="url(#sigv)" stroke-width="3" opacity="0.65"/>
    <path d="${wave(560, 70, 3, 1.2)}" fill="none" stroke="#0073ff" stroke-width="3.5" opacity="0.55"/>
    <path d="${wave(640, 30, 5, 0.8)}" fill="none" stroke="#22d3ee" stroke-width="2" opacity="0.45"/>
    <circle cx="240" cy="360" r="7" fill="#22d3ee" opacity="0.85"/>
    <circle cx="720" cy="360" r="9" fill="#0073ff" opacity="0.95"/>
    <circle cx="960" cy="360" r="6" fill="#a78bfa" opacity="0.85"/>
  `;
  },

  techgrid: (w, h) => `
    <defs>
      <linearGradient id="tgbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e3048"/><stop offset="100%" stop-color="#0e1824"/></linearGradient>
      <pattern id="tgfine" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#6a9cc0" stroke-width="0.8" opacity="0.35"/>
      </pattern>
      <pattern id="tgcoarse" width="160" height="160" patternUnits="userSpaceOnUse">
        <path d="M160 0H0V160" fill="none" stroke="#8ab4d8" stroke-width="1.5" opacity="0.4"/>
      </pattern>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#tgbg)"/>
    <rect width="${w}" height="${h}" fill="url(#tgfine)"/>
    <rect width="${w}" height="${h}" fill="url(#tgcoarse)"/>
    <line x1="160" y1="160" x2="400" y2="320" stroke="#5ab0ff" stroke-width="2.5" opacity="0.5"/>
    <line x1="400" y1="320" x2="720" y2="200" stroke="#5ab0ff" stroke-width="2.5" opacity="0.45"/>
    <line x1="720" y1="200" x2="960" y2="400" stroke="#5ab0ff" stroke-width="2.5" opacity="0.5"/>
    <line x1="400" y1="320" x2="480" y2="600" stroke="#7ec0ff" stroke-width="1.5" opacity="0.35"/>
    <line x1="720" y1="200" x2="840" y2="560" stroke="#7ec0ff" stroke-width="1.5" opacity="0.35"/>
    <line x1="960" y1="400" x2="1080" y2="160" stroke="#5ab0ff" stroke-width="1.5" opacity="0.4"/>
    <circle cx="160" cy="160" r="10" fill="#0073ff"/><circle cx="160" cy="160" r="22" fill="#0073ff" opacity="0.25"/>
    <circle cx="400" cy="320" r="14" fill="#7ec0ff"/><circle cx="400" cy="320" r="28" fill="#7ec0ff" opacity="0.2"/>
    <circle cx="720" cy="200" r="12" fill="#fff" opacity="0.85"/>
    <circle cx="960" cy="400" r="16" fill="#0073ff"/><circle cx="960" cy="400" r="32" fill="#0073ff" opacity="0.2"/>
    <circle cx="480" cy="600" r="8" fill="#a0d0ff"/>
    <circle cx="840" cy="560" r="10" fill="#5ab0ff"/>
    <circle cx="1080" cy="160" r="8" fill="#fff" opacity="0.7"/>
    <path d="M80,80 H160 M80,80 V160" fill="none" stroke="#8ab4d8" stroke-width="3" opacity="0.5"/>
    <path d="M1120,80 H1040 M1120,80 V160" fill="none" stroke="#8ab4d8" stroke-width="3" opacity="0.5"/>
    <path d="M80,720 H160 M80,720 V640" fill="none" stroke="#8ab4d8" stroke-width="3" opacity="0.5"/>
    <path d="M1120,720 H1040 M1120,720 V640" fill="none" stroke="#8ab4d8" stroke-width="3" opacity="0.5"/>
    <ellipse cx="600" cy="400" rx="400" ry="240" fill="#0073ff" opacity="0.08"/>
  `,

  webpage: (w, h) => `
    <defs>
      <linearGradient id="wpbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a3a4c"/><stop offset="100%" stop-color="#121c28"/></linearGradient>
      <linearGradient id="wpcard" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a5068"/><stop offset="100%" stop-color="#243848"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#wpbg)"/>
    <g opacity="0.9">
      <rect x="80" y="80" width="640" height="440" rx="16" fill="url(#wpcard)" stroke="#6a90b0" stroke-width="1.5"/>
      <rect x="80" y="80" width="640" height="48" rx="16" fill="#1a2838"/>
      <rect x="80" y="112" width="640" height="16" fill="#1a2838"/>
      <circle cx="112" cy="104" r="7" fill="#ff6b6b" opacity="0.7"/>
      <circle cx="140" cy="104" r="7" fill="#ffd166" opacity="0.7"/>
      <circle cx="168" cy="104" r="7" fill="#6bcb77" opacity="0.7"/>
      <rect x="210" y="96" width="360" height="20" rx="6" fill="#2a4058"/>
      <rect x="120" y="180" width="280" height="16" rx="4" fill="#5a7a98" opacity="0.7"/>
      <rect x="120" y="216" width="440" height="10" rx="3" fill="#4a6880" opacity="0.5"/>
      <rect x="120" y="240" width="400" height="10" rx="3" fill="#4a6880" opacity="0.4"/>
      <rect x="120" y="264" width="320" height="10" rx="3" fill="#4a6880" opacity="0.35"/>
      <rect x="120" y="320" width="180" height="140" rx="10" fill="#0073ff" opacity="0.35"/>
      <rect x="330" y="320" width="180" height="140" rx="10" fill="#5a88b0" opacity="0.3"/>
      <rect x="540" y="320" width="120" height="140" rx="10" fill="#3a6080" opacity="0.35"/>
    </g>
    <g opacity="0.75" transform="translate(400,180)">
      <rect x="0" y="0" width="600" height="400" rx="16" fill="#2a4058" stroke="#7aa4c8" stroke-width="1.5"/>
      <rect x="0" y="0" width="600" height="44" rx="16" fill="#152030"/>
      <rect x="0" y="28" width="600" height="16" fill="#152030"/>
      <circle cx="28" cy="22" r="6" fill="#8ab0c8" opacity="0.5"/>
      <circle cx="52" cy="22" r="6" fill="#8ab0c8" opacity="0.5"/>
      <circle cx="76" cy="22" r="6" fill="#8ab0c8" opacity="0.5"/>
      <rect x="40" y="90" width="240" height="14" rx="3" fill="#5a88b0" opacity="0.6"/>
      <rect x="40" y="126" width="500" height="8" rx="2" fill="#3a5570" opacity="0.5"/>
      <rect x="40" y="150" width="460" height="8" rx="2" fill="#3a5570" opacity="0.4"/>
      <rect x="40" y="174" width="360" height="8" rx="2" fill="#3a5570" opacity="0.35"/>
      <rect x="40" y="220" width="160" height="100" rx="8" fill="#0073ff" opacity="0.25"/>
      <rect x="220" y="220" width="160" height="100" rx="8" fill="#4a7090" opacity="0.3"/>
      <rect x="400" y="220" width="120" height="100" rx="8" fill="#2a4868" opacity="0.4"/>
    </g>
    <circle cx="840" cy="520" r="36" fill="#0073ff" opacity="0.15"/>
    <path d="M830,500 L860,540 L844,544 L856,570 L840,576 L828,548 L816,556 Z" fill="#c8e4ff" opacity="0.7"/>
  `,

  neural: (w, h) => `
    <defs>
      <linearGradient id="mlbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a3a5c"/><stop offset="100%" stop-color="#0e1c30"/></linearGradient>
      <radialGradient id="mln"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#0073ff"/></radialGradient>
      <radialGradient id="mlc"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#22d3ee"/></radialGradient>
      <radialGradient id="mlv"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#8b5cf6"/></radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#mlbg)"/>
    <ellipse cx="600" cy="400" rx="520" ry="320" fill="#0073ff" opacity="0.16"/>
    <ellipse cx="200" cy="160" rx="200" ry="140" fill="#22d3ee" opacity="0.12"/>
    <ellipse cx="1000" cy="600" rx="220" ry="160" fill="#8b5cf6" opacity="0.14"/>
    <g stroke="#4a80b0" stroke-width="1.2" opacity="0.4">
      <line x1="160" y1="160" x2="400" y2="120"/><line x1="160" y1="160" x2="400" y2="240"/><line x1="160" y1="160" x2="400" y2="360"/>
      <line x1="160" y1="280" x2="400" y2="120"/><line x1="160" y1="280" x2="400" y2="240"/><line x1="160" y1="280" x2="400" y2="360"/><line x1="160" y1="280" x2="400" y2="480"/>
      <line x1="160" y1="400" x2="400" y2="240"/><line x1="160" y1="400" x2="400" y2="360"/><line x1="160" y1="400" x2="400" y2="480"/><line x1="160" y1="400" x2="400" y2="600"/>
      <line x1="160" y1="520" x2="400" y2="360"/><line x1="160" y1="520" x2="400" y2="480"/><line x1="160" y1="520" x2="400" y2="600"/><line x1="160" y1="520" x2="400" y2="680"/>
      <line x1="160" y1="640" x2="400" y2="480"/><line x1="160" y1="640" x2="400" y2="600"/><line x1="160" y1="640" x2="400" y2="680"/>
      <line x1="400" y1="120" x2="680" y2="200"/><line x1="400" y1="120" x2="680" y2="320"/>
      <line x1="400" y1="240" x2="680" y2="200"/><line x1="400" y1="240" x2="680" y2="320"/><line x1="400" y1="240" x2="680" y2="440"/>
      <line x1="400" y1="360" x2="680" y2="200"/><line x1="400" y1="360" x2="680" y2="320"/><line x1="400" y1="360" x2="680" y2="440"/><line x1="400" y1="360" x2="680" y2="560"/>
      <line x1="400" y1="480" x2="680" y2="320"/><line x1="400" y1="480" x2="680" y2="440"/><line x1="400" y1="480" x2="680" y2="560"/>
      <line x1="400" y1="600" x2="680" y2="440"/><line x1="400" y1="600" x2="680" y2="560"/><line x1="400" y1="680" x2="680" y2="560"/>
      <line x1="680" y1="200" x2="960" y2="280"/><line x1="680" y1="200" x2="960" y2="400"/><line x1="680" y1="200" x2="960" y2="520"/>
      <line x1="680" y1="320" x2="960" y2="280"/><line x1="680" y1="320" x2="960" y2="400"/><line x1="680" y1="320" x2="960" y2="520"/>
      <line x1="680" y1="440" x2="960" y2="280"/><line x1="680" y1="440" x2="960" y2="400"/><line x1="680" y1="440" x2="960" y2="520"/>
      <line x1="680" y1="560" x2="960" y2="280"/><line x1="680" y1="560" x2="960" y2="400"/><line x1="680" y1="560" x2="960" y2="520"/>
    </g>
    <path d="M160,400 L400,360 L680,320 L960,400" fill="none" stroke="#0073ff" stroke-width="4.5" opacity="0.85"/>
    <path d="M160,280 L400,240 L680,320 L960,280" fill="none" stroke="#22d3ee" stroke-width="3" opacity="0.65"/>
    <path d="M160,520 L400,480 L680,440 L960,520" fill="none" stroke="#8b5cf6" stroke-width="2.5" opacity="0.55"/>
    <circle cx="160" cy="160" r="16" fill="#3a6080"/><circle cx="160" cy="280" r="16" fill="#06b6d4"/>
    <circle cx="160" cy="400" r="20" fill="url(#mln)"/><circle cx="160" cy="400" r="32" fill="#0073ff" opacity="0.25"/>
    <circle cx="160" cy="520" r="16" fill="#8b5cf6"/><circle cx="160" cy="640" r="16" fill="#2a4868"/>
    <circle cx="400" cy="120" r="18" fill="#4a7898"/><circle cx="400" cy="240" r="18" fill="url(#mlc)"/>
    <circle cx="400" cy="360" r="22" fill="url(#mln)"/><circle cx="400" cy="360" r="36" fill="#0073ff" opacity="0.25"/>
    <circle cx="400" cy="480" r="18" fill="url(#mlv)"/><circle cx="400" cy="600" r="18" fill="#4a7898"/><circle cx="400" cy="680" r="14" fill="#2a4868"/>
    <circle cx="680" cy="200" r="20" fill="#22d3ee"/><circle cx="680" cy="320" r="24" fill="url(#mln)"/><circle cx="680" cy="320" r="40" fill="#0073ff" opacity="0.28"/>
    <circle cx="680" cy="440" r="20" fill="#8b5cf6"/><circle cx="680" cy="560" r="20" fill="#3a6080"/>
    <circle cx="960" cy="280" r="22" fill="#22d3ee"/><circle cx="960" cy="400" r="26" fill="url(#mln)"/><circle cx="960" cy="400" r="44" fill="#0073ff" opacity="0.28"/>
    <circle cx="960" cy="520" r="22" fill="#a78bfa"/>
  `,

  tokens: (w, h) => `
    <defs>
      <linearGradient id="llmbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3a6fa0"/><stop offset="45%" stop-color="#2d5680"/><stop offset="100%" stop-color="#25486c"/>
      </linearGradient>
      <linearGradient id="tokBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0073ff"/><stop offset="100%" stop-color="#3da0ff"/></linearGradient>
      <linearGradient id="tokCyan" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient>
      <linearGradient id="tokViolet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7c5cff"/><stop offset="100%" stop-color="#a78bfa"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#llmbg)"/>
    <ellipse cx="600" cy="380" rx="480" ry="300" fill="#0073ff" opacity="0.22"/>
    <ellipse cx="280" cy="160" rx="220" ry="140" fill="#22d3ee" opacity="0.16"/>
    <ellipse cx="980" cy="560" rx="240" ry="160" fill="#8b5cf6" opacity="0.18"/>
    <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20">
      <rect x="60" y="100" width="90" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="82" y="128" fill="#d7e8f8" fill-opacity="0.75">the</text>
      <rect x="168" y="100" width="120" height="44" rx="9" fill="url(#tokBlue)"/><text x="190" y="128" fill="#fff" fill-opacity="0.92">model</text>
      <rect x="306" y="100" width="110" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="328" y="128" fill="#d7e8f8" fill-opacity="0.75">learns</text>
      <rect x="434" y="100" width="88" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="456" y="128" fill="#d7e8f8" fill-opacity="0.7">from</text>
      <rect x="540" y="100" width="140" height="44" rx="9" fill="url(#tokCyan)"/><text x="562" y="128" fill="#06202a" fill-opacity="0.85">context</text>
      <rect x="698" y="100" width="72" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="716" y="128" fill="#d7e8f8" fill-opacity="0.7">and</text>
      <rect x="788" y="100" width="110" height="44" rx="9" fill="url(#tokViolet)"/><text x="808" y="128" fill="#fff" fill-opacity="0.9">tokens</text>
      <rect x="916" y="100" width="90" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="938" y="128" fill="#d7e8f8" fill-opacity="0.7">flow</text>

      <rect x="100" y="180" width="110" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="120" y="208" fill="#d7e8f8" fill-opacity="0.72">layers</text>
      <rect x="228" y="180" width="70" height="44" rx="9" fill="#345e80"/><text x="248" y="208" fill="#d7e8f8" fill-opacity="0.72">of</text>
      <rect x="316" y="180" width="150" height="44" rx="9" fill="url(#tokBlue)"/><text x="336" y="208" fill="#fff" fill-opacity="0.92">attention</text>
      <rect x="484" y="180" width="100" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="504" y="208" fill="#d7e8f8" fill-opacity="0.7">heads</text>
      <rect x="602" y="180" width="96" height="44" rx="9" fill="#2a5678" stroke="#7eb8e8" stroke-width="1.5"/><text x="622" y="208" fill="#d7e8f8" fill-opacity="0.7">weigh</text>
      <rect x="716" y="180" width="110" height="44" rx="9" fill="url(#tokCyan)" opacity="0.9"/><text x="736" y="208" fill="#06202a" fill-opacity="0.8">every</text>
      <rect x="844" y="180" width="140" height="44" rx="9" fill="url(#tokViolet)" opacity="0.85"/><text x="864" y="208" fill="#fff" fill-opacity="0.88">sequence</text>

      <rect x="160" y="300" width="140" height="56" rx="11" fill="url(#tokBlue)"/><text x="184" y="336" fill="#fff" fill-opacity="0.95" font-size="24">prompt</text>
      <rect x="320" y="300" width="116" height="56" rx="11" fill="#1e4868" stroke="#22d3ee" stroke-width="2"/><text x="344" y="336" fill="#b8f0ff" fill-opacity="0.9" font-size="24">cache</text>
      <rect x="456" y="300" width="90" height="56" rx="11" fill="url(#tokCyan)"/><text x="480" y="336" fill="#06202a" fill-opacity="0.85" font-size="24">hit</text>
      <rect x="566" y="300" width="180" height="56" rx="11" fill="url(#tokViolet)"/><text x="590" y="336" fill="#fff" fill-opacity="0.95" font-size="24">embedding</text>
      <rect x="766" y="300" width="130" height="56" rx="11" fill="#1e4868" stroke="#a78bfa" stroke-width="2"/><text x="790" y="336" fill="#e4d9ff" fill-opacity="0.9" font-size="24">vector</text>

      <rect x="80" y="420" width="100" height="40" rx="9" fill="#2a5678" opacity="0.85"/><text x="100" y="446" fill="#c8dcec" fill-opacity="0.65" font-size="17">logit</text>
      <rect x="200" y="420" width="120" height="40" rx="9" fill="#2a5678" opacity="0.85"/><text x="220" y="446" fill="#c8dcec" fill-opacity="0.65" font-size="17">softmax</text>
      <rect x="340" y="420" width="90" height="40" rx="9" fill="#0073ff" opacity="0.55"/><text x="360" y="446" fill="#fff" fill-opacity="0.75" font-size="17">beam</text>
      <rect x="450" y="420" width="140" height="40" rx="9" fill="#06b6d4" opacity="0.45"/><text x="470" y="446" fill="#06202a" fill-opacity="0.7" font-size="17">sampling</text>
      <rect x="610" y="420" width="110" height="40" rx="9" fill="#2a5678" opacity="0.8"/><text x="630" y="446" fill="#c8dcec" fill-opacity="0.6" font-size="17">decode</text>
      <rect x="740" y="420" width="160" height="40" rx="9" fill="#7c5cff" opacity="0.45"/><text x="760" y="446" fill="#fff" fill-opacity="0.7" font-size="17">temperature</text>
    </g>
    <path d="M220,140 C360,250 500,250 600,140" fill="none" stroke="#22d3ee" stroke-width="2.5" opacity="0.35"/>
    <path d="M400,210 C560,290 720,290 860,210" fill="none" stroke="#a78bfa" stroke-width="2" opacity="0.3"/>
    <path d="M230,328 C400,400 600,400 840,328" fill="none" stroke="#0073ff" stroke-width="3" opacity="0.35"/>
    <rect x="0" y="560" width="${w}" height="240" fill="#0c2038" opacity="0.28"/>
    <g opacity="0.3">
      <rect x="40" y="600" width="80" height="26" rx="6" fill="#5a88b0"/>
      <rect x="140" y="600" width="110" height="26" rx="6" fill="#0073ff"/>
      <rect x="270" y="600" width="70" height="26" rx="6" fill="#22d3ee"/>
      <rect x="360" y="600" width="140" height="26" rx="6" fill="#3a6080"/>
      <rect x="520" y="600" width="90" height="26" rx="6" fill="#8b5cf6"/>
      <rect x="630" y="600" width="120" height="26" rx="6" fill="#0073ff"/>
      <rect x="770" y="600" width="100" height="26" rx="6" fill="#22d3ee"/>
      <rect x="890" y="600" width="80" height="26" rx="6" fill="#3a6080"/>
      <rect x="990" y="600" width="130" height="26" rx="6" fill="#8b5cf6"/>
    </g>
    <rect width="${w}" height="${h}" fill="#102038" opacity="0.42"/>
  `,

  code: (w, h) => `
    <defs>
      <linearGradient id="cdbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#152030"/><stop offset="100%" stop-color="#0a1018"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#cdbg)"/>
    <rect x="0" y="0" width="72" height="${h}" fill="#0073ff" opacity="0.06"/>
    <ellipse cx="560" cy="320" rx="360" ry="200" fill="#0073ff" opacity="0.07"/>
    <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="22">
      <text x="90" y="90" fill="#3a6080">1</text>
      <text x="140" y="90" fill="#6a9cc0">const</text>
      <text x="230" y="90" fill="#c8e0f0"> cache </text>
      <text x="320" y="90" fill="#6a9cc0">=</text>
      <text x="350" y="90" fill="#0073ff"> prompt</text>
      <text x="470" y="90" fill="#5a88b0">.slice(</text>
      <text x="560" y="90" fill="#ffb86c">0</text>
      <text x="590" y="90" fill="#5a88b0">,</text>
      <text x="615" y="90" fill="#c8e0f0"> n</text>
      <text x="650" y="90" fill="#5a88b0">)</text>
      <text x="90" y="150" fill="#3a6080">2</text>
      <text x="140" y="150" fill="#6a9cc0">if</text>
      <text x="180" y="150" fill="#5a88b0"> (</text>
      <text x="205" y="150" fill="#c8e0f0">hit</text>
      <text x="255" y="150" fill="#5a88b0">)</text>
      <text x="285" y="150" fill="#6a9cc0"> return</text>
      <text x="395" y="150" fill="#0073ff"> reused</text>
      <text x="90" y="210" fill="#3a6080">3</text>
      <text x="140" y="210" fill="#c8e0f0">tokens</text>
      <text x="240" y="210" fill="#6a9cc0">.map</text>
      <text x="310" y="210" fill="#5a88b0">(</text>
      <text x="335" y="210" fill="#ffb86c">t</text>
      <text x="360" y="210" fill="#6a9cc0"> =&gt;</text>
      <text x="420" y="210" fill="#c8e0f0"> embed</text>
      <text x="510" y="210" fill="#5a88b0">(</text>
      <text x="535" y="210" fill="#ffb86c">t</text>
      <text x="560" y="210" fill="#5a88b0">))</text>
      <text x="90" y="270" fill="#3a6080">4</text>
      <text x="140" y="270" fill="#3a5570">// warm path · 0.1×</text>
      <text x="90" y="330" fill="#3a6080">5</text>
      <text x="140" y="330" fill="#6a9cc0">await</text>
      <text x="230" y="330" fill="#c8e0f0"> model</text>
      <text x="330" y="330" fill="#5a88b0">.</text>
      <text x="345" y="330" fill="#0073ff">generate</text>
      <text x="470" y="330" fill="#5a88b0">({</text>
      <text x="500" y="330" fill="#c8e0f0"> cache</text>
      <text x="590" y="330" fill="#5a88b0"> })</text>
      <text x="90" y="390" fill="#3a6080">6</text>
      <text x="140" y="390" fill="#6a9cc0">for</text>
      <text x="195" y="390" fill="#5a88b0"> (</text>
      <text x="220" y="390" fill="#c8e0f0">const</text>
      <text x="310" y="390" fill="#ffb86c"> step</text>
      <text x="390" y="390" fill="#6a9cc0"> of</text>
      <text x="440" y="390" fill="#c8e0f0"> stream</text>
      <text x="540" y="390" fill="#5a88b0">)</text>
      <text x="90" y="450" fill="#3a6080">7</text>
      <text x="180" y="450" fill="#c8e0f0">yield</text>
      <text x="260" y="450" fill="#0073ff"> step</text>
      <text x="340" y="450" fill="#5a88b0">.</text>
      <text x="355" y="450" fill="#c8e0f0">token</text>
      <text x="90" y="510" fill="#3a6080">8</text>
      <text x="140" y="510" fill="#3a5570">// cold write · 2×</text>
      <text x="90" y="570" fill="#3a6080">9</text>
      <text x="140" y="570" fill="#6a9cc0">export</text>
      <text x="250" y="570" fill="#6a9cc0"> default</text>
      <text x="370" y="570" fill="#c8e0f0"> run</text>
    </g>
    <rect x="340" y="305" width="140" height="32" rx="3" fill="#0073ff" opacity="0.2"/>
    <rect x="475" y="310" width="3" height="22" fill="#7ec0ff"/>
  `,

  genai: (w, h) => `
    <defs>
      <linearGradient id="gaibg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a2040"/><stop offset="50%" stop-color="#152838"/><stop offset="100%" stop-color="#0c1420"/></linearGradient>
      <radialGradient id="gaispark"><stop offset="0%" stop-color="#fff"/><stop offset="40%" stop-color="#7ec0ff"/><stop offset="100%" stop-color="#0073ff" stop-opacity="0"/></radialGradient>
      <filter id="gaiblur"><feGaussianBlur stdDeviation="8"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#gaibg)"/>
    <circle cx="600" cy="360" r="180" fill="url(#gaispark)" opacity="0.7"/>
    <circle cx="600" cy="360" r="280" fill="#0073ff" opacity="0.12" filter="url(#gaiblur)"/>
    <circle cx="360" cy="240" r="100" fill="url(#gaispark)" opacity="0.45"/>
    <circle cx="840" cy="280" r="120" fill="url(#gaispark)" opacity="0.4"/>
    <circle cx="280" cy="560" r="90" fill="url(#gaispark)" opacity="0.35"/>
    <circle cx="920" cy="540" r="110" fill="url(#gaispark)" opacity="0.35"/>
    <g stroke="#c8e4ff" stroke-width="1.5" opacity="0.35">
      <line x1="600" y1="360" x2="600" y2="80"/><line x1="600" y1="360" x2="600" y2="680"/>
      <line x1="600" y1="360" x2="280" y2="360"/><line x1="600" y1="360" x2="920" y2="360"/>
      <line x1="600" y1="360" x2="380" y2="140"/><line x1="600" y1="360" x2="820" y2="580"/>
      <line x1="600" y1="360" x2="820" y2="140"/><line x1="600" y1="360" x2="380" y2="580"/>
      <line x1="600" y1="360" x2="240" y2="240"/><line x1="600" y1="360" x2="960" y2="480"/>
      <line x1="600" y1="360" x2="960" y2="240"/><line x1="600" y1="360" x2="240" y2="480"/>
    </g>
    <g fill="#fff">
      <circle cx="600" cy="360" r="9" opacity="0.9"/>
      <circle cx="600" cy="80" r="4" opacity="0.5"/><circle cx="600" cy="680" r="4" opacity="0.45"/>
      <circle cx="280" cy="360" r="5" opacity="0.55"/><circle cx="920" cy="360" r="5" opacity="0.55"/>
      <circle cx="380" cy="140" r="4" opacity="0.5"/><circle cx="820" cy="580" r="4" opacity="0.45"/>
      <circle cx="820" cy="140" r="5" opacity="0.55"/><circle cx="380" cy="580" r="3.5" opacity="0.4"/>
    </g>
    <polygon points="600,120 840,360 600,600 360,360" fill="none" stroke="#7ec0ff" stroke-width="1.5" opacity="0.2"/>
  `,

  medical: (w, h) => `
    <defs>
      <linearGradient id="medbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#142830"/><stop offset="100%" stop-color="#0a1418"/></linearGradient>
      <linearGradient id="ecg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3d9ea0" stop-opacity="0"/><stop offset="30%" stop-color="#5ec8c0"/><stop offset="70%" stop-color="#0073ff"/><stop offset="100%" stop-color="#3d9ea0" stop-opacity="0"/></linearGradient>
      <filter id="medblur"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#medbg)"/>
    <g fill="none" stroke="#4a9088" stroke-width="2" opacity="0.25">
      <ellipse cx="600" cy="400" rx="160" ry="160"/>
      <ellipse cx="600" cy="400" rx="260" ry="260"/>
      <ellipse cx="600" cy="400" rx="360" ry="360"/>
      <ellipse cx="600" cy="400" rx="460" ry="460"/>
    </g>
    <ellipse cx="600" cy="400" rx="100" ry="100" fill="#2a6060" opacity="0.3"/>
    <line x1="600" y1="280" x2="600" y2="520" stroke="#7ec8c0" stroke-width="1.5" opacity="0.3"/>
    <line x1="480" y1="400" x2="720" y2="400" stroke="#7ec8c0" stroke-width="1.5" opacity="0.3"/>
    <path d="M0,440 L160,440 L200,440 L230,300 L260,560 L290,400 L320,440 L480,440 L510,440 L540,260 L570,580 L600,400 L630,440 L800,440 L830,440 L860,290 L890,540 L920,420 L950,440 L1200,440"
      fill="none" stroke="url(#ecg)" stroke-width="5" opacity="0.85" filter="url(#medblur)"/>
    <path d="M0,440 L160,440 L200,440 L230,300 L260,560 L290,400 L320,440 L480,440 L510,440 L540,260 L570,580 L600,400 L630,440 L800,440 L830,440 L860,290 L890,540 L920,420 L950,440 L1200,440"
      fill="none" stroke="#c8f0ec" stroke-width="2" opacity="0.55"/>
    <path d="M0,560 L120,560 L150,560 L176,500 L200,620 L224,550 L250,560 L400,560 L440,560 L470,490 L500,630 L530,540 L560,560 L1200,560"
      fill="none" stroke="#3a7880" stroke-width="2.5" opacity="0.35"/>
    <circle cx="540" cy="260" r="7" fill="#7ec8c0" opacity="0.7"/>
    <circle cx="860" cy="290" r="6" fill="#0073ff" opacity="0.6"/>
    <rect x="0" y="390" width="${w}" height="2" fill="#fff" opacity="0.06"/>
  `,

  finance: (w, h) => `
    <defs>
      <linearGradient id="finbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2830"/><stop offset="100%" stop-color="#0c1418"/></linearGradient>
      <linearGradient id="finarea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0073ff" stop-opacity="0.35"/><stop offset="100%" stop-color="#0073ff" stop-opacity="0"/></linearGradient>
      <linearGradient id="finline" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#5a88b0"/><stop offset="100%" stop-color="#7ec0ff"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#finbg)"/>
    <g stroke="#fff" stroke-width="1" opacity="0.06">
      <line x1="0" y1="160" x2="${w}" y2="160"/><line x1="0" y1="280" x2="${w}" y2="280"/>
      <line x1="0" y1="400" x2="${w}" y2="400"/><line x1="0" y1="520" x2="${w}" y2="520"/><line x1="0" y1="640" x2="${w}" y2="640"/>
    </g>
    <path d="M0,560 L80,520 L160,540 L240,460 L320,490 L400,400 L480,420 L560,340 L640,370 L720,280 L800,310 L880,240 L960,260 L1040,190 L1120,220 L1200,160 L1200,800 L0,800 Z" fill="url(#finarea)"/>
    <path d="M0,560 L80,520 L160,540 L240,460 L320,490 L400,400 L480,420 L560,340 L640,370 L720,280 L800,310 L880,240 L960,260 L1040,190 L1120,220 L1200,160"
      fill="none" stroke="url(#finline)" stroke-width="4" opacity="0.85"/>
    <g opacity="0.75">
      <line x1="140" y1="480" x2="140" y2="620" stroke="#8ab0c0" stroke-width="1.5"/><rect x="124" y="510" width="32" height="80" rx="2" fill="#3a7080"/>
      <line x1="220" y1="400" x2="220" y2="560" stroke="#7ec0ff" stroke-width="1.5"/><rect x="204" y="430" width="32" height="90" rx="2" fill="#0073ff" opacity="0.7"/>
      <line x1="300" y1="440" x2="300" y2="580" stroke="#8ab0c0" stroke-width="1.5"/><rect x="284" y="470" width="32" height="70" rx="2" fill="#2a5868"/>
      <line x1="380" y1="350" x2="380" y2="510" stroke="#7ec0ff" stroke-width="1.5"/><rect x="364" y="380" width="32" height="100" rx="2" fill="#0073ff" opacity="0.65"/>
      <line x1="460" y1="370" x2="460" y2="520" stroke="#8ab0c0" stroke-width="1.5"/><rect x="444" y="400" width="32" height="80" rx="2" fill="#3a7080"/>
      <line x1="540" y1="290" x2="540" y2="460" stroke="#7ec0ff" stroke-width="1.5"/><rect x="524" y="320" width="32" height="110" rx="2" fill="#0073ff" opacity="0.7"/>
      <line x1="620" y1="320" x2="620" y2="480" stroke="#8ab0c0" stroke-width="1.5"/><rect x="604" y="350" width="32" height="90" rx="2" fill="#2a5868"/>
      <line x1="700" y1="230" x2="700" y2="400" stroke="#7ec0ff" stroke-width="1.5"/><rect x="684" y="260" width="32" height="110" rx="2" fill="#0073ff" opacity="0.75"/>
      <line x1="780" y1="260" x2="780" y2="420" stroke="#8ab0c0" stroke-width="1.5"/><rect x="764" y="290" width="32" height="80" rx="2" fill="#3a7080"/>
      <line x1="860" y1="190" x2="860" y2="350" stroke="#7ec0ff" stroke-width="1.5"/><rect x="844" y="220" width="32" height="100" rx="2" fill="#0073ff" opacity="0.7"/>
      <line x1="940" y1="210" x2="940" y2="360" stroke="#8ab0c0" stroke-width="1.5"/><rect x="924" y="240" width="32" height="80" rx="2" fill="#2a5868"/>
      <line x1="1020" y1="140" x2="1020" y2="300" stroke="#7ec0ff" stroke-width="1.5"/><rect x="1004" y="170" width="32" height="100" rx="2" fill="#0073ff" opacity="0.8"/>
      <line x1="1100" y1="170" x2="1100" y2="320" stroke="#8ab0c0" stroke-width="1.5"/><rect x="1084" y="200" width="32" height="80" rx="2" fill="#3a7080"/>
    </g>
    <circle cx="1040" cy="190" r="9" fill="#fff" opacity="0.7"/>
    <circle cx="1040" cy="190" r="22" fill="#0073ff" opacity="0.25"/>
  `,

  cogwheel: (w, h) => {
    /** Spur gear: one trapezoid tooth per step (flat tip, deep root). */
    const gearPath = (cx, cy, teeth, tipR, rootR) => {
      const step = (Math.PI * 2) / teeth;
      const pts = [];
      const polar = (ang, r) => [
        (cx + Math.cos(ang) * r).toFixed(1),
        (cy + Math.sin(ang) * r).toFixed(1),
      ];
      for (let i = 0; i < teeth; i += 1) {
        const a = i * step - Math.PI / 2;
        // Tip ~52% of pitch, short root gap — reads as thick spur teeth
        pts.push(polar(a + step * 0.0, rootR).join(","));
        pts.push(polar(a + step * 0.04, tipR).join(","));
        pts.push(polar(a + step * 0.56, tipR).join(","));
        pts.push(polar(a + step * 0.6, rootR).join(","));
      }
      return `M${pts[0]} L${pts.slice(1).join(" L")} Z`;
    };

    const gear = (cx, cy, teeth, tipR, rootR, holeR, fill, stroke) => `
      <path d="${gearPath(cx, cy, teeth, tipR, rootR)}" fill="${fill}" stroke="${stroke}" stroke-width="3.5" stroke-linejoin="miter"/>
      <circle cx="${cx}" cy="${cy}" r="${(rootR * 0.58).toFixed(1)}" fill="#102038" opacity="0.45"/>
      <circle cx="${cx}" cy="${cy}" r="${holeR}" fill="#0a1420" stroke="${stroke}" stroke-width="5"/>
      <circle cx="${cx}" cy="${cy}" r="${(holeR * 0.45).toFixed(1)}" fill="#0073ff"/>
      <circle cx="${cx}" cy="${cy}" r="${(holeR * 0.2).toFixed(1)}" fill="#f0f7ff"/>
    `;

    return `
    <defs>
      <linearGradient id="cogbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3d6fa8"/><stop offset="100%" stop-color="#1f4a78"/>
      </linearGradient>
      <linearGradient id="cogFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#9fd0ff"/><stop offset="100%" stop-color="#4a88c8"/>
      </linearGradient>
      <linearGradient id="cogFill2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#5eead4"/><stop offset="100%" stop-color="#0d9488"/>
      </linearGradient>
      <linearGradient id="cogFill3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ddd6fe"/><stop offset="100%" stop-color="#7c3aed"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#cogbg)"/>
    <ellipse cx="700" cy="400" rx="420" ry="300" fill="#0073ff" opacity="0.22"/>
    <ellipse cx="280" cy="220" rx="200" ry="160" fill="#2dd4bf" opacity="0.2"/>
    <g opacity="1">${gear(860, 400, 8, 252, 142, 52, "url(#cogFill)", "#d6ecff")}</g>
    <g opacity="1">${gear(340, 260, 8, 172, 92, 34, "url(#cogFill2)", "#ccfbf1")}</g>
    <g opacity="1">${gear(300, 580, 7, 122, 60, 24, "url(#cogFill3)", "#ede9fe")}</g>
  `;
  },

  mesh: (w, h) => `
    <rect width="${w}" height="${h}" fill="#d8dee6"/>
    <ellipse cx="220" cy="160" rx="480" ry="360" fill="#0073ff" opacity="0.18"/>
    <ellipse cx="1050" cy="620" rx="420" ry="330" fill="#5a7890" opacity="0.22"/>
    <ellipse cx="720" cy="240" rx="300" ry="240" fill="#b4c8dc" opacity="0.35"/>
    <rect width="${w}" height="${h}" fill="url(#meshgrad)" opacity="0"/>
    <defs>
      <linearGradient id="meshgrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#eef1f4"/><stop offset="100%" stop-color="#c9d2dc"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#meshgrad)" opacity="0.35"/>
  `,

  topo: (w, h) => `
    <rect width="${w}" height="${h}" fill="#e6eaee"/>
    <ellipse cx="420" cy="480" rx="360" ry="220" fill="#0073ff" opacity="0.08"/>
    <g fill="none" stroke="#10161c" stroke-opacity="0.12" stroke-width="2">
      <ellipse cx="280" cy="700" rx="220" ry="140"/>
      <ellipse cx="280" cy="700" rx="340" ry="230"/>
      <ellipse cx="280" cy="700" rx="470" ry="330"/>
      <ellipse cx="280" cy="700" rx="610" ry="440"/>
      <ellipse cx="280" cy="700" rx="760" ry="560"/>
      <ellipse cx="1000" cy="100" rx="200" ry="140"/>
      <ellipse cx="1000" cy="100" rx="320" ry="230"/>
      <ellipse cx="1000" cy="100" rx="460" ry="340"/>
    </g>
  `,

  bloom: (w, h) => `
    <defs>
      <radialGradient id="bloom1"><stop offset="0%" stop-color="#fff" stop-opacity="0.85"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <linearGradient id="bloombg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f3f5f7"/><stop offset="100%" stop-color="#dde3ea"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bloombg)"/>
    <circle cx="360" cy="320" r="280" fill="url(#bloom1)"/>
    <circle cx="840" cy="520" r="260" fill="#0073ff" opacity="0.14"/>
    <circle cx="600" cy="800" r="300" fill="#647888" opacity="0.12"/>
  `,
};

/**
 * @param {string} id
 * @param {{ w?: number, h?: number }} [size]
 * @returns {string}
 */
export function wallpaper(id, { w = 1200, h = 800 } = {}) {
  const fn = wallpapers[id];
  if (!fn) {
    throw new Error(
      `Unknown wallpaper "${id}". Known: ${WALLPAPER_IDS.join(", ")}`,
    );
  }
  return fn(w, h);
}
