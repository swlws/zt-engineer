import type { UserStats } from '@/types/mine'
import { USE_MOCK } from '@/utils/constant'

import { mockGetUserStats } from './mine.mock'
import { request } from './request'

const BASE_URL = ''

/** 获取用户统计数据 */
export function getUserStats() {
  if (USE_MOCK) {
    return mockGetUserStats()
  }

  return request<UserStats>({
    url: `${BASE_URL}/mine/stats`,
    method: 'GET',
  })
}