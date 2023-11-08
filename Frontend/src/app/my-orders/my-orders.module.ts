import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { MyOrdersRoutingModule } from "./my-orders-routing.module";
import { MyOrdersComponent } from "./my-orders.component";
import { ConvertToSpacesPipe } from "../shared/convert-to-space.pipe";
import { StarComponent } from "../shared/star.component";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared-module.module";

@NgModule({
  imports: [CommonModule, MyOrdersRoutingModule,SharedModule],
  declarations: [MyOrdersComponent]
})
export class MyOrdersModule {}