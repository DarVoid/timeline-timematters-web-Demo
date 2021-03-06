import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  url: string;
  urlIMG: string;
  constructor(private http: HttpClient) {
    this.url = 'https://arquivo.pt/textsearch';
     this.urlIMG = '/imagesearch';
  }

  public getLinkFromOptions(search: string, options: any): Observable<any> {
    const formData = new FormData();
    let realURL = this.url + '?q=' + search;
    if (options.siteSearch != 'none') {
      realURL += '&siteSearch=' + options.siteSearch;
    }
    if (options.from) {
      realURL += '&from=' + options.from;
    }
    if (options.to) {
      realURL += '&to=' + options.to;
    }
    if (options.type) {
      realURL += '&type=' + options.type;
    }
    if (options.offset) {
      realURL += '&offset=' + options.offset;
    }
    if (options.collection) {
      realURL += '&collection=' + options.collection;
    }
    if (options.maxItems) {
      realURL += '&maxItems=' + options.maxItems;
    }/*
    if (options.itemsPerSite) {
      realURL += '&dedupField=site&dedupValue=0';
    }*/
    realURL += '&dedupField=site&dedupValue=0';
    /*if (options.fields) {
      realURL += '&fields=' + options.fields[0];
      // tslint:disable-next-line: forin
      for (const k in options.fields) {
        console.log(k);
        if (k.toString() != '0') {

          realURL += ',' + options.fields[k];
        }
      }
    }*/
    if (options.callback) {
      realURL += '&callback=' + options.callback;
    }
    if (options.prettyPrint) {
      realURL += '&prettyPrint=' + options.prettyPrint;
    }

     console.log(realURL);
    return this.http.get(realURL
        ).pipe(map((res, err) => {
      if (res) {
        console.log(res);
        return res;
      } else {
        console.log(err);
        return err;
      }
    }));
}
  public getImgURL(search: string){
    const formData = new FormData();
    let realURL = this.urlIMG + '?q=' + search+"&size=md";
    return this.http.get(realURL
        ).pipe(map((res, err) => {
      if (res) {
        console.log(res);
        return res;
      } else {
        console.log(err);
        return err;
      }
    }));

  }
}
