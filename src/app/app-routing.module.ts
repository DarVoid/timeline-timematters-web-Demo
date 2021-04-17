
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuerysingledocComponent } from './querysingledoc/querysingledoc.component';


const routes: Routes = [
  {
    path: '',
    component: QuerysingledocComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
