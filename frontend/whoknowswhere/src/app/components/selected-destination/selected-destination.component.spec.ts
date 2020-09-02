import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDestinationComponent } from './selected-destination.component';

describe('SelectedDestinationComponent', () => {
  let component: SelectedDestinationComponent;
  let fixture: ComponentFixture<SelectedDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
