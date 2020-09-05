import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { PointOfInterestService } from 'src/app/services/point-of-interest.service';

@Component({
  selector: 'app-create-poi',
  templateUrl: './create-poi.component.html',
  styleUrls: ['./create-poi.component.css']
})
export class CreatePoiComponent implements OnInit {

  public poiDTO: any = {};


  public poiMarkers: any[] = []

  
  public selectedLocation = {
    longitude: 0,
    latitude: 0,
    country: null,
    formatted: null,
  }

  set sselectedLocation(location) {
    this.selectedLocation = location;
    this.poiMarkers = [location];
  }

  get sselectedLocation() {
    return this.selectedLocation;
  }

  private isLocationPicked: boolean = false;
  public activeInput = -1;

  public selects = {
    types: {
      value: null,
      items: [{
        value: 'BEACH',
        label: 'Beach'
      },
      {
        value: 'FOREST',
        label: 'Forest'
      },
      {
        value: 'YACHTING',
        label: 'Yachting'
      },
      {
        value: 'HOTEL',
        label: 'Hotel'
      },
      {
        value: 'APARTMENT',
        label: 'Apartment'
      },
      {
        value: 'SKIING',
        label: 'Skiing'
      },
      {
        value: 'SWIMMING',
        label: 'Swimming'
      },
      {
        value: 'CLUB',
        label: 'Club'
      },
      {
        value: 'RESTAURANT',
        label: 'Restaurant'
      },
      {
        value: 'HIKING',
        label: 'Hiking'
      },
      {
        value: 'SHOOTING',
        label: 'Shooting'
      },],
      focused: false
    }
  };

  constructor(private locationService: LocationService,
              private poiService: PointOfInterestService) { }

  ngOnInit() {
  }

  newLocation(event) {
    this.selectedLocation.longitude = event.lngLat.lng;
    this.selectedLocation.latitude = event.lngLat.lat;
    this.poiMarkers = [this.selectedLocation];
    this.locationService.retreiveLocationInfo(this.selectedLocation).subscribe(
      data => {
        try {
          
          this.selectedLocation.country = data.results[0].components.country;
          this.selectedLocation.formatted = data.results[0].formatted;


          this.isLocationPicked = true;
        }
        catch {
          this.isLocationPicked = false;
        }
        
      },
      error => {
        this.isLocationPicked = false;
      }
    );
  }

  newLocationEntered(event) {
    this.poiMarkers = [this.selectedLocation];
  }

  createPOI() {
    let dto = {
      name: this.poiDTO.name,
      description: this.poiDTO.description,
      type: this.selects.types.value.value,
      location: this.selectedLocation
    };
    console.log(dto);
    this.poiService.createPOI(dto).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
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
    let element = (<HTMLInputElement>document.querySelector('.main-input-holder .input-holder .input-styled[data-index="'+ index +'"]'));
    if (!element) {
      element = (<HTMLInputElement>document.querySelector('.main-input-holder .input-holder .custom[data-index="'+ index +'"]'));
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
