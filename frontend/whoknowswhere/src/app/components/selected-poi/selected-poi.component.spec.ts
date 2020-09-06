import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPoiComponent } from './selected-poi.component';

describe('SelectedPoiComponent', () => {
  let component: SelectedPoiComponent;
  let fixture: ComponentFixture<SelectedPoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedPoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedPoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
