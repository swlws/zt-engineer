import type { UserStats } from '@/types/mine'

const mockStats: UserStats = {
  deviceCount: 2,
  monthlyRepairCount: 0,
  totalRepairCount: 3,
}

export function mockGetUserStats(): Promise<UserStats> {
  console.info('[MineServiceMock] Returning mock user stats.')
  return Promise.resolve(mockStats)
}