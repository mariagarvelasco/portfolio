/* ============================================================
   PORTFOLIO CONFIG  —  edit this file to add / remove pieces
   ------------------------------------------------------------
   Everything is grouped by PROJECT (matches the /img/proyecto-*
   folders). Images of the same project stay together in the
   collage. To add an image, drop it in its project folder and
   add an entry to that project's `images` array.

   image entry:
     { src: "img/proyecto-x/file.png", size: "s"|"m"|"l", tilt: -3 }

   STRIP = the "A quick look" row (one piece per project, no repeats).
   ============================================================ */

/* Each project: ONE big hero image (first, size "l"/"xl") + small supports
   ("s"). Only a few images are tilted; the rest sit straight. */
const PROJECTS = [
  {
    n: "01", title: "Die Mensch·Maschine", category: "Art Direction · Vinyl", year: "2025",
    images: [
      { src: "img/proyecto-vinilo/vinyl-kraftwerk.jpg", size: "l", tilt: 0 },
      { src: "img/proyecto-vinilo/_JES1588.JPG",        size: "s", tilt: 3 },
    ],
  },
  {
    n: "02", title: "El Trapiche", category: "Packaging · Wine", year: "2024",
    images: [
      { src: "img/proyecto-vino/wine-glass.jpg", size: "l", tilt: 0 },
      { src: "img/proyecto-vino/wine-hand.jpg",  size: "s", tilt: 0 },
    ],
  },
  {
    n: "03", title: "Babou de Cully", category: "Editorial · Magazine", year: "2024",
    images: [
      { src: "img/proyecto-babou/artista-editorial.jpg", size: "l", tilt: 0 },
      { src: "img/proyecto-babou/babou-editorial.jpg",   size: "s", tilt: 0 },
      { src: "img/proyecto-babou/sushi-menu.jpg",        size: "s", tilt: -3 },
    ],
  },
  {
    n: "04", title: "There’s No End", category: "Social Media · Campaign", year: "2025",
    images: [
      { src: "img/proyecto-socialmedia/Free_Poster_Mockup.jpg", size: "l", tilt: 0 },
      { src: "img/proyecto-socialmedia/mockup-ordenador.jpg",    size: "s", tilt: 0 },
      { src: "img/proyecto-socialmedia/mockup mobil.jpg",        size: "s", tilt: 4 },
    ],
  },
  {
    n: "05", title: "The Pritzker Prize", category: "Editorial · Book", year: "2025",
    images: [
      { src: "img/proyecto-libro/2gif-fotos-llibre.gif", size: "l", tilt: 0 },
    ],
  },
  {
    n: "06", title: "Woven", category: "Textile · Craft", year: "2024",
    images: [
      { src: "img/proyecto-tapiz/fototapiz1.jpg", size: "l", tilt: 0 },
      { src: "img/proyecto-tapiz/fototapiz2.jpg", size: "s", tilt: -3 },
    ],
  },
  {
    n: "07", title: "Clarendon", category: "Type · Specimen", year: "2023",
    images: [
      { src: "img/proyecto-muestra/Screen Recording 2026-07-07 at 15.11.28.gif", size: "l", tilt: 0 },
    ],
  },
  {
    n: "08", title: "Chromatic", category: "Painting · Art", year: "2023",
    images: [
      { src: "img/proyecto-cuadro1/cuadro.jpg", size: "l", tilt: 0 },
    ],
  },
  {
    n: "09", title: "Fotonovela", category: "Editorial · Photobook", year: "2026",
    images: [
      { src: "img/proyecto-fotonovela/foto-libro1.png", size: "l", tilt: 0 },
      { src: "img/proyecto-fotonovela/foto-libro2.png", size: "s", tilt: 0 },
      { src: "img/proyecto-fotonovela/foto-libro3.png", size: "s", tilt: -3 },
    ],
  },
  {
    n: "10", title: "Filmoteca de Catalunya", category: "Branding · Cyanotype", year: "2025",
    images: [
      { src: "img/proyecto-filmoteca/filmo2-web.jpg",      size: "l", tilt: 0 },
      { src: "img/proyecto-filmoteca/foto-libro4-web.jpg", size: "s", tilt: 0 },
      { src: "img/proyecto-filmoteca/filmo1-web.jpg",      size: "s", tilt: -3 },
    ],
  },
];

/* A quick look — ONE photo per project, in the SAME order as the collage.
   3.jpg (Frank Gehry / Pritzker) lives ONLY here, not in the collage. */
const STRIP = [
  { src: "img/proyecto-vinilo/vinyl-kraftwerk.jpg",                          label: "Die Mensch·Maschine", shape: "landscape", tilt: -3 },
  { src: "img/proyecto-vino/wine-glass.jpg",                                 label: "El Trapiche",          shape: "portrait",  tilt: 4 },
  { src: "img/proyecto-babou/artista-editorial.jpg",                         label: "Babou de Cully",       shape: "landscape", tilt: -2 },
  { src: "img/proyecto-socialmedia/Free_Poster_Mockup.jpg",                  label: "There’s No End",       shape: "landscape", tilt: 3 },
  { src: "img/proyecto-libro/3.jpg",                                         label: "The Pritzker Prize",   shape: "landscape", tilt: -3 },
  { src: "img/proyecto-tapiz/fototapiz2.jpg",                                label: "Woven",                shape: "landscape", tilt: 2 },
  { src: "img/proyecto-muestra/clarendon.jpg",                               label: "Clarendon",            shape: "landscape", tilt: -3 },
  { src: "img/proyecto-cuadro1/cuadro.jpg",                                  label: "Chromatic",            shape: "landscape", tilt: 3 },
  { src: "img/proyecto-fotonovela/foto-libro1.png",                          label: "Fotonovela",           shape: "landscape", tilt: -2 },
  { src: "img/proyecto-filmoteca/filmo2-web.jpg",                            label: "Filmoteca de Catalunya", shape: "landscape", tilt: 2 },
];

/* WORK — the projects.html page, rebuilt as ONE continuous canvas that
   mirrors the reference board 1:1: every photo and every text block keeps
   the exact position/size/rotation it has on that board (all values are
   % of the full page, taken straight from the reference's coordinates),
   so projects sit exactly as close together as they do there. */
const WORK = {
  ar: 1440 / 4665,        // reference-page aspect ratio, plus a little extra breathing room
                           // added between the vinyl and wine projects (see below)
  grayFrom: 85.13,        // % down the page where the "Personal Projects" gray panel starts
  items: [
    {
      n: "(01)", title: "Redesign of Die Mensch-Maschine Vinyl", anchors: ["proj-0"],
      desc: "A contemporary redesign of the iconic Die Mensch-Maschine vinyl, inspired by Russian Constructivism. The project combines 2D and 3D elements to reinterpret the original cover, preserving its visual identity while introducing a modern aesthetic through geometry, design, and color.",
      titleL: 29.4, titleT: 3.75, titleV: true,
      numL: 74.9, numT: 5.87,
      descL: 31.67, descT: 12.95, descW: 18,
      images: [
        { src: "img/proyecto-vinilo/vinyl-kraftwerk.jpg", l: 31.67, t: 3.75,  w: 40.9,  r: 0 },
        { src: "img/proyecto-vinilo/_JES1588.JPG",        l: 70.69, t: 6.68,  w: 21.39, r: 0 },
      ],
    },
    {
      n: "(02)", title: "El Trapezista", anchors: ["proj-1"],
      desc: "El Trapezista is a wine label design that blends tradition with a contemporary aesthetic. The project reinterprets classic wine label elements through handcrafted textures, an asymmetric composition, and a pink color palette, featuring Montserrat Mountain as a symbolic reference to the winery.",
      titleL: 55.6, titleT: 14.6, titleV: true,
      numL: 80, numT: 17.8,
      descL: 57.92, descT: 22.35, descW: 15,
      images: [
        { src: "img/proyecto-vino/wine-hand.jpg",      l: 73.96, t: 18.58, w: 14.03, r: 6.9 },
        { src: "img/proyecto-vino/wine-hand2-web.jpg", l: 57.92, t: 14.6,  w: 19.79, r: 0 },
      ],
    },
    {
      n: "(03)", title: "La Santa Biblia", anchors: ["proj-8"],
      desc: "La Santa Biblia is an editorial photo novel that follows a young girl as she uncovers the hidden secrets of her deeply ultra-Catholic family. The project combines photography, editorial design, and layout to create a visual narrative that reinforces the story's atmosphere of mystery and tension.",
      titleL: 3.61, titleT: 14.45, titleV: false,
      numL: 29, numT: 17.8,
      descL: 4.3, descT: 30.88, descW: 18,
      images: [
        { src: "img/proyecto-fotonovela/foto-libro2.png", l: 3.61,  t: 15.16, w: 23.12, r: 0 },
        { src: "img/proyecto-fotonovela/foto-libro1.png", l: 11.88, t: 20.26, w: 30.56, r: 0 },
        { src: "img/proyecto-fotonovela/foto-libro3.png", l: 2.64,  t: 25.55, w: 23.26, r: 0 },
      ],
    },
    {
      n: "(04)", title: "Typographic Specimen Clarendon", anchors: ["proj-6"],
      desc: "A typographic specimen that reinterprets the Clarendon typeface from a contemporary perspective. Through dynamic compositions, visual hierarchies, and the use of color, the project explores the expressive potential of the typeface while demonstrating its application in modern design.",
      titleL: 51.7, titleT: 25.89, titleV: true,
      numL: 86, numT: 28.56,
      descL: 55.5, descT: 31.55, descW: 18, descR: -5.3,
      images: [
        { src: "img/proyecto-muestra/Screen Recording 2026-07-07 at 15.11.28.gif", l: 53.96, t: 25.89, w: 29.79, r: -5.3 },
      ],
    },
    {
      n: "(05)", title: "Babou", anchors: ["proj-2"],
      desc: "Babou is a fold-out brochure designed for Gala, a Barcelona restaurant inspired by Salvador Dalí's surrealism. The project combines a menu and a magazine into a single editorial piece, using dynamic compositions and a clear visual hierarchy to reinterpret the surrealist universe.",
      titleL: 39.6, titleT: 33.59, titleV: true,
      numL: 74.9, numT: 35.3,
      descL: 41.94, descT: 40.59, descW: 18,
      images: [
        { src: "img/proyecto-babou/artista-editorial.jpg", l: 41.94, t: 33.59, w: 30.69, r: 0 },
        { src: "img/proyecto-babou/babou-editorial.jpg",   l: 73.68, t: 36.46, w: 17.78, r: 0 },
        { src: "img/proyecto-babou/sushi-menu.jpg",        l: 65.0,  t: 40.64, w: 13.61, r: -6.3 },
      ],
    },
    {
      n: "(06)", title: "Editorial Reinterpretation of The Pritzker Architecture Prize", anchors: ["proj-4"],
      desc: "An editorial redesign inspired by Frank Gehry's innovative architectural approach. The book transforms reading into an interactive experience through folds, varied page formats, and an unconventional structure that encourages readers to discover the content, translating the architect's experimental and groundbreaking vision into editorial design.",
      titleL: -1.47, titleT: 42.26, titleV: true,
      numL: 28.2, numT: 48.95,
      descL: 0.8, descT: 49.48, descW: 18,
      images: [
        { src: "img/proyecto-libro/2gif-fotos-llibre.gif", l: 0.8, t: 42.26, w: 29.38, r: 0, noShadow: true },
      ],
    },
    {
      n: "(07)", title: "Lift Your Eyes", anchors: ["proj-3"],
      desc: "An awareness campaign addressing thumb scrolling addiction and excessive social media consumption. The project develops a visual identity across posters, videos, and digital advertisements, encouraging viewers to reflect on the time they spend on their screens. Through the message “Lift your eyes. The world's still right here.”, the campaign invites people to reconnect with the world around them.",
      titleL: 22.5, titleT: 51.26, titleV: true,
      numL: 96.9, numT: 59.2,
      descL: 17.92, descT: 62.16, descW: 18,
      images: [
        { src: "img/proyecto-socialmedia/mockup mobil.jpg",       l: 24.79, t: 51.26, w: 28.19, r: 0 },
        { src: "img/proyecto-socialmedia/social-video.gif",       l: 17.92, t: 57.45, w: 22.57, r: 0 },
        { src: "img/proyecto-socialmedia/Free_Poster_Mockup.jpg", l: 50.0,  t: 50.4,  w: 45.56, r: 0 },
        { src: "img/proyecto-socialmedia/mockup-ordenador.jpg",   l: 49.79, t: 58.59, w: 22.99, r: 5.7 },
      ],
    },
    {
      n: "(08)", title: "Filmoteca de Catalunya Visual Identity Redesign", anchors: ["proj-9"],
      desc: "A visual identity redesign for the Filmoteca de Catalunya inspired by the cyanotype process. The project translates the handcrafted, organic, and timeless qualities of this historic photographic technique into a complete visual system, applied across the logo, posters, social media, and digital platforms. Combining the distinctive blue tones of cyanotype with a contemporary aesthetic, the identity celebrates the preservation and heritage of cinema.",
      titleL: 14.54, titleT: 67.07, titleV: true,
      numL: 86.9, numT: 77.5,
      descL: 57.5, descT: 79.47, descW: 18,
      images: [
        { src: "img/proyecto-filmoteca/filmo1-web.jpg",      l: 57.5, t: 73.12, w: 27.08, r: 0 },
        { src: "img/proyecto-filmoteca/foto-libro4-web.jpg", l: 8.06,  t: 76.51, w: 33.19, r: -7.3 },
        { src: "img/proyecto-filmoteca/filmo2-web.jpg",      l: 16.81, t: 67.07, w: 41.94, r: 0, z: 2 },
      ],
    },
    {
      n: "(09)", title: "Personal Projects", anchors: ["proj-5", "proj-7"],
      desc: "Alongside graphic design, I enjoy exploring other forms of artistic expression through personal projects. Painting and experimenting with handcrafted techniques, such as tapestry, allow me to develop new ideas, work with different materials, and nurture my creativity through a more hands-on approach.",
      titleL: 41.2, titleT: 86.01, titleV: true,
      numL: 83.7, numT: 90.5,
      descL: 75.5, descT: 96.9, descW: 18,
      images: [
        { src: "img/proyecto-cuadro1/cuadro-web.jpg", l: 43.47, t: 86.01, w: 37.92, r: 0 },
        { src: "img/proyecto-tapiz/fototapiz1.jpg",   l: 63.19, t: 92.09, w: 22.15, r: 0 },
        { src: "img/proyecto-tapiz/fototapiz2.jpg",   l: 52.36, t: 95.14, w: 14.1,  r: 0 },
      ],
    },
  ],
  /* the María García signature wordmark, sitting in the very back layer —
     three placements, exact position/size/rotation taken from the reference */
  logos: [
    { src: "img/logo-fondo.png", l: 3.61,   t: 6.13,  w: 107.3,  h: 11.04, rot: 0 },
    { src: "img/logo-fondo.png", l: -36.18, t: 37.49, w: 83.96,  h: 8.64,  rot: 90 },
    { src: "img/logo-fondo.png", l: 37.36,  t: 67.65, w: 83.96,  h: 8.64,  rot: 0 },
  ],
  /* small round photo-crops scattered through the whitespace between
     projects, purely decorative — position matches the reference exactly */
  circles: [
    { src: "img/redondas/circle_00.jpg", l: 86.88, t: 3.0 },
    { src: "img/redondas/circle_01.jpg", l: 19.1,  t: 9.17 },
    { src: "img/redondas/circle_02.jpg", l: 51.53, t: 20.47 },
    { src: "img/redondas/circle_03.jpg", l: 1.18,  t: 21.56 },
    { src: "img/redondas/circle_04.jpg", l: 87.64, t: 32.84 },
    { src: "img/redondas/circle_05.jpg", l: 34.93, t: 35.65 },
    { src: "img/redondas/circle_06.jpg", l: 7.85,  t: 41.39 },
    { src: "img/redondas/circle_07.jpg", l: 80.14, t: 43.47 },
    { src: "img/redondas/circle_08.jpg", l: 8.47,  t: 60.99 },
    { src: "img/redondas/circle_09.jpg", l: 84.93, t: 61.59 },
    { src: "img/redondas/circle_10.jpg", l: 3.06,  t: 68.32 },
    { src: "img/redondas/circle_11.jpg", l: 28.75, t: 87.25 },
    { src: "img/redondas/circle_12.jpg", l: 93.89, t: 95.61 },
  ],
};

window.PROJECTS = PROJECTS;
window.STRIP = STRIP;
window.WORK = WORK;
