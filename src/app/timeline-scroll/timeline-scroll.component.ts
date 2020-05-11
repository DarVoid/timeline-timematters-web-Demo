import { Component, OnInit, Input } from '@angular/core';
import TL from '../../assets/TL1.js';
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
    this.texto = '';
    this.titulo = 'Timeline';
   }

  ngOnInit() {
    console.log(this.argumentos);
    this.other();
  }
  public update() {

    console.log(this.argumentos);
    let j: any;

    let events = [];
    // tslint:disable-next-line: forin
    for (let h in this.argumentos) {

      console.log(h);
      console.log(this.argumentos[h]);
      events.push({start_date:  {year: this.argumentos[h].x}, text: {headline: this.argumentos[h].y.substring(3,this.argumentos[h].y.length-4)}});
    }
    j={events: events};

    j = JSON.stringify(j);
    console.log(j);
    /*let additionalOptions = {
      start_at_end: true,
      default_bg_color: {r:0, g:0, b:0},
      timenav_height: 250
    }*/
    // tslint:disable-next-line: no-unused-expression
    new TL.Timeline('my-timeline', j);// ,additionalOptions

  }
  public other() {

    let j: any;

    let events = [];
    // tslint:disable-next-line: forin
    for (let h in this.argumentos) {

      console.log(h);
      console.log(this.argumentos[h]);
      events.push({start_date:  {year: this.argumentos[h].x}, text: {headline: this.argumentos[h].y.substring(3,this.argumentos[h].y.length-4)}});
    }
    j={events: events};

    j = JSON.stringify(j);
    console.log(j);
    this.texto = `<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">
  <script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>
  <div id='timeline-embed' style="width: 100%; height: 200px"></div><script type="text/javascript">
  var options = {
    hash_bookmark: false,
    initial_zoom: 5,
    script_path: '../../assets/TL1.js'
  }
  //window.timeline =
  var timeline = new TL.Timeline('timeline-embed',
                                 `+j+`,
                                 options);
</script>` ;
  }
  public doStuff() {
    console.log('yay');
  }

}
