import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetarticleService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://tm-websuiteapps.ipt.pt/url2content/api/v1.0/parse'; }

    public getLanguageFromContent(search: string): Observable<any> {
      let realURL=this.url;
      realURL += "?url=" + search;
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
