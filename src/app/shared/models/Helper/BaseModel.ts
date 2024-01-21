
export interface BaseModel {
  Id:number| any
  NameAr:string
  NameEn:string
  Note:string
  Code:string
  CreatedById?:string
  CreatedByName?:string
  CreatedDate?:string
  ModifyById?:string
  ModifyByName?:string
  LastModifiedDate?:string
  ModifyCount?:number
}
