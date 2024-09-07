import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
 readonly _AuthService = inject(AuthService)
 readonly _TranslationService = inject(TranslationService)
 readonly _TranslateService = inject(TranslateService)
 readonly _CartService = inject(CartService)
 readonly _WishlistService = inject(WishlistService)


 N_count:number=0
 N_countInWishList:number=0

 ngOnInit(): void {

this._CartService.getProductsOfCart().subscribe({
  next:(data)=>{
    this.N_count=data.numOfCartItems
  }
})
this._WishlistService.getAllProductInWishList().subscribe({
  next:(data)=>{
    this.N_countInWishList=data.count
  }
})

  this._CartService.countNum.subscribe({
    next:(data)=>{
      this.N_count=data
    }
  })


  this._WishlistService.countNumInWishList.subscribe({
    next:(data)=>{
      this.N_countInWishList=data
    }
  })


  
 }
 Change(lang:string):void{
  this._TranslationService.chageLang(lang)
 }
}
