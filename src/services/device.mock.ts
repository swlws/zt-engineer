import type { Device } from '@/types/device'

const mockDevices: Device[] = [
  {
    id: 1,
    name: 'VMS系列手动影像测量仪',
    icon: '📷',
    status: 'normal',
    statusText: '正常',
    code: 'WH00000001',
    model: 'VMS-3020',
    productionDate: '2025年6月30日',
    warrantyEndDate: '2028年6月30日',
    warrantyStatus: 'active',
    warrantyText: '在保中',
  },
  {
    id: 2,
    name: '全自动三坐标测量仪',
    icon: '🔬',
    status: 'repairing',
    statusText: '报修中',
    code: 'WH00000002',
    model: 'CMM-8106',
    productionDate: '2024年3月15日',
    warrantyEndDate: '2027年3月15日',
    warrantyStatus: 'active',
    warrantyText: '在保中',
  },
  {
    id: 3,
    name: '高精度检测设备',
    icon: '⚙️',
    status: 'normal',
    statusText: '正常',
    code: 'WH00000003',
    model: 'HD-2000',
    productionDate: '2022年10月20日',
    warrantyEndDate: '2025年10月20日',
    warrantyStatus: 'expired',
    warrantyText: '已过期',
  },
]

export function mockGetDeviceList(): Promise<Device[]> {
  console.info('[DeviceServiceMock] Returning mock device list.')
  return Promise.resolve(mockDevices)
}