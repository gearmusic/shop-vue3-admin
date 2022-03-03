import request from '@/libs/request_login'

import { User } from '@/types/user'

export const reqList = (pageSize: number, pageNo: number) => request({ url: `/admin/acl/user/${pageNo}/${pageSize}`, method: 'get' })

export const getIt = (id: string) => request({ url: `/admin/acl/user/get/${id}`, method: 'get' })

export const addIt = (user: User) => request({ url: `/admin/acl/user/save`, method: 'post', data: user })

export const deleteIt = (id: string) => request({ url: `/admin/acl/user/remove/${id}`, method: 'delete' })

export const assignIt = (id: string, roleIds: string[]) => {
  let url = `/admin/acl/user/doAssign?userId=${id}`
  roleIds.forEach(m => {
    url += '&roleId=' + m
  })

  return request({ url, method: 'post' })
}