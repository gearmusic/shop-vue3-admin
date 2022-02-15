
export interface Status {
  code: number,
  data: {},
  message: string,
  success: boolean,
}

export interface PageInfo {
  current: number,
  pages: number,
  searchCount: boolean,
  size: number,
  total: number,
  records: []
}