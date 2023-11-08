import { Component, OnInit, OnChanges } from '@angular/core';
import { MyHttpServiceService } from '../my-http-service.service';
import { Iproduct } from '../products/product';
import { Store } from '@ngrx/store';
import { addToCart, removeFromCart, removeMultipleFromCart } from '../shared/store/cart.actions';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private myService: MyHttpServiceService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router:Router,
    private store: Store<{ counter: { counter: number } }>
  ) {}
  products!:any[];
  showImage: boolean = true;
  amount: number = 0;
  paymentHandler:any = null;
  
  

  ngOnInit(): void {

    const token = this.cookieService.get('token');
    if(!token){
      this.toastr.error("Please login first","Error",{
        positionClass:"toast-bottom-left"
      })
      this.router.navigate(['/login'])
    }

    this.invokeStripe();



    this.myService.getCartProduct().subscribe((data: any) => {
      this.products = data.cartProducts;
      this.products.forEach((item:any) => {
        this.amount = this.amount + (item.productId.price * item.quantitiy);
      });
    });

    // this.myService.getUser().subscribe((data:any)=>{
    //   this.products = data.user.cartProducts;
    //   this.products.forEach((item:any)=>{
    //     this.amount = this.amount + (item.price *item.quantity)
    //   })
    // })
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51McmkwSFOTyWHR53C4PN9p4TWU5hr7xXDBKKxLTAGe3SKbmzPU2JDxBKdN5x3HQUVWBY6WA5Cafp9Ds2RNHQtztd00PXbL6Fm8',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
            
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51McmkwSFOTyWHR53C4PN9p4TWU5hr7xXDBKKxLTAGe3SKbmzPU2JDxBKdN5x3HQUVWBY6WA5Cafp9Ds2RNHQtztd00PXbL6Fm8',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        apiCall();
        alert('Stripe token generated!');
        
        
      },
    });
    
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });

    const apiCall = () => {
      this.myService.paymentMade().subscribe((data:any)=>{
        console.log(data);
        this.router.navigate(['/orders'])
        
      })
    }

    
  }

  toggleImage = () => {
    this.showImage = !this.showImage
  }

  

  

  removeFromCart = (id: any,value:number) => {
    
    
    this.myService.removeFromCart(id).subscribe((data:any) => {
      console.log(data);
      this.toastr.success(data.message,"Success",{
        positionClass:"toast-bottom-left"
      })
 });   
    
    
 let indexOfProduct = this.products.findIndex(p => p._id === id);
 this.products.splice(indexOfProduct,1);
    
    
    this.amount = 0;
    this.products.forEach((item) => {
      this.amount += item.productId.price * item.quantitiy;
    });

    this.store.dispatch(removeMultipleFromCart({value}));
  };

  incrementCart = (id:any,price:any):void => {
    this.store.dispatch(addToCart())
    this.myService.incrementQuantity(id).subscribe(data=>{
      console.log(data);
      console.log(typeof data);
      this.myService.getCartProduct().subscribe((data: any) => {
        this.products = data.cartProducts;
        
        
        
      },(error)=>{
        this.toastr.error(error.message,"Error",{
          positionClass:"toast-bottom-left"
        })
      });
      
    })
    
    this.amount += price;
    
  }

  displayImage(imageData:any):string{
    if (imageData) {
      // Convert the Buffer to a base64-encoded data URL
      const base64Image = btoa(
        new Uint8Array(imageData.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
       
        
      return `data:image/jpeg;base64,${base64Image}`;
    } else {
      return ''; // Return an empty string if there is no image data
    }

  }

  decrementCart = (id:any,price:any):void => {
    this.store.dispatch(removeFromCart())
    this.myService.decrementQuantity(id).subscribe(data=>{
      console.log(data);
      this.myService.getCartProduct().subscribe((data: any) => {
        this.products = data.cartProducts;
        console.log(data.cartProducts);
        
        
      });
    })
    
    this.amount -= price;
    
  }
}
