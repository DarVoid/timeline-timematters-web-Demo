import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnChanges {
  @Input() options: any;
  @Input() article: any;
  constructor() { }

  ngOnChanges(){

  }

  /*ngOnInit(): void {

  }*/

}
