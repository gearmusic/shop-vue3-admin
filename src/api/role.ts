import request from '@/libs/request_login'

import { Role } from '@/types/role'

export const reqList = (pageSize: number, pageNo: number) =>  request({ url: `/admin/acl/role/${pageNo}/${pageSize}`, method: 'get' })

export const getIt = (id: string) => request({ url: `/admin/acl/role/get/${id}`, method: 'get' })

export const addIt = (role: Role) => request({ url: `/admin/acl/role/save`, method: 'post', data: role })

export const saveIt = (role: Role) => request({ url: `/admin/acl/role/update`, method: 'put', data: role })

export const deleteIt = (id: string) => request({ url: `/admin/acl/role/remove/${id}`, method: 'delete' })

export const getSelectList = () => request({ url: `/admin/acl/user/toAssign/100`, method: 'get' })
