
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Define your routes here
const routes: Routes = [
    { path: 'products', loadChildren:()=>import('./products/products.module').then(m=>m.ProductListModule) },
    { path: 'add-product', loadChildren:()=> import('./add-product/add-product.module').then(m=>m.AddProductModule) },
    { path: 'products/:id', loadChildren:()=>import('./products/product-detail.module').then(m=>m.ProductDetailModule) },
    
    { path: 'edit-product/:id', component: EditProductComponent },
    { path: 'cart', loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule) },
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {
      path: "orders",
      loadChildren:()=> import('./my-orders/my-orders.module').then(m=>m.MyOrdersModule)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}