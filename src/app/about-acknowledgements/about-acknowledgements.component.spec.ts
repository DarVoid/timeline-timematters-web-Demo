import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAcknowledgementsComponent } from './about-acknowledgements.component';

describe('AboutAcknowledgementsComponent', () => {
  let component: AboutAcknowledgementsComponent;
  let fixture: ComponentFixture<AboutAcknowledgementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAcknowledgementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAcknowledgementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
