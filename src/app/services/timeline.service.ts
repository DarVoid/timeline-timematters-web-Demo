import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";

export interface ReceivedData {
  res: any;
  error: any;
}

@Injectable({
  providedIn: "root",
})
export class TimelineService {
  url: string;
  constructor(private http: HttpClient, private router: Router) {
    this.url = "https://tm-websuiteapps.ipt.pt/timematters";
  }

  public getTextKeyDateFromSingleDoc(
    search: string,
    options: any
  ): Observable<any> {
    const formData = new FormData();

   // console.log("options");
   // console.log(options);
   // console.log("search");
   // console.log(search);
    let realURL = this.url + "/SingleDoc";
    if (options.algo === "py_heideltime") {
      realURL += "/Heideltime/api/v1.0";
      if (options.docCreatTime) {
        formData.append("document_creation_time", options.docCreatTime);
        console.log(options.docCreatTime)
      }
      if (options.language) {
       // formData.append("language", options.language);
      }
    } else {
      // realURL += "/RuleBased/api/v1.0";
      if (options.dateBegin) {
       // formData.append("begin_date", options.dateBegin);
      }
      if (options.dateEnd) {
       // formData.append("end_date", options.dateEnd);
      }
    }
    if (options.docOrSentence === "doc") {
      realURL += "/ScoreByDoc";
    } else {
      realURL += "/ScoreBySentence";
    }
    //console.log(search.split('\"').join('\'').split("“").join("\"").split("”").join("\"").split("’").join("\'"));
    formData.append("text", search); //.split("“").join("\'").split("”").join("\'").split('\"').join('\'')

    if (options.dateGranularity) {
     // formData.append("date_granularity", options.dateGranularity);
    }
    if (options.documentType) {
     // formData.append("document_type", options.documentType);
    }
    if (options.tH) {
     // formData.append("TH", options.tH);
      if (options.tH > 1) {
     //   formData.append("TH", "1");
      }
    }
    if (options.n) {
     // formData.append("N", options.n);
    }
    if (options.nContextualWindow) {
     // formData.append("n_contextual_window", options.nContextualWindow);
    }
    if (options.numberOfKeywords) {
     // formData.append("num_of_keywords", options.numberOfKeywords);
    }
    if (options.ngram) {
     // formData.append("ngram", options.ngram);
    }
    if (options.result) {
    }
   // console.log("pedido FINAL");
   // console.log(realURL);
   setTimeout(() => {
     console.log("deu timeout")
     return of({message:"deu asneira"})
   }, 90000);
    return this.http.post(realURL, formData).pipe(
      map((res, err) => {
        if (res) {
        //  console.log("bem");
        //  console.log(res);
          return res;
        } else {
        //  console.log("erro");
        //  console.log(realURL);
        //  console.log(err);
          return err;
        }
      })
    );
  }
  public getTextKeyDateFromUrl(
    urlstr: string,
    options: any
  ): Observable<any> {
    let cena=''
    if (options.docCreatTime) {
      cena = ["&document_creation_time=", options.docCreatTime].join("");
      console.log(options.docCreatTime)
    }
    let realURL = [this.url , '/SingleDoc/Heideltime/api/v1.0/ScoreByDoc_by_url?url=',urlstr,cena].join("")
    return this.http.get(realURL).pipe(
      map((res, err) => {
        if (res) {
         // console.log("bem");
         // console.log(res);
          return res;
        } else {
         // console.log("erro");
         // console.log(realURL);
         // console.log(err);
          return err;
        }
      })
    );
  }
}
