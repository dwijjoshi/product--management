import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MyHttpServiceService } from '../my-http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pm-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,private service: MyHttpServiceService,private cookieService:CookieService,private router:Router,private toastr:ToastrService) {

   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',Validators.email],
      password:['',Validators.required]
    })
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    this.service.loginUser(this.loginForm).subscribe((data:any) => {
      console.log(data);
      this.cookieService.set('token', data.token, 7);
      console.log("Hello");
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

}
