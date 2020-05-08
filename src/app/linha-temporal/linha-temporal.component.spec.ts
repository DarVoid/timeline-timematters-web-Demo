import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaTemporalComponent } from './linha-temporal.component';

describe('LinhaTemporalComponent', () => {
  let component: LinhaTemporalComponent;
  let fixture: ComponentFixture<LinhaTemporalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhaTemporalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhaTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
