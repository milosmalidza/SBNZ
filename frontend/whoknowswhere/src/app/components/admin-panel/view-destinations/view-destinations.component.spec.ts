import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDestinationsComponent } from './view-destinations.component';

describe('ViewDestinationsComponent', () => {
  let component: ViewDestinationsComponent;
  let fixture: ComponentFixture<ViewDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
