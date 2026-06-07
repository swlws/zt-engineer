import type { HomeData } from '@/types/home'

const mockData: HomeData = {
  bannerList: [
    { id: 1, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20industrial%20equipment%20showcase%20banner%20with%20blue%20theme&image_size=landscape_16_9', title: '企业事迹宣传' },
    { id: 2, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=new%20product%20launch%20banner%20technology%20theme&image_size=landscape_16_9', title: '新品发布' },
    { id: 3, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=important%20event%20promotion%20banner%20professional&image_size=landscape_16_9', title: '重要活动' },
  ],
  quickEntries: [
    { id: 1, icon: '🔧', text: '报修', color: '#ff7d00' },
    { id: 2, icon: '📱', text: '设备', color: '#1677ff' },
    { id: 3, icon: '💬', text: '反馈', color: '#52c41a' },
    { id: 4, icon: '👩‍💼', text: '客服', color: '#722ed1' },
  ],
  announcements: [
    { id: 1, title: '【维保政策更新】2026年度设备延保服务开启', tag: '维保政策', date: '2025-06-01' },
    { id: 2, title: '【系统升级通知】报修系统优化升级', tag: '服务通知', date: '2025-05-28' },
    { id: 3, title: '【活动预告】夏季设备养护活动即将开始', tag: '活动预告', date: '2025-05-25' },
  ],
  products: [
    { id: 1, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20optical%20measuring%20instrument%20on%20light%20gray%20background&image_size=square', title: '高端进口影像测量仪' },
    { id: 2, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=manual%20optical%20measuring%20instrument%20device&image_size=square', title: '手动影像测量仪' },
    { id: 3, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=digital%20measurement%20device%20industrial%20equipment&image_size=square', title: '全自动三坐标测量仪' },
    { id: 4, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=precision%20testing%20equipment%20instrument&image_size=square', title: '高精度检测设备' },
  ],
}

export function mockGetHomeData(): Promise<HomeData> {
  console.info('[HomeServiceMock] Returning mock home data.')
  return Promise.resolve(mockData)
}