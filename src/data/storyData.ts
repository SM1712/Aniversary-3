export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  date: string;
  chapterId: number;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  startTime?: number;
  chapterId: number;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  song: SongTrack;
  coverImage: string;
  items: MediaItem[];
}

export const SONGS: Record<number, SongTrack> = {
  1: {
    id: 'song-1',
    title: 'I Want to Hold Your Hand',
    artist: 'The Beatles',
    src: '/recursos/I want to hold your hand.mp3',
    startTime: 0,
    chapterId: 1,
  },
  2: {
    id: 'song-2',
    title: 'Dinamite',
    artist: 'BTS',
    src: '/recursos/Dinamite.mp3',
    startTime: 0,
    chapterId: 2,
  },
  3: {
    id: 'song-3',
    title: 'Super Estrella',
    artist: 'Especial',
    src: '/recursos/Super estrella.mp3',
    startTime: 0,
    chapterId: 3,
  },
  4: {
    id: 'song-4',
    title: 'La Que Me Gusta A Mí',
    artist: 'Los Amigos Invisibles',
    src: '/recursos/La que me gusta a mi.mp3',
    startTime: 0,
    chapterId: 4,
  },
};

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Etapa 1",
    subtitle: "21 de Julio de 2023",
    period: "2023 — 2024",
    song: SONGS[1],
    coverImage: "/recursos/IMG-20240427-WA0000.jpg",
    items: [
      { id: "m-101", type: "image", url: "/recursos/IMG-20240427-WA0000.jpg", date: "27 de Abril, 2024", chapterId: 1 },
      { id: "m-102", type: "image", url: "/recursos/IMG-20240427-WA0002.jpg", date: "27 de Abril, 2024", chapterId: 1 },
      { id: "m-103", type: "image", url: "/recursos/IMG-20240427-WA0012.jpg", date: "27 de Abril, 2024", chapterId: 1 },
      { id: "m-104", type: "image", url: "/recursos/IMG-20240427-WA0028.jpg", date: "27 de Abril, 2024", chapterId: 1 },
      { id: "m-105", type: "image", url: "/recursos/IMG-20240427-WA0044.jpg", date: "27 de Abril, 2024", chapterId: 1 },
      { id: "m-106", type: "image", url: "/recursos/20240518_205732.jpg", date: "18 de Mayo, 2024", chapterId: 1 },
      { id: "m-107", type: "image", url: "/recursos/Screenshot_20240626_200028_WhatsApp.jpg", date: "26 de Junio, 2024", chapterId: 1 }
    ]
  },
  {
    id: 2,
    title: "Etapa 2",
    subtitle: "2024",
    period: "2024",
    song: SONGS[2],
    coverImage: "/recursos/20240924_212107.jpg",
    items: [
      { id: "m-201", type: "image", url: "/recursos/20240924_212107.jpg", date: "24 de Septiembre, 2024", chapterId: 2 },
      { id: "m-202", type: "image", url: "/recursos/20241004_110455.jpg", date: "4 de Octubre, 2024", chapterId: 2 },
      { id: "m-203", type: "image", url: "/recursos/20241130_110050.jpg", date: "30 de Noviembre, 2024", chapterId: 2 },
      { id: "m-204", type: "image", url: "/recursos/20241231_235106.jpg", date: "31 de Diciembre, 2024", chapterId: 2 }
    ]
  },
  {
    id: 3,
    title: "Etapa 3",
    subtitle: "2025 — 2026",
    period: "2025 — 2026",
    song: SONGS[3],
    coverImage: "/recursos/20250721_214126.jpg",
    items: [
      { id: "m-301", type: "image", url: "/recursos/20250313_105948.jpg", date: "13 de Marzo, 2025", chapterId: 3 },
      { id: "m-302", type: "image", url: "/recursos/20250423_223832.jpg", date: "23 de Abril, 2025", chapterId: 3 },
      { id: "m-303", type: "image", url: "/recursos/20250429_195526.jpg", date: "29 de Abril, 2025", chapterId: 3 },
      { id: "m-304", type: "image", url: "/recursos/20250515_094749.jpg", date: "15 de Mayo, 2025", chapterId: 3 },
      { id: "m-305", type: "image", url: "/recursos/20250521_133559.jpg", date: "21 de Mayo, 2025", chapterId: 3 },
      { id: "m-306", type: "image", url: "/recursos/20250521_211048.jpg", date: "21 de Mayo, 2025", chapterId: 3 },
      { id: "m-307", type: "image", url: "/recursos/20250614_093558.jpg", date: "14 de Junio, 2025", chapterId: 3 },
      { id: "m-308", type: "image", url: "/recursos/20250614_130050.jpg", date: "14 de Junio, 2025", chapterId: 3 },
      { id: "m-309", type: "image", url: "/recursos/20250619_183700.jpg", date: "19 de Junio, 2025", chapterId: 3 },
      { id: "m-3010", type: "image", url: "/recursos/20250628_095040.jpg", date: "28 de Junio, 2025", chapterId: 3 },
      { id: "m-3011", type: "image", url: "/recursos/20250721_214126.jpg", date: "21 de Julio, 2025", chapterId: 3 },
      { id: "m-3012", type: "image", url: "/recursos/20250911_211755.jpg", date: "11 de Septiembre, 2025", chapterId: 3 },
      { id: "m-3013", type: "image", url: "/recursos/20251005_134042.jpg", date: "5 de Octubre, 2025", chapterId: 3 },
      { id: "m-3014", type: "image", url: "/recursos/20251204_181954.jpg", date: "4 de Diciembre, 2025", chapterId: 3 },
      { id: "m-3015", type: "image", url: "/recursos/20251231_220231.jpg", date: "31 de Diciembre, 2025", chapterId: 3 },
      { id: "m-3016", type: "image", url: "/recursos/IMG-20260124-WA0006.jpg", date: "24 de Enero, 2026", chapterId: 3 },
      { id: "m-3017", type: "image", url: "/recursos/20260210_174107.jpg", date: "10 de Febrero, 2026", chapterId: 3 },
      { id: "m-3018", type: "image", url: "/recursos/20260210_174520.jpg", date: "10 de Febrero, 2026", chapterId: 3 },
      { id: "m-3019", type: "image", url: "/recursos/IMG-20260210-WA0024.jpg", date: "10 de Febrero, 2026", chapterId: 3 },
      { id: "m-3020", type: "video", url: "/recursos/VID-20260331-WA0009.mp4", date: "31 de Marzo, 2026", chapterId: 3 },
      { id: "m-3021", type: "image", url: "/recursos/20260410_211842.jpg", date: "10 de Abril, 2026", chapterId: 3 },
      { id: "m-3022", type: "image", url: "/recursos/20260411_155346.jpg", date: "11 de Abril, 2026", chapterId: 3 },
      { id: "m-3023", type: "image", url: "/recursos/Screenshot_20260418_164244_Photos.jpg", date: "18 de Abril, 2026", chapterId: 3 }
    ]
  },
  {
    id: 4,
    title: "Etapa 4",
    subtitle: "21 de Julio de 2026",
    period: "2026",
    song: SONGS[4],
    coverImage: "/recursos/IMG-20260714-WA0005.jpg",
    items: [
      { id: "m-401", type: "image", url: "/recursos/20260501_230353.jpg", date: "1 de Mayo, 2026", chapterId: 4 },
      { id: "m-402", type: "image", url: "/recursos/20260503_182514.jpg", date: "3 de Mayo, 2026", chapterId: 4 },
      { id: "m-403", type: "image", url: "/recursos/20260503_182603.jpg", date: "3 de Mayo, 2026", chapterId: 4 },
      { id: "m-404", type: "image", url: "/recursos/IMG-20260506-WA0042.jpg", date: "6 de Mayo, 2026", chapterId: 4 },
      { id: "m-405", type: "image", url: "/recursos/20260508_132526.jpg", date: "8 de Mayo, 2026", chapterId: 4 },
      { id: "m-406", type: "image", url: "/recursos/IMG-20260519-WA0054.jpg", date: "19 de Mayo, 2026", chapterId: 4 },
      { id: "m-407", type: "image", url: "/recursos/20260521_223633.jpg", date: "21 de Mayo, 2026", chapterId: 4 },
      { id: "m-408", type: "image", url: "/recursos/20260521_223640.jpg", date: "21 de Mayo, 2026", chapterId: 4 },
      { id: "m-409", type: "image", url: "/recursos/20260531_163242.jpg", date: "31 de Mayo, 2026", chapterId: 4 },
      { id: "m-410", type: "image", url: "/recursos/IMG-20260617-WA0018.jpg", date: "17 de Junio, 2026", chapterId: 4 },
      { id: "m-411", type: "image", url: "/recursos/20260628_183652.jpg", date: "28 de Junio, 2026", chapterId: 4 },
      { id: "m-412", type: "image", url: "/recursos/20260629_111620.jpg", date: "29 de Junio, 2026", chapterId: 4 },
      { id: "m-413", type: "image", url: "/recursos/20260629_111634.jpg", date: "29 de Junio, 2026", chapterId: 4 },
      { id: "m-414", type: "image", url: "/recursos/20260629_143725.jpg", date: "29 de Junio, 2026", chapterId: 4 },
      { id: "m-415", type: "image", url: "/recursos/20260629_160943.jpg", date: "29 de Junio, 2026", chapterId: 4 },
      { id: "m-416", type: "image", url: "/recursos/IMG-20260629-WA0227.jpg", date: "29 de Junio, 2026", chapterId: 4 },
      { id: "m-417", type: "image", url: "/recursos/IMG-20260629-WA0232.jpg", date: "29 de Junio, 2026", chapterId: 4 },
      { id: "m-418", type: "video", url: "/recursos/VID-20260702-WA0017.mp4", date: "2 de Julio, 2026", chapterId: 4 },
      { id: "m-419", type: "image", url: "/recursos/IMG-20260714-WA0005.jpg", date: "14 de Julio, 2026", chapterId: 4 }
    ]
  }
];

export const LOVE_REASONS: string[] = [
  "Tu forma sincera de reírte cuando estás feliz.",
  "La tranquilidad que me da platicar contigo de cualquier cosa.",
  "Cómo me agarras la mano sin darte cuenta cuando caminamos.",
  "Porque puedo ser completamente yo mismo contigo.",
  "Lo bien que la pasamos juntos hasta en los días más sencillos.",
  "Tu paciencia y la forma en que me escuchas.",
  "Porque estos 3 años han sido lo mejor de mi vida.",
  "La complicidad que tenemos sin necesidad de hablar.",
  "Porque no importa cuántos años pasen, tú sigues siendo la que me gusta a mí."
];
