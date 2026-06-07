import type {
  Engineer,
  Ticket,
  TicketDetail,
  TicketListParams,
  TicketProcessParams,
  TransferTicketParams,
} from '@/types/ticket'
import { USE_MOCK } from '@/utils/constant'

import {
  mockGetTicketDetail,
  mockGetTicketList,
  mockGetTransferEngineers,
  mockStartTicket,
  mockSubmitTicketProcess,
  mockTransferTicket,
} from './ticket.mock'
import { request } from './request'

const BASE_URL = ''

export function getTicketList(params?: TicketListParams) {
  if (USE_MOCK) {
    return mockGetTicketList(params)
  }
  return request<Ticket[]>({
    url: `${BASE_URL}/tickets`,
    method: 'GET',
    data: params,
  })
}

export function getTicketDetail(id: number) {
  if (USE_MOCK) {
    return mockGetTicketDetail(id)
  }
  return request<TicketDetail>({
    url: `${BASE_URL}/tickets/${id}`,
    method: 'GET',
  })
}

export function startTicket(ticketId: number) {
  if (USE_MOCK) {
    return mockStartTicket(ticketId)
  }
  return request<void>({
    url: `${BASE_URL}/tickets/${ticketId}/start`,
    method: 'POST',
  })
}

export function submitTicketProcess(params: TicketProcessParams) {
  if (USE_MOCK) {
    return mockSubmitTicketProcess(params)
  }
  return request<void>({
    url: `${BASE_URL}/tickets/${params.ticketId}/process`,
    method: 'POST',
    data: params,
  })
}

export function getTransferEngineers(keyword?: string) {
  if (USE_MOCK) {
    return mockGetTransferEngineers(keyword)
  }
  return request<Engineer[]>({
    url: `${BASE_URL}/tickets/transfer-engineers`,
    method: 'GET',
    data: { keyword },
  })
}

export function transferTicket(params: TransferTicketParams) {
  if (USE_MOCK) {
    return mockTransferTicket(params)
  }
  return request<void>({
    url: `${BASE_URL}/tickets/${params.ticketId}/transfer`,
    method: 'POST',
    data: params,
  })
}
