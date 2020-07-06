import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YakeService {
  url: string;
  constructor(private http: HttpClient) { 
    this.url = 'https://arquivo.pt/textsearch';
  }

  public getKeywords(search: string, options: any): Observable<any> {
    const formData = new FormData();
    let realURL = this.url + '?content=' + search+'&max_ngram_size=3&number_of_keywords=20&highlight=true';

    // console.log(realURL);
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
