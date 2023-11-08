
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyOrdersComponent } from "./my-orders.component";




const routes: Routes = [
    { path: "", component: MyOrdersComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MyOrdersRoutingModule { }