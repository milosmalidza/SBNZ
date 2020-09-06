import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Point } from 'mapbox-gl';
import { PointOfInterestService } from 'src/app/services/point-of-interest.service';
import { error } from 'protractor';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-selected-destination',
  templateUrl: './selected-destination.component.html',
  styleUrls: ['./selected-destination.component.css']
})
export class SelectedDestinationComponent implements OnInit {

  @Input() selectedDestination;
  @Output() poiClicked = new EventEmitter<any>();
  @Output() poisUpdated = new EventEmitter<any>();
  @Output() poiMinimumDistanceChanged = new EventEmitter<any>();
  @Output() poiMaximumDistanceChanged = new EventEmitter<any>();
  @Output() poiFilterDistanceChanged = new EventEmitter<any>();

  public activeInput = -1;
  public poiSearchDTO: any = {
    filterDistance: 20
  };

  public pois: any[] = [];

  constructor(private pointOfInterestService: PointOfInterestService,
              private destinationService: DestinationService) { }

  ngOnInit() {
    this.poiMinimumDistanceChanged.emit(this.poiSearchDTO);
    this.poiMaximumDistanceChanged.emit(this.poiSearchDTO);
    this.poiFilterDistanceChanged.emit(this.poiSearchDTO);

    this.destinationService.isLikedDestination(this.selectedDestination.destination).subscribe(
      data => {
        console.log(data);
        this.selectedDestination.isLiked = data.liked;
      },
      error => {
        console.log(error);
      }
    );
  }


  getRoundedDistance() {
    return Math.round(this.selectedDestination.expense.distance * 10) / 10;
  }

  getRoundedEstimatedPrice() {
    return Math.round(this.selectedDestination.expense.estimatedPrice * 10) / 10;
  }

  minimumDistanceChanged(event) {
    this.poiMinimumDistanceChanged.emit(this.poiSearchDTO);
  }

  maximumDistanceChanged(event) {
    this.poiMaximumDistanceChanged.emit(this.poiSearchDTO);
  }

  filterDistanceChanged(event) {
    this.poiFilterDistanceChanged.emit(this.poiSearchDTO);
  }

  tablePOIClicked(item) {
    this.poiClicked.emit(item);
  }

  like() {
    console.log(this.selectedDestination);
    this.destinationService.likeDestination(this.selectedDestination.destination).subscribe(
      data => {
        this.selectedDestination.isLiked = true;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  search() {
    this.poiSearchDTO.destination = this.selectedDestination.destination;
    this.pointOfInterestService.getRecommendedPOI(this.poiSearchDTO).subscribe(
      data => {
        this.pois = data;
        this.poisUpdated.emit(data);
      },
      error => {

      }
    )
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
