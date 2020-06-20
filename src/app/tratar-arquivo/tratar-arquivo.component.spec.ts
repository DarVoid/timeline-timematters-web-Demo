import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratarArquivoComponent } from './tratar-arquivo.component';

describe('TratarArquivoComponent', () => {
  let component: TratarArquivoComponent;
  let fixture: ComponentFixture<TratarArquivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratarArquivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
