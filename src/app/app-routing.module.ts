import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShelfComponent} from './components/shelf/shelf.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: ShelfComponent },
  { path: 'product', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
