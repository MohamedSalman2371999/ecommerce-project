import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/gards/auth.guard';
import { logedGuard } from './core/gards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, canActivate: [logedGuard], children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgetPassword', component:ForgetPasswordComponent  }
        ]
    },
    {
        path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductComponent },
            { path: 'cart', component: CartComponent },
            { path: 'brands', component: BrandsComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'details/:id', component: DetailsComponent },
            { path: 'wishList', component: WishListComponent },
            { path: 'ordersDetails/:id', component: OrdersDetailsComponent },
            { path: 'subCategory/:id', component: SubCategoryComponent },
            { path: 'allorders', component: AllordersComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
