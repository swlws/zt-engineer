import { useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import type { ButtonProps } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { STORAGE_KEYS } from '@/constants/storage-keys'
import { loginByCode } from '@/services/user'

import './index.scss'

const DEFAULT_AVATAR = 'https://picsum.photos/id/201/200/200'
const DEFAULT_NICK_NAME = '微信用户'

export default function Login() {
  const [agreed, setAgreed] = useState(false)
  const [showAgreementModal, setShowAgreementModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const openAgreementPage = (type: 'privacy' | 'user') => {
    Taro.navigateTo({
      url: `/pages/agreement/index?type=${type}`
    })
  }

  const onMainLoginClick = () => {
    if (submitting) return
    if (!agreed) {
      setShowAgreementModal(true)
    }
  }

  const onGetPhoneNumber: ButtonProps['onGetPhoneNumber'] = async (e) => {
    const phoneCode = e.detail.code
    if (!phoneCode) {
      console.info('[Auth] User canceled getPhoneNumber authorization.')
      Taro.showToast({ title: '已取消授权', icon: 'none' })
      return
    }

    setSubmitting(true)
    try {
      console.info('[Auth] Start login by code.')
      const { code } = await Taro.login()
      const resp = await loginByCode({
        code,
        phoneCode,
        avatarUrl: DEFAULT_AVATAR,
        nickName: DEFAULT_NICK_NAME
      })

      Taro.setStorageSync(STORAGE_KEYS.TOKEN, resp.token)
      Taro.setStorageSync(STORAGE_KEYS.USER_INFO, resp.userInfo)

      Taro.reLaunch({ url: '/pages/home/index' })
    } catch (err) {
      console.error('[Auth] Login failed.', err)
      Taro.showToast({
        title: err instanceof Error ? err.message : '登录失败',
        icon: 'none'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <View className='login'>
      <View className='login__content'>
        <View className='login__logo'>ZH</View>
        <View className='login__title'>智庭科技，欢迎您！</View>
        <View className='login__subtitle'>便捷登录，自助报修</View>

        {agreed ? (
          <Button
            className='login__primaryButton'
            openType='getPhoneNumber'
            loading={submitting}
            disabled={submitting}
            onGetPhoneNumber={onGetPhoneNumber}
          >
            手机号快速登录
          </Button>
        ) : (
          <Button
            className='login__primaryButton'
            loading={submitting}
            disabled={submitting}
            onClick={onMainLoginClick}
          >
            手机号快速登录
          </Button>
        )}
      </View>

      <View className='login__agreement'>
        <View
          className={`login__checkbox ${agreed ? 'login__checkbox--checked' : ''}`}
          onClick={() => setAgreed((prev) => !prev)}
        >
          {agreed && <View className='login__checkboxInner' />}
        </View>
        <Text className='login__agreementText'>我已阅读并同意</Text>
        <Text
          className='login__agreementLink'
          onClick={() => openAgreementPage('privacy')}
        >
          《隐私政策》
        </Text>
        <Text className='login__agreementText'>和</Text>
        <Text
          className='login__agreementLink'
          onClick={() => openAgreementPage('user')}
        >
          《用户协议》
        </Text>
      </View>

      {showAgreementModal && (
        <View className='login__overlay login__overlay--locked'>
          <View className='login__modal'>
            <View className='login__modalTitle'>温馨提示</View>
            <View className='login__modalDesc'>
              请阅读并同意
              <Text
                className='login__agreementLink'
                onClick={() => openAgreementPage('privacy')}
              >
                《隐私政策》
              </Text>
              和
              <Text
                className='login__agreementLink'
                onClick={() => openAgreementPage('user')}
              >
                《用户协议》
              </Text>
              后进行登录
            </View>
            <View className='login__modalActions'>
              <Button
                className='login__modalButton login__modalButton--cancel'
                onClick={() => setShowAgreementModal(false)}
              >
                取消
              </Button>
              <Button
                className='login__modalButton login__modalButton--confirm'
                onClick={() => {
                  setAgreed(true)
                  setShowAgreementModal(false)
                }}
              >
                已阅读并同意
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
