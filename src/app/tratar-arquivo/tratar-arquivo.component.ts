import { MatSnackBar } from "@angular/material/snack-bar";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-tratar-arquivo",
  templateUrl: "./tratar-arquivo.component.html",
  styleUrls: ["./tratar-arquivo.component.scss"],
})
export class TratarArquivoComponent implements OnInit {
  @Input() dados: any;
  @Output() selected = new EventEmitter();
  public querySelected: any;
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  goBack() {
    this.querySelected = false;
  }
  setQuery(query) {
    this.querySelected = query;
    this.selected.emit(true);
    console.log(query);
  }
  copyToCliboard(something: any) {
    event.preventDefault();
    this._snackBar.open(
      "Link copied to Clipboard",
      "Length: " + something.length + " characters",
      {
        duration: 2000,
      }
    );
    const clipboard = document.createElement("input");
    clipboard.setAttribute("value", something);
    document.body.appendChild(clipboard);
    clipboard.select();
    document.execCommand("copy");
    document.body.removeChild(clipboard);
  }
}
