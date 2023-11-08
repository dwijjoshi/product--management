import { NgModule } from "@angular/core";
import { ConvertToSpacesPipe } from "./convert-to-space.pipe";
import { StarComponent } from "./star.component";



@NgModule({
  declarations: [ConvertToSpacesPipe,StarComponent],
  // exports is required so you can access your component/pipe in other modules
  exports: [ConvertToSpacesPipe,StarComponent]
})
export class SharedModule{}