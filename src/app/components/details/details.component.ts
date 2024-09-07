import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class DetailsComponent implements OnInit {
  stars: number[] = new Array(5)
  categorieID: string | null = ''
  detailsList: Iproduct | null = null
  imagesList: string[] = []

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  productID: string[] =[]
  isempty:boolean=false


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.categorieID = p.get('id')
        console.log(p.get('id'));
        this._ProductsService.getSpecificProduct(this.categorieID).subscribe({
          next: (res) => {
            this.detailsList = res.data
            this.imagesList = res.data.images
            console.log(res.data);

          }, error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);

      }
    })
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
  }


  addToCard(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,'FreshCard')
        console.log(res);
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
