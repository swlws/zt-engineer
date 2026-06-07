export interface FaultType {
  id: number
  label: string
}

export type TicketStatus = 'repairing' | 'in_progress' | 'completed'

export interface Ticket {
  id: number
  number: string
  status: TicketStatus
  statusText: string
  deviceName: string
  deviceCode: string
  deviceModel: string
  repairTime: string
  faultType: string
  description: string
  canEvaluate: boolean
}

export interface TicketDetail {
  id: number
  number: string
  status: TicketStatus
  statusText: string
  deviceName: string
  deviceCode: string
  deviceModel: string
  productionDate: string
  warrantyEndDate: string
  repairPerson: string
  phone: string
  expectTime: string
  address: string
  faultType: string
  description: string
  images: string[]
  repairInfo?: {
    repairTime: string
    repairPerson: string
  }
  canEvaluate: boolean
}

export interface RepairDevice {
  id: number
  name: string
  code: string
  model: string
  productionDate: string
  warrantyEndDate: string
}

export interface RepairSubmitParams {
  deviceId: number
  repairPerson: string
  phone: string
  expectTime: string
  address: string
  faultTypeIds: number[]
  description: string
  images: string[]
}

export interface TicketListParams {
  status?: TicketStatus
  page?: number
  pageSize?: number
}

export interface EvaluationParams {
  ticketId: number
  overall: number
  efficiency: number
  attitude: number
  comment: string
}