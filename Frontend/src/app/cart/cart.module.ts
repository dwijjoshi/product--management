import { FormsModule } from "@angular/forms";

import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared-module.module";


@NgModule({
    declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule,SharedModule]
  
})
export class CartModule {}