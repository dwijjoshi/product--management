import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";



import { ConvertToSpacesPipe } from "../shared/convert-to-space.pipe";
import { StarComponent } from "../shared/star.component";
import { BrowserModule } from "@angular/platform-browser";

import { ProductDetailComponent } from "./product-detail.component";
import { ProductDetailRoutingModule } from "./product-detail.routing";
import { SharedModule } from "../shared/shared-module.module";

@NgModule({
  imports: [CommonModule, ProductDetailRoutingModule,SharedModule],
  declarations: [ProductDetailComponent]
})
export class ProductDetailModule {}