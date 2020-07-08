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
      console.log(sorted0Scores);
      //this.argumentos.Score
      // tslint:disable-next-line: forin
      for (let i in this.argumentos.Score) {
          // console.log("passa?");
          // console.log(/^\d+$/.test(i.toString().split('-').join('')));
          // console.log("valor");
          // console.log(i);
          if(/^\d+$/.test(i.substring(0,10).toString().split('-').join(''))){
            dados2.push(i);
            dados1.push(this.argumentos.Score[i][0]);
    
            if(this.argumentos.Score[i][0] < 0.35){
              cores1.push('rgba(245, 81, 81, 1)');
              cores2.push('rgba(245, 81, 81, 1)');
            }else{
              cores1.push('rgba(103, 172, 219, 1)');
              cores2.push('rgba(103, 172, 219, 1)');
            }
          }else{
            sorted0Scores.push({key: i, value: this.argumentos.Score[i][0]});
          }

          /* if(this.argumentos.Score[i][0]===0){
            sorted0Scores.push({key: i, value: this.argumentos.Score[i][0] });
          }else{

          }*/
      }
      let dados5 = [];
      let dados6 = [];
      let cores5 = [];
      let cores6 = [];
      for (let chave in sorted0Scores) {
        if(sorted0Scores[chave].value!=0){
          // console.log("nao é zero");  
          // console.log(sorted0Scores[chave].key);
          // console.log(sorted0Scores[chave].value);
          dados6.push(sorted0Scores[chave].key);
          dados5.push(sorted0Scores[chave].value);
          if(sorted0Scores[chave].value < 0.35){
            cores5.push('rgba(245, 81, 81, 1)');
            cores6.push('rgba(245, 81, 81, 1)');
          }else{
            cores5.push('rgba(103, 172, 219, 1)');
            cores6.push('rgba(103, 172, 219, 1)');
          }
          
        }else{
          // console.log("é zero");
          // console.log(sorted0Scores[chave].key);
          // console.log(sorted0Scores[chave].value);
        }
      }

      console.log(sorted0Scores);

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
