import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordExctractionComponent } from './keyword-exctraction.component';

describe('KeywordExctractionComponent', () => {
  let component: KeywordExctractionComponent;
  let fixture: ComponentFixture<KeywordExctractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordExctractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordExctractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
