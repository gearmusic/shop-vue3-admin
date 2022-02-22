export interface Category {
  category1Id: number | '',
  category1Name?: string,
  category2Id: number | '',
  category2Name?: string,
  category3Id: number | '',
  category3Name?: string,
  options1: Option[],
  options2: Option[],
  options3: Option[],
}

export interface Option {
  id: number,
  name: string
}