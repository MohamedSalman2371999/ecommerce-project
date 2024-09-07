import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces/product';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { IWhishlist } from '../../core/interfaces/iwhishlist';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,SearchPipe,RouterLink,TranslateModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  stars: number[] = new Array(5)
  text: string = ''
  productID: string[] =[]

  heartproduct: IWhishlist[] | null = null
  isempty:boolean=false
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService=inject(WishlistService)

  productList: Iproduct[] = []
  productList2: Iproduct[] = []
  ngOnInit(): void {
    this._WishlistService.getAllProductInWishList().subscribe({
      next: (res) => {
        // this.heartproduct =res.data
        // console.log("getAllProductInWishList",this.heartproduct);
        this.productID=res.data.map((item:any)=>item._id)
        console.log( this.productID);

      },
      error: (err) => {
        console.log(err);

      }
    })
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data
        console.log(this.productList);
        this.check()
      },
      error: (err) => {
        console.log(err);

      }
    })
    this._ProductsService.getProducts__().subscribe({
      next: (res) => {
        this.productList2 = res.data
        console.log(this.productList);
        this.check()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  addToCard(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'FreshCard')
        console.log(res);
        this._CartService.countNum.next(res.numOfCartItems)
      }, error: (err) => {
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

  check():void{
    this.heartproduct?.forEach((item)=>{
      this.productID.push(item._id)
      
    })
    console.log(this.productID);
    

      }


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
            // console.log(res);
            // this.heartproduct = res.data
          }
        })
      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
