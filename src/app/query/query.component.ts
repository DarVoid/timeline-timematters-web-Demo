import { Component, OnInit, Input, OnChanges, enableProdMode } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnChanges {
  @Input() options: any;
  @Input() article: any;
  public showOnlyRel: boolean;
  public withKeywords: boolean;
  public numberOfKeyWords: number;
  public dataset: Array<any>;
  public datasetRelOnly: Array<any>;
  public withKeywordsSentence: string;
  public differentValues: Array<any>;
  public differentRelValues: Array<any>;
  public docOrSentence: boolean;
  public page: number;

  constructor(private _snackBar: MatSnackBar) {
    this.showOnlyRel = false;
    this.withKeywords = true;
    this.withKeywordsSentence = 'Keywords Off';
    this.showOnlyRel = false;
    this.differentValues = [];
    this.page = 0;


  }

  ngOnChanges() {
    this.update();

  }
  setpage(event) {
    this.page = event;
  }
  toggleKeywords() {
    this.withKeywords = !this.withKeywords;
    if (this.withKeywords) {
      this.withKeywordsSentence = 'Keywords Off';
    } else {
      this.withKeywordsSentence = 'Keywords On';
    }
  }
  toggleRel() {
    this.showOnlyRel = !this.showOnlyRel;
  }
  goBack() {
    // redirect
  }
  public putOnClipboard(event: any, cena: string) {
    event.preventDefault();
    const clipboard = document.createElement('input');
    console.log(cena);
    clipboard.setAttribute('value', cena);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand('copy');
    document.body.removeChild(clipboard);
  }
  public copyToClipboard(event: any) {
    event.preventDefault();
    console.log(this.page);
    this._snackBar.open('Message copied to Clipboard', 'Length: ' + this.options.result.TextNormalized.length + ' characters', {
      duration: 2000
    });
    const clipboard = document.createElement('input');
    clipboard.setAttribute('value', this.options.result.TextNormalized);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand('copy');
    document.body.removeChild(clipboard);

  }
  public update() {

        this.differentValues = this.options.result.TempExpressions.sort(
          (a, b) => a[0] - b[0]).filter(
              (element , index, array) => {

          if (index == 0) {
            // console.log("element");
            // console.log(element[0].toString().split('-').join(''));
            // console.log("Element is Viable");
            // console.log(/^\d+$/.test(element[0].toString().split('-').join('')));
            return /^\d+$/.test(element[0].toString().split('-').join(''));
          } else {
            // console.log("element");
            // console.log(element[0].toString().split('-').join(''));
            // console.log("Element is Viable");
            // console.log(/^\d+$/.test(element[0].toString().split('-').join('')));
            return element[0] != array[index - 1][0] && /^\d+$/.test(element[0].toString().split('-').join(''));
          }
        });
        if (this.options.docOrSentence == 'doc') {

          this.differentRelValues = this.differentValues.filter(
            (element, index, array) => {
              /*console.log(element);
              console.log(array);
              console.log(index);
              console.log(this.options.result.Score);
              console.log(this.options.result.Score[element[0].toLowerCase()]);*/
              // tslint:disable-next-line: no-shadowed-variable
              const a = element[0].toLowerCase() + '';
              // console.log(a);
              return this.options.result.Score[a][0] > 0.35;
            }
          );

        } else {
          // tslint:disable-next-line: no-shadowed-variable
          this.differentRelValues = this.differentValues.map((a) => {
            return this.options.result.Score[a[0]];
          });

        }
        console.log(this.differentRelValues);
        console.log(this.differentValues);


        let c = [];
        let a = {};
        let b = {};
        const d = [];

        let c2 = [];
        let a2 = {};
        const b2 = {};
        const d2 = [];
        // tslint:disable-next-line: forin
        for (const i in Object.keys(this.options.result.Score)) {
          // console.log(this.result.Score[Object.keys(this.result.Score)[i]][0]);
          // handle Dataset
          if (this.options.docOrSentence == 'doc') {
            a = '<p class="noticeme">Score: ' + this.options.result.Score[Object.keys(this.options.result.Score)[i]][0] + '</p>';
            // tslint:disable-next-line: max-line-length
            // d.push({x: Object.keys(this.options.result.Score)[i], y: this.options.result.Score[Object.keys(this.options.result.Score)[i]][0], series: 0});
            if (this.options.result.Score[Object.keys(this.options.result.Score)[i]][0] > 0.35) {
            a2 = '<p class="noticeme">Score: ' + this.options.result.Score[Object.keys(this.options.result.Score)[i]][0] + '</p>';
            // tslint:disable-next-line: max-line-length
            // d2.push({x: Object.keys(this.options.result.Score)[i], y: this.options.result.Score[Object.keys(this.options.result.Score)[i]][0], series: 0});
            } else {
              a2 = null;
            }
            // console.log("esta aqui");
          } else {
            let valorDeA = '';
            let valorDeA2 = '';
            // tslint:disable-next-line: forin
            for (const xd in this.options.result.Score[Object.keys(this.options.result.Score)[i]]) {

              // tslint:disable-next-line: max-line-length
              d.push({x: Object.keys(this.options.result.Score)[i], y: this.options.result.Score[Object.keys(this.options.result.Score)[i]][xd][0], series: xd});
              console.log(d);
              // tslint:disable-next-line: max-line-length
              valorDeA += '<span title="' + this.options.result.SentencesNormalized[xd.toString()] + '"><p  class="noticeme">Date score sentence ' + xd + ': ' + this.options.result.Score[Object.keys(this.options.result.Score)[i]][xd][0] + '</p></span>';
              if (this.options.result.Score[Object.keys(this.options.result.Score)[i]][xd][0] > 0.35) {
                // tslint:disable-next-line: max-line-length
                valorDeA2 += '<span title="' + this.options.result.SentencesNormalized[xd.toString()] + '"><p  class="noticeme">Date score sentence ' + xd + ': ' + this.options.result.Score[Object.keys(this.options.result.Score)[i]][xd][0] + '</p></span>';

                // tslint:disable-next-line: max-line-length
                d2.push({x: Object.keys(this.options.result.Score)[i], y: this.options.result.Score[Object.keys(this.options.result.Score)[i]][xd][0], series: xd});
                console.log(d2);
                // TODO: meter d e d2 nos datasets
              }

            }
            a = valorDeA;
            a2 = valorDeA2;
          }
          b = Object.keys(this.options.result.Score)[i];

          // console.log("a");
          // console.log(a);
          // console.log("b");
          // console.log(b);
          // console.log("end");

          c2.push({x: b, y: a2, z: d2});
          c.push({x: b, y: a, z: d});
            // console.log();
            // console.log(Object.keys(this.result.Score)[i].split('-').join(''));

          /^\d+$/.test(Object.keys(this.options.result.Score)[i].split('-').join('')) ? '' : c.pop();
          /^\d+$/.test(Object.keys(this.options.result.Score)[i].split('-').join('')) ? '' : c2.pop();
          c2 = c2.filter((y) => {
            if (y.y) {
              return true;
            } else {
              return false;
            }
          });

        }
        // tslint:disable-next-line: forin
        for (const data in c) {
          const j = Date.parse(c[data].x.split('-').join(' '));
          // console.log (j);
          c[data].dateparsed = j;
        }
        // tslint:disable-next-line: forin
        for (const data in c2) {
          const j = Date.parse(c2[data].x.split('-').join(' '));
          // console.log (j);
          c2[data].dateparsed = j;
        }
        // tslint:disable-next-line: no-shadowed-variable
        c = c.sort(( a , b ) => a.dateparsed - b.dateparsed);
        // tslint:disable-next-line: no-shadowed-variable
        c2 = c2.sort(( a , b ) => a.dateparsed - b.dateparsed);
        // console.log("a,b,join");
        // console.log(a);
        // console.log(b);
        // console.log(this.result.Score);
        // console.log(c);
        // console.log("end");
        this.dataset = c;
        this.datasetRelOnly = c2;
        console.log('this.dataset');
        console.log(this.dataset);
        console.log('this.datasetRelOnly');
        console.log(this.datasetRelOnly);
  }

}
