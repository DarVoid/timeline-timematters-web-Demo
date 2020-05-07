import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRelatedWorkComponent } from './about-related-work.component';

describe('AboutRelatedWorkComponent', () => {
  let component: AboutRelatedWorkComponent;
  let fixture: ComponentFixture<AboutRelatedWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRelatedWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRelatedWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
