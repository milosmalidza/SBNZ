import { environment } from '../../../environments/environment';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import * as mapboxgl from 'mapbox-gl';
import { DestinationService } from 'src/app/services/destination.service';
import { error } from 'protractor';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit, OnDestroy {

  public searchDTO: any = {};
  public result: any[] = [];

  map: mapboxgl.Map;
  style = 'mapbox://styles/malidzo/ckc3v25ez03xg1ipjk4f34zl8';
  lat = 45.252882;
  lng = 19.808335;
  public activeInput = -1;

  public entering: boolean = true;

  public minDistanceId: string = 'minDistanceId';
  public maxDistanceId: string = 'maxDistanceId';

  public destinationMarkers: mapboxgl.Marker[] = [];

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
              private cdRef: ChangeDetectorRef,
              private destinationService: DestinationService,
              private authenticationService: AuthenticationService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    let that = this;
    let user = this.authenticationService.getCurrentUser();
    console.log(user);
    let location = new mapboxgl.LngLat(user.locationDTO.longitude, user.locationDTO.latitude);

    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: location
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl({showZoom: false, showCompass: false, visualizePitch: false}));

    this.map.on('click', (event)=> {
      console.log(event);
    });

    
    this.map.on('load', (event) => {
      
      this.addMinDistanceCircle(location.lng, location.lat, 0);
      this.addMaxDistanceCircle(location.lng, location.lat, 0);
    });

    

    let el = document.createElement('div');
    el.onclick = (event) => {
      console.log("Marker");
    };
    el.appendChild(document.createElement('div'));
    el.className = 'marker';
    new mapboxgl.Marker(el)
    .setLngLat(location)
    .addTo(this.map);
  }

  minimumDistanceChanged(event) {
    let user = this.authenticationService.getCurrentUser();
    let location = new mapboxgl.LngLat(user.locationDTO.longitude, user.locationDTO.latitude);

    this.removeMinDistanceCircle();
    this.addMinDistanceCircle(location.lng, location.lat, this.searchDTO.minDistance);
  }

  maximumDistanceChanged(event) {
    let user = this.authenticationService.getCurrentUser();
    let location = new mapboxgl.LngLat(user.locationDTO.longitude, user.locationDTO.latitude);

    this.removeMaxDistanceCircle();
    this.addMaxDistanceCircle(location.lng, location.lat, this.searchDTO.maxDistance);
  }



  addMinDistanceCircle(lng, lat, radius) {
    this.map.addSource(this.minDistanceId, this.utilityService.createGeoJSONCircle([lng, lat], radius, null) as mapboxgl.AnySourceData );

    this.map.addLayer({
        "id": this.minDistanceId,
        "type": "fill",
        "source": this.minDistanceId,
        "layout": {},
        "paint": {
            "fill-color": "blue",
            "fill-opacity": 0.1
        }
    });
  }

  removeMinDistanceCircle() {
    this.map.removeLayer(this.minDistanceId);
    this.map.removeSource(this.minDistanceId);
  }

  addMaxDistanceCircle(lng, lat, radius) {
    this.map.addSource(this.maxDistanceId, this.utilityService.createGeoJSONCircle([lng, lat], radius, null) as mapboxgl.AnySourceData );

    this.map.addLayer({
        "id": this.maxDistanceId,
        "type": "fill",
        "source": this.maxDistanceId,
        "layout": {},
        "paint": {
            "fill-color": "red",
            "fill-opacity": 0.1
        }
    });
  }

  removeMaxDistanceCircle() {
    this.map.removeLayer(this.maxDistanceId);
    this.map.removeSource(this.maxDistanceId);
  }








  ngOnDestroy() {
    this.homeService.goingHome = false;
  }

  ngAfterViewInit() {
    this.entering = false;
    this.cdRef.detectChanges();
  }

  search() {
    console.log(this.searchDTO);
    if(this.selects.travelMethod.value) this.searchDTO.travelMethod = this.selects.travelMethod.value.value;
    this.destinationService.getRecommendation(this.searchDTO).subscribe(
      data => {
        console.log(data);
        this.result = data;
        this.updateDestinationMarkers();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateDestinationMarkers() {

    this.destinationMarkers.forEach((marker) => {
      marker.remove();
    });
    this.destinationMarkers = []

    this.result.forEach((destination) => {
      let el = document.createElement('div');
      el.onclick = (event) => {
        console.log("Marker");
      };
      el.appendChild(document.createElement('div'));
      el.className = 'destination-marker';

      let location = new mapboxgl.LngLat(destination.destination.location.longitude, destination.destination.location.latitude);
      let marker = new mapboxgl.Marker(el)
      .setLngLat(location)
      .addTo(this.map);
      this.destinationMarkers.push(marker);
    });
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