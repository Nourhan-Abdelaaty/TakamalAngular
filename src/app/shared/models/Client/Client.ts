import { BaseModel } from "../Helper/BaseModel";

export interface Client extends BaseModel {
  Address:string
  Mobile:string
  Phone1:string
  Phone2:string
  WhatsApp:string
  Email:string
  ClientCode:string
  Nationality:string
  Residence:string
  Description:string
  Job:string
  ClientCalls:ClientCalls[]
}
export interface ClientCalls extends BaseModel  {
  Description:string
  CallAddress:string
  Project:string
  Date:string
  Employee:string
  CallType:string
  IsDone:boolean
}
