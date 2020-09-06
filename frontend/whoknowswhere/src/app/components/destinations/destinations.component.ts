import { environment } from '../../../environments/environment';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import * as mapboxgl from 'mapbox-gl';
import { DestinationService } from 'src/app/services/destination.service';
import { error } from 'protractor';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilityService } from 'src/app/services/utility.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, style, animate, transition } from '@angular/animations';
var THREE = require('three');
@Component({
  selector: 'app-destinations',
  
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit, OnDestroy {


  //ICONS
  faTimes = faTimes;
  //------

  public searchDTO: any = {
    filterDistance: 1000
  };
  public result: any[] = [];
  public pois: any[] = [];
  public selectedDestination = null;
  public selectedPOI = null;

  map: mapboxgl.Map;
  style = 'mapbox://styles/malidzo/ckc3v25ez03xg1ipjk4f34zl8';
  public activeInput = -1;

  public entering: boolean = true;

  public minDistanceId: string = 'minDistanceId';
  public maxDistanceId: string = 'maxDistanceId';
  public filterDistanceId: string = 'filterDistanceId';

  public destinationMarkers: mapboxgl.Marker[] = [];
  public poiMarkers: mapboxgl.Marker[] = [];

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
    this.selects.travelMethod.value = this.selects.travelMethod.items[0];
    let user = this.authenticationService.getCurrentUser();
    console.log(user);
    let location = new mapboxgl.LngLat(user.locationDTO.longitude, user.locationDTO.latitude);

    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 12,
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
      this.addFilterDistanceCircle(location.lng, location.lat, this.searchDTO.filterDistance);
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

  filterDistanceChanged(event) {
    let user = this.authenticationService.getCurrentUser();
    let location = new mapboxgl.LngLat(user.locationDTO.longitude, user.locationDTO.latitude);

    this.removeFilterDistanceCircle();
    this.addFilterDistanceCircle(location.lng, location.lat, this.searchDTO.filterDistance);
  }



  poiMinimumDistanceChanged(event) {
    console.log(this.selectedDestination);
    let location = new mapboxgl.LngLat(this.selectedDestination.destination.location.longitude, this.selectedDestination.destination.location.latitude);

    this.removeMinDistanceCircle();
    this.addMinDistanceCircle(location.lng, location.lat, event.minDistance);
  }

  poiMaximumDistanceChanged(event) {
    let location = new mapboxgl.LngLat(this.selectedDestination.destination.location.longitude, this.selectedDestination.destination.location.latitude);

    this.removeMaxDistanceCircle();
    this.addMaxDistanceCircle(location.lng, location.lat, event.maxDistance);
  }

  poiFilterDistanceChanged(event) {
    let location = new mapboxgl.LngLat(this.selectedDestination.destination.location.longitude, this.selectedDestination.destination.location.latitude);

    this.removeFilterDistanceCircle();
    this.addFilterDistanceCircle(location.lng, location.lat, event.filterDistance);
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

  addFilterDistanceCircle(lng, lat, radius) {
    this.map.addSource(this.filterDistanceId, this.utilityService.createGeoJSONCircle([lng, lat], radius, null) as mapboxgl.AnySourceData );

    this.map.addLayer({
        "id": this.filterDistanceId,
        "type": "line",
        "source": this.filterDistanceId,
        "layout": {},
        "paint": {
          'line-color': 'black',
          'line-width': 2
        }
    });
  }

  removeFilterDistanceCircle() {
    this.map.removeLayer(this.filterDistanceId);
    this.map.removeSource(this.filterDistanceId);
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

  onDestinationMarkerClick(event) {
    console.log(event.target);
  }

  updateDestinationMarkers() {

    this.destinationMarkers.forEach((marker) => {
      marker.remove();
    });
    this.destinationMarkers = []

    let biggestRank = 0;
    let smallestRank = 0;
    this.result.forEach((destination) => {
      if (destination.rank > biggestRank) {
        biggestRank = destination.rank;
      }
      if (destination.rank < smallestRank) {
        smallestRank = destination.rank;
      }
    });

    biggestRank += Math.abs(smallestRank);

    this.result.forEach((destination) => {
      let highestColor = new THREE.Color('rgb(9, 194, 108)');
      let smallestColor = new THREE.Color('rgb(0, 0, 0)');
      let alpha = destination.rank / biggestRank;
      console.log(alpha);
      let color = smallestColor.lerp(highestColor, alpha).getStyle();
      console.log(color);
      let el = document.createElement('div');
      el.setAttribute('data-id', destination.destination.id);
      let child = document.createElement('div');

      el.onclick = (event) => {
        this.onDestinationMarkerClick(event);
      };
      el.appendChild(child);
      el.className = 'destination-marker';
      el.style.background = color;
      child.style.background = color;


      let location = new mapboxgl.LngLat(destination.destination.location.longitude, destination.destination.location.latitude);
      let marker = new mapboxgl.Marker(el)
      .setLngLat(location)
      .addTo(this.map);
      this.destinationMarkers.push(marker);
    });
  }

  tableDestinationClicked(item) {
    this.selectedDestination = item;
    this.map.flyTo({
      center: new mapboxgl.LngLat(this.selectedDestination.destination.location.longitude, this.selectedDestination.destination.location.latitude),
      zoom: 9,
      bearing: 0,
      
      // These options control the flight curve, making it move
      // slowly and zoom out almost completely before starting
      // to pan.
      speed: 1, // make the flying slow
      curve: 2, // change the speed at which it zooms out
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
  }

  closeSelectedDestination() {
    this.selectedDestination = null;
    this.minimumDistanceChanged(null);
    this.maximumDistanceChanged(null);
    this.filterDistanceChanged(null);

    this.poiMarkers.forEach((marker) => {
      marker.remove();
    });
    this.poiMarkers = [];
  }

  poisUpdated(pois) {
    console.log(pois);
    this.pois = pois;
    this.updatePOIMarkers();
  }

  updatePOIMarkers() {

    this.poiMarkers.forEach((marker) => {
      marker.remove();
    });
    this.poiMarkers = [];

    let biggestRank = 0;
    let smallestRank = 0;
    this.pois.forEach((poi) => {
      if (poi.rank > biggestRank) {
        biggestRank = poi.rank;
      }
      if (poi.rank < smallestRank) {
        smallestRank = poi.rank;
      }
    });

    biggestRank += Math.abs(smallestRank);

    this.pois.forEach((poi) => {
      let highestColor = new THREE.Color('rgb(9, 95, 194)');
      let smallestColor = new THREE.Color('rgb(0, 0, 0)');
      let alpha = poi.rank / biggestRank;
      console.log(alpha);
      let color = smallestColor.lerp(highestColor, alpha).getStyle();
      console.log(color);
      let el = document.createElement('div');
      el.setAttribute('data-id', poi.poi.id);
      let child = document.createElement('div');

      el.onclick = (event) => {
        this.onDestinationMarkerClick(event);
      };
      el.appendChild(child);
      el.className = 'poi-marker';
      el.style.background = color;
      child.style.background = color;


      let location = new mapboxgl.LngLat(poi.poi.location.longitude, poi.poi.location.latitude);
      let marker = new mapboxgl.Marker(el)
      .setLngLat(location)
      .addTo(this.map);
      this.poiMarkers.push(marker);
    });
  }


  tablePOIClicked(item) {
    this.selectedPOI = item;
    console.log(this.selectedPOI);
    this.map.flyTo({
      center: new mapboxgl.LngLat(this.selectedPOI.poi.location.longitude, this.selectedPOI.poi.location.latitude),
      zoom: 19,
      bearing: 0,
      
      // These options control the flight curve, making it move
      // slowly and zoom out almost completely before starting
      // to pan.
      speed: 1, // make the flying slow
      curve: 2, // change the speed at which it zooms out
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
  }

  closeSelectedPOI() {
    this.selectedPOI = null;
    this.poiMarkers.forEach((marker) => {
      marker.remove();
    });
    this.poiMarkers = [];
    this.tableDestinationClicked(this.selectedDestination);
    
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