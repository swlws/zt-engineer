import { useEffect, useState } from 'react'
import { Image, Text, Textarea, View } from '@tarojs/components'
import Taro, { useDidShow, useRouter } from '@tarojs/taro'

import { getTicketDetail, startTicket, submitTicketProcess } from '@/services/ticket'
import type { TicketDetail, TicketStatus } from '@/types/ticket'

import './index.scss'

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

export default function TicketDetailPage() {
  const router = useRouter()
  const ticketId = Number(router.params.id) || 0

  const [ticketData, setTicketData] = useState<TicketDetail | null>(null)
  const [repairContent, setRepairContent] = useState('')
  const [repairImages, setRepairImages] = useState<string[]>([])

  const loadDetail = () => {
    if (!ticketId) {
      return
    }

    getTicketDetail(ticketId).then((data) => {
      setTicketData(data)
    }).catch(() => {
      Taro.showToast({
        title: '工单详情加载失败',
        icon: 'none',
      })
    })
  }

  useDidShow(() => {
    loadDetail()
  })

  useEffect(() => {
    setRepairContent(ticketData?.repairRecord?.content ?? '')
    setRepairImages(ticketData?.repairRecord?.images ?? [])
  }, [ticketData])

  const handleTransfer = () => {
    if (!ticketData) {
      return
    }
    Taro.navigateTo({
      url: `/pages/transfer/index?ticketId=${ticketData.id}`,
    })
  }

  const handleStart = () => {
    if (!ticketData) {
      return
    }
    startTicket(ticketData.id).then(() => {
      Taro.showToast({
        title: ticketData.status === 'paused' ? '已继续维修' : '接单成功',
        icon: 'success',
      })
      loadDetail()
    }).catch(() => {
      Taro.showToast({
        title: '操作失败',
        icon: 'none',
      })
    })
  }

  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 6 - repairImages.length,
      success: (res) => {
        setRepairImages((prev) => [...prev, ...res.tempFilePaths].slice(0, 6))
      },
    })
  }

  const handleDeleteImage = (index: number) => {
    setRepairImages((prev) => prev.filter((_, currentIndex) => currentIndex !== index))
  }

  const handleSubmit = (status: 'paused' | 'completed') => {
    if (!ticketData) {
      return
    }

    if (!repairContent.trim()) {
      Taro.showToast({
        title: '请填写维修内容描述',
        icon: 'none',
      })
      return
    }

    submitTicketProcess({
      ticketId: ticketData.id,
      status,
      content: repairContent.trim(),
      images: repairImages,
    }).then(() => {
      Taro.showToast({
        title: status === 'completed' ? '工单已完成' : '工单已暂停',
        icon: 'success',
      })
      loadDetail()
    }).catch(() => {
      Taro.showToast({
        title: '保存失败',
        icon: 'none',
      })
    })
  }

  if (!ticketData) {
    return (
      <View className='ticket-detail-page'>
        <View className='ticket-detail-page__loading'>加载中...</View>
      </View>
    )
  }

  const showEditableRepair = ticketData.status === 'processing' || ticketData.status === 'paused'
  const showRepairResult = showEditableRepair || ticketData.status === 'completed'

  return (
    <View className='ticket-detail-page'>
      <View className='ticket-panel ticket-panel--header'>
        <Text className='ticket-panel__number'>报修单编号：{ticketData.number}</Text>
        <View className='ticket-panel__status'>
          <Text
            className='ticket-panel__status-dot'
            style={{ backgroundColor: getStatusColor(ticketData.status) }}
          />
          <Text
            className='ticket-panel__status-text'
            style={{ color: getStatusColor(ticketData.status) }}
          >
            {ticketData.statusText}
          </Text>
        </View>
      </View>

      <View className='ticket-panel'>
        <Text className='ticket-panel__title'>设备信息</Text>
        <View className='info-list'>
          <View className='info-row'><Text className='label'>设备编号：</Text><Text className='value'>{ticketData.deviceCode}</Text></View>
          <View className='info-row'><Text className='label'>设备名称：</Text><Text className='value'>{ticketData.deviceName}</Text></View>
          <View className='info-row'><Text className='label'>设备型号：</Text><Text className='value'>{ticketData.deviceModel}</Text></View>
          <View className='info-row'><Text className='label'>出厂日期：</Text><Text className='value'>{ticketData.productionDate}</Text></View>
          <View className='info-row'><Text className='label'>质保保修时间：</Text><Text className='value'>{ticketData.warrantyDate}</Text></View>
        </View>
      </View>

      <View className='ticket-panel'>
        <Text className='ticket-panel__title'>报修信息</Text>
        <View className='info-list'>
          <View className='info-row'><Text className='label'>报修人：</Text><Text className='value'>{ticketData.reporter}</Text></View>
          <View className='info-row'><Text className='label'>联系电话：</Text><Text className='value'>{ticketData.contactPhone}</Text></View>
          <View className='info-row'><Text className='label'>期望维修时间：</Text><Text className='value'>{ticketData.expectTime}</Text></View>
          <View className='info-row info-row--top'><Text className='label'>维修地址：</Text><Text className='value value--multiline'>{ticketData.address}</Text></View>
        </View>
      </View>

      <View className='ticket-panel'>
        <Text className='ticket-panel__title'>故障类型</Text>
        <View className='tag-list'>
          {ticketData.faultTags.map((item) => (
            <View key={item} className='fault-tag'>
              <Text className='fault-tag__text'>{item}</Text>
            </View>
          ))}
        </View>
        <View className='ticket-panel__divider' />
        <Text className='ticket-panel__title'>故障描述</Text>
        <Text className='description-text'>{ticketData.description}</Text>
        <View className='ticket-panel__divider' />
        <Text className='ticket-panel__title'>图片/视频</Text>
        <View className='media-grid'>
          {ticketData.medias.map((item) => (
            <Image key={item} className='media-grid__item' src={item} mode='aspectFill' />
          ))}
        </View>
      </View>

      {showRepairResult && (
        <View className='ticket-panel'>
          <Text className='ticket-panel__title'>维修基本信息</Text>
          <View className='info-list'>
            <View className='info-row'><Text className='label'>维修时间：</Text><Text className='value'>{ticketData.repairRecord?.repairTime ?? '--'}</Text></View>
            <View className='info-row'><Text className='label'>维修师傅：</Text><Text className='value'>{ticketData.repairRecord?.repairEngineer ?? '--'}</Text></View>
          </View>
          <View className='ticket-panel__divider' />
          <Text className='ticket-panel__title'>维修内容描述</Text>
          {showEditableRepair ? (
            <View className='editor-wrap'>
              <Textarea
                className='editor-wrap__textarea'
                placeholder='请输入维修内容描述(必填)'
                maxlength={200}
                value={repairContent}
                onInput={(e) => setRepairContent(e.detail.value)}
              />
              <Text className='editor-wrap__count'>{repairContent.length}/200</Text>
            </View>
          ) : (
            <Text className='description-text'>{ticketData.repairRecord?.content ?? '--'}</Text>
          )}

          <View className='ticket-panel__divider' />
          <Text className='ticket-panel__title'>维修图片/视频上传</Text>
          {showEditableRepair && (
            <Text className='ticket-panel__tip'>最多可上传6张图片或视频；</Text>
          )}
          <View className='media-grid'>
            {repairImages.map((item, index) => (
              <View key={`${item}-${index}`} className='upload-item'>
                <Image className='upload-item__image' src={item} mode='aspectFill' />
                {showEditableRepair && (
                  <View className='upload-item__delete' onClick={() => handleDeleteImage(index)}>
                    <Text className='upload-item__delete-text'>×</Text>
                  </View>
                )}
              </View>
            ))}
            {showEditableRepair && repairImages.length < 6 && (
              <View className='upload-add' onClick={handleChooseImage}>
                <Text className='upload-add__icon'>📷</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {ticketData.status === 'pending' && (
        <View className='bottom-actions'>
          <View className='bottom-actions__button bottom-actions__button--ghost' onClick={handleStart}>
            <Text className='bottom-actions__text'>接单</Text>
          </View>
          <View className='bottom-actions__button' onClick={handleTransfer}>
            <Text className='bottom-actions__text'>转派</Text>
          </View>
        </View>
      )}

      {ticketData.status === 'processing' && (
        <View className='bottom-actions'>
          <View className='bottom-actions__button bottom-actions__button--ghost' onClick={() => handleSubmit('paused')}>
            <Text className='bottom-actions__text'>暂停</Text>
          </View>
          <View className='bottom-actions__button' onClick={() => handleSubmit('completed')}>
            <Text className='bottom-actions__text'>完成</Text>
          </View>
        </View>
      )}

      {ticketData.status === 'paused' && (
        <View className='bottom-actions'>
          <View className='bottom-actions__button bottom-actions__button--ghost' onClick={handleStart}>
            <Text className='bottom-actions__text'>继续</Text>
          </View>
          <View className='bottom-actions__button' onClick={() => handleSubmit('completed')}>
            <Text className='bottom-actions__text'>完成</Text>
          </View>
        </View>
      )}
    </View>
  )
}
