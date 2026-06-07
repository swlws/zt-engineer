import { useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'

import './index.scss'

interface TicketDetail {
  id: number
  number: string
  status: 'repairing' | 'in_progress' | 'completed'
  statusText: string
  deviceName: string
  deviceCode: string
  deviceModel: string
  productionDate: string
  warrantyEndDate: string
  repairPerson: string
  phone: string
  expectTime: string
  address: string
  faultType: string
  description: string
  images: string[]
  repairInfo?: {
    repairTime: string
    repairPerson: string
  }
  canEvaluate: boolean
}

const ticketData: TicketDetail = {
  id: 1,
  number: 'NO000003',
  status: 'completed',
  statusText: '已完成',
  deviceName: 'VMS系列手动影像测量仪',
  deviceCode: 'WH00000001',
  deviceModel: 'VMS-3020',
  productionDate: '2025年6月30日',
  warrantyEndDate: '2028年6月30日',
  repairPerson: '张三',
  phone: '13800138000',
  expectTime: '2026-06-10 14:00',
  address: '北京市海淀区科技园A座101室',
  faultType: '其他',
  description: '设备出现异常噪音，需要检修',
  images: [],
  repairInfo: {
    repairTime: '2026-06-04',
    repairPerson: '李四'
  },
  canEvaluate: true
}

export default function TicketDetailPage() {
  const [rating, setRating] = useState({
    overall: 0,
    efficiency: 0,
    attitude: 0
  })
  const [comment, setComment] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'repairing': return '#fa8c16'
      case 'in_progress': return '#1677ff'
      case 'completed': return '#52c41a'
      default: return '#999'
    }
  }

  const handleStarClick = (type: 'overall' | 'efficiency' | 'attitude', value: number) => {
    setRating({ ...rating, [type]: value })
  }

  const handleSubmitEvaluation = () => {
    Taro.showToast({
      title: '评价提交成功',
      icon: 'success'
    })
  }

  const renderStars = (type: 'overall' | 'efficiency' | 'attitude', value: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Text 
        key={i} 
        className={`star ${i < value ? 'active' : ''}`}
        onClick={() => handleStarClick(type, i + 1)}
      >
        ★
      </Text>
    ))
  }

  return (
    <View className='ticket-detail-page'>
      <View className='ticket-detail-page__header'>
        <View className='ticket-number'>报修单编号：{ticketData.number}</View>
        <View 
          className='ticket-status'
          style={{ 
            backgroundColor: getStatusColor(ticketData.status) + '20',
            color: getStatusColor(ticketData.status)
          }}
        >
          {ticketData.statusText}
        </View>
      </View>

      <View className='info-section'>
        <View className='info-section__title'>设备信息</View>
        <View className='info-list'>
          <View className='info-item'>
            <Text className='label'>设备名称：</Text>
            <Text className='value'>{ticketData.deviceName}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>设备编号：</Text>
            <Text className='value'>{ticketData.deviceCode}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>设备型号：</Text>
            <Text className='value'>{ticketData.deviceModel}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>出厂日期：</Text>
            <Text className='value'>{ticketData.productionDate}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>质保截止日期：</Text>
            <Text className='value'>{ticketData.warrantyEndDate}</Text>
          </View>
        </View>
      </View>

      <View className='info-section'>
        <View className='info-section__title'>报修信息</View>
        <View className='info-list'>
          <View className='info-item'>
            <Text className='label'>报修人：</Text>
            <Text className='value'>{ticketData.repairPerson}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>联系电话：</Text>
            <Text className='value'>{ticketData.phone}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>期望维修时间：</Text>
            <Text className='value'>{ticketData.expectTime}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>地址：</Text>
            <Text className='value'>{ticketData.address}</Text>
          </View>
        </View>
      </View>

      <View className='info-section'>
        <View className='info-section__title'>故障信息</View>
        <View className='info-list'>
          <View className='info-item'>
            <Text className='label'>故障类型：</Text>
            <Text className='value'>{ticketData.faultType}</Text>
          </View>
          <View className='info-item'>
            <Text className='label'>故障描述：</Text>
            <Text className='value'>{ticketData.description}</Text>
          </View>
        </View>
        {ticketData.images.length > 0 && (
          <View className='image-grid'>
            {ticketData.images.map((img, index) => (
              <View key={index} className='image-item' style={{ background: '#f0f0f0' }} />
            ))}
          </View>
        )}
      </View>

      {ticketData.repairInfo && (
        <View className='info-section'>
          <View className='info-section__title'>维修信息</View>
          <View className='info-list'>
            <View className='info-item'>
              <Text className='label'>维修时间：</Text>
              <Text className='value'>{ticketData.repairInfo.repairTime}</Text>
            </View>
            <View className='info-item'>
              <Text className='label'>维修师傅：</Text>
              <Text className='value'>{ticketData.repairInfo.repairPerson}</Text>
            </View>
          </View>
        </View>
      )}

      {ticketData.canEvaluate && (
        <View className='evaluation-section'>
          <View className='info-section__title'>满意度评价</View>
          
          <View className='rating-item'>
            <Text className='rating-label'>总体满意度</Text>
            <View className='rating-stars'>
              {renderStars('overall', rating.overall)}
            </View>
          </View>
          
          <View className='rating-item'>
            <Text className='rating-label'>维修效率</Text>
            <View className='rating-stars'>
              {renderStars('efficiency', rating.efficiency)}
            </View>
          </View>
          
          <View className='rating-item'>
            <Text className='rating-label'>服务态度</Text>
            <View className='rating-stars'>
              {renderStars('attitude', rating.attitude)}
            </View>
          </View>

          <View className='comment-section'>
            <Textarea 
              className='comment-input'
              placeholder='请输入您的评价...'
              value={comment}
              maxlength={200}
              onInput={(e) => setComment(e.detail.value)}
            />
            <View className='char-count'>{comment.length}/200</View>
          </View>

          <View className='submit-evaluation' onClick={handleSubmitEvaluation}>
            <Text>提交评价</Text>
          </View>
        </View>
      )}
    </View>
  )
}
