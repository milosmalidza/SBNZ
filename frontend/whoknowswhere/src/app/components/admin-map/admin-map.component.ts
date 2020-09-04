import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/malidzo/ckc3v25ez03xg1ipjk4f34zl8';

  private _destinationMarkers: mapboxgl.Marker[] = [];
  private _poiMarkers: mapboxgl.Marker[] = [];

  private isMapLoaded: boolean = false;

  @Output() mapClickedEvent = new EventEmitter<any>();


  @Input()
  set destinationMarkers(locations: any[]) {
    let destinationMarkers = locations.map((location) => {
      let el = document.createElement('div');
      let child = document.createElement('div');
      el.appendChild(child);
      el.className = 'destination-marker';
      let lnglat = new mapboxgl.LngLat(location.longitude, location.latitude);
      let marker = new mapboxgl.Marker(el)
      .setLngLat(lnglat);
      return marker;
    });
    
    if (this.map && this.isMapLoaded) {
      this.removeDestinationMarkers();
      this._destinationMarkers = destinationMarkers;
      this.addDestinationMarkers();
    }
    else {
      this._destinationMarkers = destinationMarkers;
    }
  }

  get destinationMarkers() {
    return this._destinationMarkers;
  }

  @Input()
  set poiMarkers(locations: any[]) {
    let poiMarkers = locations.map((location) => {
      let el = document.createElement('div');
      let child = document.createElement('div');
      el.appendChild(child);
      el.className = 'poi-marker';
      let lnglat = new mapboxgl.LngLat(location.longitude, location.latitude);
      let marker = new mapboxgl.Marker(el)
      .setLngLat(lnglat);
      return marker;
    });
    
    if (this.map && this.isMapLoaded) {
      this.removePOIMarkers();
      this._poiMarkers = poiMarkers;
      this.addPOIMarkers();
    }
    else {
      this._poiMarkers = poiMarkers;
    }
  }

  get poiMarkers() {
    return this._poiMarkers;
  }

  constructor() { }

  ngOnInit() {
    let that = this;

    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 5,
        center: [0, 0]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl({showZoom: false, showCompass: false, visualizePitch: false}));

    this.map.on('click', (event)=> {
      this.mapClickedEvent.emit(event);
    });
    
    this.map.on('load', (event)=> {
      this.addDestinationMarkers();
      this.addPOIMarkers();
      this.isMapLoaded = true;
    });
  }

  removeDestinationMarkers() {
    this._destinationMarkers.forEach((marker)=> {
      marker.remove();
    });
  }

  addDestinationMarkers() {
    this._destinationMarkers.forEach((marker)=> {
      marker.addTo(this.map);
    });
  }

  removePOIMarkers() {
    this._poiMarkers.forEach((marker)=> {
      marker.remove();
    });
  }

  addPOIMarkers() {
    this._poiMarkers.forEach((marker)=> {
      marker.addTo(this.map);
    });
  }

}
