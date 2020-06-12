import { GetarticleService } from './../services/getarticle.service';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: 'app-querysingledoc',
  templateUrl: './querysingledoc.component.html',
  styleUrls: ['./querysingledoc.component.scss']
})
export class QuerysingledocComponent implements OnInit {
  public url: string;
  public artigo: any;
  public algoritmosDate: Array<string>;
  public algoritmoSelected: string;
  public dateGranularityOptions: Array<string>;
  public dateGranularitySelected: string;
  public documentTypeOptions: Array<string>;
  public documentTypeSelected: string;
  public languageOptions: Array<string>;
  public languagueSelected: string;
  public dateBegin: number;
  public dateEnd: number;
  public numberOfKeyWords: number;
  public contextWindow: any;
  public simbaValue: number;
  public cheating: boolean;
  public showOnlyRel: boolean;
  public ngramSelected: number;
  public byDocOrSentece: boolean;
  public hiddenoptionKW: boolean;
  public hiddenoption: boolean;
  public documentCreationTime: string;

  constructor(private article: GetarticleService, private timeline: TimelineService, private _snackBar: MatSnackBar) {
    this.url = "https://fox13now.com/2013/12/30/new-year-new-laws-obamacare-pot-guns-and-drones/";
    this.algoritmosDate = ['py_heideltime' , 'py_rule_based'];
    this.algoritmoSelected = this.algoritmosDate[1];
    this.dateGranularityOptions = ['full', 'year', 'month', 'day'];
    this.dateGranularitySelected = this.dateGranularityOptions[0];
    this.documentTypeOptions = ['news', 'narrative', 'colloquial', 'scientific'];
    this.documentTypeSelected = this.documentTypeOptions[0];
    this.languageOptions = ['English', 'Portuguese', 'Spanish', 'German', 'Dutch', 'Italian', 'French'];
    this.languagueSelected = this.languageOptions[0];
    this.dateBegin = 0;
    this.dateEnd = 2100;
    this.numberOfKeyWords = 10;
    this.contextWindow = "full_sentence";
    this.simbaValue = 10;
    this.cheating = false;
    this.showOnlyRel = false;
    this.ngramSelected = 1;
    this.byDocOrSentece = true;
    this.hiddenoptionKW = false;
    this.hiddenoption = false;
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

        //this.taggedData;
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

  selecionaTamanhoSimbaVectors(event: any) {
    console.log(event.target.value);
    this.simbaValue = event.target.value;
  }
  selecionarTipoDocumento(event: any) {
    this.documentTypeSelected = event;
  }
  selecionarLanguage(event: any) {
    this.languagueSelected = event;
  }
  selecionarGranularidade(event: any) {
    console.log('entrou mudar granularidade');
    this.dateGranularitySelected = event;
    console.log(event);
  }
  selecionarContextualWindow(event: any) {
    this.contextWindow = event;
  }
  selecionarNKeywords(event: any){
    this.numberOfKeyWords = event.target.value;
    console.log(event.target.value);
  }
  selecionarngram(event: any){

    this.ngramSelected = event.target.value;
    console.log(event.target.value);
  }
  toggleDocOrSentence(){
    this.byDocOrSentece = !this.byDocOrSentece;
  }
  toggleOptionKeywords() {
    this.hiddenoptionKW = !this.hiddenoptionKW;
  }
  selecionarAlgoritmo(event: any){
    this.algoritmoSelected = event;
    //this.documentCreationTime="";

  }
  selecionarDataReferencia(event:any){
    this.documentCreationTime = event.target.value;
    console.log(event.target.value);
  }
  toggleOption() {
    this.hiddenoption = !this.hiddenoption;
  }

}
