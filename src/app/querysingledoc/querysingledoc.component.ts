import { GetarticleService } from "./../services/getarticle.service";
import { Component, OnInit, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TimelineService } from "../services/timeline.service";
import { take } from "rxjs/operators";
import { LangdetectService } from "../services/langdetect.service";

@Component({
  selector: "app-querysingledoc",
  templateUrl: "./querysingledoc.component.html",
  styleUrls: ["./querysingledoc.component.scss"],
})
export class QuerysingledocComponent implements OnInit {
  public url: string;
  public artigo: any;
  public algoritmosDate: Array<any>;
  public algoritmoSelected: string;
  public dateGranularityOptions: Array<string>;
  public dateGranularitySelected: string;
  public documentTypeOptions: Array<any>;
  public documentTypeSelected: string;
  public languageOptions: Array<string>;
  public languagueSelected: string;
  public dateBegin: number;
  public maxValTH: number;
  public dateEnd: number;
  public numberOfKeyWords: number;
  public contextWindow: number;
  public contextFullSentence: boolean;
  public simbaValue: number;
  public simbaValueMax: boolean;
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
  public scheduler: any;
  public resultado: any;
  public TH: number;
  public hiddenoptionTM: boolean;
  public right: string;
  @Input() inpu: any;

  constructor(
    private article: GetarticleService,
    private timeline: TimelineService,
    private _snackBar: MatSnackBar,
    private _langDetec: LangdetectService
  ) {
    //
    this.right = "right";
    this.algoritmosDate = [
      [
        "py_heideltime",
        "makes use of Heideltime temporal tagger to detect a range of diferente temporal expressions",
      ],
      [
        "py_rule_based",
        "a simple rule-based approach that only takes into account dates in the format of dddd (e.g., 2021)",
      ],
    ];
    this.algoritmoSelected = this.algoritmosDate[0][0];
    this.dateGranularityOptions = ["full", "year", "month", "day"];
    this.dateGranularitySelected = this.dateGranularityOptions[0];
    this.documentTypeOptions = [
      [
        "news",
        "news-style documents (document creation time should be provided whenever possible)",
      ],
      ["narrative", "narrative-style documents (e.g., Wikipedia articles)"],
      ["colloquial", "non-standard language (e.g., tweets or SMS)"],
      [
        "scientific",
        "documents with a local time frame (e.g., clinical trials)",
      ],
    ];
    this.documentTypeSelected = this.documentTypeOptions[0][0];
    this.languageOptions = [
      "auto-detect",
      "English",
      "Portuguese",
      "Spanish",
      "German",
      "Dutch",
      "Italian",
      "French",
    ];
    this.languagueSelected = this.languageOptions[0];
    this.dateBegin = 0;
    this.dateEnd = 2100;
    this.maxValTH = 1;
    this.numberOfKeyWords = 10;
    this.contextWindow = 1;
    this.contextFullSentence = true;
    this.simbaValueMax = true;
    this.simbaValue = 1;
    this.cheating = false;
    this.showOnlyRel = false;
    this.ngramSelected = 1;
    this.byDocOrSentece = true;
    this.hiddenoptionKW = false;
    this.hiddenoption = false;
    this.loading = false;
    this.requestMade = false;
    this.hiddenoptionTM = false;
    this.TH = 0.05;
  }

  ngOnInit(): void {
    if (this.inpu) {
    } else {
      this.url =
        "https://www.labmanager.com/lab-health-and-safety/covid-19-a-history-of-coronavirus-22021";
      //https://sicnoticias.pt/pais/2016-07-07-Cronologia-do-processo-Casa-Pia
      //https://fox13now.com/2013/12/30/new-year-new-laws-obamacare-pot-guns-and-drones/
    }
  }
  goBack() {
    //this.algoritmoSelected = this.algoritmosDate[0];
    this.dateGranularitySelected = this.dateGranularityOptions[0];
    //this.documentTypeSelected = this.documentTypeOptions[0];
    this.languagueSelected = this.languageOptions[0];
    //this.dateBegin = 0;
    //this.dateEnd = 2100;
    //this.maxValTH = 1;
    //this.numberOfKeyWords = 10;
    //this.contextWindow = 1;
    //this.contextFullSentence = true;
    //this.simbaValueMax = true;
    //this.simbaValue = 1;
    this.cheating = false;
    this.showOnlyRel = false;
    //this.ngramSelected = 1;
    this.byDocOrSentece = true;
    this.hiddenoptionKW = false;
    this.hiddenoption = false;
    this.loading = false;
    this.requestMade = false;
    this.hiddenoptionTM = false;
    //this.TH=0.05;
  }
  changeTH(event: any) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    console.log(event);
    if (event.source) {
      this.TH = event.value;
      return;
    } else {
      if (event.target.value) {
        if (event.target.value > this.maxValTH) {
          this.TH = 1;
          return;
        }
        event.preventDefault();
        this.TH = event.target.value;
      } else {
        this.TH = 0;
        return;
      }
    }
    this.update();
  }
  doThings(event: any) {
    event.preventDefault();
    console.log(event.target.value);

    this.article
      .getArticles(event.target.value)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        this.artigo = res;
        return "";
      });
  }
  fullSentence(event: any) {
    console.log("full_sentence?");
    console.log(event);
    this.contextFullSentence = event.checked;
  }
  selecionarDataFim(event: any) {
    this.dateEnd = event.target.value;
    console.log(event.target.value);
  }
  selecionarDataInicio(event: any) {
    this.dateBegin = event.target.value;
    console.log(event.target.value);
  }
  update() {
    let j, k;
    if (this.contextFullSentence) {
      j = "full_sentence";
    } else {
      j = this.contextWindow;
    }
    if (this.simbaValueMax) {
      k = "max";
    } else {
      k = this.simbaValue;
    }
    if (this.requestMade) {
      this.opcoes = {
        docCreatTime: this.documentCreationTime,
        dateGranularity: this.dateGranularitySelected,
        docOrSentence: this.byDocOrSentece ? "doc" : "sentence",
        algo: this.algoritmoSelected,
        ngram: this.ngramSelected,
        language: this.languagueSelected,
        numberOfKeywords: this.numberOfKeyWords,
        nContextualWindow: j,
        documentType: this.documentTypeSelected,
        n: k,
        result: this.resultado,
        dateBegin: this.dateBegin,
        dateEnd: this.dateEnd,
        tH: this.TH,
      };
    } else {
      let a, b;
      if (this.contextFullSentence) {
        a = "full_sentence";
      } else {
        a = this.contextWindow;
      }
      if (this.simbaValueMax) {
        b = "max";
      } else {
        b = this.simbaValue;
      }
      this.opcoes = {
        docCreatTime: this.documentCreationTime,
        dateGranularity: this.dateGranularitySelected,
        docOrSentence: this.byDocOrSentece ? "doc" : "sentence",
        algo: this.algoritmoSelected,
        ngram: this.ngramSelected,
        language: this.languagueSelected,
        numberOfKeywords: this.numberOfKeyWords,
        nContextualWindow: a,
        documentType: this.documentTypeSelected,
        n: b,
        dateBegin: this.dateBegin,
        dateEnd: this.dateEnd,
        tH: this.TH,
      };
    }
  }
  setURL(event: any) {
    event.preventDefault();
    console.log(event.target.value);
    this.url = event.target.value;
  }
  maxSimba(event: any) {
    console.log("simba");
    console.log(event.checked);
    this.simbaValueMax = event.checked;
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
    console.log("entrou mudar granularidade");
    this.dateGranularitySelected = event;
    console.log(event);
  }
  selecionarContextualWindow(event: any) {
    this.contextWindow = event.target.value;
  }
  selecionarNKeywords(event: any) {
    this.numberOfKeyWords = event.target.value;
    console.log(event.target.value);
  }
  selecionarngram(event: any) {
    this.ngramSelected = event.target.value;
    console.log(event.target.value);
  }
  toggleDocOrSentence() {
    this.byDocOrSentece = !this.byDocOrSentece;
  }
  toggleOptionKeywords() {
    this.hiddenoptionKW = !this.hiddenoptionKW;
  }
  selecionarAlgoritmo(event: any) {
    this.algoritmoSelected = event;
    // this.documentCreationTime="";
  }
  toggleTimeMattersOptions() {
    this.hiddenoptionTM = !this.hiddenoptionTM;
  }
  selecionarDataReferencia(event: any) {
    this.documentCreationTime = event.target.value;
    console.log(event.target.value);
  }
  toggleOption() {
    this.hiddenoption = !this.hiddenoption;
  }
  public copyToClipboard(event: any) {
    const clipboard = document.createElement("input");
    clipboard.setAttribute("value", event);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand("copy");
    document.body.removeChild(clipboard);
    this._snackBar.open("Document copied to clipboard", "", {
      duration: 2000,
    });
  }

  showArticle(event: any) {
    event.preventDefault();
    this.loading = true;
    if (this.inpu) {
      this.url = this.inpu;
    }
    this.update();
    this.article
      .getArticles(this.url)
      .pipe(take(1))
      .subscribe(
        (res) => {
          if (res) {
            console.log(res);
            this.artigo = res;
            console.log("texto artigo");
            console.log(this.artigo.content);
            // this.documentCreationTime="";
            // tslint:disable-next-line: max-line-length
            if (res.date_creation) {
              // tslint:disable-next-line: max-line-length
              let month: any = new Date(res.date_creation).getMonth();
              if (month * 1 < 10) {
                month = "0" + month;
              }
              let day: any = new Date(res.date_creation).getDate();
              if (day * 1 < 10) {
                day = "0" + day;
              }
              this.documentCreationTime =
                new Date(res.date_creation).getFullYear() +
                "-" +
                month +
                "-" +
                day;
              console.log(this.documentCreationTime);
            } else {
              // tslint:disable-next-line: max-line-length
              let month: any = new Date().getMonth();
              if (month * 1 < 10) {
                month = "0" + month;
              }
              let day: any = new Date().getDate();
              if (day * 1 < 10) {
                day = "0" + day;
              }
              this.documentCreationTime =
                new Date().getFullYear() + "-" + month + "-" + day;
              console.log(this.documentCreationTime);
            }
            switch (res.lang) {
              case "en":
                this.languagueSelected = "English";
                this.update();
                break;
              case "fr":
                this.languagueSelected = "French";
                this.update();
                break;
              case "pt":
                this.languagueSelected = "Portuguese";
                this.update();
                break;
              case "ge":
                this.languagueSelected = "German";
                this.update();
                break;
              case "it":
                this.languagueSelected = "Italian";
                this.update();
                break;
              case "nl":
                this.languagueSelected = "Dutch";
                this.update();
                break;
              case "es":
                this.languagueSelected = "Spanish";
                this.update();
                break;
              default:
                console.log(res);
                this._snackBar.open(
                  "Language will be auto-detected",
                  res.lang,
                  {
                    duration: 2000,
                  }
                );
                //auto-dete
                this._langDetec
                  .getLanguageFromContent(this.artigo.content)
                  .pipe(take(1))
                  .subscribe((response) => {
                    console.log("LINGUA DO TEXTO");
                    console.log(response);
                    switch (response.lang) {
                      case "en":
                        this.languagueSelected = "English";
                        this.update();
                        break;
                      case "fr":
                        this.languagueSelected = "French";
                        this.update();
                        break;
                      case "pt":
                        this.languagueSelected = "Portuguese";
                        this.update();
                        break;
                      case "ge":
                        this.languagueSelected = "German";
                        this.update();
                        break;
                      case "it":
                        this.languagueSelected = "Italian";
                        this.update();
                        break;
                      case "nl":
                        this.languagueSelected = "Dutch";
                        this.update();
                        break;
                      case "es":
                        this.languagueSelected = "Spanish";
                        this.update();
                        break;
                      default:
                    }
                  });
                break;
            }

            console.log(this.opcoes);
            console.log(this.artigo);
            //let cenak= this.artigo.content.replace("\\u21b5",'');
          }

          return;
        },
        (err) => {},
        () => {
          this.scheduler = setTimeout(() => {
            console.log("reached this place");
            console.log(this.artigo.content.toString());
            console.log(this.opcoes);

            this.timeline
              .getTextKeyDateFromSingleDoc(this.artigo.content, this.opcoes)
              .pipe(take(1))
              .subscribe((res) => {
                if (res) {
                  console.log(res);
                  this.resultado = res;

                  // pedido recebido aqui
                  if (res.message) {
                    this._snackBar.open(
                      "Sorry, but we were not able to extract any results due to an error on time-matters. Article length:",
                      this.artigo.content.length,
                      {
                        duration: 4000,
                      }
                    );
                    this.requestMade = false;
                    this.loading = false;
                    return " ";
                  }
                  if (res.length == 0) {
                    this._snackBar.open(
                      "This URL has no data we can use",
                      ":(",
                      {
                        duration: 2000,
                      }
                    );
                    this.requestMade = false;
                    this.loading = false;
                    return " ";
                  }
                  this.requestMade = true;
                  this.update();
                  this.loading = false;

                  return " ";
                } else {
                  console.log("oof");
                  return " ";
                }
              });
          }, 1000);
        }
      );
  }
}
