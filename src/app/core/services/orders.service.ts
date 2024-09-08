import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myheader: any = { token: localStorage.getItem('userToken') }
  constructor(private readonly _HttpClient: HttpClient) { }

  checkoutSession(id: string | null, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://ecommerc-route.netlify.app/`,
      {
        "shippingAddress": shippingAddress
      },
      {
        headers: this.myheader
      }
    )
  }

  getAllOrders(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)

  }
}
