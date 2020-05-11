import { Component, OnInit, Input } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import TL from '../../assets/TL1.js';
declare  var TL: any;



@Component({
  selector: 'app-timeline-scroll',
  templateUrl: './timeline-scroll.component.html',
  styleUrls: ['./timeline-scroll.component.scss']
})
export class TimelineScrollComponent implements OnInit {
  @Input() argumentos: any;
  public obejct: any;
  public rendering: string;
  public texto: string;
  public events: Array<any>;
  public titulo: string;
  public timeline:any;

  constructor() {
    //console.log(this.TLObj);
    this.rendering = 'rendering';
    this.titulo = 'Timeline';
   }

  ngOnInit() {
  }
  public update() {
    this.rendering = '';

    console.log(this.argumentos);
    let j: any;

    let events = [];
    // tslint:disable-next-line: forin
    for (let h in this.argumentos) {

      console.log(h);
      console.log(this.argumentos[h]);
      if(this.argumentos[h].x.length==4){
        events.push({"start_date":  {"year": this.argumentos[h].x}, "text": {"headline": this.argumentos[h].y}});

      }else if (this.argumentos[h].x.split('-').length==2){
        events.push({"start_date":  {"year": this.argumentos[h].x.split('-')[0],"month":this.argumentos[h].x.split('-')[1] }, "text": {"headline": this.argumentos[h].y}});
      }else {
        events.push({"start_date":  {"year": this.argumentos[h].x.split('-')[0],"month":this.argumentos[h].x.split('-')[1], "day":this.argumentos[h].x.split('-')[2] }, "text": {"headline": this.argumentos[h].y}});
      }
    }
    j={"events": events};

    console.log(j);
    let additionalOptions = {
      start_at_end: true,
      default_bg_color: {r:0, g:0, b:0},
      timenav_height: 250
    }
    // tslint:disable-next-line: no-unused-expression
    new TL.Timeline('my-timeline', j, additionalOptions);

  }

}
