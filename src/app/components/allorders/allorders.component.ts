import { Component, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { IallOrder } from '../../core/interfaces/iall-order';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {
  private readonly _OrdersService =inject(OrdersService)
  private readonly _AuthService =inject(AuthService)
  // allorders:IallOrder={} as IallOrder
  allorders:IallOrder[]=[]
  ngOnInit(): void {
      this._AuthService.saveUserData()
      console.log(this._AuthService.userData.id);
      
    
     this._OrdersService.getAllOrders(this._AuthService.userData.id).subscribe({
     next:(res)=>{
       console.log('_OrdersService',res);
       this.allorders=res
     },
     error:(err)=>{
       console.log(err);
       
     }
    })
    
   }
}
