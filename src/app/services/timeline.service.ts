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
      /*console.log("search");
      console.log(search);*/
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
      let caracterfinal = realURL.charAt(realURL.length);
      if (options.docCreatTime) {
        if (options.algo == 'py_heideltime') {
          // formData.append('document_creation_time', options.docCreatTime);
          if(caracterfinal == "?"){
            realURL += 'document_creation_time=' + options.docCreatTime;
          }else{
            realURL += '&document_creation_time=' + options.docCreatTime;
          }
          caracterfinal = realURL.charAt(realURL.length);
        }
      }
      if (options.dateGranularity) {
        // formData.append('date_granularity', options.dateGranularity);
        if(caracterfinal == "?"){
          realURL += 'date_granularity=' + options.dateGranularity;
        }else{
          realURL += '&date_granularity=' + options.dateGranularity;
        }
        caracterfinal = realURL.charAt(realURL.length);

      }
      if (options.language) {
        if (options.algo == 'py_heideltime') {
          // formData.append('language', options.language);

          if(caracterfinal == "?"){
            realURL += 'language=' + options.language;
          }else{
            realURL += '&language=' + options.language;
          }
          caracterfinal = realURL.charAt(realURL.length);
        }
      }
      if (options.documentType) {
        // formData.append('document_type', options.documentType);
        if(caracterfinal == "?"){
          realURL += 'document_type=' + options.documentType;
        }else{
          realURL += '&document_type=' + options.documentType;
        }
        caracterfinal = realURL.charAt(realURL.length);
      }
      if (options.TH) {
        // formData.append('TH', options.TH);
        if(caracterfinal == "?"){
          realURL += 'TH=' + options.TH;
        }else{
          realURL += '&TH=' + options.TH;
        }
        caracterfinal = realURL.charAt(realURL.length);
      }
      if (options.N) {
        if (options.algo == 'py_heideltime') {
          // formData.append('N', options.N);
          if(caracterfinal == "?"){
            realURL += 'N=' + options.N;
          }else{
            realURL += '&N=' + options.N;
          }
          caracterfinal = realURL.charAt(realURL.length);


        }
      }
      if (options.nContextualWindow) {
        // formData.append('n_contextual_window', options.nContextualWindow);
        if(caracterfinal == "?"){
          realURL += 'n_contextual_window=' + options.nContextualWindow;
        }else{
          realURL += '&n_contextual_window=' + options.nContextualWindow;
        }
        caracterfinal = realURL.charAt(realURL.length);
      }
      if (options.number_of_keywords) {
        // formData.append('number_of_keywords', options.numberOfKeywords);
        if(caracterfinal == "?"){
          realURL += 'number_of_keywords=' + options.numberOfKeywords;
        }else{
          realURL += '&number_of_keywords=' + options.numberOfKeywords;
        }
        caracterfinal = realURL.charAt(realURL.length);
      }
      if (options.ngram) {
        // formData.append('ngram', options.ngram);
        if(caracterfinal == "?"){
          realURL += 'ngram=' + options.ngram;
        }else{
          realURL += '&ngram=' + options.ngram;
        }
        caracterfinal = realURL.charAt(realURL.length);
      }
      if (options.dateBegin) {
        if (options.algo != 'py_heideltime') {
          // formData.append('begin_date', options.dateBegin);
          if(caracterfinal == "?"){
            realURL += 'begin_date=' + options.dateBegin;
          }else{
            realURL += '&begin_date=' + options.dateBegin;
          }
          caracterfinal = realURL.charAt(realURL.length);

        }
      }
      if (options.dateEnd) {
        if (options.algo != 'py_heideltime') {
          // formData.append('end_date', options.dateEnd);
          if(caracterfinal = "?"){
            realURL += 'end_date=' + options.dateEnd;
          }else{
            realURL += '&end_date=' + options.dateEnd;
          }
          caracterfinal = realURL.charAt(realURL.length);

        }
      }
      if (options.result) {
      }

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
