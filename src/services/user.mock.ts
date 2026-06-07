import type { LoginParams, LoginResp } from '@/types/user'

export function mockUserLogin(data: LoginParams): Promise<LoginResp> {
  console.info('[AuthServiceMock] Returning mock login response.', {
    nickName: data.nickName,
    phoneCodePresent: Boolean(data.phoneCode)
  })

  return Promise.resolve({
    token: 'mock-token-zt-customer',
    userInfo: {
      avatarUrl: 'https://picsum.photos/id/64/200/200',
      nickName: '测试用户',
      phone: '15600006610'
    }
  })
}
