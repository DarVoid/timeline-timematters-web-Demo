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
  public requestMade: boolean;
  public loading: boolean;
  public documentCreationTime: string;
  public opcoes: any;
  public resultado: any;

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
    this.loading = false;
    this.requestMade = false;
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
  update() {

    this.opcoes = {
      docCreatTime : this.documentCreationTime,
      dateGranularity : this.dateGranularitySelected,
      docOrSentence  : this.byDocOrSentece ? 'doc' : 'sentence',
      algo: this.algoritmoSelected,
      ngram : this.ngramSelected,
      language : this.languagueSelected,
      numberOfKeywords : this.numberOfKeyWords,
      nContextualWindow: this.contextWindow,
      documentType: this.documentTypeSelected,
      N: this.simbaValue,
      result: this.resultado
    };

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
  showArticle(event: any) {
    event.preventDefault();
    this.loading = true;
    this.article.getArticles(this.url).subscribe((res) => {
      if (res) {
        console.log(res);
        this.artigo = res;
        this.documentCreationTime = res.date_creation;
        switch (res.language){
          case "en":
            this.languagueSelected = "English";
            break;
          case "fr":
            this.languagueSelected = "French";
            break;
          case "pt":
            this.languagueSelected = "Portuguese";
            break;
          case "ge":
            this.languagueSelected = "German";
            break;
          case "it":
            this.languagueSelected = "Italian";
            break;
          case "nl":
            this.languagueSelected = "Dutch";
            break;
          case "es":
            this.languagueSelected = "Spanish";
            break;
          default:
            this._snackBar.open('Language no Supported', res.lang, {duration: 2000});
            break;

          }
        this.update();
        this.timeline.getTextKeyDateFromSingleDoc(this.artigo.text, this.opcoes).subscribe((res2) => {

          if (res2) {
            // console.log('nice');
            this.resultado = res2;
            // pedido recebido aqui
            // console.log(res);
            this.update();
            this.requestMade = true;
            this.loading = false;
            return ' ';
          }
          else {
            console.log('oof');
            return ' ';
          }
          }
        );
      }



    });
}

}
