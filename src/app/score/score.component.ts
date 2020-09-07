import { Component, OnChanges, Input } from '@angular/core';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';

import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnChanges {
  @Input() argumentos: any;
  public keywordOrDate: boolean;
  public currentlyShowing: string;
  public chartType: string;
  public chartColors: Array<any>;
  public chartColors2: Array<any>;
  public chartColors3: Array<any>;
  public chartLabels: Array<any>;
  public chartOptions: any;
  public chartDatasets: Array<any>;
  public chartDatasetsKeyword: Array<any>;
  public chartLabelsKeyword: Array<any>;
  public chartDatasetWeird: Array<any>;
  public chartDatasetsWeird: Array<any>;
  public chartLabelsWeird: Array<any>;
  public weirdVazio:boolean;
  public weirdZeroVazio:boolean;
  constructor() {

    this.chartType = 'bar';


    this.chartOptions = {
      responsive: "true",
      scales:{
        
        yAxes: [{
          display: "true",
          labelString:"score",
          ticks: {
              min: 0,
              max: 1
          }
        }]
      }
    };
    this.chartColors = [
      {
        backgroundColor: [
          'rgba(245, 81, 81, 1)',
          'rgba(103, 172, 219, 1)',

        ],
        borderColor: [
          'rgba(245, 81, 81, 1)',
          'rgba(103, 172, 219, 1)',
        ],
        borderWidth: 2,
      }
    ];
   }

  ngOnChanges() {

    if (this.argumentos) {
      console.log(this.argumentos);

      let dados1 = [];
      let cores1 = [];
      let dados2 = [];
      let cores2 = [];
      let sorted0Scores = [];

      console.log("AAAAAAAAAAA");
      //console.log(Object.keys(this.argumentos.Score));
      let sortables = Object.keys(this.argumentos.Score).filter((i)=>{return /^\d+$/.test(i.substring(0,5).toString().split('-').join(''))});
      let nonsortables = Object.keys(this.argumentos.Score).filter((i)=>{return !/^\d+$/.test(i.substring(0,5).toString().split('-').join(''))});
      console.log(sortables);
      console.log(nonsortables);
      //sorted0Scores.push({key: i, value: this.argumentos.Score[i][0]})
      sortables = sortables.sort((a, b)=>{
        a= a.substring(0,10).replace(/[^\d]/g, '');
        b= b.substring(0,10).replace(/[^\d]/g, '');
        if(a.length==4){
          a = a + "0100"
        }
        if(b.length==4){
          b = b + "0100"
        }if(a.length==6){
          a = a + "00"
        }
        if(b.length==6){
          b = b + "00"
        }
        console.log("a: "+a+"\nb:"+b+ "\n");
        return parseInt(a) - parseInt(b);
      });
      
      //this.argumentos.Score
      // tslint:disable-next-line: forin
      for (let i in sortables) {
            console.log(sortables[i]);
            dados2.push(sortables[i]);
            dados1.push(this.argumentos.Score[sortables[i]][0]);
    
            if(this.argumentos.Score[sortables[i]][0] < 0.35){
              cores1.push('rgba(245, 81, 81, 1)');
              cores2.push('rgba(245, 81, 81, 1)');
            }else{
              cores1.push('rgba(103, 172, 219, 1)');
              cores2.push('rgba(103, 172, 219, 1)');
            }
      }
      console.log(dados1)
      console.log(dados2)
      
      let dados5 = [];
      let dados6 = [];
      let cores5 = [];
      let cores6 = [];
      for (let chave in nonsortables) {
          dados6.push(nonsortables[chave]);
          dados5.push(this.argumentos.Score[nonsortables[chave]][0]);
          if(this.argumentos.Score[nonsortables[chave]].value < 0.35){
            cores5.push('rgba(245, 81, 81, 1)');
            cores6.push('rgba(245, 81, 81, 1)');
          }else{
            cores5.push('rgba(103, 172, 219, 1)');
            cores6.push('rgba(103, 172, 219, 1)');
          }
      }

      // tslint:disable-next-line: forin
      /* for (let i in sortedScores) {
        dados2.push(i);
        dados1.push(sortedScores[i][0]);
        if(sortedScores[i][0] < 0.3){
          cores1.push('rgba(245, 81, 81, 1)');
          cores2.push('rgba(245, 81, 81, 1)');
        }else{
          cores1.push('rgba(103, 172, 219, 1)');
          cores2.push('rgba(103, 172, 219, 1)');
        }
      }*/
      this.chartColors = [
        {
          backgroundColor: cores1,
          borderColor: cores2,
          borderWidth: 2,
        }
      ];
      this.chartDatasets = [
        { data: dados1, label: true }
      ];
      this.chartLabels = dados2;
      let dados3 = [];
      let dados4 = [];
      let cores3 = [];
      let cores4 = [];
      console.log(this.argumentos.RelevantKWs);
      // tslint:disable-next-line: forin
      for (let i in this.argumentos.RelevantKWs) {
        dados4.push(i);
        dados3.push(this.argumentos.RelevantKWs[i].toFixed(3));
        /*if(this.argumentos.RelevantKWs[i] > 0.1){
          cores3.push('rgba(103, 172, 219, 1)');
          cores4.push('rgba(103, 172, 219, 1)');
        }else{
          cores3.push('rgba(245, 81, 81, 1)');
          cores4.push('rgba(245, 81, 81, 1)');
        }*/
          cores3.push('rgba(103, 172, 219, 1)');
          cores4.push('rgba(103, 172, 219, 1)');
      }
      this.chartColors2 = [
        {
          backgroundColor: cores3,
          borderColor: cores4,
          borderWidth: 2,
        }
      ];
      this.chartColors3 = [
        {
          backgroundColor: cores5,
          borderColor: cores6,
          borderWidth: 2,
        }
      ];
      this.chartDatasets = [
        { data: dados1, label: 'score' }
      ];
      this.chartDatasetsWeird = [
        { data: dados5, label: 'score' }
      ];
      this.weirdVazio= dados5.length==0;
      this.chartLabels = dados2;

      this.chartDatasetsKeyword = [
        { data: dados3, label: 'score' }
      ];
      this.chartLabelsKeyword = dados4;
      this.chartLabelsWeird = dados6;
    }



  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
