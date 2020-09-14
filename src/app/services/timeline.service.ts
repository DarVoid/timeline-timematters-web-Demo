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
        realURL += '/ScoreByDoc?';
      } else {
        realURL += '/ScoreBySentence?';
      }
      formData.append('text', search);
      let caracterfinal = realURL.charAt(realURL.length - 1);

      if (options.docCreatTime) {

          if (caracterfinal == '?') {
            realURL += 'document_creation_time=' + options.docCreatTime;
          } else {
            realURL += '&document_creation_time=' + options.docCreatTime;
          }
          caracterfinal = realURL.charAt(realURL.length - 1);
        
      }
      if (options.dateGranularity) {

        if (caracterfinal == '?') {
          realURL += 'date_granularity=' + options.dateGranularity;
        } else {
          realURL += '&date_granularity=' + options.dateGranularity;
        }
        caracterfinal = realURL.charAt(realURL.length - 1);

      }
      if (options.language) {

          if (caracterfinal == '?') {
            realURL += 'language=' + options.language;
          } else {
            realURL += '&language=' + options.language;
          }
          caracterfinal = realURL.charAt(realURL.length - 1);
      }
      if (options.documentType) {

        if (caracterfinal == '?') {
          realURL += 'document_type=' + options.documentType;
        } else {
          realURL += '&document_type=' + options.documentType;
        }
        caracterfinal = realURL.charAt(realURL.length - 1);
      }
      if (options.tH) {

        if (caracterfinal == '?') {
          if (options.tH>1){
            realURL += 'TH=' + "1";
          }else{
            realURL += 'TH=' + options.tH;
          }
        } else {
          if (options.tH>1){
            realURL += '&TH=' + "1";
          }else{
            realURL += '&TH=' + options.tH;
          }
        }
        caracterfinal = realURL.charAt(realURL.length - 1);
      }
      if (options.n) {
        if (options.algo == 'py_heideltime') {

          if (caracterfinal == '?') {
            realURL += 'N=' + options.n;
          } else {
            realURL += '&N=' + options.n;
          }
          caracterfinal = realURL.charAt(realURL.length - 1);


        }
      }
      if (options.nContextualWindow) {

        if (caracterfinal == '?') {
          realURL += 'n_contextual_window=' + options.nContextualWindow;
        } else {
          realURL += '&n_contextual_window=' + options.nContextualWindow;
        }
        caracterfinal = realURL.charAt(realURL.length - 1);
      }
      if (options.number_of_keywords) {

        if (caracterfinal == '?') {
          realURL += 'number_of_keywords=' + options.numberOfKeywords;
        } else {
          realURL += '&number_of_keywords=' + options.numberOfKeywords;
        }
        caracterfinal = realURL.charAt(realURL.length - 1);
      }
      if (options.ngram) {

        if (caracterfinal == '?') {
          realURL += 'ngram=' + options.ngram;
        } else {
          realURL += '&ngram=' + options.ngram;
        }
        caracterfinal = realURL.charAt(realURL.length - 1);
      }
      if (options.dateBegin) {

          if (caracterfinal == '?') {
            realURL += 'begin_date=' + options.dateBegin;
          } else {
            realURL += '&begin_date=' + options.dateBegin;
          }
          caracterfinal = realURL.charAt(realURL.length - 1);

        
      }
      if (options.dateEnd) {

          if (caracterfinal == '?') {
            realURL += 'end_date=' + options.dateEnd;
          } else {
            realURL += '&end_date=' + options.dateEnd;
          }
          caracterfinal = realURL.charAt(realURL.length - 1);

        
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
