import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { log } from 'util';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders-details',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './orders-details.component.html',
  styleUrl: './orders-details.component.scss'
})
export class OrdersDetailsComponent implements OnInit {
private readonly _OrdersService= inject(OrdersService)
private readonly _ActivatedRoute= inject(ActivatedRoute)
private readonly _FormBuilder= inject(FormBuilder)
cartID:string|null=''
isloaded:boolean=false
msgError:string=''

shippingAddress:FormGroup=this._FormBuilder.group({
  details:[null,[RxwebValidators.required()]],
  phone :[null,[RxwebValidators.required(),RxwebValidators.pattern({expression:{'onlyEgNumber':/^01[0125][0-9]{8}$/} })]],
  city:[null,[RxwebValidators.required()]],
})


ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(params)=>{
    this.cartID=params.get('id')    
  }
})
}

  checkOut():void{
    this.isloaded=true
    this._OrdersService.checkoutSession( this.cartID ,this.shippingAddress.value).subscribe({
      next:(res)=>{
        if (res.status=='success') {
          this.isloaded=false
          window.open(res.session.url,'_self')
        }
        console.log(res);
        
      },error:(err)=>{        
        this.isloaded=false
      }
    })
  }
}
