import { Component, OnInit } from '@angular/core';
import { MyHttpServiceService } from '../my-http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../products/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pm-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  test: string = 'hello';
  constructor(
    private http: MyHttpServiceService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  selectedFile: File | null = null;
  id!: string;
  product!: any;
  name!: string;

  selectFile = (event:any) => {
    if(event.target.files){
      
      
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile);
      
     
    }
    
  }

  onSubmit = (formData: any) => {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    console.log(formData);
    
    const form = new FormData();
    if (this.selectedFile) {
      form.append('image', this.selectedFile);
      console.log(this.selectedFile);
      
    }
    
    
    form.append('name', formData.name);
    form.append('code', formData.code);
    form.append('releaseDate',formData.date);
    form.append('price', formData.price);
    
    form.append('rating',formData.rating)

    
    
    

    this.http.updateProduct(form, this.id).subscribe((data: any) => {
      console.log(data);
      this.toastr.success(data.message,"Success", {
        positionClass: 'toast-bottom-left',
      })
      
      this.router.navigate(['/products']);
    });
   
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.http.getSingleProduct(this.id).subscribe((data: any) => {
      this.product = data.singleProduct;
    });
  }
}
