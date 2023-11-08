import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";




import { FormsModule } from "@angular/forms";
import { AddProductRoutingModule } from "./add-product-routing.module";
import { AddProductComponent } from "./add-product.component";

@NgModule({
  imports: [CommonModule, AddProductRoutingModule,FormsModule],
  declarations: [AddProductComponent]
})
export class AddProductModule {}