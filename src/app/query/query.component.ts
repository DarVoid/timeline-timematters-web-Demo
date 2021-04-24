import {
  Component,
  OnInit,
  Input,
  OnChanges,
  enableProdMode,
  EventEmitter,
  Output,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-query",
  templateUrl: "./query.component.html",
  styleUrls: ["./query.component.scss"],
})
export class QueryComponent implements OnChanges {
  @Input() options: any;
  @Input() article: any;
  @Output() goBackque: EventEmitter<any> = new EventEmitter();
  public showOnlyRel: boolean;
  public withKeywords: boolean;
  public numberOfKeyWords: number;
  public dataset: Array<any>;
  public datasetFixed: Array<any>;
  public datasetFixed2: Array<any>;
  public datasetRelOnly: Array<any>;
  public withKeywordsSentence: string;
  public differentValues: Array<any>;
  public differentRelValues: Array<any>;
  public docOrSentence: boolean;
  public page: number;
  public exe_time_total: string;
  public exe_time_YAKE: string;
  public exe_time_algo: string;
  public exe_time_GTE: string;
  public numero_total: number;
  public numero_total2: number;

  // tslint:disable-next-line: variable-name
  constructor(private _snackBar: MatSnackBar) {
    this.withKeywords = true;
    this.withKeywordsSentence = "Keywords Off";
    this.showOnlyRel = true;
    this.differentValues = [];
    this.page = 0;
    this.docOrSentence = true;
  }

  ngOnChanges() {
    this.update();
  }
  setpage(event) {
    this.page = event;
  }
  toggleKeywords() {
    this.withKeywords = !this.withKeywords;
    if (this.withKeywords) {
      this.withKeywordsSentence = "Keywords Off";
    } else {
      this.withKeywordsSentence = "Keywords On";
    }
  }
  toggleRel() {
    this.showOnlyRel = !this.showOnlyRel;
  }
  goBack() {
    // falta fazer
    this.goBackque.emit(null);
  }
  public putOnClipboard(event: any, cena: string) {
    event.preventDefault();
    const clipboard = document.createElement("input");
    console.log(cena);
    clipboard.setAttribute("value", cena);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand("copy");
    document.body.removeChild(clipboard);
  }
  public copyToClipboard(event: any) {
    if (!this.withKeywords) {
      event.preventDefault();
      console.log(this.page);
      this._snackBar.open(
        "Message copied to Clipboard",
        "Length: " + this.options.result.TextNormalized.length + " characters",
        {
          duration: 2000,
        }
      );
      const clipboard = document.createElement("input");
      clipboard.setAttribute("value", this.options.result.TextNormalized);
      document.body.appendChild(clipboard);
      clipboard.select();
      document.execCommand("copy");
      document.body.removeChild(clipboard);
    } else {
      event.preventDefault();
      console.log(this.page);
      this._snackBar.open(
        "Message copied to Clipboard",
        "Length: " +
          this.options.result.TextNormalized.split("<kw>")
            .join("")
            .split("</kw>")
            .join("").length +
          " characters",
        {
          duration: 2000,
        }
      );
      const clipboard = document.createElement("input");
      clipboard.setAttribute(
        "value",
        this.options.result.TextNormalized.split("<kw>")
          .join("")
          .split("</kw>")
          .join("")
      );
      document.body.appendChild(clipboard);
      clipboard.select();
      document.execCommand("copy");
      document.body.removeChild(clipboard);
    }
  }
  public update() {
    this.exe_time_total = this.options.result.ExecutionTime.TotalTime.toFixed(
      3
    );
    this.exe_time_YAKE = this.options.result.ExecutionTime.YAKE.toFixed(3);
    this.exe_time_GTE = this.options.result.ExecutionTime.GTE.toFixed(3);
    if (this.options.result.ExecutionTime.heideltime_processing) {
      this.exe_time_algo = this.options.result.ExecutionTime.heideltime_processing.toFixed(
        3
      );
    } else {
      this.exe_time_algo = this.options.result.ExecutionTime.rule_based_processing.toFixed(
        3
      );
    }
    if (this.options.docOrSentence == "doc") {
      this.docOrSentence = true;
    } else {
      this.docOrSentence = false;
    }
    console.log("temporal cenas");
    let last = "";
    this.numero_total = this.options.result.TempExpressions.length;
    this.numero_total2 = this.options.result.TempExpressions.filter((cada) => {
      return cada[1] > 0.35;
    }).length;
    this.numero_total = this.options.result.TempExpressions.length;
    this.numero_total2 = this.options.result.TempExpressions.filter((cada) => {
      return this.options.result.Score[cada[0].toLowerCase()][0] > 0.35;
    }).length;
    console.log(this.numero_total);

    last = "";
    this.differentValues = this.options.result.TempExpressions.sort(
      (a, b) => a[0] - b[0]
    ).filter((element, index, array) => {
      if (index == 0) {
        // console.log("element");
        // console.log(element[0].toString().split('-').join(''));
        // console.log("Element is Viable");
        // console.log(/^\d+$/.test(element[0].toString().split('-').join('')));
        last = element[0];
        return /^\d+$/.test(element[0].toString().split("-").join(""));
      } else {
        // console.log("element");
        // console.log(element[0].toString().split('-').join(''));
        // console.log("Element is Viable");
        // console.log(/^\d+$/.test(element[0].toString().split('-').join('')));
        let este = last;
        last = element[0];
        return (
          element[0].toString().split("-").join("") != este &&
          /^\d+$/.test(element[0].toString().split("-").join(""))
        );
      }
    });
    if (this.options.docOrSentence == "doc") {
      this.differentRelValues = this.differentValues.filter(
        (element, index, array) => {
          /*console.log(element);
              console.log(array);
              console.log(index);
              console.log(this.options.result.Score);
              console.log(this.options.result.Score[element[0].toLowerCase()]);*/
          // tslint:disable-next-line: no-shadowed-variable
          last = element[0];
          const a = element[0].toLowerCase() + "";
          // console.log(a);
          return this.options.result.Score[a][0] > 0.35;
        }
      );
    } else {
      // tslint:disable-next-line: no-shadowed-variable
      this.differentRelValues = this.differentValues.map((a) => {
        return this.options.result.Score[a[0]];
      });

      let valores = Object.keys(this.options.result.Score);

      console.log(valores);
      let total2 = 0;
      valores.map((kelp) => {
        console.log(this.options.result.Score[kelp]);
        Object.keys(this.options.result.SentencesTokens).map((kolp) => {
          console.log(kolp);
          if (this.options.result.Score[kelp][kolp + ""]) {
            if (this.options.result.Score[kelp][kolp + ""][0] > 0.35) {
              total2++;
              console.log(this.options.result.Score[kelp][kolp + ""][0]);
              console.log(this.options.result.Score[kelp][kolp + ""]);
            }
          }
        });
      });
      this.numero_total2 = total2;
      console.log("teste");
      valores = Object.keys(this.options.result.Score);

      console.log(valores);
      total2 = 0;
      valores.map((kelp) => {
        console.log(this.options.result.Score[kelp]);
        Object.keys(this.options.result.SentencesTokens).map((kolp) => {
          console.log(kolp);
          if (this.options.result.Score[kelp][kolp + ""]) {
            if (this.options.result.Score[kelp][kolp + ""][0] >= 0) {
              total2++;
              console.log(this.options.result.Score[kelp][kolp + ""][0]);
              console.log(this.options.result.Score[kelp][kolp + ""]);
            }
          }
        });
      });
      this.numero_total = total2;
    }
    console.log(this.differentRelValues);
    console.log(this.differentValues);

    let c = [];
    let a = {};
    let b = {};
    const d = [];

    let c2 = [];
    let a2 = {};
    const b2 = {};
    const d2 = [];
    // tslint:disable-next-line: forin
    for (const i in Object.keys(this.options.result.Score)) {
      // console.log(this.result.Score[Object.keys(this.result.Score)[i]][0]);
      // handle Dataset
      if (this.options.docOrSentence == "doc") {
        // descobrir se este é sentence ou doc
        console.log("resultado");
        let value_to_be_replaced = Object.keys(this.options.result.Score)[i];
        console.log(value_to_be_replaced);
        //[Object.keys(this.result.Score)[i].toLowerCase()]);
        let value_to_replace_for = this.options.result.TempExpressions.filter(
          (a) => {
            return (
              a[0].toLowerCase() == Object.keys(this.options.result.Score)[i]
            );
          }
        )[0][1];
        value_to_replace_for =
          "<strong><d>" + value_to_replace_for + "</d></strong>";
        console.log(value_to_replace_for);

        let sentence_to_write = this.options.result.SentencesNormalized.map(
          (a) => {
            // console.log(a);
            // console.log(a.toString().search(Object.keys(this.options.result.Score)[i]))
            if (
              a
                .toLowerCase()
                .toString()
                .search(
                  Object.keys(this.options.result.Score)[i].toLowerCase()
                ) != -1
            ) {
              let nova = a.replace(
                "<d>" + value_to_be_replaced + "</d>",
                "<d>" + value_to_replace_for + "</d>"
              );

              console.log(nova);
              nova = nova.replace(
                "<d>" + value_to_be_replaced.toUpperCase() + "</d>",
                "<d>" + value_to_replace_for + "</d>"
              ); //.toLowerCase().toString().replace(Object.keys(this.result.Score)[i].toLowerCase(), )
              console.log(nova);
              return nova;
            }
          }
        );
        sentence_to_write = sentence_to_write.join("__,");
        this.options.result.TempExpressions.map((a) => {
          //console.log("DEBUG TEMPORAL");
          //console.log(a);
          //console.log(sentence_to_write);
          if (sentence_to_write.search(a[0]) != -1) {
            sentence_to_write = sentence_to_write.replace(
              "<d>" + a[0] + "</d>",
              "<d>" + a[1] + "</d>"
            );
          }
          if (sentence_to_write.search(a[0].toUpperCase()) != -1) {
            sentence_to_write = sentence_to_write.replace(
              "<d>" + a[0].toUpperCase() + "</d>",
              "<d>" + a[1] + "</d>"
            );
          }
        });

        //console.log("sentence:");
        //console.log(sentence_to_write);
        sentence_to_write = sentence_to_write.split("__,").filter((aasd) => {
          return aasd.length != 0;
        })[0];
        a =
          '<p class="noticem5">Score: ' +
          this.options.result.Score[
            Object.keys(this.options.result.Score)[i]
          ][0] +
          "</p><p>" +
          sentence_to_write +
          "</p>";
        // tslint:disable-next-line: max-line-length
        // d.push({x: Object.keys(this.options.result.Score)[i], y: this.options.result.Score[Object.keys(this.options.result.Score)[i]][0], series: 0});
        if (
          this.options.result.Score[
            Object.keys(this.options.result.Score)[i]
          ][0] > 0.35
        ) {
          a =
            '<p class="noticem4">Score: ' +
            this.options.result.Score[
              Object.keys(this.options.result.Score)[i]
            ][0] +
            "</p><p>" +
            sentence_to_write +
            "</p>";

          a2 =
            '<p class="noticem4">Score: ' +
            this.options.result.Score[
              Object.keys(this.options.result.Score)[i]
            ][0] +
            "</p><p>" +
            sentence_to_write +
            "</p>";
          // tslint:disable-next-line: max-line-length
          // d2.push({x: Object.keys(this.options.result.Score)[i], y: this.options.result.Score[Object.keys(this.options.result.Score)[i]][0], series: 0});
        } else {
          a2 = null;
        }
        // console.log("esta aqui");
      } else {
        let valorDeA = "";
        let valorDeA2 = "";

        // tslint:disable-next-line: forin
        for (const xd in this.options.result.Score[
          Object.keys(this.options.result.Score)[i]
        ]) {
          let sentence_to_write = this.options.result.SentencesNormalized[
            xd.toString()
          ]
            .split('"')
            .join("''");
          let data_chave = Object.keys(this.options.result.Score)[i];

          let data_chave_replaced_by =
            "<strong>" +
            this.options.result.Score[data_chave][xd][1][0] +
            "</strong>";
          sentence_to_write = sentence_to_write.replace(
            data_chave,
            data_chave_replaced_by
          );
          sentence_to_write = sentence_to_write.replace(
            data_chave.toLowerCase(),
            data_chave_replaced_by
          );
          sentence_to_write = sentence_to_write.replace(
            data_chave.toUpperCase(),
            data_chave_replaced_by
          );
          // tslint:disable-next-line: max-line-length
          d.push({
            x: Object.keys(this.options.result.Score)[i],
            y: this.options.result.Score[
              Object.keys(this.options.result.Score)[i]
            ][xd][0],
            series: xd,
          });
          console.log(d);

          // tslint:disable-next-line: max-line-length

          if (
            this.options.result.Score[
              Object.keys(this.options.result.Score)[i]
            ][xd][0] > 0.35
          ) {
            // tslint:disable-next-line: whitespace
            // tslint:disable-next-line: max-line-length
            valorDeA +=
              '<span title="' +
              sentence_to_write +
              '"><p class="noticem4">Score: ' +
              this.options.result.Score[
                Object.keys(this.options.result.Score)[i]
              ][xd][0] +
              "</p><p>" +
              sentence_to_write +
              "</p></span>";

            valorDeA2 +=
              '<span title="' +
              sentence_to_write +
              '"><p class="noticem4">Score: ' +
              this.options.result.Score[
                Object.keys(this.options.result.Score)[i]
              ][xd][0] +
              "</p><p>" +
              sentence_to_write +
              "</p></span>";

            // tslint:disable-next-line: max-line-length
            d.push({
              x: Object.keys(this.options.result.Score)[i],
              y: this.options.result.Score[
                Object.keys(this.options.result.Score)[i]
              ][xd][0],
              series: xd,
            });

            // console.log(d2);
            // TODO: meter d e d2 nos datasets
          } else {
            //valorDeA += '<span title="' + this.result.SentencesNormalized[xd.toString()].split('\"').join('\'\'') + '"><p class="noticem5">Score: ' + this.result.Score[Object.keys(this.result.Score)[i]][xd][0] + '</p><p>'+this.result.SentencesNormalized[xd.toString()].split('\"').join('\'\'')+'</p></span>';
            valorDeA +=
              '<span title="' +
              sentence_to_write +
              '"><p class="noticem5">Score: ' +
              this.options.result.Score[
                Object.keys(this.options.result.Score)[i]
              ][xd][0] +
              "</p><p>" +
              sentence_to_write +
              "</p></span>";
          }

          console.log("array de relevantes");
          console.log(d);
        }
        a = valorDeA;
        a2 = valorDeA2;
      }
      b = Object.keys(this.options.result.Score)[i];

      // console.log("a");
      // console.log(a);
      // console.log("b");
      // console.log(b);
      // console.log("end");
      let nop = d.filter((a) => {
        return a.y > 0.35;
      });
      c2.push({ x: b, y: a2, z: nop });
      c.push({ x: b, y: a, z: d });
      // console.log();
      // console.log(Object.keys(this.result.Score)[i].split('-').join(''));
      console.log(c2);
      /^\d+$/.test(
        Object.keys(this.options.result.Score)
          [i].substring(0, 10)
          .split("-")
          .join("")
      )
        ? ""
        : c.pop();
      /^\d+$/.test(
        Object.keys(this.options.result.Score)
          [i].substring(0, 10)
          .split("-")
          .join("")
      )
        ? ""
        : c2.pop();
      console.log(c2);
      c2 = c2.filter((y) => {
        if (y.y) {
          return true;
        } else {
          return false;
        }
      });
      console.log(c2);
    }
    // tslint:disable-next-line: forin
    for (const data in c) {
      let data_prov = c[data].x.substring(0, 10).split("-").join(" ");

      const j = Date.parse(data_prov);
      // console.log (j);
      c[data].dateparsed = j;
      data_prov = data_prov.split(" ").join("");
      if (data_prov.length == 6) {
        data_prov += "00";
      }
      if (data_prov.length == 4) {
        data_prov += "0000";
      }
      c[data].dateparsed2 = data_prov;
    }
    // tslint:disable-next-line: forin
    for (const data in c2) {
      let data_prov = c2[data].x.substring(0, 10).split("-").join(" ");
      const j = Date.parse(data_prov);
      // console.log (j);
      c2[data].dateparsed = j;
      data_prov = data_prov.split(" ").join("");
      if (data_prov.length == 6) {
        data_prov += "00";
      }
      if (data_prov.length == 4) {
        data_prov += "0000";
      }
      c2[data].dateparsed2 = data_prov;
    }
    c = c.sort((a, b) => {
      console.log("a");
      console.log("b");
      console.log(a);
      console.log(b);
      return a.dateparsed - b.dateparsed;
    });
    c2 = c2.sort((a, b) => {
      console.log("a");
      console.log("b");
      console.log(a);
      console.log(b);
      return a.dateparsed - b.dateparsed;
    });
    c = c.sort((a, b) => {
      console.log("a");
      console.log("b");
      console.log(a);
      console.log(b);
      return a.dateparsed2 - b.dateparsed2;
    });
    c2 = c2.sort((a, b) => {
      console.log("a");
      console.log("b");
      console.log(a);
      console.log(b);
      return a.dateparsed2 - b.dateparsed2;
    });
    // console.log("a,b,join");
    // console.log(a);
    // console.log(b);
    // console.log(this.result.Score);
    // console.log(c);
    // console.log("end");
    this.dataset = c;

    this.datasetFixed = this.dataset;
    for (let hu = 0; hu < this.datasetFixed.length; hu++) {
      this.options.result.TempExpressions.map((a) => {
        console.log(a);
        if (this.datasetFixed[hu].y.search(a[0]) != -1) {
          this.datasetFixed[hu].y = this.datasetFixed[hu].y.replace(
            "<d>" + a[0] + "</d>",
            a[1]
          );
        }
        if (this.datasetFixed[hu].y.search(a[0].toUpperCase()) != -1) {
          this.datasetFixed[hu].y = this.datasetFixed[hu].y.replace(
            "<d>" + a[0].toUpperCase() + "</d>",
            a[1]
          );
        }
      });
    }
    this.datasetRelOnly = c2;

    this.datasetFixed2 = this.datasetRelOnly;
    for (let hu = 0; hu < this.datasetFixed2.length; hu++) {
      this.options.result.TempExpressions.map((a) => {
        console.log(a);
        if (this.datasetFixed2[hu].y.search(a[0]) != -1) {
          this.datasetFixed2[hu].y = this.datasetFixed2[hu].y.replace(
            "<d>" + a[0] + "</d>",
            a[1]
          );
        }
        if (this.datasetFixed[hu].y.search(a[0].toUpperCase()) != -1) {
          this.datasetFixed2[hu].y = this.datasetFixed2[hu].y.replace(
            "<d>" + a[0].toUpperCase() + "</d>",
            a[1]
          );
        }
      });
    }
    console.log("this.dataset");
    console.log(this.dataset);
    console.log("this.datasetRelOnly");
    console.log(this.datasetRelOnly);
  }
}
