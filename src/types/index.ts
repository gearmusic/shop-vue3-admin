//为了tag-input-group的使用增加的属性
export interface TagSelect {
  value: string,
  selected: boolean
}

//为了file-uploader使用增加的属性
export interface FileUploadImg {
  uid: number,
  name: string,
  url: string
}

//为了使用下拉选择增加的属性
export interface SelectItem {
  id: number,
  text: string
}