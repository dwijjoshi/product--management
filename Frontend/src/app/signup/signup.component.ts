import { Component, OnInit } from '@angular/core';
import { MyHttpServiceService } from '../my-http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service:MyHttpServiceService,private router:Router,private toastr:ToastrService,private cookieService:CookieService) { }

  

  onSubmit(formData:any){
    console.log(formData);
    this.service.registerUser(formData).subscribe((data:any)=>{
      this.cookieService.set('token',data.token,7);
      this.toastr.success("Registered Successfully","Success",{
        positionClass:"toast-bottom-left"
      });
      this.router.navigate(['/products'])
    },(error)=>{
      this.toastr.error(error.error.message,"Error",{
        positionClass:'toast-bottom-left'
      })
    })
  }

  ngOnInit(): void {
  }

}
