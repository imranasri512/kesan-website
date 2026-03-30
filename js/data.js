/* ============================================================
   KESAN Website — Data File  (js/data.js)
   ============================================================

   WHY THIS FILE EXISTS
   ────────────────────
   Instead of writing program cards and institution tiles directly
   inside the HTML (which gets messy fast), all the *content* lives
   here as plain JavaScript objects. The HTML stays clean and just
   has one empty container div. main.js reads this data and builds
   the cards automatically.

   WHEN TO ADD A NEW PROGRAM
   ──────────────────────────
   1. Copy any existing object inside the PROGRAMS array.
   2. Fill in the fields (name, date, participants, etc.)
   3. Save — the page rebuilds itself automatically. Done.

   WHEN TO ADD A NEW INSTITUTION
   ──────────────────────────────
   1. Copy any existing object inside the INSTITUTIONS array.
   2. Fill in name and logo path.
   3. Save.

   DATA TYPES AT A GLANCE
   ──────────────────────
   string   → plain text, wrapped in "quotes"
   number   → just the number,  e.g.  48
   array    → a list,  e.g.  ["item 1", "item 2"]
   null     → means "not set / no value"

   ============================================================ */


/* ════════════════════════════════════════════════════════════
   PROGRAMS
   Each object = one program card on the Programs page.
   ════════════════════════════════════════════════════════════ */

const PROGRAMS = [

  /* ── PROGRAM 1 ─────────────────────────────────────────── */
  {
    // ← The number shown at the top of the card (e.g. "Program 01")
    id: "01",

    // ← Full name of the program
    name: "KESAN Leadership Foundation Camp",

    // ← One-line summary shown under the name
    tagline: "An intensive residential program introducing youth to structured leadership fundamentals.",

    // ── DATE ──────────────────────────────────────────────
    // Use the full date, e.g. "14–16 March 2023"
    // ← REPLACE WITH REAL DATE
    date: "14–16 March 2023",

    // ── PARTICIPANTS ───────────────────────────────────────
    // ← REPLACE WITH REAL NUMBER
    participants: 48,

    // ── PHOTO ─────────────────────────────────────────────
    // Path relative to the HTML file (e.g. "assets/my_photo.jpg")
    // ← REPLACE WITH REAL PHOTO PATH
    photo: "assets/kesan_gp_1.jpg",

    // ── OVERVIEW (floating capsule on hover) ──────────────
    // A short paragraph shown in the pop-up overview panel.
    // Keep it to 2–3 sentences.
    overview: "A three-day residential camp that brought together youth from six secondary schools across Brunei. Participants engaged in structured self-discovery activities, mentoring workshops, and leadership challenges — all facilitated by trained KESAN mentors.",

    // ── PRESS RELEASE ─────────────────────────────────────
    // Short summary shown on the card body.
    pressRelease: "The Leadership Foundation Camp brought together 48 youth for intensive mentoring, self-discovery activities, and leadership workshops endorsed by the Ministry of Education.",

    // ── HIGHLIGHTS ────────────────────────────────────────
    // Bullet points shown under the press release summary.
    // Add as many strings as needed — they render as a list.
    highlights: [
      "Participants from 6 secondary schools",
      "Facilitated by 12 trained KESAN mentors",
      "Endorsed by Ministry of Education Brunei",
    ],

    // ── PRESS RELEASE LINK ────────────────────────────────
    // URL to the press release PDF or page.
    // Use null if there is no press release yet.
    pressLink: null,
  },

  /* ── PROGRAM 2 ─────────────────────────────────────────── */
  {
    id: "02",
    name: "Youth Leaders Assembly",
    tagline: "A collaborative gathering developing team leadership through group challenges and mentored reflection.",
    date: "22–23 July 2023",
    participants: 120,
    photo: "assets/kesan_gp_4.jpeg",
    overview: "The Youth Leaders Assembly convened student leaders from universities and colleges across Brunei, creating a dedicated platform for peer-to-peer learning and mentoring exchange. The two-day program included team leadership simulations and collaborative problem-solving sessions.",
    pressRelease: "The Assembly convened student leaders from UBD, UNISSA, and ITB — creating a platform for peer learning and collaborative leadership development in partnership with the Brunei National Youth Council.",
    highlights: [
      "Participants from UBD, UNISSA, and ITB",
      "Team leadership simulation exercises",
      "Partnered with Brunei National Youth Council",
    ],
    pressLink: null,
  },

  /* ── PROGRAM 3 ─────────────────────────────────────────── */
  {
    id: "03",
    name: "Community Impact Initiative",
    tagline: "A semester-long program where mentees design and execute real community projects.",
    date: "February – July 2022",
    participants: 36,
    photo: "assets/kesan_gp_2.jpg",
    overview: "Over six months, 36 youth leaders planned, organised, and executed five community engagement projects across three districts of Brunei. Each project was guided by a KESAN mentor and aimed at creating tangible, lasting impact for local communities.",
    pressRelease: "36 youth leaders planned and executed five community engagement projects across three districts — from youth literacy campaigns to environmental initiatives — reaching over 800 community members.",
    highlights: [
      "5 community projects delivered across 3 districts",
      "Reached over 800 community members",
      "Featured in Media Permata coverage",
    ],
    pressLink: null,
  },

  /* ── PROGRAM 4 ─────────────────────────────────────────── */
  {
    id: "04",
    name: "Mentoring Skills Workshop Series",
    tagline: "Equipping senior mentees with the skills to become effective peer mentors themselves.",
    date: "10 January – 28 February 2024",
    participants: 24,
    photo: "assets/kesan_gp_5.jpg",
    overview: "Four structured training sessions designed to develop mentoring capabilities, coaching techniques, and reflective leadership practices. Graduates of this series are now active as peer mentors across eight institutions in Brunei.",
    pressRelease: "Senior KESAN mentees underwent four sessions to develop their mentoring and coaching capabilities — graduating 24 trained youth mentors now active across 8 institutions.",
    highlights: [
      "Graduated 24 trained youth mentors",
      "Mentors now active in 8 institutions",
      "In collaboration with UBD Faculty of Education",
    ],
    pressLink: null,
  },

  /* ── PROGRAM 5 ─────────────────────────────────────────── */
  {
    id: "05",
    name: "KESAN Annual Leadership Retreat",
    tagline: "A reflective retreat for KESAN's senior mentees to consolidate their leadership journeys.",
    date: "5–7 April 2024",
    participants: 30,
    photo: "assets/kesan_activity_1.jpg",
    overview: "An immersive three-day retreat where senior mentees reflected on their leadership growth, set goals for the year ahead, and deepened bonds within the KESAN community. Sessions included workshops, peer coaching, and a community pledge ceremony.",
    pressRelease: "30 senior mentees gathered for KESAN's annual retreat — reflecting on their growth journeys, setting leadership goals, and pledging continued commitment to community impact.",
    highlights: [
      "Peer coaching and goal-setting workshops",
      "Community pledge and recognition ceremony",
      "Guest speaker: Brunei Youth Leader Award recipient",
    ],
    pressLink: null,
  },

  /* ── PROGRAM 6 ─────────────────────────────────────────── */
  {
    id: "06",
    name: "School Outreach Program",
    tagline: "Bringing KESAN's mentoring framework directly to secondary schools across Brunei.",
    date: "March – November 2023",
    participants: 200,
    photo: "assets/kesan_activity_2.jpg",
    overview: "A year-long outreach initiative where KESAN mentors visited secondary schools to introduce structured leadership concepts and recruit prospective mentees. The program covered six schools and ran interactive leadership discovery workshops for Form 4 and Form 5 students.",
    pressRelease: "KESAN mentors reached 200 students across six secondary schools through interactive leadership workshops — planting the seeds of the KESAN mentoring journey at the school level.",
    highlights: [
      "6 secondary schools visited",
      "Interactive leadership discovery workshops",
      "Recruited 40 students into the KESAN pipeline",
    ],
    pressLink: null,
  },

  /*
    ════════════════════════════════════════════════════════
    HOW TO ADD A NEW PROGRAM
    ════════════════════════════════════════════════════════

    1. Copy the block below (everything between the curly braces)
    2. Paste it at the END of this array (before the closing ]; )
    3. Fill in each field
    4. Save the file — the page rebuilds itself

    ── TEMPLATE ──────────────────────────────────────────

  {
    id: "07",                          ← next number in sequence
    name: "Your Program Name",
    tagline: "One-line summary.",
    date: "DD Month YYYY",             ← full date or date range
    participants: 0,                   ← number only
    photo: "assets/your_photo.jpg",    ← photo path
    overview: "Two or three sentence overview shown in the pop-up.",
    pressRelease: "Summary shown on the card.",
    highlights: [
      "Highlight one",
      "Highlight two",
      "Highlight three",
    ],
    pressLink: null,                   ← replace null with "https://..." if you have a link
  },

    ════════════════════════════════════════════════════════
  */

]; // ← end of PROGRAMS array


/* ════════════════════════════════════════════════════════════
   INSTITUTIONS
   Each object = one tile in the scrolling ticker on the Home page.
   ════════════════════════════════════════════════════════════ */

const INSTITUTIONS = [

  /*
    name  → displayed under the logo
    logo  → path to the logo image file (relative to index.html)
            Use null if you only have a name and no logo image yet.

    ← REPLACE THESE WITH THE REAL INSTITUTIONS AND THEIR LOGO PATHS
  */

  {
    name: "Universiti Brunei Darussalam",
    logo: "assets/Universiti_Brunei_Darussalam_logo.png",
  },
  {
    name: "UNISSA",
    logo: "assets/unissa-logo-only-1.png",
  },
  {
    name: "Ministry of Education",
    logo: "assets/moe_logo.jpeg",
  },
  {
    name: "Institut Teknologi Brunei",
    logo: null,   // ← no logo yet; just the name will show
  },
  {
    name: "Maktab Duli",
    logo: null,
  },
  {
    name: "Youth Development Centre",
    logo: null,
  },
  {
    name: "SMK Sultan Sharif Ali",
    logo: null,
  },

  /*
    HOW TO ADD AN INSTITUTION
    ─────────────────────────
    { name: "Institution Name", logo: "assets/logo_file.png" },
  */

]; // ← end of INSTITUTIONS array



/* ════════════════════════════════════════════════════════════
   ORGANISATIONAL CHART

   Structure (matches the org chart image):

       PRESIDENT
       ├── GENERAL SECRETARY
       │   ├── HEAD OF PROJECT
       │   │   ├── Halim Kahar
       │   │   └── Yazidah Aziz
       │   ├── HEAD OF BRANDING
       │   │   ├── Muiz Awang
       │   │   └── Fauzan Aziz
       │   └── HEAD OF SYNERGY
       │       └── Hadri Zulhilmi
       └── FINANCE OFFICER

   HOW TO UPDATE A MEMBER
   ───────────────────────
   Find the person below, change name / bio / photo. Save.

   HOW TO ADD A NEW MEMBER
   ────────────────────────
   Copy a member object and paste into the right children[] array.
   ════════════════════════════════════════════════════════════ */

const ORG_CHART = {

  /* ════════════════════════════════════════════════════════
     PRESIDENT
     ════════════════════════════════════════════════════════ */
  role: "President",
  name: "Haziq Hisyam",
  photo: "assets/members/KESAN_President_HaziqHisyam.jpg",   // ← replace with "assets/haziq.jpg" when ready
  bio: "Direct. Strategic. Visionary. Anugerah Belia Berkhidmat 2024 recipient, Haziq leads with big dreams and bold clarity. He doesn't just manage — he mobilizes, bringing the best out of every person in the room.",


  /* ════════════════════════════════════════════════════════
     TIER 2 — General Secretary & Finance Officer
     Displayed in the MIDDLE ROW of the chart.
     All still report directly to the President.

     HOW TO UPDATE: change name, bio, or photo path.
     HOW TO ADD:    copy one object and paste into the array.
     ════════════════════════════════════════════════════════ */
  tier2: [

    {
      role: "General Secretary",
      name: "Sarah Mutalif",
      photo: "assets/members/KESAN_GenSec_SarahMutalif.jpg",   // ← replace with "assets/sarah.jpg" when ready
      bio: "Gentle strength, guiding heart. Sarah believes leadership starts with empathy. Her presence is calm, her principles unwavering — mentoring others to grow, with care at the core.",
    },

    {
      role: "Finance Officer",
      name: "Nazeerah Rosli",
      photo: "assets/members/KESAN_FinOfficer_NazeerahRosli.jpg",   // ← replace with "assets/nazeerah.jpg" when ready
      bio: "Structured and sharp — with soul. Behind the numbers is a leader who blends logic with compassion. Living proof that systems can be soulful too.",
    },

  ],


  /* ════════════════════════════════════════════════════════
     TIER 3 — Heads of Department
     Displayed in the BOTTOM ROW of the chart.
     All still report directly to the President.

     Each entry is a HEAD GROUP.
     - If two people share a role, put the second person in "co".
       They will appear SIDE BY SIDE on the chart.
     - If a role has only one person, set co: null.

     HOW TO ADD A NEW HEAD GROUP:
       Copy one full { ... } block and paste into the array.
       Set co: null if the role has only one person.
     ════════════════════════════════════════════════════════ */
  tier3: [

    /* Head of Project — two people side by side */
    {
      role: "Head of Project",
      name: "Halim Kahar",
      photo: "assets/members/KESAN_HOMentoring_HalimKahar.jpg",   // ← replace with "assets/halim.jpg" when ready
      bio: "Leading KESAN's project initiatives — coordinating programs, timelines, and delivery to ensure every initiative creates real impact.",
      co: {
        role: "Head of Project",
        name: "Yazidah Aziz",
        photo: "assets/members/KESAN_HOMentoring_YazidahAziz.jpg",   // ← replace with "assets/yazidah.jpg" when ready
        bio: "Driving KESAN's project work with dedication — ensuring programs are planned, executed, and impactful.",
      }
    },

    /* Head of Branding — two people side by side */
    {
      role: "Head of Branding",
      name: "Muiz Awang",
      photo: "assets/members/KESAN_HOBranding_MuizAwang.jpg",   // ← replace with "assets/muiz.jpg" when ready
      bio: "Shaping KESAN's identity and voice — from visual design to communications, ensuring the organisation's mission is seen and felt.",
      co: {
        role: "Head of Branding",
        name: "Fauzan Aziz",
        photo: "assets/members/KESAN_HOSocMed_FauzanAziz.jpg",   // ← replace with "assets/fauzan.jpg" when ready
        bio: "Crafting KESAN's visual identity and communications — bringing the organisation's mission to life across all platforms.",
      }
    },

    /* Head of Synergy — solo */
    {
      role: "Head of Synergy",
      name: "Hadri Zulhilmi",
      photo: "assets/members/KESAN_HOSynergy_HadriZulhilmi.jpg",   // ← replace with "assets/hadri.jpg" when ready
      bio: "Building bridges between KESAN and its partner institutions — fostering collaboration and expanding the organisation's reach.",
      co: null   // ← add a co object here if a second person joins later
    },

  ],

}; /* end ORG_CHART */
