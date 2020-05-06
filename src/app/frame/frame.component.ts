import { Component, OnInit, Input, OnChanges,Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, OnChanges {
  @Input() argumentos: any;
  @Input() keywordsMatter: any;
  @Input() docOrSentence: any;
  textoNormalizado: string;
  keywordScores: any;
  dateScores: any;
  texto: string;
  textoArray: Array<string>;
  constructor() {

  }

  ngOnInit() {
    console.log('iniciado');

  }
  ngOnChanges() {
    if(true){
      if (this.argumentos) {
        this.textoNormalizado = this.argumentos.TextNormalized;
        console.log(this.argumentos.TextNormalized);
        this.keywordScores = this.argumentos.RelevantKWs;
        this.dateScores = this.argumentos.Score;

        this.texto = this.textoNormalizado.replace(/<d>(.*?)<\/d>/gi, (x) => {
          let valor = x.replace(/<d>/, '');
          valor = valor.substring(0, valor.length - 4);
          // console.log('valor:');
          // console.log(valor);
          // console.log('score do valor')
          // console.log(this.dateScores[valor]);
          let titulo = this.dateScores[valor.toLowerCase()];
          let cor = '';
          if (titulo){
            // console.log('titulo');
            // console.log(titulo[0]);
            titulo = titulo[0];
          }else{
            titulo='ta a falhar';
          }

          if(titulo<0.3) {
            cor = 'black';
          } else{
            cor = 'red';
            if (titulo < 0.4) {
              cor = 'green';
            }else if(titulo > 0.4) {
              cor = 'blue';
              if (titulo>0.6) {
                cor = 'yellow';
              }
              if(titulo > 0.8) {
                cor = 'purple';
              }

            }
          } let textoAEscrever = '';
          for (let i=0 ; i < this.argumentos.TempExpressions.length;i++){
            //console.log('expressoes temporais');
            let ind = i + '';
            //console.log(this.argumentos.TempExpressions[ind]);
            if (this.argumentos.TempExpressions[ind][0].toString() == x.substring(3, x.length - 4)){

              textoAEscrever = this.argumentos.TempExpressions[ind][1].toString();
            }
        };

          // console.log(titulo);
          // console.log(cor);
          x = '<span title="' + titulo+ '">' + '<b class="'+cor+'">' + textoAEscrever + '</b>' + '</span>';

          return x;
        });
        if(!this.keywordsMatter){

          this.texto = this.texto.replace(/<kw>(.*?)<\/kw>/gi, (x) => {

            let valor = x.replace(/<kw>/, '');
            valor = valor.substring(0, valor.length - 5);
            //console.log('valor:');
            //console.log(valor);
            //console.log('score do valor')
            //console.log(this.keywordScores[valor]);
            let titulo = this.keywordScores[valor];

            if (titulo){
              //console.log(titulo);
              titulo = Math.floor(titulo * 1000);
              titulo /= 1000;
              //console.log(titulo[0]);
            }else{
              titulo = 'ta a falhar';
            }

            x = '<span title="' + titulo + '">' + '<b>' + x.substring(4, x.length - 5) + '</b>' + '</span>';
            return x;
          });
        }

        console.log(this.textoArray);
        /*console.log('dados grafico');
        console.log(this.grafico);*/
        //console.log('keywords Scores');
        //console.log(this.keywordScores);
        //console.log('date scores');
        //console.log(this.dateScores);
      }
    } else {/*

      this.textoNormalizado = this.argumentos.TextNormalized;
      console.log(this.argumentos.TextNormalized);
      this.keywordScores = this.argumentos.RelevantKWs;
      this.dateScores = this.argumentos.Score;
      console.log(this.dateScores);

      this.texto = this.textoNormalizado.replace(/<d>(.*?)<\/d>/gi, (x) => {
        let valor = x.replace(/<d>/, '');
        valor = valor.substring(0, valor.length - 4);
        // console.log('valor:');
        // console.log(valor);
        // console.log('score do valor')
        // console.log(this.dateScores[valor]);
        let titulo = this.dateScores[valor.toLowerCase()];
        let cor = '';
        if (titulo) {
          console.log('titulo');
          console.log(titulo["0"]);
          titulo = titulo["0"];
        } else {
          titulo = 'ta a falhar';
        }

        if (titulo < 0.3) {
          cor = 'black';
        } else{
          cor = 'red';
          if (titulo < 0.4) {
            cor = 'green';
          }else if (titulo > 0.4) {
            cor = 'blue';
            if (titulo > 0.6) {
              cor = 'yellow';
            }
            if (titulo > 0.8) {
              cor = 'purple';
            }

          }
        } let textoAEscrever = '';
        for (let i=0 ; i < this.argumentos.TempExpressions.length;i++){
          //console.log('expressoes temporais');
          let ind = i + '';
          //console.log(this.argumentos.TempExpressions[ind]);
          if (this.argumentos.TempExpressions[ind][0].toString() == x.substring(3, x.length - 4)){

            textoAEscrever = this.argumentos.TempExpressions[ind][1].toString();
          }
      };

        // console.log(titulo);
        // console.log(cor);
        x = '<span title="' + titulo+ '">' + '<b class="'+cor+'">' + textoAEscrever + '</b>' + '</span>';

        return x;
      });
        */
    }

  }

}
