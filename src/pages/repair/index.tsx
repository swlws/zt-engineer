import { useState } from 'react'
import { View, Text, Input, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { getFaultTypes, getRepairDevices, getTicketList, submitRepair } from '@/services/repair'
import type { FaultType, RepairDevice, Ticket } from '@/types/repair'

import './index.scss'

export default function RepairPage() {
  const [activeTab, setActiveTab] = useState<string>('form')

  const [faultTypes, setFaultTypes] = useState<FaultType[]>([])
  const [devices, setDevices] = useState<RepairDevice[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])

  const [formData, setFormData] = useState({
    deviceId: null as number | null,
    repairPerson: '',
    phone: '',
    expectTime: '',
    address: '',
    selectedFaultTypes: [] as number[],
    description: '',
    images: [] as string[],
  })

  // 加载报修表单数据
  const loadFormData = () => {
    getFaultTypes().then(setFaultTypes).catch(() => {})
    getRepairDevices().then(setDevices).catch(() => {})
  }

  // 加载报修记录数据
  const loadTickets = () => {
    getTicketList().then(setTickets).catch(() => {})
  }

  // Tab切换时加载数据
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === 'form' && faultTypes.length === 0) {
      loadFormData()
    }
    if (tab === 'records' && tickets.length === 0) {
      loadTickets()
    }
  }

  // 初始加载
  useState(() => {
    loadFormData()
  })

  const selectedDevice = formData.deviceId
    ? (devices.find((d) => d.id === formData.deviceId) ?? null)
    : null

  const handleSelectDevice = () => {
    Taro.showActionSheet({
      itemList: devices.map((d) => d.name),
      success: (res) => {
        setFormData({
          ...formData,
          deviceId: devices[res.tapIndex].id,
        })
      },
    })
  }

  const toggleFaultType = (id: number) => {
    const currentIds = formData.selectedFaultTypes
    const newIds = currentIds.includes(id)
      ? currentIds.filter((i) => i !== id)
      : [...currentIds, id]
    setFormData({ ...formData, selectedFaultTypes: newIds })
  }

  const handleSubmit = () => {
    submitRepair({
      deviceId: formData.deviceId!,
      repairPerson: formData.repairPerson,
      phone: formData.phone,
      expectTime: formData.expectTime,
      address: formData.address,
      faultTypeIds: formData.selectedFaultTypes,
      description: formData.description,
      images: formData.images,
    }).then(() => {
      Taro.showToast({
        title: '提交成功',
        icon: 'success',
      })
    }).catch(() => {
      Taro.showToast({
        title: '提交失败',
        icon: 'none',
      })
    })
  }

  const goToDetail = (ticketId: number) => {
    Taro.navigateTo({
      url: '/pages/ticket-detail/index?id=' + ticketId,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'repairing':
        return '#fa8c16'
      case 'in_progress':
        return '#1677ff'
      case 'completed':
        return '#52c41a'
      default:
        return '#999'
    }
  }

  return (
    <View className='repair-page'>
      <View className='repair-page__tabs'>
        <View
          className={`repair-page__tab ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => handleTabChange('form')}
        >
          <Text className='repair-page__tab-text'>在线报修</Text>
        </View>
        <View
          className={`repair-page__tab ${activeTab === 'records' ? 'active' : ''}`}
          onClick={() => handleTabChange('records')}
        >
          <Text className='repair-page__tab-text'>报修记录</Text>
        </View>
      </View>

      {activeTab === 'form' && (
        <View className='repair-page__content'>
          <View className='form-section'>
            <View className='form-section__title'>设备信息</View>

            <View
              className='form-item form-item--row'
              onClick={handleSelectDevice}
            >
              <View className='form-item__label'>
                <Text className='required'>*</Text>
                <Text>设备名称</Text>
              </View>
              <View className='form-item__control'>
                <View className='form-item__value'>
                  <Text className={selectedDevice ? '' : 'placeholder'}>
                    {selectedDevice ? selectedDevice.name : '请选择设备...'}
                  </Text>
                  <Text className='arrow'>▼</Text>
                </View>
              </View>
            </View>

            {selectedDevice && (
              <View className='device-info'>
                <View className='device-info__item'>
                  <Text className='label'>设备编号：</Text>
                  <Text className='value'>{selectedDevice.code}</Text>
                </View>
                <View className='device-info__item'>
                  <Text className='label'>设备型号：</Text>
                  <Text className='value'>{selectedDevice.model}</Text>
                </View>
                <View className='device-info__item'>
                  <Text className='label'>出厂日期：</Text>
                  <Text className='value'>{selectedDevice.productionDate}</Text>
                </View>
                <View className='device-info__item'>
                  <Text className='label'>质保截止日期：</Text>
                  <Text className='value'>
                    {selectedDevice.warrantyEndDate}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View className='form-section'>
            <View className='form-section__title'>报修信息</View>

            <View className='form-item form-item--row'>
              <View className='form-item__label'>
                <Text className='required'>*</Text>
                <Text>报修人</Text>
              </View>
              <View className='form-item__control'>
                <Input
                  className='form-item__input'
                  placeholder='请输入...'
                  value={formData.repairPerson}
                  onInput={(e) =>
                    setFormData({ ...formData, repairPerson: e.detail.value })
                  }
                />
              </View>
            </View>

            <View className='form-item form-item--row'>
              <View className='form-item__label'>
                <Text className='required'>*</Text>
                <Text>联系电话</Text>
              </View>
              <View className='form-item__control'>
                <Input
                  className='form-item__input'
                  type='number'
                  placeholder='请输入...'
                  value={formData.phone}
                  onInput={(e) =>
                    setFormData({ ...formData, phone: e.detail.value })
                  }
                />
              </View>
            </View>

            <View className='form-item form-item--row'>
              <View className='form-item__label'>
                <Text className='required'>*</Text>
                <Text>期望维修时间</Text>
              </View>
              <View className='form-item__control'>
                <View className='form-item__value'>
                  <Text className={formData.expectTime ? '' : 'placeholder'}>
                    {formData.expectTime || '请选择...'}
                  </Text>
                  <Text className='arrow'>📅</Text>
                </View>
              </View>
            </View>

            <View className='form-item form-item--col'>
              <View className='form-item__label'>
                <Text className='required'>*</Text>
                <Text>地址</Text>
              </View>
              <Textarea
                className='form-item__textarea'
                placeholder='请输入报修具体地址...'
                value={formData.address}
                onInput={(e) =>
                  setFormData({ ...formData, address: e.detail.value })
                }
              />
            </View>
          </View>

          <View className='form-section'>
            <View className='form-section__title'>故障类型</View>
            <View className='fault-types'>
              {faultTypes.map((type) => (
                <View
                  key={type.id}
                  className={`fault-type-tag ${formData.selectedFaultTypes.includes(type.id) ? 'active' : ''}`}
                  onClick={() => toggleFaultType(type.id)}
                >
                  {type.label}
                </View>
              ))}
            </View>
          </View>

          <View className='form-section'>
            <View className='form-section__title'>故障描述</View>
            <View className='form-item form-item--col'>
              <Textarea
                className='form-item__textarea'
                placeholder='请详细描述设备故障情况...'
                value={formData.description}
                onInput={(e) =>
                  setFormData({ ...formData, description: e.detail.value })
                }
              />
            </View>

            <View className='upload-header'>
              <Text className='upload-title'>上传图片/视频</Text>
              <Text className='upload-tip'>最多可上传6张图片或视频；</Text>
            </View>
            <View className='upload-grid'>
              {formData.images.map((_, index) => (
                <View key={index} className='upload-item'>
                  <View
                    className='upload-item__image'
                    style={{ background: '#f0f0f0' }}
                  />
                  <View className='upload-item__delete'>✕</View>
                </View>
              ))}
              {formData.images.length < 6 && (
                <View className='upload-item upload-item__add'>
                  <Text className='upload-icon'>📷</Text>
                </View>
              )}
            </View>
          </View>

          <View className='submit-section'>
            <View className='submit-btn' onClick={handleSubmit}>
              <Text>确认提交</Text>
            </View>
          </View>
        </View>
      )}

      {activeTab === 'records' && (
        <View className='repair-page__content'>
          <View className='ticket-list'>
            {tickets.map((ticket) => (
              <View key={ticket.id} className='ticket-card'>
                <View className='ticket-card__header'>
                  <Text className='ticket-card__number'>
                    报修单编号：{ticket.number}
                  </Text>
                  <View
                    className='ticket-card__status'
                    style={{
                      backgroundColor: getStatusColor(ticket.status) + '20',
                      color: getStatusColor(ticket.status),
                    }}
                  >
                    <Text className='ticket-card__status-text'>
                      ● {ticket.statusText}
                    </Text>
                  </View>
                </View>

                <View className='ticket-card__info'>
                  <View className='ticket-card__info-item'>
                    <Text className='label'>设备名称：</Text>
                    <Text className='value ellipsis'>{ticket.deviceName}</Text>
                  </View>
                  <View className='ticket-card__info-item'>
                    <Text className='label'>报修时间：</Text>
                    <Text className='value'>{ticket.repairTime}</Text>
                  </View>
                  <View className='ticket-card__info-item'>
                    <Text className='label'>故障类型：</Text>
                    <Text className='value'>{ticket.faultType}</Text>
                  </View>
                </View>

                <View className='ticket-card__footer'>
                  {ticket.canEvaluate && (
                    <View className='ticket-card__btn secondary'>
                      <Text>写评价</Text>
                    </View>
                  )}
                  <View
                    className='ticket-card__btn'
                    onClick={() => goToDetail(ticket.id)}
                  >
                    <Text>查看</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}