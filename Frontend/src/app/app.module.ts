import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ToastComponent } from './toast/toast.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { counterReducer } from './shared/store/cart.reducer';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './loading/loading-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    EditProductComponent,
    ToastComponent,
    SignupComponent,
    LoadingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument(),
    

    RouterModule.forRoot([
      { path: 'products', loadChildren:()=>import('./products/products.module').then(m=>m.ProductListModule) },
      { path: 'add-product', loadChildren:()=> import('./add-product/add-product.module').then(m=>m.AddProductModule) },
      { path: 'products/:id', loadChildren:()=>import('./products/product-detail.module').then(m=>m.ProductDetailModule) },
      { path: 'welcome', component: WelcomeComponent },
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
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
