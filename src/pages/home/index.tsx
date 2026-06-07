import { useMemo, useState } from 'react'
import { Image, Swiper, SwiperItem, Text, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { getHomeData } from '@/services/home'
import type { AnnouncementItem, HomeData, QuickEntryItem } from '@/types/home'

import './index.scss'

const INITIAL_HOME_DATA: HomeData = {
  bannerList: [],
  quickEntries: [],
  announcements: [],
  products: []
}

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [homeData, setHomeData] = useState<HomeData>(INITIAL_HOME_DATA)

  useDidShow(() => {
    getHomeData().then(setHomeData).catch(() => {
      Taro.showToast({ title: '首页数据加载失败', icon: 'none' })
    })
  })

  const { bannerList, quickEntries, announcements } = homeData
  const currentBannerItem = useMemo(
    () => bannerList[currentBanner] ?? bannerList[0] ?? null,
    [bannerList, currentBanner]
  )

  const handleBannerChange = (e: any) => {
    setCurrentBanner(e.detail.current)
  }

  const handleQuickEntryClick = (item: QuickEntryItem) => {
    if (item.text === '工单') {
      Taro.switchTab({ url: '/pages/ticket/index' })
      return
    }

    if (item.text === '客服') {
      Taro.showModal({
        title: '联系客服',
        content: '客服热线：400-800-1234',
        confirmText: '呼叫',
        success: (res) => {
          if (res.confirm) {
            Taro.makePhoneCall({ phoneNumber: '4008001234' })
          }
        }
      })
      return
    }

    Taro.showToast({ title: '反馈功能建设中', icon: 'none' })
  }

  const handleAnnouncementClick = (item: AnnouncementItem) => {
    Taro.showModal({
      title: item.tag,
      content: `${item.title}\n发布时间：${item.date}`,
      showCancel: false
    })
  }

  return (
    <View className='home'>
      <View className='home__hero'>
        <Swiper
          className='home__hero-swiper'
          autoplay
          circular
          interval={3200}
          duration={450}
          onChange={handleBannerChange}
        >
          {bannerList.map((item) => (
            <SwiperItem key={item.id}>
              <View className='home__hero-slide'>
                <Image className='home__hero-image' src={item.image} mode='aspectFill' />
              </View>
            </SwiperItem>
          ))}
        </Swiper>

        {currentBannerItem && (
          <View className='home__hero-copy'>
            <Text className='home__hero-title'>{currentBannerItem.title}</Text>
            {currentBannerItem.descriptionLines.map((line) => (
              <Text key={line} className='home__hero-line'>{line}</Text>
            ))}
          </View>
        )}

        <View className='home__hero-dots'>
          {bannerList.map((item, index) => (
            <View
              key={item.id}
              className={`home__hero-dot ${index === currentBanner ? 'is-active' : ''}`}
            />
          ))}
        </View>
      </View>

      <View className='home__content'>
        <View className='home__panel'>
          <View className='home__panel-header'>
            <Text className='home__panel-title'>快速入口</Text>
          </View>

          <View className='home__quick-grid'>
            {quickEntries.map((item) => (
              <View
                key={item.id}
                className='home__quick-item'
                onClick={() => handleQuickEntryClick(item)}
              >
                <View className='home__quick-icon-wrap'>
                  <View className='home__quick-icon-placeholder'>
                    <Text className='home__quick-icon-symbol'>icon</Text>
                  </View>
                </View>
                <Text className='home__quick-label'>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className='home__panel'>
          <View className='home__panel-header'>
            <Text className='home__panel-title'>服务公告</Text>
            <Text
              className='home__panel-more'
              onClick={() => Taro.showToast({ title: '更多公告建设中', icon: 'none' })}
            >
              查看更多
            </Text>
          </View>

          <View className='home__announcement-list'>
            {announcements.slice(0, 2).map((item, index) => (
              <View
                key={item.id}
                className={`home__announcement-item ${index === 0 ? 'has-divider' : ''}`}
                onClick={() => handleAnnouncementClick(item)}
              >
                <Text className='home__announcement-title' numberOfLines={1}>{item.title}</Text>
                <View className='home__announcement-meta'>
                  <Text className='home__announcement-tag'>{item.tag}</Text>
                  <Text className='home__announcement-date'>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
