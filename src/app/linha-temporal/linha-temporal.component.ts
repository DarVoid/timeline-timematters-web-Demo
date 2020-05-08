import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-linha-temporal',
  templateUrl: './linha-temporal.component.html',
  styleUrls: ['./linha-temporal.component.scss']
})

export class LinhaTemporalComponent implements OnInit {
  public options: any = {
    chart: {
      type: 'scatter',
      height: 200
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return 'Date: '+ Highcharts.dateFormat('%e %b %Y', this.x) +
          '; Score: ' + this.y.toFixed(3);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e %b %Y', this.value);
        }
      }
    },
    series: [
      { name:'scores',
        turboThreshold: 500000,
        data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
      }
    ]
  }
  @Input() argumentos: any;
  public chart1:any;
  public b: any;
  public rendering: string;
  constructor() {
    this.rendering = 'renderig';
  }

  ngOnInit() {
    let p = [ ];
    console.log(this.options.series[0]);

    // tslint:disable-next-line: forin
    for(let y in this.argumentos){
      console.log(this.argumentos[y]);
      let valor = this.argumentos[y].y.substring(10, this.argumentos[y].y.length-4);
      console.log(new Date(this.argumentos[y].x).getTime());

      p.push([new Date(this.argumentos[y].x).getTime(), valor*1]);
    }
    this.options.series[0].data = p;
    console.log(this.options.series[0]);
  }
  public update(){
    Highcharts.chart('container', this.options);
    this.rendering = ' ';
  }

}
