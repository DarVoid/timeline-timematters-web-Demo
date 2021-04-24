import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { YakeService } from "../services/yake.service";
import { ArquivoService } from "../services/arquivo.service";
import { take } from "rxjs/operators";
import { forkJoin } from "rxjs";
// import TL from '../../assets/TL1.js';
declare var TL: any;
declare var $: any;
interface Evento{
  text?: string,
  start_date?: Date,
  media: any
}
@Component({
  selector: "app-timeline-scroll",
  templateUrl: "./timeline-scroll.component.html",
  styleUrls: ["./timeline-scroll.component.scss"],
})
export class TimelineScrollComponent implements OnInit {
  @Input() argumentosTodos: any;
  @Input() compGeral: any;
  @Input() docSen: any;
  @Input() argumentosRelevantes: any;
  public relevant: boolean;
  public argumentos: any;
  public texto: string;
  public events: Array<any>;
  public timeline: any;
  public isSet: boolean;
  public jsonText: string;
  public isnotset: boolean;
  public loading: boolean;
  public nodata: boolean;
  public relevant_string: string;
  public scheduler: any;
  constructor(
    private _snackBar: MatSnackBar,
    private yake: YakeService,
    private arquivo: ArquivoService
  ) {
    // console.log(this.TLObj);
    this.isSet = false;
    this.isnotset = true;
    this.loading = false;
    this.relevant = false;
    this.nodata = false;
    this.relevant_string = "Show only relevant dates";
    this.events = [];
  }

  ngOnInit() {
    // setTimeout(()=>{this.update();}, 5);
  }
  ngAfterViewChecked() {
    if (document.getElementById("my-timeline") && this.isnotset) {
      this.isnotset = false;
      if (this.argumentosRelevantes.length > 0) {
      } else {
        this.relevant = false;
      }
      this.setRelevance();
      this.isSet = true;
    }
  }
  setRelevance() {
    this.toggleRelevance();
    if (this.relevant) {
      this.argumentos = this.argumentosRelevantes;
    } else {
      this.argumentos = this.argumentosTodos;
    }
    this.loading = true;
    console.log("socoroor")
    var novos=[]
     this.argumentos.map((cada)=>{
      if(novos.length!=0){
        novos.push(cada)
      }else{
        let exists=false
        novos.map((all)=>{
          if(all.dateparsed2==cada.dateparsed2){
            exists = true
          }else{

          }
        })
        if(exists){

        }else{
          novos.push(cada)
        }
      }
    })
    this.argumentos = novos
    console.log(this.argumentos)
    this.update();
  }
  public copyToClipboard(event: any) {
    event.preventDefault();
    this._snackBar.open(
      "JSON copied to Clipboard",
      "Length: " + JSON.stringify(this.jsonText).length + " characters",
      {
        duration: 2000,
      }
    );
    const clipboard = document.createElement("input");

    clipboard.setAttribute("value", JSON.stringify(this.jsonText));
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand("copy");
    document.body.removeChild(clipboard);
  }
  toggleRelevance() {
    this.relevant = !this.relevant;
  }

  update() {
    let j: any;
    if (this.argumentos.length == 0) {
      this.loading = false;
      this.nodata = true;
      this._snackBar.open("No data", this.argumentos.length, {
        duration: 2000,
      });
    } else {
      this.nodata = false;
    }
    let novos = []

    // tslint:disable-next-line: forin
    for (let h = 0; h < this.argumentos.length; h++) {
      console.log("conteudo");
      console.log(
        this.argumentos[h].y
          .split("</p>")[1]
          .split("(...)")
          .join("")
          .split("<kw>")
          .join("")
          .split("</kw>")
          .join("")
          .split("<d>")
          .join("")
          .split("</d>")
          .join("")
      );
      console.log("HELP " + h)
      console.log(this.argumentos[h])
      console.log(this.compGeral)
        // let ceninha=   this.compGeral.SentencesNormalized.filter((cada)=>{
        //     return cada.includes("<d>"+this.argumentos[h].x+"</d>")
        //   })[0]
        // console.log(ceninha)
      this.yake
        .getKeywords(
          this.argumentos[h].y
            .split("</p>")[1]
            .split("(...)")
            .join("")
            .split("<kw>")
            .join("")
            .split("</kw>")
            .join("")
            .split("<d>")
            .join("")
            .split("</d>")
            .join("")
            .split("</strong>")
            .join("")
            .split("<strong>")
            .join("")
        )
        .pipe(take(1))
        .subscribe((res) => {
          if (res) {
            console.log(res);
            let captio = res.keywords[0].ngram;
            this.arquivo
              .getImgURL(captio)
              .pipe(take(1))
              .subscribe((res2: any) => {
                if (res2) {
                  console.log(res2);
                  let url2 = res2.responseItems[0].imgLinkToArchive;
                  console.log("Storyline rule-based");
                  if (this.argumentos[h].x.length == 4) {
                    this.events.push({
                      start_date: { year: this.argumentos[h].x },
                      media: {
                        thumbnail: url2,
                        url: url2,
                        link: url2,
                        credit:
                          '<p class="textoArquivo" >powered by Arquivo.pt</p>',
                      },
                      text: {
                        headline:
                          '<p class="changeCaptio">' +
                          captio.substring(0, 1).toUpperCase() +
                          captio.substring(1, captio.length) +
                          "</p>",
                        text: this.argumentos[h].y,
                      },
                    }); //
                  } else if (this.argumentos[h].x.split("-").length === 2) {
                    // tslint:disable-next-line: max-line-length
                    this.events.push({
                      start_date: {
                        year: this.argumentos[h].x.split("-")[0],
                        month: this.argumentos[h].x.split("-")[1],
                      },
                      media: {
                        thumbnail: url2,
                        url: url2,
                        link: url2,
                        credit:
                          '<p class="textoArquivo">powered by Arquivo.pt</p>',
                      },
                      text: {
                        headline:
                          "<p>" +
                          captio.substring(0, 1).toUpperCase() +
                          captio.substring(1, captio.length) +
                          "</p>",
                        text: this.argumentos[h].y,
                      },
                    });
                  } else {
                    //,media:{url:url2, caption:captio}
                    if (this.argumentos[h].x.length > 10) {
                      console.log("Horas");
                      console.log(this.argumentos[h].x);
                      if (
                        this.argumentos[h].x.charAt(10) == "t" ||
                        (this.argumentos[h].x.charAt(10) == "T" &&
                          this.argumentos[h].x.charAt(11) * 1 >= 0 &&
                          this.argumentos[h].x.charAt(11) * 1 <= 9)
                      ) {
                        let horas = this.argumentos[h].x
                          .substring(10)
                          .split(":")[0];
                        let min = this.argumentos[h].x
                          .substring(10)
                          .split(":")[1];
                        console.log("horas");
                        console.log(horas);
                        console.log("min");
                        console.log(min);
                        if (min * 1 > 0 && min * 1 < 60) {
                          // tslint:disable-next-line: max-line-length
                          this.events.push({
                            start_date: {
                              year: this.argumentos[h].x
                                .substring(0, 10)
                                .split("-")[0],
                              month: this.argumentos[h].x
                                .substring(0, 10)
                                .split("-")[1],
                              day: this.argumentos[h].x
                                .substring(0, 10)
                                .split("-")[2],
                            },
                            media: {
                              thumbnail: url2,
                              url: url2,
                              link: url2,
                              credit:
                                '<p class="textoArquivo">powered by Arquivo.pt</p>',
                            },
                            text: {
                              headline:
                                "<p>" +
                                '<p class="hora"><strong>(' +
                                horas.substring(1) +
                                "h" +
                                min +
                                "min) </strong></p>" +
                                "<p>" +
                                captio.substring(0, 1).toUpperCase() +
                                captio.substring(1, captio.length) +
                                "</p>",
                              text: this.argumentos[h].y,
                            },
                          });
                        } else {
                          this.events.push({
                            start_date: {
                              year: this.argumentos[h].x
                                .substring(0, 10)
                                .split("-")[0],
                              month: this.argumentos[h].x
                                .substring(0, 10)
                                .split("-")[1],
                              day: this.argumentos[h].x
                                .substring(0, 10)
                                .split("-")[2],
                            },
                            media: {
                              thumbnail: url2,
                              url: url2,
                              link: url2,
                              credit:
                                '<p class="textoArquivo">powered by Arquivo.pt</p>',
                            },
                            text: {
                              headline:
                                "<p>" +
                                captio.substring(0, 1).toUpperCase() +
                                captio.substring(1, captio.length) +
                                "</p>",
                              text: this.argumentos[h].y,
                            },
                          });
                        }
                      } else {
                        // tslint:disable-next-line: max-line-length
                        this.events.push({
                          start_date: {
                            year: this.argumentos[h].x
                              .substring(0, 10)
                              .split("-")[0],
                            month: this.argumentos[h].x
                              .substring(0, 10)
                              .split("-")[1],
                            day: this.argumentos[h].x
                              .substring(0, 10)
                              .split("-")[2],
                          },
                          media: {
                            thumbnail: url2,
                            url: url2,
                            link: url2,
                            credit:
                              '<p class="textoArquivo">powered by Arquivo.pt</p>',
                          },
                          text: {
                            headline:
                              "<p>" +
                              captio.substring(0, 1).toUpperCase() +
                              captio.substring(1, captio.length) +
                              "</p>",
                            text: this.argumentos[h].y,
                          },
                        });
                      }
                    } else {
                      // tslint:disable-next-line: max-line-length
                      this.events.push({
                        start_date: {
                          year: this.argumentos[h].x
                            .substring(0, 10)
                            .split("-")[0],
                          month: this.argumentos[h].x
                            .substring(0, 10)
                            .split("-")[1],
                          day: this.argumentos[h].x
                            .substring(0, 10)
                            .split("-")[2],
                        },
                        media: {
                          thumbnail: url2,
                          url: url2,
                          link: url2,
                          credit:
                            '<p class="textoArquivo">powered by Arquivo.pt</p>',
                        },
                        text: {
                          headline:
                            "<p>" +
                            captio.substring(0, 1).toUpperCase() +
                            captio.substring(1, captio.length) +
                            "</p>",
                          text: this.argumentos[h].y,
                        },
                      });
                    }
                  }

                  if (h == this.argumentos.length - 1) {
                    this.scheduler = setTimeout(() => {

                      //let novos =[]
                      //this.events.map((elemento) => {
                      //  console.log(elemento);
                      //  let exists=false
                      //  if(novos.length!=0){
                      //    novos.map((cadaNovo: Evento)=>{
//
                      //      if(cadaNovo.start_date == elemento.start_date){
                      //        exists=true
                      //      }
                      //    })
                      //    if(!exists)
                      //    novos.push(elemento)
                      //  }else{
                      //    novos.push(elemento)
                      //  }
                      //  return elemento
                      //});
                      this.loading = false;
                      j = { events: this.events };
                      this.jsonText = j;
                      console.log(j);
                      const additionalOptions = {
                        start_at_end: false,
                        timenav_height: 10,
                        default_bg_color: { r: 255, g: 255, b: 255 },
                        trackResize: "false",
                      };

                      // tslint:disable-next-line: no-unused-expression
                      new TL.Timeline("my-timeline", j, additionalOptions);
                      return;
                    }, 2500); //wait ten seconds before continuing
                  }
                }
              });
          }
        });
    }
  }
}
