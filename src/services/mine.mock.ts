import type { UserStats } from '@/types/mine'

const mockStats: UserStats = {
  monthlyCompletedCount: 2,
  totalCompletedCount: 0,
  positiveReviewRate: 3,
  trendData: [66, 52, 33, 54, 40, 68, 52, 44, 50, 26, 33, 33],
}

export function mockGetUserStats(): Promise<UserStats> {
  console.info('[MineServiceMock] Returning mock user stats.')
  return Promise.resolve(mockStats)
}
