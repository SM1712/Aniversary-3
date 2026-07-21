export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  date: string;
  caption: string;
  quote?: string;
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
  description: string;
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
    title: "El Comienzo",
    subtitle: "21 de Julio de 2023",
    period: "2023 — 2024",
    description: "Las primeras miradas, las conversas de madrugada y cómo empezó nuestra historia.",
    song: SONGS[1],
    coverImage: "/recursos/IMG-20240427-WA0000.jpg",
    items: [
      {
        id: "m-101",
        type: "image",
        url: "/recursos/IMG-20240427-WA0000.jpg",
        title: "Primeras fotos juntos",
        date: "27 de Abril, 2024",
        caption: "De las primeras fotos que tenemos guardadas.",
        chapterId: 1
      },
      {
        id: "m-102",
        type: "image",
        url: "/recursos/IMG-20240427-WA0002.jpg",
        title: "Esa mirada",
        date: "27 de Abril, 2024",
        caption: "Un instante muy bonito de aquel día.",
        chapterId: 1
      },
      {
        id: "m-103",
        type: "image",
        url: "/recursos/IMG-20240427-WA0012.jpg",
        title: "Complicidad",
        date: "27 de Abril, 2024",
        caption: "Empezando a construir nuestro espacio juntos.",
        chapterId: 1
      },
      {
        id: "m-104",
        type: "image",
        url: "/recursos/IMG-20240427-WA0028.jpg",
        title: "Sonrisas espontáneas",
        date: "27 de Abril, 2024",
        caption: "Nada de poses, solo nosotros siendo nosotros.",
        chapterId: 1
      },
      {
        id: "m-105",
        type: "image",
        url: "/recursos/IMG-20240427-WA0044.jpg",
        title: "Cerca",
        date: "27 de Abril, 2024",
        caption: "Cualquier momento tranquilo a tu lado era perfecto.",
        chapterId: 1
      },
      {
        id: "m-106",
        type: "image",
        url: "/recursos/20240518_205732.jpg",
        title: "Salida nocturna",
        date: "18 de Mayo, 2024",
        caption: "Caminando de noche y platicando de todo.",
        chapterId: 1
      },
      {
        id: "m-107",
        type: "image",
        url: "/recursos/Screenshot_20240626_200028_WhatsApp.jpg",
        title: "Chats de madrugada",
        date: "26 de Junio, 2024",
        caption: "Conversaciones de esas que no querías que terminaran.",
        chapterId: 1
      }
    ]
  },
  {
    id: 2,
    title: "Creciendo Juntos",
    subtitle: "Nuestras salidas y rutinas",
    period: "2024",
    description: "Conociéndonos más, riéndonos de cualquier tontería y disfrutando del día a día.",
    song: SONGS[2],
    coverImage: "/recursos/20240924_212107.jpg",
    items: [
      {
        id: "m-201",
        type: "image",
        url: "/recursos/20240924_212107.jpg",
        title: "Tarde juntos",
        date: "24 de Septiembre, 2024",
        caption: "Tu risa que siempre cambia el ambiente.",
        chapterId: 2
      },
      {
        id: "m-202",
        type: "image",
        url: "/recursos/20241004_110455.jpg",
        title: "Paseo de octubre",
        date: "4 de Octubre, 2024",
        caption: "Aprovechando el día juntos.",
        chapterId: 2
      },
      {
        id: "m-203",
        type: "image",
        url: "/recursos/20241130_110050.jpg",
        title: "Fin de noviembre",
        date: "30 de Noviembre, 2024",
        caption: "El mejor lugar donde estar.",
        chapterId: 2
      },
      {
        id: "m-204",
        type: "image",
        url: "/recursos/20241231_235106.jpg",
        title: "Año Nuevo 2024",
        date: "31 de Diciembre, 2024",
        caption: "Cerrando el año juntos.",
        chapterId: 2
      }
    ]
  },
  {
    id: 3,
    title: "Paso a Paso",
    subtitle: "2025 y 2026",
    period: "2025 — 2026",
    description: "Cada experiencia, viaje y día vivido fortalece lo que tenemos.",
    song: SONGS[3],
    coverImage: "/recursos/20250721_214126.jpg",
    items: [
      {
        id: "m-301",
        type: "image",
        url: "/recursos/20250313_105948.jpg",
        title: "Marzo 2025",
        date: "13 de Marzo, 2025",
        caption: "Día tranquilo de sol.",
        chapterId: 3
      },
      {
        id: "m-302",
        type: "image",
        url: "/recursos/20250423_223832.jpg",
        title: "Cena tranquila",
        date: "23 de Abril, 2025",
        caption: "Compartiendo después de un día largo.",
        chapterId: 3
      },
      {
        id: "m-303",
        type: "image",
        url: "/recursos/20250429_195526.jpg",
        title: "Tardes cotidianas",
        date: "29 de Abril, 2025",
        caption: "Lo sencillo que resulta todo cuando estamos bien.",
        chapterId: 3
      },
      {
        id: "m-304",
        type: "image",
        url: "/recursos/20250515_094749.jpg",
        title: "Salida en mayo",
        date: "15 de Mayo, 2025",
        caption: "Conociendo lugares nuevos.",
        chapterId: 3
      },
      {
        id: "m-305",
        type: "image",
        url: "/recursos/20250521_133559.jpg",
        title: "Mayo soleado",
        date: "21 de Mayo, 2025",
        caption: "Un momento bonito en la tarde.",
        chapterId: 3
      },
      {
        id: "m-306",
        type: "image",
        url: "/recursos/20250521_211048.jpg",
        title: "Noche de mayo",
        date: "21 de Mayo, 2025",
        caption: "Paseo nocturno por la ciudad.",
        chapterId: 3
      },
      {
        id: "m-307",
        type: "image",
        url: "/recursos/20250614_093558.jpg",
        title: "Junio",
        date: "14 de Junio, 2025",
        caption: "Mañana de fin de semana.",
        chapterId: 3
      },
      {
        id: "m-308",
        type: "image",
        url: "/recursos/20250614_130050.jpg",
        title: "Tu sonrisa",
        date: "14 de Junio, 2025",
        caption: "Un retrato espontáneo.",
        chapterId: 3
      },
      {
        id: "m-309",
        type: "image",
        url: "/recursos/20250619_183700.jpg",
        title: "Atardecer",
        date: "19 de Junio, 2025",
        caption: "Viendo caer la tarde.",
        chapterId: 3
      },
      {
        id: "m-3010",
        type: "image",
        url: "/recursos/20250628_095040.jpg",
        title: "Previo al 2do año",
        date: "28 de Junio, 2025",
        caption: "Días previos a cumplir dos años.",
        chapterId: 3
      },
      {
        id: "m-3011",
        type: "image",
        url: "/recursos/20250721_214126.jpg",
        title: "2 Años Juntos",
        date: "21 de Julio, 2025",
        caption: "Celebrando nuestro segundo aniversario.",
        chapterId: 3
      },
      {
        id: "m-3012",
        type: "image",
        url: "/recursos/20250911_211755.jpg",
        title: "Septiembre",
        date: "11 de Septiembre, 2025",
        caption: "Un buen momento para recordar.",
        chapterId: 3
      },
      {
        id: "m-3013",
        type: "image",
        url: "/recursos/20251005_134042.jpg",
        title: "Octubre",
        date: "5 de Octubre, 2025",
        caption: "Día tranquilo juntos.",
        chapterId: 3
      },
      {
        id: "m-3014",
        type: "image",
        url: "/recursos/20251204_181954.jpg",
        title: "Diciembre",
        date: "4 de Diciembre, 2025",
        caption: "Empezando las fechas de fin de año.",
        chapterId: 3
      },
      {
        id: "m-3015",
        type: "image",
        url: "/recursos/20251231_220231.jpg",
        title: "Fin de Año 2025",
        date: "31 de Diciembre, 2025",
        caption: "Recibiendo el 2026 juntos.",
        chapterId: 3
      },
      {
        id: "m-3016",
        type: "image",
        url: "/recursos/IMG-20260124-WA0006.jpg",
        title: "Enero 2026",
        date: "24 de Enero, 2026",
        caption: "Iniciando un nuevo año.",
        chapterId: 3
      },
      {
        id: "m-3017",
        type: "image",
        url: "/recursos/20260210_174107.jpg",
        title: "Febrero",
        date: "10 de Febrero, 2026",
        caption: "Detalles y salidas.",
        chapterId: 3
      },
      {
        id: "m-3018",
        type: "image",
        url: "/recursos/20260210_174520.jpg",
        title: "Retrato",
        date: "10 de Febrero, 2026",
        caption: "Una de mis fotos favoritas tuyas.",
        chapterId: 3
      },
      {
        id: "m-3019",
        type: "image",
        url: "/recursos/IMG-20260210-WA0024.jpg",
        title: "Febrero juntos",
        date: "10 de Febrero, 2026",
        caption: "Un día especial de febrero.",
        chapterId: 3
      },
      {
        id: "m-3020",
        type: "video",
        url: "/recursos/VID-20260331-WA0009.mp4",
        title: "Video gracioso",
        date: "31 de Marzo, 2026",
        caption: "Un video espontáneo que siempre me hace reír.",
        chapterId: 3
      },
      {
        id: "m-3021",
        type: "image",
        url: "/recursos/20260410_211842.jpg",
        title: "Abril 2026",
        date: "10 de Abril, 2026",
        caption: "Paseo de noche.",
        chapterId: 3
      },
      {
        id: "m-3022",
        type: "image",
        url: "/recursos/20260411_155346.jpg",
        title: "Abril",
        date: "11 de Abril, 2026",
        caption: "Tarde con sol.",
        chapterId: 3
      },
      {
        id: "m-3023",
        type: "image",
        url: "/recursos/Screenshot_20260418_164244_Photos.jpg",
        title: "Captura de pantalla",
        date: "18 de Abril, 2026",
        caption: "Guardando un momento que me gustó.",
        chapterId: 3
      }
    ]
  },
  {
    id: 4,
    title: "3 Años",
    subtitle: "21 de Julio de 2026",
    period: "2026 — Presente",
    description: "Hoy celebramos lo que hemos construido y todo lo que viene.",
    song: SONGS[4],
    coverImage: "/recursos/IMG-20260714-WA0005.jpg",
    items: [
      {
        id: "m-401",
        type: "image",
        url: "/recursos/20260501_230353.jpg",
        title: "Mayo 2026",
        date: "1 de Mayo, 2026",
        caption: "Noche tranquila.",
        chapterId: 4
      },
      {
        id: "m-402",
        type: "image",
        url: "/recursos/20260503_182514.jpg",
        title: "Tarde de mayo",
        date: "3 de Mayo, 2026",
        caption: "Atardecer juntos.",
        chapterId: 4
      },
      {
        id: "m-403",
        type: "image",
        url: "/recursos/20260503_182603.jpg",
        title: "Cielo de mayo",
        date: "3 de Mayo, 2026",
        caption: "Viendo caer el sol.",
        chapterId: 4
      },
      {
        id: "m-404",
        type: "image",
        url: "/recursos/IMG-20260506-WA0042.jpg",
        title: "Sonrisas",
        date: "6 de Mayo, 2026",
        caption: "Foto desprevenida.",
        chapterId: 4
      },
      {
        id: "m-405",
        type: "image",
        url: "/recursos/20260508_132526.jpg",
        title: "Día soleado",
        date: "8 de Mayo, 2026",
        caption: "Caminata de tarde.",
        chapterId: 4
      },
      {
        id: "m-406",
        type: "image",
        url: "/recursos/IMG-20260519-WA0054.jpg",
        title: "Momento diario",
        date: "19 de Mayo, 2026",
        caption: "Un detalle sencillo.",
        chapterId: 4
      },
      {
        id: "m-407",
        type: "image",
        url: "/recursos/20260521_223633.jpg",
        title: "Cerca de los 3 años",
        date: "21 de Mayo, 2026",
        caption: "Dos meses antes de nuestro aniversario.",
        chapterId: 4
      },
      {
        id: "m-408",
        type: "image",
        url: "/recursos/20260521_223640.jpg",
        title: "Salida de mayo",
        date: "21 de Mayo, 2026",
        caption: "Cenando juntos.",
        chapterId: 4
      },
      {
        id: "m-409",
        type: "image",
        url: "/recursos/20260531_163242.jpg",
        title: "Cierre de mayo",
        date: "31 de Mayo, 2026",
        caption: "Fin de mes.",
        chapterId: 4
      },
      {
        id: "m-410",
        type: "image",
        url: "/recursos/IMG-20260617-WA0018.jpg",
        title: "Junio",
        date: "17 de Junio, 2026",
        caption: "Un recuerdo de mediados de junio.",
        chapterId: 4
      },
      {
        id: "m-411",
        type: "image",
        url: "/recursos/20260628_183652.jpg",
        title: "Tarde de junio",
        date: "28 de Junio, 2026",
        caption: "Paseando en la tarde.",
        chapterId: 4
      },
      {
        id: "m-412",
        type: "image",
        url: "/recursos/20260629_111620.jpg",
        title: "Luz de día",
        date: "29 de Junio, 2026",
        caption: "Foto limpia de ti.",
        chapterId: 4
      },
      {
        id: "m-413",
        type: "image",
        url: "/recursos/20260629_111634.jpg",
        title: "Risas",
        date: "29 de Junio, 2026",
        caption: "Reviéndonos sin sentido.",
        chapterId: 4
      },
      {
        id: "m-414",
        type: "image",
        url: "/recursos/20260629_143725.jpg",
        title: "Caminata",
        date: "29 de Junio, 2026",
        caption: "Andando por la calle.",
        chapterId: 4
      },
      {
        id: "m-415",
        type: "image",
        url: "/recursos/20260629_160943.jpg",
        title: "Abrazo",
        date: "29 de Junio, 2026",
        caption: "Momento juntos.",
        chapterId: 4
      },
      {
        id: "m-416",
        type: "image",
        url: "/recursos/IMG-20260629-WA0227.jpg",
        title: "Foto guardada",
        date: "29 de Junio, 2026",
        caption: "Un instante de la semana.",
        chapterId: 4
      },
      {
        id: "m-417",
        type: "image",
        url: "/recursos/IMG-20260629-WA0232.jpg",
        title: "Detalle",
        date: "29 de Junio, 2026",
        caption: "Recuerdo de junio.",
        chapterId: 4
      },
      {
        id: "m-418",
        type: "video",
        url: "/recursos/VID-20260702-WA0017.mp4",
        title: "Julio 2026",
        date: "2 de Julio, 2026",
        caption: "Video divertido a pocos días de nuestro aniversario.",
        chapterId: 4
      },
      {
        id: "m-419",
        type: "image",
        url: "/recursos/IMG-20260714-WA0005.jpg",
        title: "Previo a los 3 años",
        date: "14 de Julio, 2026",
        caption: "A una semana del 21 de julio.",
        chapterId: 4
      }
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
