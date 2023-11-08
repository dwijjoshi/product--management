import { Component, OnInit } from '@angular/core';
import { Iproduct } from './product';
import {ActivatedRoute,Router} from "@angular/router"
import { MyHttpServiceService } from '../my-http-service.service';
import { addToCart, isAdmin } from '../shared/store/cart.actions';
import { ToastrService } from 'ngx-toastr';
import { CounterModel } from '../shared/store/cart.state';
import { Store } from '@ngrx/store';

@Component({
  
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle:string = 'Product Details';
  product!:any;
  constructor(private _route:ActivatedRoute,private _router:Router,private service:MyHttpServiceService,private toastr:ToastrService,private store: Store<{
    counter: CounterModel;
  }>) {
    
    
   }

   admin!:boolean;

  ngOnInit(): void {
  
    let id = this._route.snapshot.paramMap.get('id');
    
    
    this.pageTitle += `: ${id}`;
    this.service.getSingleProduct(id).subscribe((data:any)=>{
      this.product = data.singleProduct;
      console.log(data);
      
      
      
      
    })
    // this.service.getUser().subscribe((data:any)=>{
    //   console.log(data,"admin 1");
    //   this.setAdmin(data.user.isAdmin==="false"?false:true);
      
    // })

    

    this.store.select('counter').subscribe((data: any) => {
      this.admin = data.admin;
      
      console.log(typeof(data.admin));
      
    });

    

    console.log("The value of admin is : ",this.admin);
    
  }

  setAdmin(value:boolean){
    this.store.dispatch(isAdmin({value}))
  }

  editProduct(id:string){
    this._router.navigate(['/edit-product',id])
    console.log(id);
    

  }


  addToCart = (id: any) => {
    this.service.addToCart(id).subscribe((data: any) => {
      
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

  onBack():void{
    this._router.navigate(['/products'])
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
