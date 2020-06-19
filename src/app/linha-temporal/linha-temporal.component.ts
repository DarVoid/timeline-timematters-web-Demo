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

  @Input() argumentosRelevantes: any;
  @Input() argumentosTodos: any;
  @Input() docSen: boolean;
  @Input() numSen: number;
  public chart1: any;
  public argumentos: any;
  public b: any;
  public rendering: string;
  public isSet: boolean;
  public relevant: boolean;
  public tipo: number;
  public options: any;
  public tipos: Array<string>;

  constructor() {
    this.rendering = 'rendering...';
    this.isSet = false;
    this.tipo = 0;
    this.tipos = ["area", "areaspline", "line"];
    this.relevant = false;
    this.options = {
      chart: {
        type: this.tipos[this.tipo],
        height: 300,
        zoomType: 'xy'
      },
      title: {
        text: 'Timeline'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return 'Date: ' + Highcharts.dateFormat('%e %b %Y', this.x) +
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
    };
  }

  ngOnInit() {
  }
  public update() {
    Highcharts.chart('container', this.options);
    this.rendering = ' ';
  }
  toggleTipo() {
    this.tipo++;
    if (this.tipo >= this.tipos.length){
      this.tipo = 0;
    }
    this.options = {
      chart: {
        type: this.tipos[this.tipo],
        height: 300
      },
      title: {
        text: 'Timeline'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return 'Date: ' + Highcharts.dateFormat('%e %b %Y', this.x) +
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
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true

          }
      },
      series: [
        { name:'scores',
          turboThreshold: 500000,
          data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
        }
      ]
    };
    if (!this.isSet) {
      this.isSet = true;
    }
    if (this.relevant) {
      this.argumentos = this.argumentosRelevantes;

    } else {
      this.argumentos = this.argumentosTodos;

    }
    this.setRelevance();
    this.setRelevance();
  }
  setRelevance() {
    console.log("this.argumentosRelevantes");
    console.log(this.argumentosRelevantes);
    console.log("this.argumentosTodos");
    console.log(this.argumentosTodos);
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

    } let p = [ ];
    if(this.docSen){
       console.log(this.argumentos);

      // console.log(this.options.series[0]);

      // tslint:disable-next-line: forin
      for (let y in this.argumentos){
        // console.log(this.argumentos[y]);
        let valor = this.argumentos[y].y.substring(27, this.argumentos[y].y.length - 4);
        // console.log(valor);

        p.push([new Date(this.argumentos[y].x).getTime(), valor * 1]);
      }
      this.options.series[0].data = p;
      // console.log(this.options.series[0]);

    }else {
      let max_series = this.numSen;
      // console.log("numsen");
      // console.log(max_series);

      /*series: [
        { name:'scores',
          turboThreshold: 500000,
          data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
        }
      ]*/
      console.log("argumentos");
      console.log(this.argumentos);
      this.options.series=[];
      for (let tr = 0; tr <= max_series+1; tr++ ) {
        p[tr] = [];
        let named= "sentence "+ tr + ":";
        this.options.series[tr] = {name: named, turboThreshold: 500000, data: []};
      }
      // console.log("p");
      // console.log(p);
      this.argumentos[0].z.map((a)=>{
        console.log("cada serie");
        console.log(a);
        if(/^\d+$/.test(a.x.toString().split('-').join(''))){
         p[a.series * 1].push({x: a.x, y: a.y});
         console.log(p[a.series * 1]);
        }
        // console.log(a);

      });
      // console.log("p");
      // console.log(p);
      // tslint:disable-next-line: forin
      for (const h in p) {
        let lk=[];
        for (const ju in p[h]) {
          lk.push([new Date(p[h][ju].x).getTime(), p[h][ju].y * 1]);
        }
        this.options.series[h].data = lk;
        // console.log("lk");
        // console.log(lk);
        this.tipos = ["scatter", "column", "line"];

      }
    }
    this.update();
  }

}
