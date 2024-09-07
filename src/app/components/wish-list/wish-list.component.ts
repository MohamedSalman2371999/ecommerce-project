import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IWhishlist } from '../../core/interfaces/iwhishlist';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  allProductInWishList: IWhishlist[] | null = null
  stars: number[] = new Array(5)
  isempty:boolean=false

  ngOnInit(): void {
    this._WishlistService.getAllProductInWishList().subscribe({
      next: (res) => {
        if (res.count==0) {
          this.isempty=true
        }
        console.log(res);
        this.allProductInWishList = res.data
      }, error: (err) => {
        console.log(err);

      }
    })

  }
  // addProductToWishList(id: string): void {
  //   this._WishlistService.addToWishList(id).subscribe({
  //     next: (res) => {
  //       this._ToastrService.success(res.message, 'FreshCard')
  //       console.log(res);
  //     }, error: (err) => {
  //       console.log(err);

  //     }
  //   })
  // }

  addToCard(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'FreshCard')
        console.log(res);
      }, error: (err) => {
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
              this._WishlistService.countNumInWishList.next(res.count)
            }
            this._WishlistService.countNumInWishList.next(res.count)
            console.log(res);
            this.allProductInWishList = res.data
          }
        })
      }, error: (err) => {
        console.log(err);

      }
    })
  }



}
