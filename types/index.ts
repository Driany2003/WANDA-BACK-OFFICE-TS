export interface SidebarItem {
  id: string
  label: string
  icon: any
  iconBlanco?: any
  href: string
}

export interface PaymentMethod {
  id: string
  name: string
  logo: string
  color: string
}

export interface Transaction {
  id: number
  method: string
  amount: number
  date: string
  status: string
}

export interface TransactionData {
  depositos: Transaction[]
  recargas: Transaction[]
  retiros: Transaction[]
}

export interface DashboardStats {
  concursos: {
    total: number
    carritos: number
    cartas: number
  }
  ingresos: {
    total: number
    permanentes: number
    temporales: number
  }
  salidas: {
    total: number
    aprobadas: number
    enProceso: number
  }
  recompensas: Array<{ day: string; value: number }>
  perdidas: Array<{ day: string; value: number }>
}

export interface ContestTableData {
  id: number
  fecha: string
  concurso: string
  estado: string
  wcUsadas: number
  recompensa: number
  numOpciones: number
  participantes?: number
}

export type GameType = "animalitos" | "contest"

export interface GameCardData {
  // Renamed from GameCard to avoid conflict with component
  id: string
  title: string
  participants: number
  image: string
  category?: string
  type: GameType
  nextDrawTime?: string // For animalitos
  liveStatus?: string // For contests (e.g., "En vivo")
  details: GameDetails // Link to full details
}

export interface GameDetails {
  id: string
  title: string
  slogan: string
  detailImages: string[]
  participateCost: number
  options: { id: number; image: string; number?: number }[] // Added number for selection modal
}

export interface ResultCardData {
  id: string
  title: string
  amount: string
  image: string
  time?: string // e.g., "8:00 pm"
  type: "Animalitos" | "Concursos" // Added type for filtering
}

export interface PromotionCardData {
  id: number
  title: string
  image: string
  status: "activas" | "vencidas" | "solicitadas"
  createdAt: string
  expiredAt: string
  details: PromotionDetails
}

export interface PromotionDetails {
  id: number
  title: string
  image: string
  breadcrumbs: string[]
  description: string
  howToParticipate: string[]
  termsLink: string
}

export interface HistoryEntry {
  id: number
  operation: string
  date: string
  amount: number
  status: string
}

export interface PromotionTableData {
  id: number
  nombre: string
  fechaCanje: string
  estado: string
}

export interface ProfileData {
  tiktokUser: string
  name: string
  lastName: string
  documentId: string
  birthDate: string
  cellphone: string
  nationality: string
  city: string
  district: string
  email: string
  gender: string
  ppe: string
  mobileWallet: string
  mobileWalletPhone: string
  bankInstitution: string
  bankAccountNumber: string
}

export interface DateRangeSelectProps {
  onSelectChange: (value: string) => void
  selectedValue?: string
}

export interface WinnerData {
  // Renamed from Winner to avoid conflict with component
  id: string
  name: string
  quote: string
  date: string
  avatar: string
}

// New Notification Interface
export interface Notification {
  id: string
  type: "recharge" | "promotion" | "general"
  message: string
  time: string // e.g., "9:20pm" or "10 Oct"
  isRead: boolean
  details: string // For the larger modal
}

// New SelectedOption for the game confirmation modal
export interface SelectedOption {
  id: string
  image: string
  number: number
}
