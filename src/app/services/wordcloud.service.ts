import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, take } from "rxjs/operators";
import { YakeService } from "./yake.service";

@Injectable({
  providedIn: "root",
})
export class WordcloudService {
  private url: string;
  private keywords:any;
  constructor(private http: HttpClient, private yake: YakeService) {
    this.url = "/wordCloudYAKE/api/v1.0/base64";
  }

  public getWordcloud(search: any):Observable<any>{
    const formData = new FormData();
    let realURL = this.url;

    let cena=[]
    search.map((cada)=>{
      cena.push(cada)
    })


          return this.http.post(realURL,{width:300, height:300, json:{keywords:cena, language:"portuguese"}}).pipe(
            map((res2, err2) => {
              if (res2) {
                console.log(res2);
                return res2;
              } else {
                console.log(err2);
                return err2;
              }
            })
          );
        }
}
