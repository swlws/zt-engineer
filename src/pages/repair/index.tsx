import { useState } from 'react'
import { Text, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { getTicketList } from '@/services/repair'
import type { Ticket, TicketStatus } from '@/types/repair'

import './index.scss'

type TicketFilter = 'all' | 'pending' | 'paused' | 'completed'

const filterOptions: Array<{ key: TicketFilter; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '未开始' },
  { key: 'paused', label: '暂停中' },
  { key: 'completed', label: '已完成' },
]

function getStatusColor(status: TicketStatus) {
  switch (status) {
    case 'pending':
      return '#C9C9C9'
    case 'paused':
      return '#FF8B3D'
    case 'processing':
      return '#FF4D4F'
    case 'completed':
      return '#1677FF'
  }
}

export default function RepairPage() {
  const [activeFilter, setActiveFilter] = useState<TicketFilter>('all')
  const [ticketList, setTicketList] = useState<Ticket[]>([])

  const loadTickets = () => {
    getTicketList().then(setTicketList).catch(() => {
      Taro.showToast({
        title: '工单加载失败',
        icon: 'none',
      })
    })
  }

  useDidShow(() => {
    loadTickets()
  })

  const counts = {
    all: ticketList.length,
    pending: ticketList.filter((item) => item.status === 'pending').length,
    paused: ticketList.filter((item) => item.status === 'paused').length,
    completed: ticketList.filter((item) => item.status === 'completed').length,
  }

  const visibleTickets = activeFilter === 'all'
    ? ticketList
    : ticketList.filter((item) => item.status === activeFilter)

  const goToDetail = (ticketId: number) => {
    Taro.navigateTo({
      url: `/pages/ticket-detail/index?id=${ticketId}`,
    })
  }

  const goToTransfer = (ticketId: number) => {
    Taro.navigateTo({
      url: `/pages/transfer/index?ticketId=${ticketId}`,
    })
  }

  return (
    <View className='repair-page'>
      <View className='repair-page__tabs'>
        {filterOptions.map((item) => (
          <View
            key={item.key}
            className={`repair-page__tab ${activeFilter === item.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(item.key)}
          >
            <Text className='repair-page__tab-text'>
              {item.label}
              {item.key === 'all' ? `(${counts.all})` : ''}
            </Text>
          </View>
        ))}
      </View>

      <View className='repair-page__list'>
        {visibleTickets.map((ticket) => (
          <View key={ticket.id} className='ticket-card'>
            <View className='ticket-card__header'>
              <Text className='ticket-card__number'>报修单编号：{ticket.number}</Text>
              <View className='ticket-card__status'>
                <Text
                  className='ticket-card__status-dot'
                  style={{ backgroundColor: getStatusColor(ticket.status) }}
                />
                <Text
                  className='ticket-card__status-text'
                  style={{ color: getStatusColor(ticket.status) }}
                >
                  {ticket.statusText}
                </Text>
              </View>
            </View>

            <View className='ticket-card__body'>
              <View className='ticket-card__row'>
                <Text className='ticket-card__label'>设备编号：</Text>
                <Text className='ticket-card__value'>{ticket.deviceCode}</Text>
              </View>
              <View className='ticket-card__row'>
                <Text className='ticket-card__label'>设备名称：</Text>
                <Text className='ticket-card__value'>{ticket.deviceName}</Text>
              </View>
              <View className='ticket-card__row'>
                <Text className='ticket-card__label'>设备型号：</Text>
                <Text className='ticket-card__value'>{ticket.deviceModel}</Text>
              </View>
              <View className='ticket-card__row'>
                <Text className='ticket-card__label'>报修时间：</Text>
                <Text className='ticket-card__value'>{ticket.reportTime}</Text>
              </View>
              <View className='ticket-card__row'>
                <Text className='ticket-card__label'>报修人：</Text>
                <Text className='ticket-card__value'>{ticket.reporter}</Text>
              </View>
              <View className='ticket-card__row'>
                <Text className='ticket-card__label'>故障类型：</Text>
                <Text className='ticket-card__value'>{ticket.faultType}</Text>
              </View>
              <View className='ticket-card__row ticket-card__row--top'>
                <Text className='ticket-card__label'>故障描述：</Text>
                <Text className='ticket-card__value ticket-card__value--ellipsis'>{ticket.description}</Text>
              </View>
              <View className='ticket-card__row ticket-card__row--top'>
                <Text className='ticket-card__label'>报修地址：</Text>
                <Text className='ticket-card__value ticket-card__value--ellipsis'>{ticket.address}</Text>
              </View>
            </View>

            <View className='ticket-card__footer'>
              {ticket.status === 'pending' && (
                <View className='ticket-card__button ticket-card__button--ghost' onClick={() => goToTransfer(ticket.id)}>
                  <Text className='ticket-card__button-text'>转派</Text>
                </View>
              )}
              <View className='ticket-card__button' onClick={() => goToDetail(ticket.id)}>
                <Text className='ticket-card__button-text'>查看</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
