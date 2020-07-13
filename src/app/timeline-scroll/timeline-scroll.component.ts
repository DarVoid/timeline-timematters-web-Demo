import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
// import TL from '../../assets/TL1.js';
declare  var TL: any;
declare  var $: any;



@Component({
  selector: 'app-timeline-scroll',
  templateUrl: './timeline-scroll.component.html',
  styleUrls: ['./timeline-scroll.component.scss']
})
export class TimelineScrollComponent implements OnInit {
  @Input() argumentosTodos: any;
  @Input() docSen: any;
  @Input() argumentosRelevantes: any;
  public relevant: boolean;
  public argumentos: any;
  public obejct: any;
  public rendering: string;
  public texto: string;
  public events: Array<any>;
  public titulo: string;
  public timeline: any;
  public isSet: boolean;
  public jsonText: string;
  public isnotset:boolean;
  constructor(private _snackBar: MatSnackBar) {
    // console.log(this.TLObj);
    this.rendering = 'rendering';
    this.titulo = 'Timeline';
    this.isSet = false;
    this.isnotset = true;
   }

  ngOnInit() {
    // setTimeout(()=>{this.update();}, 5);
  }
  ngAfterViewChecked(){
    
    if(document.getElementById("my-timeline") && this.isnotset){
      this.isnotset = false;
      this.setRelevance()
    }

  }
  setRelevance() {
    if (!this.isSet) {
      this.isSet = true;
    }
    if (this.relevant) {
      this.relevant = false;
    } else {
      this.relevant = true;
    }
    if (this.relevant) {
      this.argumentos = this.argumentosRelevantes;

    } else {
      this.argumentos = this.argumentosTodos;

    }
    this.update();
  }
  public copyToClipboard(event: any) {
    event.preventDefault();
    this._snackBar.open('JSON copied to Clipboard', 'Length: ' + JSON.stringify(this.jsonText).length + ' characters', {
      duration: 2000
    });
    const clipboard = document.createElement('input');

    clipboard.setAttribute('value', JSON.stringify(this.jsonText));
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand('copy');
    document.body.removeChild(clipboard);

  }

  update() {
    this.rendering = '';
    console.log('argumentosTodos');
    console.log(this.argumentosTodos);
    console.log('argumentosRel');
    console.log(this.argumentosRelevantes);

    let j: any;

    const events = [];
    // tslint:disable-next-line: forin
    for (const h in this.argumentos) {

      // console.log(h);
      // console.log(this.argumentos[h]);
      if (this.argumentos[h].x.length === 4) {
        events.push({ start_date:  { year: this.argumentos[h].x}, text: { headline : this.argumentos[h].y}});

      } else if (this.argumentos[h].x.split('-').length === 2) {
        // tslint:disable-next-line: max-line-length
        events.push({start_date:  {year: this.argumentos[h].x.split('-')[0],month: this.argumentos[h].x.split('-')[1] }, text: {headline: this.argumentos[h].y}});
      } else {
        // tslint:disable-next-line: max-line-length
        events.push({start_date:  {year: this.argumentos[h].x.substring(0,10).split('-')[0],month: this.argumentos[h].x.substring(0,10).split('-')[1], day: this.argumentos[h].x.substring(0,10).split('-')[2] }, text: {headline: this.argumentos[h].y}});
      }
    }
    j = {events: events};
    this.jsonText = j;
    console.log(j);
    const additionalOptions = {
      start_at_end: false,
      timenav_height: 10,
      default_bg_color: {r: 255, g: 255, b: 255}
    };
    // tslint:disable-next-line: no-unused-expression
    new TL.Timeline('my-timeline', j, additionalOptions);

  }

}
