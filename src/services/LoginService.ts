import ILoginService from './ILoginService'

import { reqLogin } from '@/api'
import { Status } from '@/types/api'

const LoginService: ILoginService = {
  async login(username: string, password: string) {
       
    let result: Status = (await reqLogin(username, password)).data
    return result.code === 20000 || result.code === 200
  }
}

export default LoginService
