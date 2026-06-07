import { useState } from 'react'
import { Text, View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'

import { STORAGE_KEYS } from '@/constants/storage-keys'
import type { UserInfo } from '@/types/user'

import './index.scss'

interface BannerItem {
  id: number
  image: string
  title: string
}

interface QuickEntryItem {
  id: number
  icon: string
  text: string
  color: string
}

interface AnnouncementItem {
  id: number
  title: string
  tag: string
  date: string
}

interface ProductItem {
  id: number
  image: string
  title: string
}

export default function Home() {
  const [nick, setNick] = useState<string>('')
  const [currentBanner, setCurrentBanner] = useState<number>(0)

  const bannerList: BannerItem[] = [
    { id: 1, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20industrial%20equipment%20showcase%20banner%20with%20blue%20theme&image_size=landscape_16_9', title: '企业事迹宣传' },
    { id: 2, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=new%20product%20launch%20banner%20technology%20theme&image_size=landscape_16_9', title: '新品发布' },
    { id: 3, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=important%20event%20promotion%20banner%20professional&image_size=landscape_16_9', title: '重要活动' },
  ]

  const quickEntries: QuickEntryItem[] = [
    { id: 1, icon: '🔧', text: '报修', color: '#ff7d00' },
    { id: 2, icon: '📱', text: '设备', color: '#1677ff' },
    { id: 3, icon: '💬', text: '反馈', color: '#52c41a' },
    { id: 4, icon: '👩‍💼', text: '客服', color: '#722ed1' },
  ]

  const announcements: AnnouncementItem[] = [
    { id: 1, title: '【维保政策更新】2026年度设备延保服务开启', tag: '维保政策', date: '2025-06-01' },
    { id: 2, title: '【系统升级通知】报修系统优化升级', tag: '服务通知', date: '2025-05-28' },
    { id: 3, title: '【活动预告】夏季设备养护活动即将开始', tag: '活动预告', date: '2025-05-25' },
  ]

  const products: ProductItem[] = [
    { id: 1, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20optical%20measuring%20instrument%20on%20light%20gray%20background&image_size=square', title: '高端进口影像测量仪' },
    { id: 2, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=manual%20optical%20measuring%20instrument%20device&image_size=square', title: '手动影像测量仪' },
    { id: 3, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=digital%20measurement%20device%20industrial%20equipment&image_size=square', title: '全自动三坐标测量仪' },
    { id: 4, image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=precision%20testing%20equipment%20instrument&image_size=square', title: '高精度检测设备' },
  ]

  useDidShow(() => {
    const info = Taro.getStorageSync<UserInfo>(STORAGE_KEYS.USER_INFO)
    setNick(info?.nickName ?? '')
  })

  const handleBannerChange = (e: any) => {
    setCurrentBanner(e.detail.current)
  }

  return (
    <View className='home'>
      <View className='home__banner'>
        <Swiper
          className='home__banner-swiper'
          indicatorDots
          indicatorColor='rgba(255,255,255,0.5)'
          indicatorActiveColor='#ffffff'
          autoplay
          circular
          interval={3000}
          duration={500}
          onChange={handleBannerChange}
        >
          {bannerList.map(item => (
            <SwiperItem key={item.id}>
              <Image className='home__banner-image' src={item.image} mode='aspectFill' />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className='home__quick-entrance'>
        <View className='home__quick-entrance-card'>
          {quickEntries.map(item => (
            <View key={item.id} className='home__quick-entrance-item'>
              <View className='home__quick-entrance-icon' style={{ backgroundColor: `${item.color}15` }}>
                <Text className='home__quick-entrance-icon-text'>{item.icon}</Text>
              </View>
              <Text className='home__quick-entrance-text'>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='home__announcement'>
        <View className='home__announcement-card'>
          <View className='home__announcement-header'>
            <Text className='home__announcement-title'>服务公告</Text>
            <Text className='home__announcement-more'>查看更多</Text>
          </View>
          <View className='home__announcement-list'>
            {announcements.map((item, index) => (
              <View key={item.id} className='home__announcement-item'>
                <Text className='home__announcement-item-title' numberOfLines={1}>{item.title}</Text>
                <View className='home__announcement-item-meta'>
                  <View className='home__announcement-item-tag'>{item.tag}</View>
                  <Text className='home__announcement-item-date'>{item.date}</Text>
                </View>
                {index < announcements.length - 1 && <View className='home__announcement-divider' />}
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className='home__product'>
        <View className='home__product-card'>
          <View className='home__product-header'>
            <Text className='home__product-title'>产品展示</Text>
            <Text className='home__product-more'>查看更多</Text>
          </View>
          <View className='home__product-grid'>
            {products.map(item => (
              <View key={item.id} className='home__product-item'>
                <View className='home__product-item-image-wrap'>
                  <Image className='home__product-item-image' src={item.image} mode='aspectFill' />
                </View>
                <Text className='home__product-item-title' numberOfLines={1}>{item.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
