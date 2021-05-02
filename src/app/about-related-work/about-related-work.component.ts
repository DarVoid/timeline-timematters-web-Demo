import { Component, OnInit } from "@angular/core";
import * as data from '../../assets/dataThanks.json';

@Component({
  selector: "app-about-related-work",
  templateUrl: "./about-related-work.component.html",
  styleUrls: ["./about-related-work.component.scss"],
})
export class AboutRelatedWorkComponent implements OnInit {
  public data: any;
  public data1: any;
  public data2: any;
  constructor() {
    this.data = data
    this.data1 = this.data.default.data1
    this.data2 = this.data.default.data2
  }

  ngOnInit(): void {}
}
