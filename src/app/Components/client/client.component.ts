import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/shared/models/Client/Client';
import { Paging } from 'src/app/shared/models/Helper/Paging';
import { ResResult } from 'src/app/shared/models/Helper/Response';
import { TableService } from 'src/app/shared/services/Table/table.service';
import { Apiservice } from 'src/app/shared/services/crud/apiservice.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    NgFor,
    AsyncPipe,
    NgbTypeaheadModule,
		NgbPaginationModule,
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [TableService, DecimalPipe],
})

export class ClientComponent implements OnInit,OnDestroy  {
  SubscriptionArr: Subscription[] = [];
  Client:Client = {
    Id: 0,
    NameAr: '',
    NameEn: '',
    Note: '',
    Code: '',
    Address: '',
    Mobile: '',
    Phone1: '',
    Phone2: '',
    WhatsApp: '',
    Email: '',
    ClientCode: '',
    Nationality: '',
    Residence: '',
    Description: '',
    Job: '',
    ClientCalls: []
  }
  ClientArr:Client[] = []
  ErrorMassage:string = ''
  Show:boolean = false
  Paging:Paging={
    PageSize: 0,
    CurrentPage: 0,
    TotalPages: 0,
    TotalItems: 0,
    DataReturn: undefined
  }
  constructor(
    private toastr:ToastrService,
    private readonly _Title: Title,
    public modalService: NgbModal,
    public _TableService: TableService,
     public _Apiservice:Apiservice
    ) {}
    ngOnInit(): void {
      this.GetAllClient();
     }
    Send(ConfirmModal:any){

      if(this.Client.NameAr.trim() == ''){
      this.modalService.open(ConfirmModal, { size: 'md',centered:true })
      this._Apiservice.ErrorMassage = "برجاء ادخال اسم العميل"
      return
      }
      if(this.Client.Id == 0){
            let CallApi:Subscription = this._Apiservice.post('Client',this.Client,true).subscribe({
              next:(res:ResResult)=>{
                if(res.IsSuccess && res.Obj != null){
                 this.toastr.success("AddSuccess")
                  this.ResetData()
                }else {
                  this.toastr.error(res.Message)
                }
              }
            })
            this.SubscriptionArr.push(CallApi)
          }else {
            let CallApi:Subscription = this._Apiservice.put('Client',this.Client,true).subscribe({
              next:(res:ResResult)=>{
                if(res.IsSuccess && res.Obj != null){
                  this.toastr.success("UpdateSuccess")
                  this.ResetData()
                }else {
                  this.toastr.error(res.Message)
                }
              }
            })
          this.SubscriptionArr.push(CallApi)
        }
    }

OpenModal(OpenModal :any){
  this.ResetData()
  this.modalService.open(OpenModal, { size: 'lg',centered:true })
}


    ShowToEdite(Client:Client){
      this.Client = Client
      this.Show = !this.Show
      }


Delete(id:any){
  if(this.Client.Id ==0)
     this.Client.Id = id
  let CallApi:Subscription = this._Apiservice.delete('Client',this.Client.Id,true).subscribe({
    next:(res:ResResult)=>{
      if(res.IsSuccess && res.Obj != null){
        this.toastr.success("DeleteSuccess")
        this.ResetData()
        this.modalService.dismissAll()
      }else {
       this.toastr.error(res.Message)
      }
    }
  })
this.SubscriptionArr.push(CallApi)
}
GetAllClient(){
  let Paging = {
    CurrentPage:1,
    PageSize:10
  }
  let CallApi:Subscription=this._Apiservice.post("Client/GetAll",Paging,true).subscribe({
    next:(res:ResResult)=>{
      console.log(res)
      if(res.IsSuccess == true && res.Obj != null){
        this.Paging.DataReturn = res.Obj.DataReturn
        this.ClientArr = res.Obj.DataReturn
        this.Paging.CurrentPage = res.Obj.CurrentPage
        this.Paging.TotalItems = res.Obj.TotalItems
        this._TableService.start(this.Paging.DataReturn,0)
        this.Show = !this.Show
      }else {
        this.toastr.error(res.Message)
      }
    }
  })
  this.SubscriptionArr.push(CallApi)
}
PageSize(event:any){
  let Paging = {
    CurrentPage:event,
    PageSize:10
  }

  let CallApi:Subscription=this._Apiservice.post("Client/GetAll",Paging,true).subscribe({
    next:(res:ResResult)=>{
      if(res.IsSuccess == true && res.Obj != null){
        this.Paging.DataReturn = res.Obj.DataReturn
        this.Paging.CurrentPage = res.Obj.CurrentPage
        this.Paging.TotalItems = res.Obj.TotalItems
        this._TableService.start(this.Paging.DataReturn,0)
      }else {
        this.toastr.error(res.Message)
      }
    }
  })
  this.SubscriptionArr.push(CallApi)
}
ResetData(){
  this.Client =  {
    Id: 0,
    NameAr: '',
    NameEn: '',
    Note: '',
    Code: '',
    Address: '',
    Mobile: '',
    Phone1: '',
    Phone2: '',
    WhatsApp: '',
    Email: '',
    ClientCode: '',
    Nationality: '',
    Residence: '',
    Description: '',
    Job: '',
    ClientCalls: []
  }
this.Show = false
}
trackByMethod(index:number, el:Client): string {
  return el.Id;
}
ngOnDestroy(): void {
  for (let i = 0; i < this.SubscriptionArr.length; i++) {
      this.SubscriptionArr[i].unsubscribe()
   }
}
}
