import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetarticleService {
  url: string;
  url2: string;
  constructor(private http: HttpClient) {
    //this.url2 = 'https://tm-websuiteapps.ipt.pt/url2content/api/v1.0/parse';
    this.url = 'https://langdec-api-heroku.herokuapp.com/getarticle/';
  }

    public getArticles(search: string): Observable<any> {
      const formData = new FormData();
      formData.append('text', search);
      return this.http.post(this.url, formData,
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
