import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  cartProductDetail:Icart={}as Icart
  disabledBtn:boolean=false
  ngOnInit(): void {
    this._CartService.getProductsOfCart().subscribe({
      next:(res)=>{
        this.cartProductDetail=res.data
        console.log(this.cartProductDetail);
      },error:(err)=>{
        console.log(err);
        
      },complete:()=>{
        if (this.cartProductDetail.totalCartPrice==0) {
          this.disabledBtn=true
    
        }
      }
    })
  }

  deleteItem(id:string):void{
    this._CartService.delSpecificProduct(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.status,'FreshCard')
        this.cartProductDetail=res.data
        this._CartService.countNum.next(res.numOfCartItems)
        console.log(res);
      },error:(err)=>{
        console.log(err);
        
      },complete:()=>{
        if (this.cartProductDetail.totalCartPrice==0) {
          this.disabledBtn=true
    
        }
      }
    })
  }
updateQuantity(id:string,newCount:number):void{
  if(newCount>0){
    this._CartService.updateCardProductQuantity(id,newCount).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.status,'FreshCard')
        this.cartProductDetail=res.data
        console.log(res.data);
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}

clearTheCart():void{
  this._CartService.clearUserCart().subscribe({
    next:(res)=>{
      if(res.message='success'){
        this._ToastrService.success(res.message,'FreshCard')
        this.cartProductDetail={} as Icart               
        this._CartService.countNum.next(0)
        console.log(res);
      }
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}


alertBeforeDelelet(){
  Swal.fire({title: 'Are Your Sure Want To Remove?', position: 'center', showCancelButton:true,confirmButtonText: 'Yes, Delete it !', cancelButtonText: 'No, Keep It' ,icon: 'warning', }).then((result)=>{
    if(result.value){
      this.clearTheCart()
      this.disabledBtn = true
    }
  });
}

}
