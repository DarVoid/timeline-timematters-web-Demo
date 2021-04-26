import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { WordcloudService } from '../services/wordcloud.service';
import { YakeService } from '../services/yake.service';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent implements OnInit {
  @Input() args: any;
  public base64Data:string;
  public converted_image:string;
  public keywords: any
  constructor(private _wordC: WordcloudService, private _yake: YakeService) { }

  ngOnInit(): void {
    if(this.args){
      console.log(this.args)

    }
  }
  showWhatsup(){
    let texto =  this.args.TextNormalized
    this._yake.getKeywords2(texto).pipe(take(1))
    .subscribe((res) => {
      if(res){
          let jj=[]
          console.log(res)
          let gg = res.keywords

          this._wordC.getWordcloud(gg).pipe(take(1)).subscribe((res2) => {
            if(res2){
              this.base64Data = res2.url;
              this.converted_image = "data:image/jpeg;base64,"+this.base64Data;

            }
          })

      }

    })
  }

}
