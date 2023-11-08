import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  message:string = "hello"
  constructor() { }



  ngOnInit(): void {
  }

}
