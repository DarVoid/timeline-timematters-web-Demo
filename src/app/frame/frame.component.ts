import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Pipe,
  PipeTransform,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-frame",
  templateUrl: "./frame.component.html",
  styleUrls: ["./frame.component.scss"],
})
export class FrameComponent implements OnInit, OnChanges {
  @Input() argumentos: any;
  @Input() keywordsMatter: any;
  @Input() showOnlyRelevants: boolean;
  @Input() docOrSentence: any;
  textoNormalizado: string;
  keywordScores: any;
  dateScores: any;
  texto: string;
  textoArray: Array<string>;
  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    if (this.docOrSentence == "doc") {
      if (this.argumentos) {
        this.textoNormalizado = this.argumentos.TextNormalized;
       // console.log("Frame DEBUG");
       // console.log(this.argumentos.TextNormalized);
        this.keywordScores = this.argumentos.RelevantKWs;
        this.dateScores = this.argumentos.Score;
        var a = [];
        var indice = 0;
        this.texto = this.textoNormalizado.replace(/<d>(.*?)<\/d>/gi, (x) => {
         // console.log("FRASE");
         // console.log(x);
         // console.log(a);

          let valor = x.replace(/<d>/, "");
          valor = valor.substring(0, valor.length - 4);

          let titulo = this.dateScores[valor.toLowerCase()];
          //console.log(titulo);
          //console.log(this.dateScores[valor]);

          let cor = "";
          if (titulo) {
            // console.log('titulo');
            // console.log(titulo[0]);
            titulo = titulo[0];
          } else {
            titulo = "ta a falhar";
          }

          if (titulo < 0.35) {
            cor = "black";
          } else {
            cor = "red";
            if (titulo < 0.5) {
              cor = "green";
            } else if (titulo >= 0.5) {
              cor = "blue";
              if (titulo > 0.7) {
                cor = "yellow";
              }
              if (titulo > 0.9) {
                cor = "purple";
              }
            }
          }
          if (a.length != 0) {
            let exists = false;
            var maxElement = 0;
            a.map((allElementsInA) => {
              if (allElementsInA.valor == valor) {
                maxElement = allElementsInA.index;
                exists = true;
              }
            });
            if (exists) {
              a.push({
                valor,
                index: maxElement + 1,
                indice,
                cor,
                titulo,
              });
            } else {
              a.push({
                valor,
                index: 0,
                indice,
                cor,
                titulo,
              });
            }
          } else {
            a.push({
              valor,
              index: 0,
              indice,
              cor,
              titulo,
            });
          }
          // console.log('valor:');
          // console.log(valor);
          // console.log("DOC score do valor");
          // console.log(this.dateScores[valor]);

          let cena = a.map((elementInA) => {
            if (elementInA.indice == indice && elementInA.valor == valor) {
              return elementInA.index;
            }
          });

          indice++;
          if (this.showOnlyRelevants && (cor === "black" || cor === "green")) {
            x = x; //textoAEscrever;
          } else {
            x = //
              '<span title="' +
              titulo +
              '">' +
              '<b class="' +
              cor +
              '">' +
              x +
              //textoAEscrever +
              "</b>" +
              "</span>";
          }
          // console.log(titulo);
          // console.log(cor);

          return x;
        });
        var indice = 0;
        this.texto = this.textoNormalizado.replace(/<d>(.*?)<\/d>/gi, (x) => {
          let objecto = a.filter((each) => {
            return each.indice == indice;
          });
         // console.log("COOKIES");
         // console.log(objecto);
         // console.log(this.argumentos.TempExpressions);
          let filteredstuff = this.argumentos.TempExpressions.filter((cada) => {
            // console.log(cada[0] )
            // console.log(objecto[0].valor )
            return cada[0] == objecto[0].valor;
          });
          let repl_sentence = filteredstuff[objecto[0].index][1];

         // console.log(repl_sentence[1]);
         // console.log(x);
          indice++;
          if (this.showOnlyRelevants && (objecto[0].cor === "black"||objecto[0].cor === "green")) {
            repl_sentence = repl_sentence; //textoAEscrever;
          } else {
            repl_sentence = //
              '<span title="' +
              objecto[0].titulo +
              '">' +
              '<b class="' +
              objecto[0].cor +
              '">' +
              repl_sentence +
              //textoAEscrever +
              "</b>" +
              "</span>";
          }
          return repl_sentence;
        });
        //let textoAEscrever = "";
        //  for (let i = 0; i < this.argumentos.TempExpressions.length; i++) {
        //    console.log('expressoes temporais');
        //    console.log(indice)
        //    console.log(i)
        //    let ind = i + "";
        //    console.log(this.argumentos.TempExpressions[ind])
        //    if (
        //      this.argumentos.TempExpressions[ind][0].toString() ===
        //      x.substring(3, x.length - 4)
        //    ) {
        //      textoAEscrever = this.argumentos.TempExpressions[
        //        ind
        //      ][1].toString();
        //    }
        //  }
        //console.log(this.texto);
        if (!this.keywordsMatter) {
          this.texto = this.texto.replace(/<kw>(.*?)<\/kw>/gi, (x) => {
            let valor = x.replace(/<kw>/, "");
            valor = valor.substring(0, valor.length - 5);
            // console.log('valor:');
            // console.log(valor);
            // console.log('score do valor')
            // console.log(this.keywordScores[valor]);
            let titulo = this.keywordScores[valor];

            if (titulo) {
              // console.log(titulo);
              titulo = Math.floor(titulo * 1000);
              titulo /= 1000;
              // console.log(titulo[0]);
            } else {
              titulo = "ta a falhar";
            }

            x =
              '<span title="' +
              titulo +
              '">' +
              "<b>" +
              x.substring(4, x.length - 5) +
              "</b>" +
              "</span>";
            return x;
          });
        }

        // console.log(this.textoArray);
        /*console.log('dados grafico');
        console.log(this.grafico);*/
        // console.log('keywords Scores');
        // console.log(this.keywordScores);
        // console.log('date scores');
        // console.log(this.dateScores);
      }
    } else {
     // console.log("por frase!");
      if (this.argumentos) {
        // BEGIN SENTENCE CODE
        // console.log(this.argumentos.SentencesTokens);
        this.keywordScores = this.argumentos.RelevantKWs;
        this.dateScores = this.argumentos.Score;
        // console.log(this.dateScores);
        this.texto = "";
        let frases = this.argumentos.SentencesNormalized;
        /*// tslint:disable-next-line: forin
      for (let i in this.argumentos.SentencesTokens) {
        frases.push(this.argumentos.SentencesTokens[i.toString()].join(' '));
        // console.log('frase ' + i);
        // console.log(frases[i]);
      }*/
        let frases2 = [];
        // tslint:disable-next-line: whitespace
        // tslint:disable-next-line: forin
        for (let fraseIndex = 0; fraseIndex < frases.length; fraseIndex++) {
          frases2[fraseIndex] = frases[fraseIndex].replace(
            /<d>(.*?)<\/d>/gi,
            (x) => {
              let valor = x.replace(/<d>/, "");
              valor = valor.substring(0, valor.length - 4);
              let titulo = this.dateScores[valor.toLowerCase()][fraseIndex][0];
             // console.log(titulo);
              let cor = "";
              if (titulo) {
               // console.log("titulo");
                // console.log(titulo[Object.keys(titulo)[0].toString()]);
                //titulo = titulo[Object.keys(titulo)[0].toString()][0];
              } else {
                titulo = this.dateScores[valor.toLowerCase()][fraseIndex]["0"];
                //titulo = titulo[Object.keys(titulo)[0].toString()];
               // console.log("this.dateScores");
               // console.log(
               //   this.dateScores[valor.toLowerCase()][fraseIndex]["0"]
               // );
              }

              if (titulo * 1 < 0.35 && titulo * 1 >= 0) {
                cor = "black";
              } else {
                cor = "red";
                if (titulo < 0.5) {
                  cor = "green";
                } else if (titulo >= 0.5) {
                  cor = "blue";
                  if (titulo > 0.7) {
                    cor = "yellow";
                  }
                  if (titulo > 0.9) {
                    cor = "purple";
                  }
                }
              }
              // console.log(cor);
              // cor definida
              // console.log(x.substring(3, x.length - 4));
              let dispon = this.dateScores[
                x.substring(3, x.length - 4).toLowerCase()
              ];
              // console.log(dispon);
              // console.log(dispon[fraseIndex.toString()][0]);
              let valorSpan = dispon[fraseIndex.toString()][0];
              let textoAEscrever = "";
              for (let lk in this.argumentos.TempExpressions) {
                if (
                  this.argumentos.TempExpressions[lk][0] ===
                  x.substring(3, x.length - 4)
                ) {
                  textoAEscrever = this.argumentos.TempExpressions[lk][1];
                 // console.log(textoAEscrever);
                }
              }
            // console.log("this.showOnlyRelevants");
            // console.log(this.showOnlyRelevants);
            // console.log("cor");
            // console.log(cor);

              if (this.showOnlyRelevants) {
                if (cor === "black" || cor === "green") {
                  x = textoAEscrever;
                } else {
                  x =
                    '<span title="' +
                    valorSpan +
                    '">' +
                    '<b class="' +
                    cor +
                    '">' +
                    textoAEscrever +
                    "</b>" +
                    "</span>";
                }
              } else {
                x =
                  '<span title="' +
                  valorSpan +
                  '">' +
                  '<b class="' +
                  cor +
                  '">' +
                  textoAEscrever +
                  "</b>" +
                  "</span>";
              }
              return x;
            }
          ); // end callback replace <d>

          this.texto = frases2.join("");
        } // end iteration phrases
        if (!this.keywordsMatter) {
          this.texto = this.texto.replace(/<kw>(.*?)<\/kw>/gi, (x) => {
            let valor = x.replace(/<kw>/, "");
            valor = valor.substring(0, valor.length - 5);
            // console.log('valor:');
            // console.log(valor);
            // console.log('score do valor')
            // console.log(this.keywordScores[valor]);
            let titulo = this.keywordScores[valor];

            if (titulo) {
              // console.log(titulo);
              titulo = Math.floor(titulo * 1000);
              titulo /= 1000;
              // console.log(titulo[0]);
            } else {
              titulo = "ta a falhar";
            }

            x =
              '<span title="' +
              titulo +
              '">' +
              "<b>" +
              x.substring(4, x.length - 5) +
              "</b>" +
              "</span>";
            return x;
          });
        }
      } // END SENTENCE CODE
    }
  } // end ngChanges
} // component end
