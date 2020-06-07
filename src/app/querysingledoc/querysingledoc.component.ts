import { GetarticleService } from './../services/getarticle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-querysingledoc',
  templateUrl: './querysingledoc.component.html',
  styleUrls: ['./querysingledoc.component.scss']
})
export class QuerysingledocComponent implements OnInit {
  public url: string;
  constructor(private article: GetarticleService) {

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

}
