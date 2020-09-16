import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export interface ReceivedData {
  res: any;
  error: any;
}

@Injectable({
  providedIn: 'root'
})

export class TimelineService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://tm-websuiteapps.ipt.pt/timematters';
   }

  public getTextKeyDateFromSingleDoc(search: string, options: any): Observable<any> {
      const formData = new FormData();
      
      console.log('options');
      console.log(options);
      let realURL = this.url + '/SingleDoc';
      if (options.algo === 'py_heideltime') {
        realURL += '/Heideltime/api/v1.0';
      } else {
        realURL += '/RuleBased/api/v1.0';
      }
      if (options.docOrSentence === 'doc') {
        realURL += '/ScoreByDoc';
      } else {
        realURL += '/ScoreBySentence';
      }
      console.log(search.split('\"').join('\'\'').split("“").join("\"").split("”").join("\"").split("’").join("\'"));
      formData.append('text', search.split('\"').join('\'\'').split("“").join("\"").split("”").join("\"")); 

      if (options.docCreatTime) {
        formData.append('document_creation_time', options.docCreatTime);
        
      }
      if (options.dateGranularity) {
        formData.append('date_granularity', options.dateGranularity);

      }
      if (options.language) {
        formData.append('language', options.language);
      }
      if (options.documentType) {
        formData.append('document_type', options.documentType);
      }
      if (options.tH) {
        formData.append('TH', options.tH);
          if (options.tH>1){
            formData.append('TH', "1");
          }
      }
      if (options.n) {
        if (options.algo == 'py_heideltime') {
          formData.append('N', options.n);
        }
      }
      if (options.nContextualWindow) {
        formData.append('n_contextual_window', options.nContextualWindow);
      }
      if (options.number_of_keywords) {
        formData.append('number_of_keywords', options.numberOfKeywords);
      }
      if (options.ngram) {
        formData.append('ngram', options.ngram);
      }
      if (options.dateBegin && options.algo != 'py_heideltime') {
        formData.append('begin_date', options.dateBegin);

        
      }
      if (options.dateEnd && options.algo != 'py_heideltime') {
        formData.append('end_date', options.dateEnd);

        
      }
      if (options.result) {
      }
      console.log("pedido FINAL");
      console.log(realURL);
      return this.http.post(realURL, formData
          ).pipe(map((res, err) => {
        if (res) {
          console.log('bem');
          console.log(res);
          return res;
        } else {
          console.log('erro');
          console.log(realURL);
          console.log(err);
          return err;
        }
      }));
  }
}
