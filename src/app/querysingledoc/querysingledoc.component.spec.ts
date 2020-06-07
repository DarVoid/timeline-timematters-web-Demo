import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerysingledocComponent } from './querysingledoc.component';

describe('QuerysingledocComponent', () => {
  let component: QuerysingledocComponent;
  let fixture: ComponentFixture<QuerysingledocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerysingledocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerysingledocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
