import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeywordExctractionComponent } from './keyword-exctraction/keyword-exctraction.component';
import { AboutRelatedWorkComponent } from './about-related-work/about-related-work.component';
import { AboutPeopleComponent } from './about-people/about-people.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },{
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'keyword-exctraction',
    component: KeywordExctractionComponent
  },
  {
    path: 'about-related-work',
    component: AboutRelatedWorkComponent
  },
  {
    path: 'about-people',
    component: AboutPeopleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
