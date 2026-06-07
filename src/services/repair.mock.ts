import type { FaultType, RepairDevice, Ticket, TicketDetail, RepairSubmitParams, EvaluationParams } from '@/types/repair'

const mockFaultTypes: FaultType[] = [
  { id: 1, label: '视觉昏暗、亮度不足' },
  { id: 2, label: '重影、像散、色彩畸变' },
  { id: 3, label: '调焦故障' },
  { id: 4, label: '载物台故障' },
  { id: 5, label: '灯光闪烁忽明忽暗' },
  { id: 6, label: '其他' },
]

const mockRepairDevices: RepairDevice[] = [
  {
    id: 1,
    name: 'VMS系列手动影像测量仪',
    code: 'WH00000001',
    model: 'VMS-3020',
    productionDate: '2025年6月30日',
    warrantyEndDate: '2028年6月30日',
  },
  {
    id: 2,
    name: '全自动三坐标测量仪',
    code: 'WH00000002',
    model: 'CMM-8106',
    productionDate: '2024年3月15日',
    warrantyEndDate: '2027年3月15日',
  },
]

const mockTickets: Ticket[] = [
  {
    id: 1,
    number: 'NO000001',
    status: 'repairing',
    statusText: '报修中',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    repairTime: '2026-06-07 10:30',
    faultType: '调焦故障',
    description: '设备调焦困难，无法清晰对焦，尝试多次调整无效',
    canEvaluate: false,
  },
  {
    id: 2,
    number: 'NO000002',
    status: 'in_progress',
    statusText: '维修中',
    deviceName: '全自动三坐标测量仪',
    deviceCode: 'WH00000002',
    deviceModel: 'CMM-8106',
    repairTime: '2026-06-05 14:20',
    faultType: '灯光闪烁忽明忽暗',
    description: '设备灯光不稳定，使用过程中频繁闪烁',
    canEvaluate: false,
  },
  {
    id: 3,
    number: 'NO000003',
    status: 'completed',
    statusText: '已完成',
    deviceName: 'VMS系列手动影像测量仪',
    deviceCode: 'WH00000001',
    deviceModel: 'VMS-3020',
    repairTime: '2026-06-01 09:00',
    faultType: '其他',
    description: '设备出现异常噪音，需要检修',
    canEvaluate: true,
  },
]

const mockTicketDetail: TicketDetail = {
  id: 1,
  number: 'NO000003',
  status: 'completed',
  statusText: '已完成',
  deviceName: 'VMS系列手动影像测量仪',
  deviceCode: 'WH00000001',
  deviceModel: 'VMS-3020',
  productionDate: '2025年6月30日',
  warrantyEndDate: '2028年6月30日',
  repairPerson: '张三',
  phone: '13800138000',
  expectTime: '2026-06-10 14:00',
  address: '北京市海淀区科技园A座101室',
  faultType: '其他',
  description: '设备出现异常噪音，需要检修',
  images: [],
  repairInfo: {
    repairTime: '2026-06-04',
    repairPerson: '李四',
  },
  canEvaluate: true,
}

export function mockGetFaultTypes(): Promise<FaultType[]> {
  console.info('[RepairServiceMock] Returning mock fault types.')
  return Promise.resolve(mockFaultTypes)
}

export function mockGetRepairDevices(): Promise<RepairDevice[]> {
  console.info('[RepairServiceMock] Returning mock repair devices.')
  return Promise.resolve(mockRepairDevices)
}

export function mockGetTicketList(): Promise<Ticket[]> {
  console.info('[RepairServiceMock] Returning mock ticket list.')
  return Promise.resolve(mockTickets)
}

export function mockGetTicketDetail(_id: number): Promise<TicketDetail> {
  console.info('[RepairServiceMock] Returning mock ticket detail.')
  return Promise.resolve(mockTicketDetail)
}

export function mockSubmitRepair(_params: RepairSubmitParams): Promise<{ ticketId: number }> {
  console.info('[RepairServiceMock] Mock repair submitted.')
  return Promise.resolve({ ticketId: Date.now() })
}

export function mockSubmitEvaluation(_params: EvaluationParams): Promise<void> {
  console.info('[RepairServiceMock] Mock evaluation submitted.')
  return Promise.resolve()
}