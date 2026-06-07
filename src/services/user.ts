import type { LoginParams, LoginResp } from "@/types/user";
import { USE_MOCK } from "@/utils/constant";

import { mockUserLogin } from "./user.mock";
import { request } from "./request";

const BASE_URL = "";

export function loginByCode(params: LoginParams) {
  if (USE_MOCK) {
    return mockUserLogin(params);
  }

  return request<LoginResp>({
    url: `${BASE_URL}/auth/wx-login`,
    method: "POST",
    data: params,
  });
}
