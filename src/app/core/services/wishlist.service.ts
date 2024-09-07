import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
myheader:any|null ={token:localStorage.getItem('userToken')}

countNumInWishList:BehaviorSubject<number>=new BehaviorSubject(0)

  constructor(private readonly _HttpClient:HttpClient) { }

  addToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      },
      {
        headers:this.myheader
      }
    )
  }
  getAllProductInWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
      {
        headers:this.myheader
      }
    )
  }

  delFromWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
      {
        headers:this.myheader
      }
    )
  }
}
