import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetarticleService {
  url: string;
  url2: string;
  constructor(private http: HttpClient) {
    this.url = 'https://tm-websuiteapps.ipt.pt/url2content/api/v1.0/parse';
    this.url2 = 'http://pyservices.realm.host/getarticle/';
  }

    public getArticles(search: string): Observable<any> {
      let realURL = this.url;
      realURL += "?url=" + search;
      let headerss = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

      console.log(headerss);
      return this.http.get(realURL, {headers: headerss}
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
