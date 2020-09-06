import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterDialogService } from 'src/app/services/register-dialog.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/services/location.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { error } from 'protractor';
import { DatePipe } from '@angular/common';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'div [app-register-dialog]',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  constructor(public registerDialogService: RegisterDialogService,
              private locationService: LocationService,
              private authenticationService: AuthenticationService,
              private router: Router) { }
  
  private subscription: Subscription;

  public activeInput: any = -1;
  public activated: boolean = false;
  public marker: mapboxgl.Marker;
  public user = null;
  datePipe: DatePipe;
  

  public selects = {
    status: {
      value: null,
      items: [{
        value: 'EMPLOYED',
        label: 'Employed'
      },
      {
        value: 'STUDENT',
        label: 'Student'
      },
      {
        value: 'RETIRED',
        label: 'Retired'
      }],
      focused: false
    },
    motivation: {
      value: null,
      items: [{
        value: 'ENJOYING_NATURE',
        label: 'Enjoying Nature'
      },
      {
        value: 'LEARNING_SOMETHING_NEW',
        label: 'Learning Something New'
      },
      {
        value: 'SEEKING_FUN',
        label: 'Seeking Fun'
      }],
      focused: false
    },
  };

  public registerDTO: any = {};

  public birthDate: any = {};


  public isLocationPicked = false;

  @ViewChild("ncf", {static: false}) newCertificateForm: any;



  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 0;
  lng = 0;
  selectedLocation: any = {};

  ngOnInit(): void {
    this.datePipe = new DatePipe('en-US');
    this.selects.motivation.value = this.selects.motivation.items[0];
    this.selects.status.value = this.selects.status.items[0];


    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: 'register-map',
        style: this.style,
        zoom: 1,
        center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl({showZoom: false, showCompass: false, visualizePitch: false}));

    let that = this;
    this.map.on('click', (event)=> {
      this.selectedLocation.longitude = event.lngLat.lng;
      this.selectedLocation.latitude = event.lngLat.lat;
      this.getExtraLocationInfo();
    });


    this.subscription = this.registerDialogService.receiveData().subscribe(
      data => {
        if (!data.isOpened) {
          this.user = null;
          this.registerDTO = {};
        }
        this.activated = data.isOpened;
        if (data.user) {
          console.log(data.user);
          this.user = data.user;
          this.selectedLocation = this.user.locationDTO;
          this.getExtraLocationInfo();
          this.registerDTO = data.user;
          this.birthDate.day = this.user.day;
          this.birthDate.month = this.user.month + 1;
          this.birthDate.year = this.user.year;
          this.selects.motivation.items.forEach((item) => {
            if (item.value === this.user.motivation) {
              this.selects.motivation.value = item;
            }
          });
          this.selects.status.items.forEach((item) => {
            if (item.value === this.user.userStatus) {
              this.selects.status.value = item;
            }
          });
        }
      }
    )
  }


  getExtraLocationInfo() {
    this.locationService.retreiveLocationInfo(this.selectedLocation).subscribe(
      data => {
        try {
          console.log(data);
          if (this.marker) this.marker.remove();
          let el = document.createElement('div');
          el.appendChild(document.createElement('div'));
          el.className = 'marker';
          this.marker = new mapboxgl.Marker(el)
          .setLngLat(new mapboxgl.LngLat(this.selectedLocation.longitude, this.selectedLocation.latitude))
          .addTo(this.map);

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  futureDatesOnly(dateButton: DateButton, viewName: string) {
    return dateButton.value < (new Date()).getTime();
  }

  register() {
    this.registerDTO.motivation = this.selects.motivation.value.value;
    this.registerDTO.userStatus = this.selects.status.value.value;
    this.registerDTO.locationDTO = this.selectedLocation
    this.registerDTO.birthDate = this.datePipe.transform(
      new Date(this.birthDate.year, this.birthDate.month, this.birthDate.day - 1), 'dd-MM-yyyy');
    
    this.authenticationService.registerRequest(this.registerDTO).subscribe(
      data => {
        console.log(data);
        this.registerDialogService.sendData(
          {
            isOpened: false
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  changeProfile() {
    this.registerDTO.motivation = this.selects.motivation.value.value;
    this.registerDTO.userStatus = this.selects.status.value.value;
    this.registerDTO.locationDTO = this.selectedLocation
    this.registerDTO.birthDate = this.datePipe.transform(
      new Date(this.birthDate.year, this.birthDate.month - 1, this.birthDate.day), 'dd-MM-yyyy');
      
    this.authenticationService.changeProfileRequest(this.registerDTO).subscribe(
      data => {
        this.authenticationService.login(JSON.stringify(data));
        console.log(data);
        this.registerDialogService.sendData(
          {
            isOpened: false
          }
        );
        
        
      },
      error => {
        console.log(error);
      }
    ).add(
      () => {
        if (this.getUrl() === 'destinations') {
            window.location.reload();
        }
      }
    )
  }

  getUrl(): string {
    let temp = this.router.url.split('/');
    return temp[temp.length - 1];
  }




  focusSelect(event, obj) {
    obj.focused = true;
  }

  blurSelect(event, obj) {
    obj.focused = false;
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
    let element = (<HTMLInputElement>document.querySelector('.register-dialog-component .input-holder .input-styled[data-index="'+ index +'"]'));
    if (!element) {
      element = (<HTMLInputElement>document.querySelector('.register-dialog-component .input-holder .custom[data-index="'+ index +'"]'));
    }
    return element.value == '';
  }


  isBlurred(element: any) {
    return this.activeInput != element.valueAccessor._elementRef.nativeElement.dataset.index;
  }

  isFocused(element: any) {
    return this.activeInput == element.valueAccessor._elementRef.nativeElement.dataset.index;
  }

}
