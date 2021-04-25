import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { YakeService } from "./yake.service";

@Injectable({
  providedIn: "root",
})
export class WordcloudService {
  private url: string;

  constructor(private http: HttpClient, private yake: YakeService) {
    this.url = "/wordCloudYAKE/api/v1.0/base64";
  }

  public getImgURL(search: string) {
    const formData = new FormData();
    let realURL = this.url;
    this.yake.getKeywords(search).pipe(
      map((res, err) => {
        if (res) {
          this.http.get(res).pipe(
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
        } else {
          console.log(err);
          return err;
        }
      })
    );
  }
}
