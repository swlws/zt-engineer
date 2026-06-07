import { useState } from 'react'
import { Input, Text, View } from '@tarojs/components'
import Taro, { useDidShow, useRouter } from '@tarojs/taro'

import { getTransferEngineers, transferTicket } from '@/services/repair'
import type { Engineer } from '@/types/repair'

import './index.scss'

export default function TransferPage() {
  const router = useRouter()
  const ticketId = Number(router.params.ticketId) || 0

  const [keyword, setKeyword] = useState('')
  const [engineers, setEngineers] = useState<Engineer[]>([])
  const [selectedEngineerId, setSelectedEngineerId] = useState<number | null>(null)

  const loadEngineers = (value?: string) => {
    getTransferEngineers(value).then(setEngineers).catch(() => {
      Taro.showToast({
        title: '人员列表加载失败',
        icon: 'none',
      })
    })
  }

  useDidShow(() => {
    loadEngineers()
  })

  const handleSearch = (value: string) => {
    setKeyword(value)
    loadEngineers(value)
  }

  const handleSelectEngineer = (engineer: Engineer) => {
    setSelectedEngineerId(engineer.id)
    Taro.showModal({
      title: '确认转派',
      content: `确认将工单转派给${engineer.name}吗？`,
      success: (res) => {
        if (!res.confirm) {
          setSelectedEngineerId(null)
          return
        }

        transferTicket({
          ticketId,
          engineerId: engineer.id,
        }).then(() => {
          Taro.showToast({
            title: '转派成功',
            icon: 'success',
          })
          setTimeout(() => {
            Taro.navigateBack()
          }, 300)
        }).catch(() => {
          setSelectedEngineerId(null)
          Taro.showToast({
            title: '转派失败',
            icon: 'none',
          })
        })
      },
    })
  }

  return (
    <View className='transfer-page'>
      <View className='transfer-page__search'>
        <Text className='transfer-page__search-icon'>⌕</Text>
        <Input
          className='transfer-page__search-input'
          placeholder='请输入人员姓名...'
          value={keyword}
          onInput={(e) => handleSearch(e.detail.value)}
        />
      </View>

      <View className='transfer-page__list'>
        {engineers.map((engineer) => (
          <View
            key={engineer.id}
            className='engineer-item'
            onClick={() => handleSelectEngineer(engineer)}
          >
            <View className='engineer-item__avatar'>
              <Text className='engineer-item__avatar-text'>{engineer.name.slice(0, 1)}</Text>
            </View>
            <View className='engineer-item__main'>
              <Text className='engineer-item__name'>{engineer.name}</Text>
              <Text className='engineer-item__meta'>{engineer.company}/{engineer.role}</Text>
            </View>
            <View className={`engineer-item__radio ${selectedEngineerId === engineer.id ? 'active' : ''}`} />
          </View>
        ))}
      </View>
    </View>
  )
}
