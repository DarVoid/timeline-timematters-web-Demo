import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

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
  public isnotset: boolean;

  constructor() {
    this.isnotset = true;
    this.rendering = 'rendering...';
    this.isSet = false;
    this.tipo = 0;
    this.tipos = ['area','line', 'areaspline',"scatter"];
    this.relevant = false;
    this.options = {
      chart: {
        type: this.tipos[this.tipo],
        height: 300,
        zoomType: 'xy'
      },
      title: {
        text: '   '
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter() {
          return 'Date: ' + Highcharts.dateFormat('%e %b %Y', this.x) +
            '; Score: ' + this.y.toFixed(3);
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter() {
            return Highcharts.dateFormat('%e %b %Y', this.value);
          }
        }
      },
      series: [
        { name: 'scores',
          turboThreshold: 500000,
          data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
        }
      ]
    };
  }

  ngOnInit() {
  }
  ngAfterViewChecked(){
    
    if(document.getElementById("container") && this.isnotset){
      this.isnotset = false;
      this.toggleTipo();
    }

  }
  public update() {
    Highcharts.chart('container', this.options);
    
    this.rendering = ' ';
  }
  toggleTipo() {
    this.tipo++;
    if (this.tipo >= this.tipos.length) {
      this.tipo = 0;
    }
    this.options = {
      chart: {
        type: this.tipos[this.tipo],
        height: 300
      },
      title: {
        text: ' '
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter() {
          return 'Date: ' + Highcharts.dateFormat('%e %b %Y', this.x) +
            '; Score: ' + this.y.toFixed(3);
        }
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter() {
            return Highcharts.dateFormat('%e %b %Y', this.value);
          }
        }
      },
      yAxis: {
        max: 1
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
        { name: 'scores',
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
    console.log('this.argumentosRelevantes');
    console.log(this.argumentosRelevantes);
    console.log('this.argumentosTodos');
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
    if (this.docSen) {
       console.log(this.argumentos);

      // console.log(this.options.series[0]);
      this.argumentos= this.argumentos.filter((a)=>{
        return !isNaN(a.dateparsed);
      });
      // tslint:disable-next-line: forin
       for (const y in this.argumentos) {
        // console.log(this.argumentos[y]);
        //console.log("valor de y grafico");

        let valor_y = this.argumentos[y].y.split("</p>")[0];
        const valor = valor_y.substring(27,valor_y.length);
        console.log("valor:");
        console.log(valor);
        console.log(this.argumentos[y]);
        p.push([new Date(this.argumentos[y].x.substring(0,10)).getTime(), valor*1]);
      }
       //p= p.reduce()AQUI É PARA REDUZIR A DIFERENTES VALORES
       p = p.sort((a, b)=>{return a[0]-b[0];
        }).filter(
            (element , index, array) => {

        if (index == 0) {
           //console.log("element");
          // console.log(element[0].toString().split('-').join(''));
          // console.log("Element is Viable");
          // console.log(/^\d+$/.test(element[0].toString().split('-').join('')));
          return true;
        } else {
          // console.log("element");
          // console.log(element[0].toString().split('-').join(''));
          // console.log("Element is Viable");
          // console.log(/^\d+$/.test(element[0].toString().split('-').join('')));
          return element[0] != array[index - 1][0];
        }
      });
      //console.log("please show me ")
      //console.log(p);
       this.options.series[0].data = p;
      // console.log(this.options.series[0]);

    } else {
      let max_series = this.numSen;
      // console.log("numsen");
      // console.log(max_series);

      /*series: [
        { name:'scores',
          turboThreshold: 500000,
          data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
        }
      ]*/
      //console.log('argumentos');
      //console.log(this.argumentos);
      this.options.series = [];
      for (let tr = 0; tr <= max_series + 1; tr++ ) {
        p[tr] = [];
        const named = 'sentence '+ tr + ':';
        this.options.series[tr] = {name: named, turboThreshold: 500000, data: []};
      }
      // console.log("p");
      // console.log(p);
      this.argumentos[this.argumentos.length-1].z.map((a) => {
        console.log('cada serie');
        console.log(a);
        if (/^\d+$/.test(a.x.toString().substring(0,10).split('-').join(''))) {
         p[a.series * 1].push({x: a.x.substring(0,10), y: a.y});
         console.log(p[a.series * 1]);
        }
        // console.log(a);

      });
      // console.log("p");
      // console.log(p);
      // tslint:disable-next-line: forin
      for (const h in p) {
        const lk = [];
        // tslint:disable-next-line: forin
        for (const ju in p[h]) {
          console.log([new Date(p[h][ju].x.substring(0,10)).getTime()]);
          lk.push([new Date(p[h][ju].x.substring(0,10)).getTime(), p[h][ju].y * 1]);
        }
        this.options.series[h].data = lk;
        // console.log("lk");
        // console.log(lk);
        this.tipos = ['scatter'];
        this.tipo=0;

      }
    }
    this.update();
  }

}
