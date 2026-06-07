import type { Device, DeviceListParams } from '@/types/device'
import { USE_MOCK } from '@/utils/constant'

import { mockGetDeviceList } from './device.mock'
import { request } from './request'

const BASE_URL = ''

export function getDeviceList(params?: DeviceListParams) {
  if (USE_MOCK) {
    return mockGetDeviceList()
  }

  return request<Device[]>({
    url: `${BASE_URL}/device/list`,
    method: 'GET',
    data: params,
  })
}