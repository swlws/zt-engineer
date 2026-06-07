import type {
  FaultType,
  RepairDevice,
  Ticket,
  TicketDetail,
  TicketListParams,
  RepairSubmitParams,
  EvaluationParams,
} from '@/types/repair'
import { USE_MOCK } from '@/utils/constant'

import {
  mockGetFaultTypes,
  mockGetRepairDevices,
  mockGetTicketList,
  mockGetTicketDetail,
  mockSubmitRepair,
  mockSubmitEvaluation,
} from './repair.mock'
import { request } from './request'

const BASE_URL = ''

/** 获取故障类型列表 */
export function getFaultTypes() {
  if (USE_MOCK) {
    return mockGetFaultTypes()
  }
  return request<FaultType[]>({
    url: `${BASE_URL}/repair/fault-types`,
    method: 'GET',
  })
}

/** 获取报修可选设备列表 */
export function getRepairDevices() {
  if (USE_MOCK) {
    return mockGetRepairDevices()
  }
  return request<RepairDevice[]>({
    url: `${BASE_URL}/repair/devices`,
    method: 'GET',
  })
}

/** 获取报修工单列表 */
export function getTicketList(params?: TicketListParams) {
  if (USE_MOCK) {
    return mockGetTicketList()
  }
  return request<Ticket[]>({
    url: `${BASE_URL}/repair/tickets`,
    method: 'GET',
    data: params,
  })
}

/** 获取工单详情 */
export function getTicketDetail(id: number) {
  if (USE_MOCK) {
    return mockGetTicketDetail(id)
  }
  return request<TicketDetail>({
    url: `${BASE_URL}/repair/tickets/${id}`,
    method: 'GET',
  })
}

/** 提交报修 */
export function submitRepair(params: RepairSubmitParams) {
  if (USE_MOCK) {
    return mockSubmitRepair(params)
  }
  return request<{ ticketId: number }>({
    url: `${BASE_URL}/repair/submit`,
    method: 'POST',
    data: params,
  })
}

/** 提交评价 */
export function submitEvaluation(params: EvaluationParams) {
  if (USE_MOCK) {
    return mockSubmitEvaluation(params)
  }
  return request<void>({
    url: `${BASE_URL}/repair/evaluation`,
    method: 'POST',
    data: params,
  })
}