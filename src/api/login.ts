import request_login from '@/libs/request_login'

//login
export const reqLogin = (username: string, password: string) => request_login({ url: 'admin/acl/index/login', method: 'post', data: { username, password } })
