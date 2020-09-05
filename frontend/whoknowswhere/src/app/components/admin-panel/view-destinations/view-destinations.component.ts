import { Component, OnInit } from '@angular/core';
import { DestinationService } from 'src/app/services/destination.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-destinations',
  templateUrl: './view-destinations.component.html',
  styleUrls: ['./view-destinations.component.css']
})
export class ViewDestinationsComponent implements OnInit {

  //ICONS
  faTimes = faTimes;

  public destinationMarkers: any[] = []

  public selectedDestination: any = null;
  public destinations: any[] = [];

  constructor(private destinationService: DestinationService) { }

  ngOnInit() {
    this.destinationService.getAllDestinations().subscribe(
      data => {
        this.destinations = data;
        this.destinationMarkers = this.destinations.map((destination) => {
          return destination.location;
        });
        console.log(this.destinations);
      },
      error => {
        console.log(error);
      }
    )
  }

  tableDestinationClicked(item) {
    this.selectedDestination = item;
  }

  closeSelectedDestination() {
    this.selectedDestination = null;
  }

  markerClickedEvent(event) {

  }

  removeDestination() {
    console.log("dsa");
    this.destinationService.removeDestination(this.selectedDestination).subscribe(
      data => {
        this.selectedDestination.isRemoved = true;
        this.selectedDestination = this.selectedDestination;
        console.log(data);
      },
      error => {
        console.log("fsafafsf");
      }
    );
  }

  restoreDestination() {
    this.destinationService.restoreDestination(this.selectedDestination).subscribe(
      data => {
        this.selectedDestination.isRemoved = false;
        this.selectedDestination = this.selectedDestination;
        console.log(data);
      },
      error => {
        console.log("fsafafsf");
      }
    );
  }



}
