import { useState } from 'react'
import { Text, View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'

import { STORAGE_KEYS } from '@/constants/storage-keys'
import { getHomeData } from '@/services/home'
import type { UserInfo } from '@/types/user'
import type { HomeData } from '@/types/home'

import './index.scss'

export default function Home() {
  const [nick, setNick] = useState<string>('')
  const [currentBanner, setCurrentBanner] = useState<number>(0)
  const [homeData, setHomeData] = useState<HomeData>({
    bannerList: [],
    quickEntries: [],
    announcements: [],
    products: [],
  })

  useDidShow(() => {
    const info = Taro.getStorageSync<UserInfo>(STORAGE_KEYS.USER_INFO)
    setNick(info?.nickName ?? '')

    getHomeData().then(setHomeData).catch(() => {})
  })

  const handleBannerChange = (e: any) => {
    setCurrentBanner(e.detail.current)
  }

  const { bannerList, quickEntries, announcements, products } = homeData

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