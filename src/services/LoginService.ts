import ILoginService from './ILoginService'

import { reqLogin } from '@/api/login'
import { Status } from '@/types/api'

import { setToken, removeToken } from '@/libs/auth'

const LoginService: ILoginService = {
  async login(username: string, password: string) {
    let result: Status = (await reqLogin(username, password)).data

    if(result.code === 20000 || result.code === 200) {
      setToken(result.data as string)
      return true
    }

    return false 
  },

  Logout(): void {
    removeToken()
  }
}

export default LoginService
