import type { HomeData } from '@/types/home'
import { USE_MOCK } from '@/utils/constant'

import { mockGetHomeData } from './home.mock'
import { request } from './request'

const BASE_URL = ''

export function getHomeData() {
  if (USE_MOCK) {
    return mockGetHomeData()
  }

  return request<HomeData>({
    url: `${BASE_URL}/home/data`,
    method: 'GET',
  })
}