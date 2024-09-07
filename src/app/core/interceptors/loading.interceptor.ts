import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService=inject(NgxSpinnerService)

  if (req.url.includes('cart')||req.url.includes('products')||req.url.includes('categories')||req.url.includes('brands')||req.url.includes('wishlist')||req.url.includes('orders')) {
    _NgxSpinnerService.show()
  }
  return next(req).pipe(finalize(()=>{
    _NgxSpinnerService.hide()
  }));
};
