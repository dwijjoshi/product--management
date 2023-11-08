import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from './products/product.service';
import { Store } from '@ngrx/store';
import { MyHttpServiceService } from './my-http-service.service';
import { clearState, getCartItems, isAdmin, name, toggleUser } from './shared/store/cart.actions';
import { CounterModel } from './shared/store/cart.state';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService],
})
export class AppComponent implements OnInit, DoCheck,OnChanges {
  pageTitle: string = 'Product Management';
  isAdmin: boolean = false;

  constructor(
    private store: Store<{
      counter: CounterModel;
    }>,
    private service: MyHttpServiceService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  cartItems!: number;
  admin!: boolean;
  popup!: boolean;
  showLogout!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
     
  }
  

  ngDoCheck(): void {
    //this code is for checking wether a token exists or not
    //if a token exists it means that the user is logged in
    const token = this.cookieService.get('token');
    token ? (this.showLogout = true) : (this.showLogout = false);
    console.log("Hello");
  }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    console.log(this.cartItems);

    if(token){
      console.log("Just tryinggg");
      

      this.service.getUser().subscribe((data:any)=>{
        this.admin = data.user.isAdmin;
        console.log(this.isAdmin,"Admin testing");
        this.setAdmin(data.user.isAdmin==="false"? false : true);
        this.setName(data.user.name);
        
      })
    this.service.getCartProduct().subscribe((data: any) => {  
      this.cartItems = data.cartProducts.length;
      data.cartProducts.forEach((product: any) => {
        if (product.quantitiy > 1) {
          this.cartItems = this.cartItems + (product.quantitiy - 1);
        }
      });
      console.log(this.cartItems,"Cart Items");
      

      this.setCounter(this.cartItems);
    }); 
  }

  


    //number of items in cart
    this.store.select('counter').subscribe((data) => {
      this.cartItems = data.counter;
    });


    //checking wether the user is admin or not
    this.store.select('counter').subscribe((data: any) => {
      this.admin = data.admin;
    });

    
  }

  deleteCookies(cookieName:string){
    const allCookies = this.cookieService.getAll();
    for(const cookieKey in allCookies){
      if(allCookies.hasOwnProperty(cookieKey) && cookieKey === cookieName){
        this.cookieService.delete(cookieKey);
      }
    }
  }

  setName(value:string){
    this.store.dispatch(name({value}))
  }

  setAdmin(value:boolean){
    console.log(typeof(value),"Value");
    
    this.store.dispatch(isAdmin({ value }));
  }

  setCounter(value: number) {
    this.store.dispatch(getCartItems({ value }));
  }


  logoutUser = () => {
    this.service.logoutUser().subscribe(
      (data: any) => {
        console.log("Logging out");
        
        this.router.navigate(['/login']);
        this.deleteCookies('token')
        this.toastr.success(data.message, 'Success', {
          positionClass: 'toast-bottom-left',
        });
        this.store.dispatch(clearState())
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-left',
        });
      }
    );
  };
}
