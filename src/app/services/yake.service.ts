import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class YakeService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = "http://yake.inesctec.pt/yake/v2/extract_keywords";
  }

  public getKeywords(search: string): Observable<any> {
    const formData = new FormData();

    let realURL =
      this.url +
      "?content=" +
      search
        .split("<p>")[1]
        .split("<kw>")
        .join("")
        .split("</kw>")
        .join("")
        .split("<d>")
        .join("")
        .split("</d>")
        .join("")
        .trim() +
      "&max_ngram_size=3&number_of_keywords=1&highlight=true";

    // console.log(realURL);
    return this.http.get(realURL).pipe(
      map((res, err) => {
        if (res) {
          console.log(res);
          return res;
        } else {
          console.log(err);
          return err;
        }
      })
    );
  }
}
