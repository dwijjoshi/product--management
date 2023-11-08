import { Component, OnInit, OnChanges  } from '@angular/core';
import { Iproduct } from './product';
import { ProductService } from './product.service';
import { MyHttpServiceService } from '../my-http-service.service';
import { Store } from '@ngrx/store';
import { addToCart, getCartItems, isAdmin, name, popupCart } from '../shared/store/cart.actions';
import { CounterModel } from '../shared/store/cart.state';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  
  showImage: boolean = true;
  selectedSortOption:string = "lowest"//default is set to lowest to highest

  constructor(
    private _productServie: ProductService,
    private myService: MyHttpServiceService,
    private cookieService: CookieService,
    private router:Router,
     private toastr: ToastrService,
    private store: Store<{
      counter: CounterModel;
    }>
  ) {}

  hideImage = (): void => {
    this.showImage = !this.showImage;
  };
  
  filteredProducts!: Iproduct[];
  name!:string

  admin: boolean = false;

  _listFilter!: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  

  performFilter(filterBy: string): Iproduct[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.products.filter(
      (product: Iproduct) =>
        product.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
  cartItems!: number;

  addToCart = (id: any) => {
    this.myService.addToCart(id).subscribe((data: any) => {
      
      this.toastr.success(data.message, 'Success',{
        positionClass:"toast-bottom-left"
      });
    },(error)=>{
      this.toastr.error(error.message,"Error",{
        positionClass:"toast-bottom-left"
      })
    });
    this.store.dispatch(addToCart());
    this.store.select('counter').subscribe((data) => {
      console.log(data);
    });
  };

  getProducts!: Iproduct[];
  products!: Iproduct[];
  
  ngOnInit(): void {

    //checking if the user is logged in or not
    //if not then redirect them to login page
    const token = this.cookieService.get('token');
    if(!token){
      this.toastr.error("Please login first","Error",{
        positionClass:"toast-bottom-left"
      })
      this.router.navigate(['/login'])
    }

    this.myService.getUser().subscribe((data:any)=>{
      
      const adminObject = {
        value:data.user.isAdmin === "true" ? true : false
      }

      const nameObject = {
        value:data.user.name
      }
      const cartItems  ={
        value:data.user.cartProducts.length
      }
      this.store.dispatch(isAdmin(adminObject));
      this.store.dispatch(name(nameObject));
      // this.store.dispatch(getCartItems(cartItems))
    })

    // getting the number of items in the cart
    this.myService.getCartProduct().subscribe((data: any) => {
      console.log("hello",data);
  
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

    this.store.select('counter').subscribe((data: any) => {
      this.admin = data.admin;
    });

    //get the data of the logged in user.
    
    

    this.filteredProducts = this.products;
    this.myService.getData(this.selectedSortOption).subscribe((data: any) => {
      
      this.products = data.products;
      
      
      
    });

    this.store.select('counter').subscribe((data: any) => {
      this.name = data.name;
      this.admin = data.admin;
    });
  }

  setCounter(value: number) {
    this.store.dispatch(getCartItems({ value }));
  }

  sortProducts():void{
    this.myService.getData(this.selectedSortOption).subscribe((data: any) => {
      
      this.products = data.products;
      
      
      
    });
  }

 

  ngOnChanges(): void {
    this.myService.getData(this.selectedSortOption).subscribe((data: any) => {
      
      this.products = data.products;
      
      
    });
  }


  //converting the image from binary format to base64-encoded
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

  deleteProduct = (id: any) => {
    //sending a backend request to remove the product from the database
    this.myService.deleteProduct(id).subscribe((data: any) => {
      console.log(data);
      this.toastr.success(data.message, 'Success',{
        positionClass: 'toast-bottom-left',
      });
    },(error)=>{
      this.toastr.error(error.message,"Error",{
        positionClass:"toast-bottom-left"
      })
    });
    
    

    //finding the index of a particular product and removing it in real time for the frontend.
    let indexOfProduct = this.products.findIndex(p => p._id === id);
    this.products.splice(indexOfProduct,1);
  };
}
