import { PropsWithChildren } from 'react'
import Taro, { useDidShow, useLaunch } from '@tarojs/taro'

import { STORAGE_KEYS } from '@/constants/storage-keys'

import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  const checkLoginState = () => {
    const token = Taro.getStorageSync<string>(STORAGE_KEYS.TOKEN)
    const userInfo = Taro.getStorageSync(STORAGE_KEYS.USER_INFO)
    const currentPages = Taro.getCurrentPages()
    const currentRoute = currentPages[currentPages.length - 1]?.route ?? ''
    const isLoginPage = currentRoute === 'pages/login/index'

    if (!token || !userInfo) {
      if (!isLoginPage) {
        Taro.reLaunch({ url: '/pages/login/index' })
      }
      return
    }

    if (isLoginPage) {
      Taro.reLaunch({ url: '/pages/home/index' })
    }
  }

  useLaunch(() => {
    checkLoginState()
  })

  useDidShow(() => {
    checkLoginState()
  })

  // children 是将要会渲染的页面
  return children
}

export default App
