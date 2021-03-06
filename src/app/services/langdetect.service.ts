import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangdetectService {
  url: string;
  constructor(private http: HttpClient) {
    //this.url = 'https://langdec-api-heroku.herokuapp.com/langdetect/';
     this.url = '/languageDetection/api/v1.0';
  }


  public getLanguageFromContent(search: string): Observable<any> {
    const formData = new FormData();
    //formData.append('text', search);
    formData.append('content', search);
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
