import { Concurso, ConcursoBlanco, misConcursos, misConcursosBlanco, transacciones, transaccionesBlanco, dashboard, dashboardBlanco, miCuenta, miCuentaBlanco, CerrarSesion } from "@/components/icons/sidebar-icons"
import type {
  SidebarItem,
  PaymentMethod,
  TransactionData,
  DashboardStats,
  ContestTableData,
  GameCardData,
  WinnerData,
  PromotionCardData,
  HistoryEntry,
  ProfileData,
  ResultCardData,
  Notification,
  PromotionTableData,
} from "@/types"

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "concursos", label: "Concursos", icon: Concurso, iconBlanco: ConcursoBlanco, href: "/concursos" },
  { id: "mis-concursos", label: "Mis concursos", icon: misConcursos, iconBlanco: misConcursosBlanco, href: "/mis-concursos" },
  { id: "transacciones", label: "Transacciones", icon: transacciones, iconBlanco: transaccionesBlanco, href: "/transacciones" },
  { id: "dashboard", label: "Dashboard", icon: dashboard, iconBlanco: dashboardBlanco, href: "/dashboard" },
  { id: "mi-cuenta", label: "Mi cuenta", icon: miCuenta, iconBlanco: miCuentaBlanco, href: "/mi-cuenta" },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "yape",
    name: "Yape",
    logo: "/placeholder.svg?height=40&width=40",
    color: "bg-purple-600",
  },
  {
    id: "plin",
    name: "Plin",
    logo: "/placeholder.svg?height=40&width=40",
    color: "bg-blue-500",
  },
]

export const TRANSACTIONS: TransactionData = {
  depositos: [
    { id: 1, method: "Yape", amount: 50.0, date: "2024-01-15", status: "Completado" },
    { id: 2, method: "Plin", amount: 100.0, date: "2024-01-14", status: "Pendiente" },
  ],
  recargas: [
    { id: 1, method: "Yape", amount: 25.0, date: "25/09/2024", status: "En proceso" },
    { id: 2, method: "Plin", amount: 40.0, date: "24/09/2024", status: "Aprobado" },
  ],
  retiros: [
    { id: 1, method: "Yape", amount: 30.0, date: "2024-01-11", status: "Procesando" },
    { id: 2, method: "Plin", amount: 60.0, date: "2024-01-10", status: "Completado" },
  ],
}

export const DASHBOARD_STATS: DashboardStats = {
  concursos: {
    total: 100,
    carritos: 75,
    cartas: 25,
  },
  recompensas: [
    { day: "Lun", value: 15 },
    { day: "Ma", value: 25 },
    { day: "Mi", value: 20 },
    { day: "Ju", value: 30 },
    { day: "Vi", value: 10 },
    { day: "Sa", value: 5 },
    { day: "Do", value: 0 },
  ],
  perdidas: [
    { day: "Lun", value: 10 },
    { day: "Ma", value: 15 },
    { day: "Mi", value: 8 },
    { day: "Ju", value: 25 },
    { day: "Vi", value: 12 },
    { day: "Sa", value: 3 },
    { day: "Do", value: 0 },
  ],
}

export const CONTEST_TABLE_DATA: ContestTableData[] = [
  { id: 1, fecha: "14/10/2024", concurso: "Carritos", estado: "En proceso", wcUsadas: 10, recompensa: 12, numOpciones: 2, participantes: 156 },
  { id: 2, fecha: "10/10/2024", concurso: "Cartas", estado: "En proceso", wcUsadas: 15, recompensa: 20, numOpciones: 3, participantes: 89 },
  { id: 3, fecha: "08/10/2024", concurso: "Frutas", estado: "Cerrado", wcUsadas: 5, recompensa: 10, numOpciones: 1, participantes: 234 },
  { id: 4, fecha: "04/10/2024", concurso: "Carritos", estado: "Cerrado", wcUsadas: 10, recompensa: 15, numOpciones: 2, participantes: 67 },
]

export const ANIMAL_GAMES: GameCardData[] = [
  {
    id: "ruleta-animalitos",
    title: "La gran ruleta de animalitos",
    participants: 3,
    image: "/placeholder.svg?height=200&width=300",
    type: "animalitos",
    nextDrawTime: "5:00pm",
    details: {
      id: "ruleta-animalitos",
      title: "La gran ruleta de animalitos",
      slogan: "¡Gira la ruleta y gana grandes premios!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 5,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
        { id: 3, image: "/placeholder.svg?height=50&width=50", number: 3 },
        { id: 4, image: "/placeholder.svg?height=50&width=50", number: 4 },
        { id: 5, image: "/placeholder.svg?height=50&width=50", number: 5 },
        { id: 6, image: "/placeholder.svg?height=50&width=50", number: 6 },
        { id: 7, image: "/placeholder.svg?height=50&width=50", number: 7 },
        { id: 8, image: "/placeholder.svg?height=50&width=50", number: 8 },
      ],
    },
  },
  {
    id: "granja-animalitos",
    title: "La granja de animalitos",
    participants: 8,
    image: "/placeholder.svg?height=200&width=300",
    type: "animalitos",
    nextDrawTime: "6:00pm",
    details: {
      id: "granja-animalitos",
      title: "La granja de animalitos",
      slogan: "¡Apuesta por tus animales favoritos y gana!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 10,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
        { id: 3, image: "/placeholder.svg?height=50&width=50", number: 3 },
        { id: 4, image: "/placeholder.svg?height=50&width=50", number: 4 },
      ],
    },
  },
  {
    id: "los-animalitos",
    title: "Los animalitos",
    participants: 5,
    image: "/placeholder.svg?height=200&width=300",
    type: "animalitos",
    nextDrawTime: "7:00pm",
    details: {
      id: "los-animalitos",
      title: "Los animalitos",
      slogan: "¡Elige tu animal de la suerte y gana!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 7,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
        { id: 3, image: "/placeholder.svg?height=50&width=50", number: 3 },
      ],
    },
  },
  {
    id: "jungle",
    title: "Jungle",
    participants: 12,
    image: "/placeholder.svg?height=200&width=300",
    type: "animalitos",
    nextDrawTime: "8:00pm",
    details: {
      id: "jungle",
      title: "Jungle",
      slogan: "¡Aventúrate en la jungla y descubre tu fortuna!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 15,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
      ],
    },
  },
]

export const CONTEST_GAMES: GameCardData[] = [
  {
    id: "carritos",
    title: "Carritos",
    category: "Carritos",
    participants: 15,
    image: "/placeholder.svg?height=200&width=300",
    type: "contest",
    liveStatus: "En vivo",
    details: {
      id: "carritos",
      title: "Carritos",
      slogan: "¡Únete a la Carrera Virtual de Autos en TikTok!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 5,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
        { id: 3, image: "/placeholder.svg?height=50&width=50", number: 3 },
        { id: 4, image: "/placeholder.svg?height=50&width=50", number: 4 },
        { id: 5, image: "/placeholder.svg?height=50&width=50", number: 5 },
        { id: 6, image: "/placeholder.svg?height=50&width=50", number: 6 },
        { id: 7, image: "/placeholder.svg?height=50&width=50", number: 7 },
        { id: 8, image: "/placeholder.svg?height=50&width=50", number: 8 },
      ],
    },
  },
  {
    id: "cartas",
    title: "Cartas",
    category: "Cartas",
    participants: 8,
    image: "/placeholder.svg?height=200&width=300",
    type: "contest",
    liveStatus: "En vivo",
    details: {
      id: "cartas",
      title: "Cartas",
      slogan: "¡Demuestra tu habilidad en el póker virtual!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 10,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
      ],
    },
  },
  {
    id: "las-frutas",
    title: "Las frutas",
    category: "Las frutas",
    participants: 22,
    image: "/placeholder.svg?height=200&width=300",
    type: "contest",
    liveStatus: "En vivo",
    details: {
      id: "las-frutas",
      title: "Las frutas",
      slogan: "¡Combina las frutas y gana grandes premios!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 8,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
        { id: 3, image: "/placeholder.svg?height=50&width=50", number: 3 },
      ],
    },
  },
  {
    id: "carreras",
    title: "Carreras",
    category: "Carreras",
    participants: 18,
    image: "/placeholder.svg?height=200&width=300",
    type: "contest",
    liveStatus: "En vivo",
    details: {
      id: "carreras",
      title: "Carreras",
      slogan: "¡Siente la adrenalina en cada curva!",
      detailImages: [
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
        "/placeholder.svg?height=250&width=350",
      ],
      participateCost: 12,
      options: [
        { id: 1, image: "/placeholder.svg?height=50&width=50", number: 1 },
        { id: 2, image: "/placeholder.svg?height=50&width=50", number: 2 },
        { id: 3, image: "/placeholder.svg?height=50&width=50", number: 3 },
        { id: 4, image: "/placeholder.svg?height=50&width=50", number: 4 },
      ],
    },
  },
]

export const RESULTS_DATA: ResultCardData[] = [
  {
    id: "ruleta-oct-14-1",
    title: "La gran ruleta",
    amount: "5.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "8:00 pm",
    type: "Animalitos",
  },
  {
    id: "granja-oct-14-1",
    title: "La granja",
    amount: "10.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "7:00 pm",
    type: "Animalitos",
  },
  {
    id: "animalitos-oct-14-1",
    title: "Los animalitos",
    amount: "15.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "6:00 pm",
    type: "Animalitos",
  },
  {
    id: "gran-animalito-oct-14-1",
    title: "Gran animalito",
    amount: "100 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "5:00 pm",
    type: "Animalitos",
  },
  {
    id: "ruleta-oct-14-2",
    title: "La gran ruleta",
    amount: "5.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "2:00 pm",
    type: "Animalitos",
  },
  {
    id: "granja-oct-14-2",
    title: "La granja",
    amount: "10.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "1:00 pm",
    type: "Animalitos",
  },
  {
    id: "animalitos-oct-14-2",
    title: "Los animalitos",
    amount: "15.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "12:00 pm",
    type: "Animalitos",
  },
  {
    id: "gran-animalito-oct-14-2",
    title: "Gran animalito",
    amount: "100 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "10:00 am",
    type: "Animalitos",
  },
  {
    id: "carritos-oct-14-1",
    title: "Carritos",
    amount: "8.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "8:00 pm",
    type: "Concursos",
  },
  {
    id: "cartas-oct-14-1",
    title: "Cartas",
    amount: "20 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "7:00 pm",
    type: "Concursos",
  },
  {
    id: "frutas-oct-14-1",
    title: "Las frutas",
    amount: "6.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "6:00 pm",
    type: "Concursos",
  },
  {
    id: "carreras-oct-14-1",
    title: "Carreras",
    amount: "300 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "5:00 pm",
    type: "Concursos",
  },
  {
    id: "carritos-oct-14-2",
    title: "Carritos",
    amount: "8.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "2:00 pm",
    type: "Concursos",
  },
  {
    id: "cartas-oct-14-2",
    title: "Cartas",
    amount: "20 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "1:00 pm",
    type: "Concursos",
  },
  {
    id: "frutas-oct-14-2",
    title: "Las frutas",
    amount: "6.00 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "12:00 pm",
    type: "Concursos",
  },
  {
    id: "carreras-oct-14-2",
    title: "Carreras",
    amount: "300 wc",
    image: "/placeholder.svg?height=150&width=200",
    time: "10:00 am",
    type: "Concursos",
  },
]

export const WINNERS_DATA: WinnerData[] = [
  {
    id: "ana-lopez",
    name: "Ana López Ortega",
    quote: "Excelente web de concursos. He ganado varias veces. ¡Muy recomendada!",
    date: "Oct 2024",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "luis-ortiz",
    name: "Luis Ortiz Ruiz",
    quote: "Genial para ganar premios, sin límites muchas oportunidades.",
    date: "Sept 2024",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "maria-perez",
    name: "María Pérez Ortega",
    quote: "Concursos justos y emocionantes. ¡Vale la pena participar!",
    date: "Oct 2024",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "miguel-contreras",
    name: "Miguel Contreras Ortega",
    quote: "Página confiable para concursos, me gané y es súper fácil.",
    date: "Oct 2024",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export const PROMOTIONS_DATA: PromotionCardData[] = [
  {
    id: 1,
    title: "Promoción 2x1",
    image: "/placeholder.svg?height=200&width=300",
    status: "activas",
    createdAt: "01/12/2024",
    expiredAt: "31/12/2024",
    details: {
      id: 1,
      title: "Promoción 2x1",
      image: "/placeholder.svg?height=200&width=300",
      breadcrumbs: ["Mi cuenta", "Promociones", "Promoción 2x1"],
      description:
        "¡Listo para sentir la velocidad? Únete a la carrera y aprovecha nuestra oferta especial: ¡Sólo por hoy! realiza un pago único y corre GRATIS con un amigo. ¡Disfruta el doble de la emoción en esta competencia única y comparte la experiencia con quien quieras!",
      howToParticipate: [
        "Inscríbete ahora pagando con Yape:",
        "Realiza un depósito de S/ 5.00 al número 978 000 546",
        "Incluye tu nombre completo, nombre de tu amigo y tu número de contacto en el mensaje del pago.",
        "¡Listo! Tú y tu amigo están inscritos para correr juntos.",
      ],
      termsLink: "#",
    },
  },
  {
    id: 2,
    title: "Promo fruits",
    image: "/placeholder.svg?height=200&width=300",
    status: "vencidas",
    createdAt: "01/11/2024",
    expiredAt: "02/09/2024",
    details: {
      id: 2,
      title: "Promo fruits",
      image: "/placeholder.svg?height=200&width=300",
      breadcrumbs: ["Mi cuenta", "Promociones", "Promo fruits"],
      description: "¡Gana grandes premios con nuestra promo de frutas! Participa y duplica tus ganancias.",
      howToParticipate: [
        "Realiza una recarga mínima de S/ 10.00.",
        "Juega a 'Las frutas' y obtén un bono del 50% en tu primera victoria.",
      ],
      termsLink: "#",
    },
  },
  {
    id: 3,
    title: "Carreras top",
    image: "/placeholder.svg?height=200&width=300",
    status: "solicitadas",
    createdAt: "10/12/2024",
    expiredAt: "15/01/2025",
    details: {
      id: 3,
      title: "Carreras top",
      image: "/placeholder.svg?height=200&width=300",
      breadcrumbs: ["Mi cuenta", "Promociones", "Carreras top"],
      description: "¡Demuestra tus habilidades en las carreras y llévate premios exclusivos!",
      howToParticipate: [
        "Inscríbete en cualquier concurso de carreras.",
        "Termina entre los 3 primeros y recibe un bono adicional de WC.",
      ],
      termsLink: "#",
    },
  },
  {
    id: 4,
    title: "Promoción especial",
    image: "/placeholder.svg?height=200&width=300",
    status: "activas",
    createdAt: "15/12/2024",
    expiredAt: "30/12/2024",
    details: {
      id: 4,
      title: "Promoción especial",
      image: "/placeholder.svg?height=200&width=300",
      breadcrumbs: ["Mi cuenta", "Promociones", "Promoción especial"],
      description: "¡Aprovecha esta oferta limitada por tiempo! Duplica tus ganancias en todos los juegos.",
      howToParticipate: [
        "Realiza una recarga de S/ 20.00 o más.",
        "Juega cualquier juego de la plataforma.",
        "Recibe un bono del 100% en tu primera victoria.",
      ],
      termsLink: "#",
    },
  },
  {
    id: 5,
    title: "Promoción navideña",
    image: "/placeholder.svg?height=200&width=300",
    status: "vencidas",
    createdAt: "01/12/2024",
    expiredAt: "25/12/2024",
    details: {
      id: 5,
      title: "Promoción navideña",
      image: "/placeholder.svg?height=200&width=300",
      breadcrumbs: ["Mi cuenta", "Promociones", "Promoción navideña"],
      description: "¡Celebra la navidad con premios especiales! Participa y gana bonos navideños.",
      howToParticipate: [
        "Realiza una recarga durante diciembre.",
        "Participa en los juegos navideños especiales.",
        "Gana bonos exclusivos de navidad.",
      ],
      termsLink: "#",
    },
  },
  {
    id: 6,
    title: "Promoción de verano",
    image: "/placeholder.svg?height=200&width=300",
    status: "solicitadas",
    createdAt: "20/12/2024",
    expiredAt: "28/02/2025",
    details: {
      id: 6,
      title: "Promoción de verano",
      image: "/placeholder.svg?height=200&width=300",
      breadcrumbs: ["Mi cuenta", "Promociones", "Promoción de verano"],
      description: "¡Disfruta del verano con premios refrescantes! Participa en nuestros juegos de temporada.",
      howToParticipate: [
        "Realiza una recarga durante el verano.",
        "Participa en los juegos de temporada.",
        "Gana premios especiales de verano.",
      ],
      termsLink: "#",
    },
  },
]

export const HISTORY_TRANSACTIONS_DATA: HistoryEntry[] = [
  { id: 1, operation: "Recarga", date: "25/09/2024", amount: 20, status: "En proceso" },
  { id: 2, operation: "Retiro", date: "24/09/2024", amount: 25, status: "Aprobado" },
  { id: 3, operation: "Recarga", date: "23/09/2024", amount: 50, status: "Completado" },
]

export const HISTORY_CONTESTS_DATA: ContestTableData[] = [
  { id: 1, concurso: "Carritos", fecha: "25/09/2024", wcUsadas: 10, numOpciones: 2, estado: "En proceso", recompensa: 0 },
  { id: 2, concurso: "Cartas", fecha: "24/09/2024", wcUsadas: 10, numOpciones: 1, estado: "Cerrado", recompensa: 0 },
]

export const HISTORY_PROMOTIONS_DATA: PromotionTableData[] = [
  { id: 1, nombre: "Promoción 2x1", fechaCanje: "25/09/2024", estado: "En proceso" },
  { id: 2, nombre: "Carreras top", fechaCanje: "24/09/2024", estado: "Aprobado" },
]

export const PROFILE_DATA: ProfileData = {
  tiktokUser: "usuario_tiktok",
  name: "Jesús",
  lastName: "López",
  documentId: "00000000",
  birthDate: "00/00/0000",
  cellphone: "938 000 000",
  nationality: "Peruana",
  city: "Lima",
  district: "Miraflores",
  email: "jesus@gmail.com",
  gender: "Masculino",
  ppe: "No",
  mobileWallet: "Yape",
  mobileWalletPhone: "987654321",
  bankInstitution: "BCP",
  bankAccountNumber: "000 000 000 000",
}

export const NOTIFICATIONS_DATA: Notification[] = [
  {
    id: "1",
    type: "recharge",
    message: "¡Continúa concursando! Se han recargado WC 10 con éxito",
    time: "9:20pm",
    isRead: false,
    details:
      "Hemos validado el depósito realizado a la aplicación de Yape y se han recargado a tu cuenta WC 10. ¡Prepárate, ahora podrás unirte a la diversión y participar en los concursos!",
  },
  {
    id: "2",
    type: "recharge",
    message: "¡Continúa concursando! Se han recargado WC 20 con éxito",
    time: "10 Oct",
    isRead: false,
    details: "Tu recarga de WC 20 ha sido procesada exitosamente. ¡Disfruta de tus juegos favoritos!",
  },
  {
    id: "3",
    type: "promotion",
    message: "Canje de promoción 2x1. El canje se ha realizado con éxito",
    time: "8 Oct",
    isRead: true,
    details: "Felicidades, tu promoción 2x1 ha sido aplicada. ¡Más diversión por el mismo precio!",
  },
  {
    id: "4",
    type: "recharge",
    message: "¡Continúa concursando! Se han recargado WC 30 con éxito",
    time: "9:20pm",
    isRead: false,
    details: "Tu recarga de WC 30 ha sido procesada exitosamente. ¡Disfruta de tus juegos favoritos!",
  },
  {
    id: "5",
    type: "recharge",
    message: "¡Continúa concursando! Se han recargado WC 10 con éxito",
    time: "9:20pm",
    isRead: false,
    details: "Tu recarga de WC 10 ha sido procesada exitosamente. ¡Disfruta de tus juegos favoritos!",
  },
]
