import { environment } from '../../../environments/environment';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit, OnDestroy {

  public searchDTO: any = {};

  map: mapboxgl.Map;
  style = 'mapbox://styles/malidzo/ckc3v25ez03xg1ipjk4f34zl8';
  lat = 45.253130;
  lng = 19.809195;
  public activeInput = -1;

  public entering: boolean = true;

  public selects = {
    travelMethod: {
      value: null,
      items: [{
        value: 'CAR',
        label: 'Car'
      },
      {
        value: 'PLANE',
        label: 'Plane'
      },
      {
        value: 'BUS',
        label: 'Bus'
      }],
      focused: false
    }
  };

  constructor(public homeService: HomeService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (event)=> {
      console.log(event);
    });

    var el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el)
    .setLngLat([19.809195,45.253130])
    .addTo(this.map);
  }

  ngOnDestroy() {
    this.homeService.goingHome = false;
  }

  ngAfterViewInit() {
    this.entering = false;
    this.cdRef.detectChanges();
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
    let element = (<HTMLInputElement>document.querySelector('.destinations-main-holder .input-holder .input-styled[data-index="'+ index +'"]'));
    if (!element) {
      element = (<HTMLInputElement>document.querySelector('.destinations-main-holder .input-holder .custom[data-index="'+ index +'"]'));
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