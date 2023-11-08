import { Component, OnInit } from '@angular/core';
import { MyHttpServiceService } from '../my-http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pm-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private http: MyHttpServiceService,private router:Router,private toastr:ToastrService) { }
  formData: any = {};
  selectedFile: File | null = null;

  selectFile(event: any): void {
    if(event.target.files){
      
      
      this.selectedFile = event.target.files[0]
      
     
    }
    console.log(this.selectedFile);
    
    
    
    
  }

  ngOnInit(): void {
  }

   onSubmit = () => {
    console.log(this.formData);
    
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    formData.append('name', this.formData.name);
    formData.append('description',this.formData.description);
    formData.append('code', this.formData.code);
    formData.append('releaseDate',this.formData.releaseDate);
    
    formData.append('price', this.formData.price);
    
    formData.append('rating',this.formData.rating)
    console.log(formData);
    
    if(this.formData.price < 0){
      this.toastr.error("Price should be positive","Error",{
        positionClass:"toast-bottom-left"
      })
    }
    else{
     this.http.setData(formData).subscribe((data:any)=>{
      console.log(data);
      this.toastr.success(data?.message,"Success", {
        positionClass: 'toast-bottom-left',
      })
      this.router.navigate(["/products"])
      
      
      
    },(error)=>{
      this.toastr.error(error.message,"Error",{
        positionClass:'toast-bottom-left'
      })
    })
  }
    
    
    
    

    
  }

}
