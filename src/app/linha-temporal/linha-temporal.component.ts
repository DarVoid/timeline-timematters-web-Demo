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
    this.setRelevance();
    this.setRelevance();
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
    if(this.docSen){
      console.log(this.argumentos);
      let p = [ ];
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

    }else{
      console.log(this.argumentos);
      /*// tslint:disable-next-line: forin
      for (let h in this.argumentos) {
        let p = [ ];
        // console.log(this.options.series[0]);

        // tslint:disable-next-line: forin
        for (let y in this.argumentos[h]){
          // console.log(this.argumentos[y]);
          let valor = this.argumentos[h][y].y.substring(27, this.argumentos[h][y].y.length - 4);
          // console.log(valor);

          p.push([new Date(this.argumentos[h][y].x).getTime(), valor * 1]);
        }
        this.options.series[h].data = p;
        // console.log(this.options.series[0]);
      }*/
    }
    this.update();
  }

}
