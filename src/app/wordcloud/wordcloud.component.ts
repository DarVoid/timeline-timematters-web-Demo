import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { WordcloudService } from '../services/wordcloud.service';
import { YakeService } from '../services/yake.service';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent implements OnInit {
  @Input() args: any;

  public keywords: any
  public words: Array<any>
  constructor(private _wordC: WordcloudService, private _yake: YakeService) { }

  ngOnInit(): void {
    if(this.args){
      console.log(this.args)
      this.showWhatsup()
    }
  }
  showWhatsup(){
    let texto =  this.args.TextNormalized

    this._yake.getKeywords2(texto).pipe(take(1))
    .subscribe((res) => {
      if(res){
          let gg = res.keywords
          this.keywords = gg
          let arrayOfStuffs=[]
          let reff = 1
          this.keywords.map((cada)=>{
            if(reff==1){
              arrayOfStuffs.push({
                word:cada.ngram, fontSize:52,color: Math.floor(Math.random()*16777215).toString(16)
              })
            }else{
              if(reff>=16){
                arrayOfStuffs.push({
                  word:cada.ngram, fontSize:12,color: Math.floor(Math.random()*16777215).toString(16)
                })
              }else{
                if(reff>=8){
                  arrayOfStuffs.push({
                    word:cada.ngram, fontSize:23,color: Math.floor(Math.random()*16777215).toString(16)
                  })
                }else{
                  if(reff>=4){
                    arrayOfStuffs.push({
                      word:cada.ngram, fontSize:32,color: Math.floor(Math.random()*16777215).toString(16)
                    })
                  }else{
                    if(reff>=2){
                      arrayOfStuffs.push({
                        word:cada.ngram, fontSize:43,color: Math.floor(Math.random()*16777215).toString(16)
                      })
                    }
                  }
                }

              }

            }

            reff++

          })
          arrayOfStuffs = arrayOfStuffs.sort(() => (Math.random() > .5) ? 1 : -1)
          this.words=arrayOfStuffs
          html2canvas(document.querySelector("#capture")).then(canvas => {
           console.log(canvas)
        });
      }
    })
    console.log(this.keywords)
  }

}
