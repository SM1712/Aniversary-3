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
  startTime?: number; // Optional offset start in seconds
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
  emotionalText: string;
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
    artist: 'Música Especial',
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
    title: "El Comienzo y Nuestras Primeras Chispas",
    subtitle: "El 21 de Julio de 2023 cambió mi destino para siempre",
    period: "Julio 2023 - Junio 2024",
    description: "Cada historia de amor empieza con una mirada o una conversación que parecía sencilla, pero que terminó cambiando todo el universo.",
    song: SONGS[1],
    coverImage: "/recursos/IMG-20240427-WA0000.jpg",
    emotionalText: "Cuando recuerdo el inicio de todo, me doy cuenta de que no fue casualidad. Desde el primer instante supe que en tu mirada había algo distinto, algo cálido que me hacía sentir como si te conociera de toda la vida.",
    items: [
      {
        id: "m-101",
        type: "image",
        url: "/recursos/IMG-20240427-WA0000.jpg",
        title: "Tus Ojos Dulces",
        date: "27 de Abril, 2024",
        caption: "Una de nuestras primeras fotos guardadas con tanto cariño. Esos ojos que me conquistaron desde el día uno.",
        quote: "En medio de todo el caos del mundo, encontré paz en tu sonrisa.",
        chapterId: 1
      },
      {
        id: "m-102",
        type: "image",
        url: "/recursos/IMG-20240427-WA0002.jpg",
        title: "Momento Especial",
        date: "27 de Abril, 2024",
        caption: "La ternura reflejada en cada gesto. Contigo el tiempo siempre se detiene.",
        quote: "No importa dónde esté, si estoy a tu lado, estoy en casa.",
        chapterId: 1
      },
      {
        id: "m-103",
        type: "image",
        url: "/recursos/IMG-20240427-WA0012.jpg",
        title: "Detalles que Enamoran",
        date: "27 de Abril, 2024",
        caption: "Pequeños recuerdos de cuando empezábamos a construir este mundo solo de los dos.",
        chapterId: 1
      },
      {
        id: "m-104",
        type: "image",
        url: "/recursos/IMG-20240427-WA0028.jpg",
        title: "Mágica Complicidad",
        date: "27 de Abril, 2024",
        caption: "Esa conexión única que solo tú y yo entendemos.",
        chapterId: 1
      },
      {
        id: "m-105",
        type: "image",
        url: "/recursos/IMG-20240427-WA0044.jpg",
        title: "Cerca de Ti",
        date: "27 de Abril, 2024",
        caption: "Cada instante juntos era una afirmación de que esto era especial.",
        chapterId: 1
      },
      {
        id: "m-106",
        type: "image",
        url: "/recursos/20240518_205732.jpg",
        title: "Noche Inolvidable",
        date: "18 de Mayo, 2024",
        caption: "Paseando bajo las luces de la noche, riendo sin parar.",
        quote: "Tú haces que los días comunes se vuelvan recuerdos eternos.",
        chapterId: 1
      },
      {
        id: "m-107",
        type: "image",
        url: "/recursos/Screenshot_20240626_200028_WhatsApp.jpg",
        title: "Mensajes para el Alma",
        date: "26 de Junio, 2024",
        caption: "Aquellas capturas de pantalla de chats nocturnos que leía una y otra vez antes de dormir.",
        quote: "Guardé cada palabra tuya como un tesoro en mi corazón.",
        chapterId: 1
      }
    ]
  },
  {
    id: 2,
    title: "Creciendo, Risas y Aventuras Inolvidables",
    subtitle: "Cuando descubrimos que la vida es infinitamente mejor si vamos de la mano",
    period: "Septiembre 2024 - Diciembre 2024",
    description: "Pasaron los meses y lo que comenzó como un chispazo se convirtió en un fuego cálido que ilumina nuestros días.",
    song: SONGS[2],
    coverImage: "/recursos/20240924_212107.jpg",
    emotionalText: "Risas estruendosas, ocurrencias espontáneas y esa forma maravillosa que tienes de iluminar cualquier lugar. En esta etapa me di cuenta de que no solo eres mi pareja, eres mi mejor amiga y mi cómplice favorita.",
    items: [
      {
        id: "m-201",
        type: "image",
        url: "/recursos/20240924_212107.jpg",
        title: "Atardeceres y Risas",
        date: "24 de Septiembre, 2024",
        caption: "Tu risa contagiosa que ilumina todo mi día.",
        quote: "Contigo reír de la nada es la actividad más bonita del mundo.",
        chapterId: 2
      },
      {
        id: "m-202",
        type: "image",
        url: "/recursos/20241004_110455.jpg",
        title: "Paseo Juntos",
        date: "4 de Octubre, 2024",
        caption: "Caminatas bajo el sol, compartiendo secretos y sueños.",
        chapterId: 2
      },
      {
        id: "m-203",
        type: "image",
        url: "/recursos/20241130_110050.jpg",
        title: "Abrazos Cálidos",
        date: "30 de Noviembre, 2024",
        caption: "Ese abrazo en el que encajo perfectamente y donde el frío desaparece.",
        quote: "En tus brazos el mundo entero guarda silencio.",
        chapterId: 2
      },
      {
        id: "m-204",
        type: "image",
        url: "/recursos/20241231_235106.jpg",
        title: "Cierre de Año 2024",
        date: "31 de Diciembre, 2024",
        caption: "Recibiendo el año nuevo contigo a mi lado, deseando mil años más.",
        quote: "Mi único deseo de año nuevo era que te quedaras para siempre.",
        chapterId: 2
      }
    ]
  },
  {
    id: 3,
    title: "Amándonos Más Fuerte Cada Día",
    subtitle: "Construyendo recuerdos, viajes y complicidad infinita",
    period: "Enero 2025 - Mayo 2026",
    description: "Un recorrido hermoso por el 2025 y principios del 2026 donde nuestro amor superó distancias, rutinas y se volvió indestructible.",
    song: SONGS[3],
    coverImage: "/recursos/20250721_214126.jpg",
    emotionalText: "Ha pasado el tiempo y me sigo asombrando de lo bonito que se siente amarte. Cada viaje, cada salida sencilla para comer, cada foto donde nos miramos... todo confirma lo afortunado que soy.",
    items: [
      {
        id: "m-301",
        type: "image",
        url: "/recursos/20250313_105948.jpg",
        title: "Días Soleados",
        date: "13 de Marzo, 2025",
        caption: "Tu mirada bajo la luz del día, tan radiante como siempre.",
        chapterId: 3
      },
      {
        id: "m-302",
        type: "image",
        url: "/recursos/20250423_223832.jpg",
        title: "Cenas y Charlas",
        date: "23 de Abril, 2025",
        caption: "Compartiendo momentos tranquilos donde lo único que importa somos nosotros.",
        chapterId: 3
      },
      {
        id: "m-303",
        type: "image",
        url: "/recursos/20250429_195526.jpg",
        title: "Complicidad Tarde a Tarde",
        date: "29 de Abril, 2025",
        caption: "La forma en que me miras siempre me desarma.",
        chapterId: 3
      },
      {
        id: "m-304",
        type: "image",
        url: "/recursos/20250515_094749.jpg",
        title: "Aventuras de Mayo",
        date: "15 de Mayo, 2025",
        caption: "Explorando nuevos lugares y tomándonos de la mano.",
        chapterId: 3
      },
      {
        id: "m-305",
        type: "image",
        url: "/recursos/20250521_133559.jpg",
        title: "Luz de Tarde",
        date: "21 de Mayo, 2025",
        caption: "Faltaban solo dos meses para nuestro segundo aniversario.",
        chapterId: 3
      },
      {
        id: "m-306",
        type: "image",
        url: "/recursos/20250521_211048.jpg",
        title: "Noches Magicas",
        date: "21 de Mayo, 2025",
        caption: "Bajo las luces de la ciudad, soñando con nuestro futuro.",
        chapterId: 3
      },
      {
        id: "m-307",
        type: "image",
        url: "/recursos/20250614_093558.jpg",
        title: "Mañanas de Verano",
        date: "14 de Junio, 2025",
        caption: "Una mañana hermosa empezando el día juntos.",
        chapterId: 3
      },
      {
        id: "m-308",
        type: "image",
        url: "/recursos/20250614_130050.jpg",
        title: "Sonrisas Verdaderas",
        date: "14 de Junio, 2025",
        caption: "Cuando sonríes con el alma, todo a mi alrededor cobra sentido.",
        chapterId: 3
      },
      {
        id: "m-309",
        type: "image",
        url: "/recursos/20250619_183700.jpg",
        title: "Atardeceres Dulces",
        date: "19 de Junio, 2025",
        caption: "Viendo caer el sol juntos.",
        chapterId: 3
      },
      {
        id: "m-3010",
        type: "image",
        url: "/recursos/20250628_095040.jpg",
        title: "Pre Aniversario",
        date: "28 de Junio, 2025",
        caption: "La cuenta regresiva para cumplir dos años de amor puro.",
        chapterId: 3
      },
      {
        id: "m-3011",
        type: "image",
        url: "/recursos/20250721_214126.jpg",
        title: "¡Segundo Aniversario!",
        date: "21 de Julio, 2025",
        caption: "Celebrando 2 años juntos. Una noche llena de emoción y brindis.",
        quote: "Dos años se sintieron como un suspiro hermoso, pero valieron toda una vida.",
        chapterId: 3
      },
      {
        id: "m-3012",
        type: "image",
        url: "/recursos/20250911_211755.jpg",
        title: "Septiembre Romántico",
        date: "11 de Septiembre, 2025",
        caption: "Cada mes a tu lado es una bendición.",
        chapterId: 3
      },
      {
        id: "m-3013",
        type: "image",
        url: "/recursos/20251005_134042.jpg",
        title: "Octubre Cálido",
        date: "5 de Octubre, 2025",
        caption: "Días llenos de ternura.",
        chapterId: 3
      },
      {
        id: "m-3014",
        type: "image",
        url: "/recursos/20251204_181954.jpg",
        title: "Luces de Diciembre",
        date: "4 de Diciembre, 2025",
        caption: "El espíritu navideño nos envolvió con calidez.",
        chapterId: 3
      },
      {
        id: "m-3015",
        type: "image",
        url: "/recursos/20251231_220231.jpg",
        title: "Fin de Año 2025",
        date: "31 de Diciembre, 2025",
        caption: "Despidiendo otro año de crecimiento y amor verdadero.",
        chapterId: 3
      },
      {
        id: "m-3016",
        type: "image",
        url: "/recursos/IMG-20260124-WA0006.jpg",
        title: "Bienvenido 2026",
        date: "24 de Enero, 2026",
        caption: "Empezando un nuevo año con la firme certeza de que somos el uno para el otro.",
        chapterId: 3
      },
      {
        id: "m-3017",
        type: "image",
        url: "/recursos/20260210_174107.jpg",
        title: "Febrero Dulce",
        date: "10 de Febrero, 2026",
        caption: "Preparando sorpresas y llenándonos de detalles.",
        chapterId: 3
      },
      {
        id: "m-3018",
        type: "image",
        url: "/recursos/20260210_174520.jpg",
        title: "Tu Mirada Sincera",
        date: "10 de Febrero, 2026",
        caption: "Me vuelves a enamorar todos los días con la misma facilidad.",
        chapterId: 3
      },
      {
        id: "m-3019",
        type: "image",
        url: "/recursos/IMG-20260210-WA0024.jpg",
        title: "San Valentín Especial",
        date: "10 de Febrero, 2026",
        caption: "Celebrando el amor todos los días, no solo en fechas especiales.",
        chapterId: 3
      },
      {
        id: "m-3020",
        type: "video",
        url: "/recursos/VID-20260331-WA0009.mp4",
        title: "Risas en Video",
        date: "31 de Marzo, 2026",
        caption: "Esos segundos de video espontáneo donde la felicidad se desborda.",
        quote: "Tu risa grabada es mi melodía favorita.",
        chapterId: 3
      },
      {
        id: "m-3021",
        type: "image",
        url: "/recursos/20260410_211842.jpg",
        title: "Abril de Abrazos",
        date: "10 de Abril, 2026",
        caption: "Paseando juntos bajo la luz de las velas y la ciudad.",
        chapterId: 3
      },
      {
        id: "m-3022",
        type: "image",
        url: "/recursos/20260411_155346.jpg",
        title: "Foto Inolvidable",
        date: "11 de Abril, 2026",
        caption: "Un retrato lleno de vida y color de ti.",
        chapterId: 3
      },
      {
        id: "m-3023",
        type: "image",
        url: "/recursos/Screenshot_20260418_164244_Photos.jpg",
        title: "Captura de Amor",
        date: "18 de Abril, 2026",
        caption: "Guardando nuestros momentos favoritos para no olvidarlos jamás.",
        chapterId: 3
      }
    ]
  },
  {
    id: 4,
    title: "Tres Años Juntos y Para Siempre Tú",
    subtitle: "21 de Julio de 2026: 'La que me gusta a mí'",
    period: "Mayo 2026 - Presente",
    description: "El presente luminoso, el camino recorrido y la promesa de seguir construyendo historias por siempre.",
    song: SONGS[4],
    coverImage: "/recursos/IMG-20260714-WA0005.jpg",
    emotionalText: "Llegamos a este 21 de julio de 2026 cumpliendo 3 años maravillosos juntos. Si me preguntaras qué cambiaría de nuestra historia, te diría que absolutamente nada. Eres la persona más increíble, hermosa y especial de mi universo.",
    items: [
      {
        id: "m-401",
        type: "image",
        url: "/recursos/20260501_230353.jpg",
        title: "Mayo de Ilusión",
        date: "1 de Mayo, 2026",
        caption: "Noches conversando sobre el futuro y todo lo que vendrá.",
        chapterId: 4
      },
      {
        id: "m-402",
        type: "image",
        url: "/recursos/20260503_182514.jpg",
        title: "Atardecer de Mayo",
        date: "3 de Mayo, 2026",
        caption: "Juntos observando el sol caer.",
        chapterId: 4
      },
      {
        id: "m-403",
        type: "image",
        url: "/recursos/20260503_182603.jpg",
        title: "Colores de Atardecer",
        date: "3 de Mayo, 2026",
        caption: "El cielo se tiñe de rosa y dorado, igual que nuestro amor.",
        chapterId: 4
      },
      {
        id: "m-404",
        type: "image",
        url: "/recursos/IMG-20260506-WA0042.jpg",
        title: "Sorrisas Cómplices",
        date: "6 de Mayo, 2026",
        caption: "Una foto espontánea que demuestra lo bien que nos la pasamos.",
        chapterId: 4
      },
      {
        id: "m-405",
        type: "image",
        url: "/recursos/20260508_132526.jpg",
        title: "Tardes de Sol",
        date: "8 de Mayo, 2026",
        caption: "Tus gestos que me alegran la existencia.",
        chapterId: 4
      },
      {
        id: "m-406",
        type: "image",
        url: "/recursos/IMG-20260519-WA0054.jpg",
        title: "Detalles Bonitos",
        date: "19 de Mayo, 2026",
        caption: "Pequeños momentos de cariño cotidiano.",
        chapterId: 4
      },
      {
        id: "m-407",
        type: "image",
        url: "/recursos/20260521_223633.jpg",
        title: "Cerca de Cumplir 3 Años",
        date: "21 de Mayo, 2026",
        caption: "Exactamente a 2 meses del gran día.",
        chapterId: 4
      },
      {
        id: "m-408",
        type: "image",
        url: "/recursos/20260521_223640.jpg",
        title: "Noche Especial",
        date: "21 de Mayo, 2026",
        caption: "Celebrando cada mesversario con la misma ilusión.",
        chapterId: 4
      },
      {
        id: "m-409",
        type: "image",
        url: "/recursos/20260531_163242.jpg",
        title: "Fin de Mayo",
        date: "31 de Mayo, 2026",
        caption: "El tiempo pasa volando cuando se es feliz.",
        chapterId: 4
      },
      {
        id: "m-410",
        type: "image",
        url: "/recursos/IMG-20260617-WA0018.jpg",
        title: "Junio Dulce",
        date: "17 de Junio, 2026",
        caption: "La calidez de tu amor me acompaña a donde sea que vaya.",
        chapterId: 4
      },
      {
        id: "m-411",
        type: "image",
        url: "/recursos/20260628_183652.jpg",
        title: "Atardeceres de Junio",
        date: "28 de Junio, 2026",
        caption: "Paseos de tarde contemplando la vida juntos.",
        chapterId: 4
      },
      {
        id: "m-412",
        type: "image",
        url: "/recursos/20260629_111620.jpg",
        title: "Mirada Luminosa",
        date: "29 de Junio, 2026",
        caption: "Tu carita hermosa que nunca deja de maravillarme.",
        chapterId: 4
      },
      {
        id: "m-413",
        type: "image",
        url: "/recursos/20260629_111634.jpg",
        title: "Risas Incontrolables",
        date: "29 de Junio, 2026",
        caption: "Cuando nos reímos hasta que nos duele la panza.",
        chapterId: 4
      },
      {
        id: "m-414",
        type: "image",
        url: "/recursos/20260629_143725.jpg",
        title: "Paseos Especiales",
        date: "29 de Junio, 2026",
        caption: "Caminando juntos hacia el mismo destino.",
        chapterId: 4
      },
      {
        id: "m-415",
        type: "image",
        url: "/recursos/20260629_160943.jpg",
        title: "Abrazo de Junio",
        date: "29 de Junio, 2026",
        caption: "Contigo el refugio perfecto existe.",
        chapterId: 4
      },
      {
        id: "m-416",
        type: "image",
        url: "/recursos/IMG-20260629-WA0227.jpg",
        title: "Foto Recuerdo",
        date: "29 de Junio, 2026",
        caption: "Un instante perfecto atrapado para siempre.",
        chapterId: 4
      },
      {
        id: "m-417",
        type: "image",
        url: "/recursos/IMG-20260629-WA0232.jpg",
        title: "Ternura",
        date: "29 de Junio, 2026",
        caption: "Tu dulzura infinita que me enamora.",
        chapterId: 4
      },
      {
        id: "m-418",
        type: "video",
        url: "/recursos/VID-20260702-WA0017.mp4",
        title: "Video Aventurero de Julio",
        date: "2 de Julio, 2026",
        caption: "Pocos días antes de nuestro aniversario. ¡Lo divertida y auténtica que eres!",
        quote: "Eres mi aventura favorita de todos los días.",
        chapterId: 4
      },
      {
        id: "m-419",
        type: "image",
        url: "/recursos/IMG-20260714-WA0005.jpg",
        title: "Previo a los 3 Años",
        date: "14 de Julio, 2026",
        caption: "A solo una semana de cumplir nuestros 3 años juntos. El regalo más bello del mundo eres tú.",
        quote: "No importa el tiempo que pase, tú siempre vas a ser la que me gusta a mí.",
        chapterId: 4
      }
    ]
  }
];

export const LOVE_REASONS: string[] = [
  "Por la forma en que tus ojos brillan cuando te ríes de verdad.",
  "Porque tus abrazos tienen el poder mágico de calmar cualquier día difícil.",
  "Por cómo me agarras la mano sin pensarlo cuando caminamos.",
  "Porque contigo puedo ser completamente yo mismo sin miedo.",
  "Por tu voz dulce haciéndome compañía en las llamadas nocturnas.",
  "Porque eres mi persona favorita para compartir cualquier comida deliciosa.",
  "Por la ternura con la que me miras incluso cuando no me doy cuenta.",
  "Porque tienes la risa más bonita y contagiosa del mundo entero.",
  "Por cada detalle espontáneo y cada mensajito bonito que me mandas.",
  "Porque estos 3 años a tu lado han sido los más felices de toda mi vida.",
  "Por la paz inmensa que siento cuando te recuestas en mi pecho.",
  "Porque me haces querer ser una mejor persona cada solo día.",
  "Por tu inteligencia, tu fortaleza y tu corazón tan puro.",
  "Porque incluso los días más grises se vuelven de colores a tu lado.",
  "Por la forma en que me cuidas y te preocupas sinceramente por mí.",
  "Porque contigo viajar o no hacer nada en casa es igualmente divertido.",
  "Por todas nuestras bromas internas que solo tú y yo entendemos.",
  "Porque en un mundo lleno de prisa, estar contigo se siente como llegar a casa.",
  "Por tu carita linda en las fotos y en la vida real.",
  "Porque desde el 21 de julio de 2023 mi vida cambió para bien en todos los sentidos.",
  "Por la complicidad que tenemos en una sola mirada across the room.",
  "Because I want to hold your hand por el resto de mis días.",
  "Porque no importa cuántos años pasen, tú sigues siendo la que me gusta a mí."
];
