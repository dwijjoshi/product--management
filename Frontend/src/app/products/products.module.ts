import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";



import { ConvertToSpacesPipe } from "../shared/convert-to-space.pipe";
import { StarComponent } from "../shared/star.component";
import { BrowserModule } from "@angular/platform-browser";

import { ProductListComponent } from "./product-list.component";
import { ProductListRoutingModule } from "./products-routing.module";
import { SharedModule } from "../shared/shared-module.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, ProductListRoutingModule,SharedModule,FormsModule],
  declarations: [ProductListComponent]
})
export class ProductListModule {}