import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selected-destination',
  templateUrl: './selected-destination.component.html',
  styleUrls: ['./selected-destination.component.css']
})
export class SelectedDestinationComponent implements OnInit {

  @Input() selectedDestination;

  public activeInput = -1;
  public poiSearchDTO: any = {};

  constructor() { }

  ngOnInit() {
  }


  getRoundedDistance() {
    return Math.round(this.selectedDestination.expense.distance * 10) / 10;
  }

  getRoundedEstimatedPrice() {
    return Math.round(this.selectedDestination.expense.estimatedPrice * 10) / 10;
  }

  minimumDistanceChanged(event) {

  }

  maximumDistanceChanged(event) {

  }

  search() {
    
  }














  

  focusInput(event: FocusEvent, element) {
    let index = element.valueAccessor._elementRef.nativeElement.dataset.index;
    this.activeInput = index;
  }

  blurInput(event: FocusEvent, element) {
    let index = element.valueAccessor._elementRef.nativeElement.dataset.index;
    if (event.relatedTarget) {
      
      let relTarget = <HTMLElement>event.relatedTarget;
      if (relTarget.classList.contains('dl-abdtp-date-button') ||
      relTarget.classList.contains('dl-abdtp-right-button') ||
      relTarget.classList.contains('dl-abdtp-left-button')) {
        (<HTMLInputElement>event.target).focus();
        return;
      } 
    }
    
    if (this.activeInput == index || this.isEmpty(index)) {
      this.activeInput = -1;
    }
  }

  isEmpty(el: any) {
    let index = el.valueAccessor._elementRef.nativeElement.dataset.index;
    let element = (<HTMLInputElement>document.querySelector('.poi-search-fields-holder .input-holder .input-styled[data-index="'+ index +'"]'));
    if (!element) {
      element = (<HTMLInputElement>document.querySelector('.poi-search-fields-holder .input-holder .custom[data-index="'+ index +'"]'));
    }
    return element.value == '';
  }


  isBlurred(element: any) {
    return this.activeInput != element.valueAccessor._elementRef.nativeElement.dataset.index;
  }

  isFocused(element: any) {
    return this.activeInput == element.valueAccessor._elementRef.nativeElement.dataset.index;
  }

  focusSelect(event, obj) {
    obj.focused = true;
  }

  blurSelect(event, obj) {
    obj.focused = false;
  }
}
