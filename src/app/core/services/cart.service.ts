import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  countNum:BehaviorSubject<number>=new BehaviorSubject(0)
  
  constructor(private readonly _HttpClient:HttpClient) { }
  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
            "productId": id
      }
    )
  }
  getProductsOfCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`
    )
  }
  delSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`
    )
  }
  updateCardProductQuantity(id:string,newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
        "count": newCount
    }
    )
  }

  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
    )
  }
}
