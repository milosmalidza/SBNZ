import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterDialogService } from 'src/app/services/register-dialog.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/services/location.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { error } from 'protractor';

@Component({
  selector: 'div [app-register-dialog]',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  constructor(public registerDialogService: RegisterDialogService,
              private locationService: LocationService,
              private authenticationService: AuthenticationService) { }
  
  private subscription: Subscription;

  public activeInput: any = -1;
  public activated: boolean = false;

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
        value: 'SEEKING_NOVELTY',
        label: 'Seeking Novelty'
      }],
      focused: false
    },
  };

  public registerDTO: any = {};

  @ViewChild("ncf", {static: false}) newCertificateForm: any;



  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 0;
  lng = 0;
  selectedLocation: any = {};

  ngOnInit(): void {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: 'register-map',
        style: this.style,
        zoom: 1,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    let that = this;
    this.map.on('click', (event)=> {
      this.selectedLocation.longitude = event.lngLat.lng;
      this.selectedLocation.latitude = event.lngLat.lat;
      this.locationService.retreiveLocationInfo(this.selectedLocation).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error)
        }
      );
    });


    this.subscription = this.registerDialogService.receiveData().subscribe(
      data => {
        this.activated = data.isOpened;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  register() {
    this.registerDTO.motivation = this.selects.motivation.value.value;
    this.registerDTO.userStatus = this.selects.status.value.value;
    
    this.authenticationService.registerRequest(this.registerDTO).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
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
