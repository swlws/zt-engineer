export type TicketStatus = 'pending' | 'paused' | 'processing' | 'completed'

export interface Ticket {
  id: number
  number: string
  status: TicketStatus
  statusText: string
  deviceCode: string
  deviceName: string
  deviceModel: string
  reportTime: string
  reporter: string
  faultType: string
  description: string
  address: string
}

export interface RepairRecord {
  repairTime: string
  repairEngineer: string
  content: string
  images: string[]
}

export interface TicketDetail extends Ticket {
  contactPhone: string
  productionDate: string
  warrantyDate: string
  expectTime: string
  faultTags: string[]
  medias: string[]
  repairRecord?: RepairRecord
}

export interface TicketListParams {
  status?: TicketStatus
}

export interface TicketProcessParams {
  ticketId: number
  status: Extract<TicketStatus, 'paused' | 'completed'>
  content: string
  images: string[]
}

export interface Engineer {
  id: number
  name: string
  company: string
  role: string
}

export interface TransferTicketParams {
  ticketId: number
  engineerId: number
}
