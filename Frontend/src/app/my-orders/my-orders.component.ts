import { Component, OnInit } from '@angular/core';
import { MyHttpServiceService } from '../my-http-service.service';
import { Store } from '@ngrx/store';
import { CounterModel } from '../shared/store/cart.state';
import { getCartItems } from '../shared/store/cart.actions';

@Component({
  selector: 'pm-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(private myService:MyHttpServiceService,private store: Store<{
    counter: CounterModel;
  }>,) { }
  products:any = [];
  showImage:boolean = true;
  cartItems!:number;
  

  ngOnInit(): void {
    this.myService.getMyOrders().subscribe((data:any)=>{
      console.log(data);
      this.products = data.orders;
    })
    this.myService.getCartProduct().subscribe((data: any) => {
      console.log("hello",data);
      console.log("Testingggg");
      
      
      this.cartItems = data.cartProducts.length;
      data.cartProducts.forEach((product: any) => {
        if (product.quantitiy > 1) {
          this.cartItems = this.cartItems + (product.quantitiy - 1);
        }
      });

      this.setCounter(this.cartItems);
    });

    this.store.select('counter').subscribe((data) => {
      this.cartItems = data.counter;
    });

    

  }

  setCounter(value: number) {
    this.store.dispatch(getCartItems({ value }));
  }
  
  // setCartItems(value:number){
  // this.store.dispatch(getCartItems({value}))    
  // }

  toggleImage = () => {
    this.showImage = !this.showImage
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

}
