import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoiComponent } from './view-poi.component';

describe('ViewPoiComponent', () => {
  let component: ViewPoiComponent;
  let fixture: ComponentFixture<ViewPoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
