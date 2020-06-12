import { GetarticleService } from './../services/getarticle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-querysingledoc',
  templateUrl: './querysingledoc.component.html',
  styleUrls: ['./querysingledoc.component.scss']
})
export class QuerysingledocComponent implements OnInit {
  public url: string;
  public artigo: any;
  constructor(private article: GetarticleService) {
    this.url="https://fox13now.com/2013/12/30/new-year-new-laws-obamacare-pot-guns-and-drones/"
  }

  ngOnInit(): void {
  }
  doThings(event: any){
    event.preventDefault();
    console.log(event.target.value);

    this.article.getArticles(event.target.value).subscribe((res) =>
    {
      console.log(res);
      return "" ;

    });

  }
  showArticle(event: any) {
    event.preventDefault();
    this.article.getArticles(this.url).subscribe((res) => {
      if (res) {
        console.log(res);
        this.artigo = res;
      } else {
        console.log("oof");
      }
    });


  }
  setURL(event: any) {
    event.preventDefault();
    console.log(event.target.value);
    this.url = event.target.value;
  }

}
