import { Component, OnInit, Input, OnChanges } from '@angular/core';
//import TL from '../../assets/TL1.js';
declare  var TL: any;
declare  var $: any;



@Component({
  selector: 'app-timeline-scroll',
  templateUrl: './timeline-scroll.component.html',
  styleUrls: ['./timeline-scroll.component.scss']
})
export class TimelineScrollComponent implements OnInit {
  @Input() argumentosTodos: any;
  @Input() argumentosRelevantes: any;
  public relevant: boolean;
  public argumentos: any;
  public obejct: any;
  public rendering: string;
  public texto: string;
  public events: Array<any>;
  public titulo: string;
  public timeline: any;

  constructor() {
    //console.log(this.TLObj);
    this.rendering = 'rendering';
    this.titulo = 'Timeline';
   }

  ngOnInit() {
    //setTimeout(()=>{this.update();}, 5);
  }
  setRelevance(rel: string) {
    if (rel = "impOnly"){
      this.relevant = false;
    } else {
      this.relevant = true;
    }
    if (this.relevant) {
      this.argumentos = this.argumentosRelevantes;
      console.log(this.argumentos);
    } else {
      this.argumentos = this.argumentosTodos;
      console.log(this.argumentos);
    }
    this.update();
  }
  update() {
    this.rendering = '';

    console.log(this.argumentos);
    let j: any;

    let events = [];
    // tslint:disable-next-line: forin
    for (let h in this.argumentos) {

      console.log(h);
      console.log(this.argumentos[h]);
      if (this.argumentos[h].x.length === 4) {
        events.push({ "start_date":  { "year": this.argumentos[h].x}, "text": { "headline" : this.argumentos[h].y}});

      } else if (this.argumentos[h].x.split('-').length === 2) {
        events.push({"start_date":  {"year": this.argumentos[h].x.split('-')[0],"month":this.argumentos[h].x.split('-')[1] }, "text": {"headline": this.argumentos[h].y}});
      } else {
        events.push({"start_date":  {"year": this.argumentos[h].x.split('-')[0],"month":this.argumentos[h].x.split('-')[1], "day":this.argumentos[h].x.split('-')[2] }, "text": {"headline": this.argumentos[h].y}});
      }
    }
    j = {"events": events,
    "title": {"text": {"headline":"Timeline","text":"Here are the date scores presented in a timeline fashion"}}

    };

    console.log(j);
    let additionalOptions = {
      start_at_end: false,
      default_bg_color: {r:255, g:255, b:255}
    }
    // tslint:disable-next-line: no-unused-expression
    new TL.Timeline('my-timeline', j, additionalOptions);

  }

}
