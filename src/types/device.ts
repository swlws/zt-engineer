export type DeviceStatus = 'normal' | 'repairing'
export type WarrantyStatus = 'active' | 'expired'

export interface Device {
  id: number
  name: string
  icon: string
  status: DeviceStatus
  statusText: string
  code: string
  model: string
  productionDate: string
  warrantyEndDate: string
  warrantyStatus: WarrantyStatus
  warrantyText: string
}

export interface DeviceListParams {
  status?: DeviceStatus
  keyword?: string
}