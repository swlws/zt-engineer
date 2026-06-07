import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'

import { getDeviceList } from '@/services/device'
import type { Device } from '@/types/device'

import './index.scss'

export default function Index() {
  const [filterText, setFilterText] = useState<string>('全部')
  const [deviceList, setDeviceList] = useState<Device[]>([])

  useDidShow(() => {
    getDeviceList().then(setDeviceList).catch(() => {})
  })

  const getStatusColor = (status: string) => {
    return status === 'normal' ? '#52c41a' : '#fa8c16'
  }

  const getWarrantyBgColor = (status: string) => {
    return status === 'active' ? 'rgba(22, 119, 255, 0.1)' : 'rgba(255, 77, 79, 0.1)'
  }

  const getWarrantyColor = (status: string) => {
    return status === 'active' ? '#1677ff' : '#ff4d4f'
  }

  return (
    <View className='device-page'>
      <View className='device-page__filter-bar'>
        <View className='device-page__filter'>
          <Text className='device-page__filter-text'>{filterText}</Text>
          <Text className='device-page__filter-arrow'>▼</Text>
        </View>
        <View className='device-page__add-btn'>
          <Text className='device-page__add-text'>手动添加</Text>
        </View>
      </View>

      <View className='device-page__scan-card'>
        <View className='device-page__scan-icon'>📱</View>
        <Text className='device-page__scan-title'>扫码绑定设备</Text>
        <Text className='device-page__scan-desc'>扫描设备机身二维码自动识别设备</Text>
      </View>

      <View className='device-page__list'>
        {deviceList.map(device => (
          <View key={device.id} className='device-card'>
            <View className='device-card__header'>
              <View className='device-card__header-left'>
                <View className='device-card__icon-wrap'>
                  <Text className='device-card__icon'>{device.icon}</Text>
                </View>
                <Text className='device-card__name'>{device.name}</Text>
              </View>
              <View className='device-card__status'>
                <View 
                  className='device-card__status-dot' 
                  style={{ backgroundColor: getStatusColor(device.status) }}
                />
                <Text 
                  className='device-card__status-text' 
                  style={{ color: getStatusColor(device.status) }}
                >
                  {device.statusText}
                </Text>
              </View>
            </View>

            <Text className='device-card__code'>设备编号：{device.code}</Text>

            <View className='device-card__info'>
              <View className='device-card__info-item'>
                <Text className='device-card__info-label'>设备型号：</Text>
                <Text className='device-card__info-value'>{device.model}</Text>
              </View>
              <View className='device-card__info-item'>
                <Text className='device-card__info-label'>出厂日期：</Text>
                <Text className='device-card__info-value'>{device.productionDate}</Text>
              </View>
              <View className='device-card__info-item'>
                <Text className='device-card__info-label'>质保截止日期：</Text>
                <Text className='device-card__info-value'>{device.warrantyEndDate}</Text>
              </View>
            </View>

            <View className='device-card__footer'>
              <View 
                className='device-card__warranty-tag' 
                style={{ 
                  backgroundColor: getWarrantyBgColor(device.warrantyStatus),
                  color: getWarrantyColor(device.warrantyStatus)
                }}
              >
                {device.warrantyText}
              </View>
              <View className='device-card__action'>
                <Text className='device-card__action-text'>立即报修</Text>
                <Text className='device-card__action-arrow'>→</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}