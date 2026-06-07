import { useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'

import { STORAGE_KEYS } from '@/constants/storage-keys'
import { getUserStats } from '@/services/mine'
import type { UserInfo } from '@/types/user'
import type { UserStats } from '@/types/mine'

import './index.scss'

const monthLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

export default function Mine() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [stats, setStats] = useState<UserStats>({
    monthlyCompletedCount: 0,
    totalCompletedCount: 0,
    positiveReviewRate: 0,
    trendData: [],
  })

  useDidShow(() => {
    const info = Taro.getStorageSync<UserInfo>(STORAGE_KEYS.USER_INFO)
    setUser(info || null)

    getUserStats().then(setStats).catch(() => {})
  })

  const menuItems = [
    { key: 'feedback', text: '意见反馈' },
    { key: 'about', text: '关于我们' },
    { key: 'privacy', text: '隐私政策' },
    { key: 'agreement', text: '用户协议' },
  ] as const

  const openAgreementPage = (type: 'privacy' | 'user') => {
    Taro.navigateTo({
      url: `/pages/agreement/index?type=${type}`,
    })
  }

  const onClickMenu = (key: (typeof menuItems)[number]['key'] | 'settings') => {
    if (key === 'agreement') {
      openAgreementPage('user')
      return
    }
    if (key === 'privacy') {
      openAgreementPage('privacy')
      return
    }
    Taro.showToast({ title: '敬请期待', icon: 'none' })
  }

  const maxTrendValue = Math.max(...stats.trendData, 100)

  const renderAvatar = () => {
    if (user?.avatarUrl) {
      return (
        <Image
          className='mine__avatar-image'
          src={user.avatarUrl}
          mode='aspectFill'
        />
      )
    }

    return (
      <View className='mine__avatar-placeholder'>
        <Text className='mine__avatar-placeholder-text'>头像</Text>
      </View>
    )
  }

  return (
    <View className='mine'>
      <View className='mine__hero'>
        <View className='mine__profile'>
          <View className='mine__avatar'>
            {renderAvatar()}
          </View>
          <View className='mine__profile-meta'>
            <View className='mine__nickname'>
              {user?.nickName || '用户昵称'}
            </View>
          </View>
        </View>
      </View>

      <View className='mine__content'>
        <View className='mine__stats-card'>
          <View className='mine__stat'>
            <View className='mine__stat-value'>{stats.monthlyCompletedCount}</View>
            <Text className='mine__stat-label'>本月完成工单</Text>
          </View>
          <View className='mine__stat'>
            <View className='mine__stat-value'>{stats.totalCompletedCount}</View>
            <Text className='mine__stat-label'>累计完成工单</Text>
          </View>
          <View className='mine__stat'>
            <View className='mine__stat-value'>{stats.positiveReviewRate}</View>
            <Text className='mine__stat-label'>好评率</Text>
          </View>
        </View>

        <View className='mine__panel mine__panel--chart'>
          <Text className='mine__panel-title'>工单趋势分析</Text>
          <View className='mine__chart'>
            <View className='mine__chart-grid'>
              {[100, 80, 60, 40, 20, 0].map((item) => (
                <View key={item} className='mine__chart-line'>
                  <Text className='mine__chart-scale'>{item}</Text>
                </View>
              ))}
            </View>
            <View className='mine__chart-bars'>
              {stats.trendData.map((value, index) => (
                <View key={monthLabels[index]} className='mine__chart-bar-item'>
                  <View className='mine__chart-bar-track'>
                    <View
                      className='mine__chart-bar'
                      style={{ height: `${(value / maxTrendValue) * 100}%` }}
                    />
                  </View>
                  <Text className='mine__chart-month'>{monthLabels[index]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {menuItems.map((item) => (
          <View
            key={item.key}
            className='mine__panel mine__panel--menu'
            onClick={() => onClickMenu(item.key)}
          >
            <Text className='mine__menu-text'>{item.text}</Text>
          </View>
        ))}

        <View
          className='mine__panel mine__panel--menu mine__panel--settings'
          onClick={() => onClickMenu('settings')}
        >
          <Text className='mine__menu-text'>设置</Text>
        </View>
      </View>
    </View>
  )
}
