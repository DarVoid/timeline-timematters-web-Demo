import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
//import {MatGridListModule} from '@angular/material/grid-list';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public page: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {
    this.page = "1";
  }

  ngOnInit() {

  }
  refresh(){
    
  }
  changePage(pagina: string){
   if(pagina == "0"){
    this.router.navigate(['']);
   }
   console.log(pagina);
    this.page = pagina;
  }

}
