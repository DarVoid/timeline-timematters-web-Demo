import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tratar-arquivo',
  templateUrl: './tratar-arquivo.component.html',
  styleUrls: ['./tratar-arquivo.component.scss']
})
export class TratarArquivoComponent implements OnInit {
  @Input() dados: any;
  @Output() selected = new EventEmitter();
  public querySelected: any;
  constructor() { }

  ngOnInit(): void {
  }
  goBack() {
    this.querySelected = false;
  }
  setQuery(query) {
    this.querySelected = query;
    this.selected.emit(true);
    console.log(query);
  }

}
