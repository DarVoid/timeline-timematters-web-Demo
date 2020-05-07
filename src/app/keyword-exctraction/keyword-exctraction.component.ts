import { Color } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {take} from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-keyword-exctraction',
  templateUrl: './keyword-exctraction.component.html',
  styleUrls: ['./keyword-exctraction.component.scss']
})
export class KeywordExctractionComponent implements OnInit {
  public result: any;
  public requestMade: boolean;
  public withKeywords: boolean;
  public withKeywordsSentence: string;
  public picker: any;
  public hiddenoption: boolean;
  public conteudoDefault: string;
  public loading: boolean;
  public algoritmosDate: Array<string>;
  public algoritmoSelected: string;
  public dateGranularityOptions: Array<string>;
  public dateGranularitySelected: string;
  public documentTypeOptions: Array<string>;
  public documentTypeSelected: string;
  public documentCreationTime: string;
  public languageOptions: Array<string>;
  public languagueSelected: string;
  public dateBegin: number;
  public dateEnd: number;
  public byDocOrSentece: boolean;
  public hiddenoptionKW: boolean;
  public ngramSelected: number;
  public listaConteudos: Array<string>;
  public optio: any;
  public dataset: any;
  public numberOfKeyWords: number;
  public contextWindow: any;
  public simbaValue: number;
  constructor(private timeline: TimelineService) {
    /*private timeline: TimelineService*/
    this.ngramSelected = 1;
    this.byDocOrSentece = true;
    this.result = '';
    this.requestMade = false;
    this.withKeywords = true;
    this.withKeywordsSentence = 'Keywords Off';
    this.hiddenoption = false;
    this.hiddenoptionKW = false;
    this.loading = false;
    this.listaConteudos=['2011 Haiti Earthquake Anniversary. As of 2010 (see 1500 photos here), the following major earthquakes have been recorded in Haiti. The first great earthquake mentioned in histories of Haiti occurred in 1564 in what was still the Spanish colony. It destroyed Concepción de la Vega. On January 12, 2010, a massive earthquake struck the nation of Haiti, causing catastrophic damage inside and around the capital city of Port-au-Prince. On the first anniversary of the earthquake, 12 January 2011, Haitian Prime Minister Jean-Max Bellerive said the death toll from the quake in 2010 was more than 316,000, raising the figures in 2010 from previous estimates. I immediately flashed back to the afternoon of February 11, 1975 when, on my car radio, I first heard the news. Yesterday...',
    `Islam : l'image de la religion se dégrade en France et en Allemagne. La méfiance envers l'Islam, jusque-là uniquement associée à l'extrême droite et d'une partie de la droite, ou plus récemment comme un marqueur "réactionnaire" dans le débat culturel, serait à présent largement et profondément partagée à gauche. Selon un sondage Ifop réalisé du 14 au 18 avril 2016 pour Le Figaro, 52% des électeurs socialistes considèrent que la place de l'islam est "trop importante". En 2010, ils n'étaient que 39%. Une défiance qui monte en puissance et illustre un rejet global de la religion musulmane en France.  En cause, les multiples attaques terroristes dont a été victime l'Hexagone en 2015. A titre de comparaison, un sondage de 1989 révélait que 33% des Français étaient par exemple "favorables" à la construction des mosquées contre seulement 13% aujourd'hui. À l'époque, 31% des sondés étaient opposés au port du voile. En 2016, ils sont 63%.  En Allemagne, ce phénomène de rejet est moins puissant mais la donne a tout de même changé à la suite des événements du 31 décembre de Cologne. "Alors que ces deux pays ont des histoires de l'immigration très différentes, analyse Jerôme Fourquet, le Directeur du Département Opinion de l'Ifop, cette convergence montre que les défis de ces questions majeures sont posés de manière similaire à toute la société occidentale".`,
    `Champions: le possibili avversarie ai Quarti.  Conclusi gli Ottavi di finale, è ora definito il quadro delle otto "grandi d'Europa" che si sfideranno nei Quarti di Champions League 2016/2017. L'appuntamento con l'urna di Nyon è per oggi, venerdì 17 marzo, alle ore 12, con la Juventus che se la vedrà con una tra le tre formazioni spagnole (Atlético Madrid, Barcellona e Real Madrid); i tedeschi di Bayern Monaco e Borussia Dortmund; gli inglesi del Leicester o i transalpini del Monaco. A questo riguardo, andiamo ad analizzare alcune statistiche e curiosità relative ai precedenti tra i Bianconeri e i possibili avversari nei Quarti di finale.`,
    `A seleção brasileira treinará com apenas 14 jogadores nesta segunda-feira. O técnico Tite comandará nesta segunda-feira o primeiro treinamento da Seleção Brasileira visando as partidas contra o Uruguai e Paraguai, nos próximos dias 23 e 28, válidos pela Eliminatórias Sul-Americanas para a Copa da Rússia em 2018. Para esta primeira atividade, o comandante terá apenas 14 dos 23 convocados à disposição. Os demais jogadores chegarão entre a tarde desta segunda-feira e a manhã da terça-feira.   A atividade, que será realizado às 16h (de Brasília)  no CT do Corinthians, contará com as presenças de Marcelo, Casemiro, Ederson, Weverton, Diego, Diego Souza, Fagner, Dudu, Filipe Luís, Willian, Miranda, Paulinho, Gil e Renato Augusto - os dois últimos já treinaram no CT do São Paulo durante a semana passada.   Na chegada ao hotel onde está concentrada a Seleção Brasileira, o meia Renato Augusto, atualmente no Beijing Guoan, explicou quais serão as maiores dificuldades encontradas no duelo contra os uruguaios, fora de casa. 'Será um clima semelhante ao da Libertadores, jogaremos fora de casa, enfrentaremos uma catimba natural, mas não devemos entrar no jogo deles, temos que ficar com a cabeça no lugar e fazer o nosso jogo para poder vencer', analisou o titular.   Tite só terá todos os seus convocados no treino desta terça-feira, que será realizado no CT do São Paulo. Dos nove atletas que ainda irão se juntar aos outros convocados, seis ainda deverão chegar nesta segunda-feira, são eles Marquinhos, Thiago Silva, Fernandinho, Giuliano, Coutinho e Firmino. A convocação estará completa apenas nesta terça-feira, com a chegadas de Neymar, Daniel Alves e Alisson.   Líder das Eliminatórias Sul-Americanas com 27 pontos, a Seleção Brasileira encara o segundo colocado, Uruguai, com 23 pontos, na próxima quinta-feira, às 20h (de Brasília), no estádio Centenário, em Montevidéu. Já no dia 2 de março, a equipe volta a campo para enfrentar o Paraguai, no Estádio de Itaquera, às 21h45.`];

    this.conteudoDefault = this.listaConteudos[0];
    this.algoritmosDate = ['py_heideltime' , 'py_rule_based'];
    this.algoritmoSelected = this.algoritmosDate[0];
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

  }
  toggleOptionKeywords(){
    this.hiddenoptionKW = !this.hiddenoptionKW;
  }
  toggleKeywords() {
    this.withKeywords = !this.withKeywords;
    if (this.withKeywords) {
      this.withKeywordsSentence = 'Keywords Off';
    } else {
      this.withKeywordsSentence = 'Keywords On';
    }
  }
  toggleDocOrSentence(){
    this.byDocOrSentece = !this.byDocOrSentece;
  }
  toggleOption() {
    this.hiddenoption = !this.hiddenoption;
  }
  deleteContent(event : any){
    this.conteudoDefault = "";
  }

  ngOnInit() {
    //singleDoc


  }
  selecionarngram(event:any){

    this.ngramSelected = event.target.value;
    console.log(event.target.value);
  }
  selecionarDataReferencia(event:any){
    this.documentCreationTime = event.target.value;
    console.log(event.target.value);

  }
  selecionarNKeywords(event: any){
    this.numberOfKeyWords = event.target.value;
    console.log(event.target.value);

  }
  selecionarTipoDocumento(event:any){
    this.documentTypeSelected=event;

  }
  selecionaTamanhoSimbaVectors(event: any){
    console.log(event.target.value);
    this.simbaValue =event.target.value;
  }
  selecionarGranularidade(event: any) {
    console.log('entrou mudar granularidade');
    this.dateGranularitySelected = event;
    console.log(event);
  }
  selecionarAlgoritmo(event: any){
    this.algoritmoSelected = event;
    this.documentCreationTime='';

  }
  selecionarContextualWindow(event:any){
    this.contextWindow = event;
  }
  selecionarLanguage(event:any){
    this.languagueSelected = event;
  }
  setDefaultText(num:number, language:string){

    this.selecionarLanguage(language);
    console.log();
    this.conteudoDefault = this.listaConteudos[num];
  }
  setDefaultTexto(texto: any){
    console.log(texto.value);
    this.conteudoDefault = texto.value;
  }

  public putOnClipboard(event : any, cena:string){
    event.preventDefault();
    let clipboard = document.createElement('input');
    console.log(cena);
    clipboard.setAttribute('value', cena);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand('copy');
    document.body.removeChild(clipboard);
  }
  public copyToClipboard(event: any) {
    event.preventDefault();
    let clipboard = document.createElement('input');
    clipboard.setAttribute('value', this.result['TextNormalized']);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand('copy');
    document.body.removeChild(clipboard);

  }
  goBack(){
    this.result=false;
  }
  public getKeyword(event:any) {

    this.loading = true;
    event.preventDefault();
    //console.log(event.target.docCreatDate.value);
    //{{ dateObj | date:'mm:ss' }}
    this.loading = true;
    this.optio = {

      docCreatTime : this.documentCreationTime,
      dateGranularity : this.dateGranularitySelected,
      docOrSentence  : this.byDocOrSentece ? 'doc' : 'sentence',
      algo: this.algoritmoSelected,
      ngram : this.ngramSelected,
      language : this.languagueSelected,
      numberOfKeywords : this.numberOfKeyWords,
      nContextualWindow: this.contextWindow,
      documentType: this.documentTypeSelected,
      N: this.simbaValue
    };
    //console.log(this.optio);
    this.timeline.getTextKeyDateFromSingleDoc(this.conteudoDefault, this.optio).subscribe((res) =>
      {
        if (res) {
        console.log('nice');
        this.result = res;
        //pedido recebido aqui
        //console.log(res);
        this.requestMade = true;
        this.loading = false;
        let c = [];
        let a = {};
        let b = {};
        // tslint:disable-next-line: forin
        for (let i in Object.keys(this.result.Score)) {
          //console.log(this.result.Score[Object.keys(this.result.Score)[i]][0]);
          // handle Dataset
          if (this.byDocOrSentece) {
            a = '<p>Score: ' + this.result.Score[Object.keys(this.result.Score)[i]][0] + '</p>';
          }else {
            let valorDeA = '';
            // tslint:disable-next-line: forin
            for (let xd in this.result.Score[Object.keys(this.result.Score)[i]]) {
              valorDeA += '<span title="'+this.result.SentencesNormalized[xd.toString()]+'"><p>Date score sentence ' + xd + ': ' + this.result.Score[Object.keys(this.result.Score)[i]][xd][0] + '</p></span>';
            }
            a = valorDeA;
          }
          b = Object.keys(this.result.Score)[i];

          //console.log("a");
          //console.log(a);
          //console.log("b");
          //console.log(b);
          //console.log("end");


            c.push({x:b,y:a});
            //console.log();
            //console.log(Object.keys(this.result.Score)[i].split('-').join(''));

            /^\d+$/.test(Object.keys(this.result.Score)[i].split('-').join(''))?'':c.pop();
        }
        //console.log("a,b,join");
        //console.log(a);
        //console.log(b);
        //console.log(this.result.Score);
        //console.log(c);
        //console.log("end");
        this.dataset = c;

        return ' ';
        }
        else {
          console.log('oof');
          return ' ';
        }
      }
    );

  }
}
