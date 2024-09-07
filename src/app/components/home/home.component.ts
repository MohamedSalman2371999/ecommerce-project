import { resolve } from 'node:path';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, viewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Iproduct } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SlicePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { HeartDirective } from '../../heart.directive';
import { IWhishlist } from '../../core/interfaces/iwhishlist';
import { stringify } from 'node:querystring';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CarouselModule, RouterLink,SlicePipe,SearchPipe,FormsModule,TranslateModule,HeartDirective,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  stars: number[] = new Array(5)
  productID: string[] =[]

  addedto:boolean=false
  text:string =''
  customOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<i class="fa-solid fa-angle-up fa-rotate-270 bg-transparent"></i>', '<i class="fa-solid fa-angle-up fa-rotate-90"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainsliderOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<i class="fa-solid fa-angle-up fa-rotate-270 bg-transparent"></i>', '<i class="fa-solid fa-angle-up fa-rotate-90"></i>'],
    items:1,
    nav: false
  }
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService=inject(WishlistService)

  productList: Iproduct[] = []
  newproductList: Iproduct[] = []
  CategoriestList: Icategories[] = []
  heartproduct: IWhishlist[] | null = null
  isempty:boolean=false
  // @ViewChild('heart') x!:ElementRef
  ngOnInit(): void {
    this._WishlistService.getAllProductInWishList().subscribe({
      next: (res) => {
        // this.heartproduct =res.data
        // console.log("getAllProductInWishList",this.heartproduct);
        this.productID=res.data.map((item:any)=>item._id)
        console.log( this.productID);
        this._WishlistService.countNumInWishList.next(res.count)
      },
      error: (err) => {
        console.log(err);

      }
    })
    this._CategoriesService.getAllCategoreis().subscribe({
      next: (res) => {
        this.CategoriestList = res.data
        console.log("CategoriestList", this.CategoriestList);

      },
      error: (err) => {
        console.log(err);

      }
    })
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data
        localStorage.getItem('newcolor')
        console.log("list",this.productList);
        // this.check()

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  addToCard(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,'FreshCard')
        console.log(res);
        this.addedto=true
        this._CartService.countNum.next(res.numOfCartItems)
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addProductToWishList(id:string):void{
    this._WishlistService.addToWishList(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,'FreshCard')
        console.log(res);
        this.productID=res.data
        this._WishlistService.getAllProductInWishList().subscribe({
          next: (res) => {
            // this.heartproduct =res.data
            // console.log("getAllProductInWishList",this.heartproduct);
            this.productID=res.data.map((item:any)=>item._id)
            console.log( this.productID);
            this._WishlistService.countNumInWishList.next(res.count)
          },
          error: (err) => {
            console.log(err);
    
          }
        })
        // this. check()
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  chageHeart(e:any):void{
    if (e.target.classList.contains('text-danger')) {
      e.target.classList.remove("text-danger")
    }else{
      e.target.classList.add("text-danger")
    }
  }

  // check():void{
  //   this.heartproduct?.forEach((item)=>{
  //     this.productID.push(item._id)
      
  //   })
  //   console.log(this.productID);
    

  //     }


  deleteItem(id: string): void {
    this._WishlistService.delFromWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success("Deleted " + res.status, 'FreshCard')
        this._WishlistService.getAllProductInWishList().subscribe({
          next: (res) => {
            if (res.count==0) {
              this.isempty=true
            }
            this._WishlistService.countNumInWishList.next(res.count)
            this.productID=res.data.map((item:any)=>item._id)
            console.log( this.productID);
            // this.check()
            console.log(res);
            this.heartproduct = res.data
          }
        })
      }, error: (err) => {
        console.log(err);

      }
    })
  }
    
}
