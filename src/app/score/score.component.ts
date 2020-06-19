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
  public chartLabels: Array<any>;
  public chartOptions: any;
  public chartDatasets: Array<any>;
  public chartDatasetsKeyword: Array<any>;
  public chartLabelsKeyword: Array<any>;
  constructor() {

    this.chartType = 'bar';


    this.chartOptions = {
      responsive: true
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
      //let sortedScores = [this.argumentos.Score].sort((a,b)=>{return a[0]-b[0];});
      // tslint:disable-next-line: forin
      for (let i in this.argumentos.Score) {
        dados2.push(i);
        dados1.push(this.argumentos.Score[i][0]);
        if(this.argumentos.Score[i][0] < 0.35){
          cores1.push('rgba(245, 81, 81, 1)');
          cores2.push('rgba(245, 81, 81, 1)');
        }else{
          cores1.push('rgba(103, 172, 219, 1)');
          cores2.push('rgba(103, 172, 219, 1)');
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
        { data: dados1, label: false }
      ];
      this.chartLabels = dados2;
      let dados3 = [];
      let dados4 = [];
      let cores3 = [];
      let cores4 = [];
      // tslint:disable-next-line: forin
      for (let i in this.argumentos.RelevantKWs) {
        dados4.push(i);
        dados3.push(this.argumentos.RelevantKWs[i]);
        if(this.argumentos.RelevantKWs[i] > 0.1){
          cores3.push('rgba(103, 172, 219, 1)');
          cores4.push('rgba(103, 172, 219, 1)');
        }else{
          cores3.push('rgba(245, 81, 81, 1)');
          cores4.push('rgba(245, 81, 81, 1)');
        }
      }
      this.chartColors2 = [
        {
          backgroundColor: cores3,
          borderColor: cores4,
          borderWidth: 2,
        }
      ];
      this.chartDatasets = [
        { data: dados1, label: 'Date Importance' }
      ];
      this.chartLabels = dados2;

      this.chartDatasetsKeyword = [
        { data: dados3, label: 'Keyword Importance' }
      ];
      this.chartLabelsKeyword = dados4;
    }



  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
