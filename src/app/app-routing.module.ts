import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShelfComponent} from './components/shelf/shelf.component';

const routes: Routes = [
  { path: '', component: ShelfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
