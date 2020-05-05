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
  public chartLabels: Array<any>;
  public chartOptions: any;
  public chartDatasets: Array<any>;
  public chartDatasetsKeyword: Array<any>;
  public chartLabelsKeyword: Array<any>;
  constructor() {

    this.chartType = 'horizontalBar';


    this.chartOptions = {
      responsive: true
    };
    this.chartColors = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ];
   }

  ngOnChanges() {

    if (this.argumentos) {


      let dados1 = [];
      let dados2 = [];
      // tslint:disable-next-line: forin
      for (let i in this.argumentos.Score) {
        dados2.push(i);
        dados1.push(this.argumentos.Score[i][0]);
      }
      this.chartDatasets = [
        { data: dados1, label: false }
      ];
      this.chartLabels = dados2;
      let dados3 = [];
      let dados4 = [];
      // tslint:disable-next-line: forin
      for (let i in this.argumentos.RelevantKWs) {
        dados4.push(i);
        dados3.push(this.argumentos.RelevantKWs[i]);
      }
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
