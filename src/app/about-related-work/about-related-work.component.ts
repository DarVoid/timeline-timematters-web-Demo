import { Component, OnInit } from "@angular/core";
import * as data from '../../assets/dataThanks.json';

@Component({
  selector: "app-about-related-work",
  templateUrl: "./about-related-work.component.html",
  styleUrls: ["./about-related-work.component.scss"],
})
export class AboutRelatedWorkComponent implements OnInit {
  public data: any;
  constructor() {
    this.data = data
    this.data = this.data.default.data
  }

  ngOnInit(): void {}
}
