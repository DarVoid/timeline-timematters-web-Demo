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
  public dostuff: string;
  public requestMade: boolean;
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
    this.requestMade=false;
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
    console.log(pagina)
    console.log(this.page)
    if (pagina == "1") {
      if (pagina == this.page) {
        this.dostuff+="1"
        this.router.navigate(["/"]);
      }
    }
    console.log(pagina);
    this.page = pagina;
  }

  handleValueQuery(event: any){
    this.url= event
  }
  handleLoaded(event: any){
    this.loading= event
  }
  handleRequest(event: any){
    this.requestMade= event
  }
}
