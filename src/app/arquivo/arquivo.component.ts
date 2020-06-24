import { Component, OnInit } from '@angular/core';
import { ArquivoService } from '../services/arquivo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrls: ['./arquivo.component.scss']
})
export class ArquivoComponent implements OnInit {
  public query: string;
  public options: any;
  public siteSearch: string;
  public from: string;
  public fromDate: string;
  public to: string;
  public toDate: string;
  public type: string;
  public offset: number;
  public collection: string;
  public maxItems: number;
  public itemsPerSite: string;
  public fields: Array<string>;
  public callback: string;
  public prettyPrint: boolean;
  public resultado: any;
  public loading: boolean;
  public selected: boolean;
  public requestParams: any;
  public totalResults: any;
  public startDate: Date;
  public viewAdvanced: boolean;
  public pagina: number;

  constructor(private arquivo: ArquivoService, private _snackBar: MatSnackBar) {
    this.query = 'Elon Musk';
    this.siteSearch = 'http://www.publico.pt';
    this.from = '19960101000000';
    this.to = (new Date().getFullYear() - 1) + '' + new Date().getMonth() + '' + new Date().getDate() + '000000';
    this.fromDate = new Date(1996).getTime() + '';
    console.log(this.fromDate);
    this.to = (new Date().getFullYear() - 1) + '' + new Date().getMonth() + '' + new Date().getDate() + '000000';
    // this.toDate = new Date().getTime();
    console.log(this.to);
    this.prettyPrint = true;
    this.offset = 0;
    this.maxItems = 50;
    this.startDate = new Date(1996);
    this.viewAdvanced = false;
    this.pagina = 0;
  }

  ngOnInit(): void {
  }
  submitQuery(event: any) {
    event.preventDefault();
    this.loading = true;
    this.update();
    this.arquivo.getLinkFromOptions(this.query, this.options).pipe(take(1)).subscribe((res) => {
      if (res) {
        this.resultado = res.response_items;
        this.requestParams = res.request_parameters;
        this.totalResults = res.estimated_nr_results;
      } else {
        console.log('error');
      }
    }) ;
  }
  setSelected(event: any) {
    this.selected = event;
  }
  next() {
    this.update();
    this.arquivo.getLinkFromOptions(this.query, this.options).pipe(take(1)).subscribe((res) => {
      if (res) {
        this.resultado = res.response_items;
        this.requestParams = res.request_parameters;
        this.totalResults = res.estimated_nr_results;
        // tslint:disable-next-line: forin
        for (const elemento in res.response_items) {
          console.log(res.response_items[elemento]);
        }
      } else {
        console.log('error');
      }
    }) ;

  }
  paginatorOptions(event: any){
    console.log(event);
    this.maxItems = event.pageSize;
    this.offset = this.maxItems * event.pageIndex;
      this.next();
  }
  toggleAdvanced() {
    this.viewAdvanced = !this.viewAdvanced;
  }
  togglePretty(event: any){
    console.log(event.checked);
    this.prettyPrint = event.checked;
  }
  goBack() {
    this.resultado = false;
    this.loading = false;
    this.selected = false;
    this.offset = 0;
    this.update();
  }
  public copyToClipboard(someJsonString) {

    this._snackBar.open('Message copied to Clipboard', 'Length: ' + JSON.stringify(someJsonString).length + ' characters', {
      duration: 2000
    });
    const clipboard = document.createElement('input');

    clipboard.setAttribute('value', JSON.stringify(someJsonString));
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand('copy');
    document.body.removeChild(clipboard);

  }

  update() {
    this.pagina = Math.floor(this.offset / this.maxItems);
    this.options = {

      siteSearch: this.siteSearch,
      from: this.from,
      to: this.to,
      type: this.type,
      offset: this.offset,
      collection: this.collection,
      maxItems: this.maxItems,
      itemsPerSite: this.itemsPerSite,
      fields: this.fields,
      callback: this.callback,
      prettyPrint: this.prettyPrint
    };
  }
  setQuery(event: any) {
    this.query = event;
  }
  setFrom(event: any) {
    console.log('from: ');
    this.fromDate = event.target.value;
    console.log(event.target.value.split('-').join('') + '000000');
    this.from = event.target.value.split('-').join('') + '000000';
    this.update();
  }
  setTo(event: any) {
    console.log('to: ');
    console.log(event.target.value.split('-').join('') + '000000');
    this.toDate = event.target.value;
    this.to = event.target.value.split('-').join('') + '000000';
    this.update();
  }
  setSiteSearch(event: any) {
    this.siteSearch = event.target.value;
    console.log(event.target.value);
    this.update();
  }
  setOffset(event: any) {
    console.log('oofset');
    this.offset = event.target.value;
    console.log(event.target.value);
    this.update();
  }
  setMaxItems(event: any) {
    console.log('maxItems');
    this.maxItems = event.target.value;
    if (this.maxItems > 2000) {
      this.maxItems = 50;
    }
    console.log(event.target.value);
    this.update();
  }

}
