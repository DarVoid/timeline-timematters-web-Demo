import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TutorialComponent } from "../tutorial/tutorial.component";
//import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public page: string;
  public loading: boolean;
  public url: string;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.loading=false;
    this.page = "1";
  }
  openDialog() {
    this.dialog.open(TutorialComponent, { height: "90%", width: "100%" });
  }
  changeURL($event){
    this.url=$event
  }
  requestLoaded(){

  }
  ngOnInit() {
    //this.openDialog();
  }
  changePage(pagina: string) {
    if (pagina == "1") {
      this.router.navigate([""]);
    }
    console.log(pagina);
    this.page = pagina;
  }
}
