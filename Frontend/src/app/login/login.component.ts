import { Component, OnInit, ViewChild } from '@angular/core';
import { MyHttpServiceService } from '../my-http-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm') myForm:any;

  isError!:boolean

  constructor(private service :MyHttpServiceService,private cookieService: CookieService,private router:Router, private toastr:ToastrService) { }

  onSubmit(formData:any){
    console.log(formData);
    this.service.loginUser(formData).subscribe((data:any) => {
      
      this.cookieService.set('token', data.token, 7);
      console.log("Token set");
      this.router.navigate(['/products'])
      this.toastr.success("Logged in","Success",{
        positionClass:"toast-bottom-left"
      })
      
    },(error)=>{
      this.toastr.error(error.error.message,"Error",{
        positionClass:'toast-bottom-left'
      })
    })

    
    

  }

  

  ngOnInit(): void {


    const token = this.cookieService.get('token');
    if(token){
      this.router.navigate(['/products'])
    }
  }

}
