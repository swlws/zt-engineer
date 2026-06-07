import type {
  Engineer,
  Ticket,
  TicketDetail,
  TicketListParams,
  TicketProcessParams,
  TicketStatus,
  TransferTicketParams,
} from '@/types/ticket'

const sampleImages = [
  'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=400&q=80',
]

const mockEngineers: Engineer[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: '张三',
  company: '智庭科技',
  role: '维修工程部/部门主管',
}))

let ticketStore: TicketDetail[] = [
  {
    id: 1,
    number: 'NO000003',
    status: 'pending',
    statusText: '未开始',
    deviceCode: 'WH00000001',
    deviceName: 'VMS系列手动影像测量仪',
    deviceModel: 'VMS-3020',
    reportTime: '2025年6月30日 12:23:12',
    reporter: '张三',
    faultType: '视觉昏暗、亮度不足',
    description: '显微镜在使用过程中反复出现视觉昏暗，亮度不足的问题，已影响日常测量作业。',
    address: '湖北省武汉市东湖高新技术开发区江汉路8号天琪集团3号厂房3楼',
    contactPhone: '18300231896',
    productionDate: '2025年6月30日',
    warrantyDate: '2028年6月30日',
    expectTime: '2026年6月05日',
    faultTags: ['视觉昏暗、亮度不足'],
    medias: sampleImages,
  },
  {
    id: 2,
    number: 'NO000001',
    status: 'paused',
    statusText: '暂停中',
    deviceCode: 'WH00000001',
    deviceName: 'VMS系列手动影像测量仪',
    deviceModel: 'VMS-3020',
    reportTime: '2025年6月30日 12:23:12',
    reporter: '张三',
    faultType: '视觉昏暗、亮度不足',
    description: '显微镜在使用过程中反复出现视觉昏暗，亮度不足的问题，当前等待配件到位后继续处理。',
    address: '湖北省武汉市东湖高新技术开发区江汉路8号天琪集团3号厂房3楼',
    contactPhone: '18300231896',
    productionDate: '2025年6月30日',
    warrantyDate: '2028年6月30日',
    expectTime: '2026年6月05日',
    faultTags: ['视觉昏暗、亮度不足'],
    medias: sampleImages,
    repairRecord: {
      repairTime: '2026年6月05日 13:23:56',
      repairEngineer: '李四',
      content: '已完成现场初步排查，确认需要更换灯源组件，当前工单先暂停等待备件到位。',
      images: sampleImages.slice(0, 5),
    },
  },
  {
    id: 3,
    number: 'NO000002',
    status: 'completed',
    statusText: '已完成',
    deviceCode: 'WH00000001',
    deviceName: 'VMS系列手动影像测量仪',
    deviceModel: 'VMS-3020',
    reportTime: '2025年6月30日 12:23:12',
    reporter: '张三',
    faultType: '视觉昏暗、亮度不足',
    description: '显微镜在使用过程中反复出现视觉昏暗，亮度不足的问题，维修已完成。',
    address: '湖北省武汉市东湖高新技术开发区江汉路8号天琪集团3号厂房3楼',
    contactPhone: '18300231896',
    productionDate: '2025年6月30日',
    warrantyDate: '2028年6月30日',
    expectTime: '2026年6月05日',
    faultTags: ['视觉昏暗、亮度不足'],
    medias: sampleImages,
    repairRecord: {
      repairTime: '2026年6月05日 13:23:56',
      repairEngineer: '李四',
      content: '这是维修内容描述文字。这是一段维修内容描述文字。这是一段维修内容描述文字。这是一段维修内容描述文字。',
      images: sampleImages.slice(0, 5),
    },
  },
]

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

function getStatusText(status: TicketStatus) {
  switch (status) {
    case 'pending':
      return '未开始'
    case 'paused':
      return '暂停中'
    case 'processing':
      return '维修中'
    case 'completed':
      return '已完成'
  }
}

function ensureProcessingRecord(ticket: TicketDetail) {
  if (!ticket.repairRecord) {
    ticket.repairRecord = {
      repairTime: '2026年6月05日 13:23:56',
      repairEngineer: '李四',
      content: '',
      images: [],
    }
  }
}

function toTicket(item: TicketDetail): Ticket {
  return {
    id: item.id,
    number: item.number,
    status: item.status,
    statusText: item.statusText,
    deviceCode: item.deviceCode,
    deviceName: item.deviceName,
    deviceModel: item.deviceModel,
    reportTime: item.reportTime,
    reporter: item.reporter,
    faultType: item.faultType,
    description: item.description,
    address: item.address,
  }
}

export function mockGetTicketList(params?: TicketListParams): Promise<Ticket[]> {
  const list = params?.status
    ? ticketStore.filter((item) => item.status === params.status)
    : ticketStore
  return Promise.resolve(clone(list.map(toTicket)))
}

export function mockGetTicketDetail(id: number): Promise<TicketDetail> {
  const target = ticketStore.find((item) => item.id === id) ?? ticketStore[0]
  return Promise.resolve(clone(target))
}

export function mockStartTicket(ticketId: number): Promise<void> {
  const target = ticketStore.find((item) => item.id === ticketId)
  if (target) {
    target.status = 'processing'
    target.statusText = getStatusText('processing')
    ensureProcessingRecord(target)
  }
  return Promise.resolve()
}

export function mockSubmitTicketProcess(params: TicketProcessParams): Promise<void> {
  const target = ticketStore.find((item) => item.id === params.ticketId)
  if (target) {
    ensureProcessingRecord(target)
    target.status = params.status
    target.statusText = getStatusText(params.status)
    target.repairRecord = {
      repairTime: target.repairRecord?.repairTime ?? '2026年6月05日 13:23:56',
      repairEngineer: target.repairRecord?.repairEngineer ?? '李四',
      content: params.content,
      images: params.images,
    }
  }
  return Promise.resolve()
}

export function mockGetTransferEngineers(keyword?: string): Promise<Engineer[]> {
  const normalizedKeyword = keyword?.trim()
  const list = normalizedKeyword
    ? mockEngineers.filter((item) => {
        const text = `${item.name}${item.company}${item.role}`
        return text.includes(normalizedKeyword)
      })
    : mockEngineers
  return Promise.resolve(clone(list))
}

export function mockTransferTicket(_params: TransferTicketParams): Promise<void> {
  return Promise.resolve()
}
