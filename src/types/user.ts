export interface UserInfo {
  avatarUrl: string
  nickName: string
  phone?: string
}

export interface LoginParams {
  code: string
  phoneCode: string
  avatarUrl: string
  nickName: string
}

export interface LoginResp {
  token: string
  userInfo: UserInfo
}
