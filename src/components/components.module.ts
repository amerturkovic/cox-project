import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { PaginationComponent } from './pagination/pagination'
@NgModule({
	declarations: [PaginationComponent],
	imports: [IonicModule],
	exports: [PaginationComponent]
})
export class ComponentsModule {}
