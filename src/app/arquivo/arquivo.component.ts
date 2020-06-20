import { Component, OnInit } from '@angular/core';
import { ArquivoService } from '../services/arquivo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrls: ['./arquivo.component.scss']
})
export class ArquivoComponent implements OnInit {
  public query: string;
  public options: any;
  public siteSearch: string;
  public from: number;
  public to: number;
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

  constructor(private arquivo: ArquivoService, private _snackBar: MatSnackBar) {
    this.query = 'Elon Musk';
    this.siteSearch = 'http://www.publico.pt';
    this.from = 0;
    this.prettyPrint = true;
    this.offset = 0;
    this.maxItems = 50;
  }

  ngOnInit(): void {
  }
  submitQuery(event: any) {
    event.preventDefault();
    this.update();
    this.arquivo.getLinkFromOptions(this.query, this.options).subscribe((res) => {
      if (res) {
        this.resultado = res;
      } else {
        console.log('error');
      }
    }) ;
  }
  setSelected(event: any) {
    this.selected = event;
  }
  next() {
    this.offset = this.offset + this.maxItems;
    this.update();
    this.arquivo.getLinkFromOptions(this.query, this.options).subscribe((res) => {
      if (res) {
        this.resultado = res;
      } else {
        console.log('error');
      }
    }) ;

  }
  goBack() {
    this.resultado = false;
    this.loading = false;
    this.selected = false;
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
  setSiteSearch(event: any) {
    this.siteSearch = event.target.value;
    console.log(event.target.value);
    this.update();
  }

}
