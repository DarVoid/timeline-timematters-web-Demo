import { Component, OnInit } from "@angular/core";
declare var $: any;
declare var TL: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    /**/
  }
  title = "Time Matters";
}
