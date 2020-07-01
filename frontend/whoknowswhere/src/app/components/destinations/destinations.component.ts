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

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  public entering: boolean = true;

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

}