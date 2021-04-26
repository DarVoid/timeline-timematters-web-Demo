import { Component, OnInit } from "@angular/core";
import * as data from '../../assets/dataPeople.json';


@Component({
  selector: "app-about-people",
  templateUrl: "./about-people.component.html",
  styleUrls: ["./about-people.component.scss"],
})
export class AboutPeopleComponent implements OnInit {
  public data: any;
  constructor() {
    this.data = data
    this.data = this.data.default.data
  }

  ngOnInit(): void {}
}
