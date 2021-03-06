import { Component, OnInit } from '@angular/core';
import { PointOfInterestService } from 'src/app/services/point-of-interest.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-poi',
  templateUrl: './view-poi.component.html',
  styleUrls: ['./view-poi.component.css']
})
export class ViewPoiComponent implements OnInit {

  //ICONS
  faTimes = faTimes;

  public poiMarkers: any[] = []

  public selectedPOI: any = null;
  public pois: any[] = [];

  public selects = {
    category: {
      value: null,
      items: [{
        value: 'DEFAULT',
        label: 'Default'
      },
      {
        value: 'TRENDING',
        label: 'Trending'
      }],
      focused: false
    }
  };

  constructor(private poiService: PointOfInterestService) { }

  ngOnInit() {
    this.selects.category.value = this.selects.category.items[0];
    this.poiService.getAllPOI().subscribe(
      data => {
        this.pois = data;
        this.poiMarkers = this.pois.map((poi) => {
          return poi.location;
        });
        console.log(this.pois);
      },
      error => {
        console.log(error);
      }
    )
  }

  itemChanged(event) {
    if (event.value === 'TRENDING') {
      this.poiService.getTrending().subscribe(
        data => {
          this.pois = data;
          this.poiMarkers = this.pois.map((poi) => {
            return poi.location;
          });
          console.log(this.pois);
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.poiService.getAllPOI().subscribe(
        data => {
          this.pois = data;
          this.poiMarkers = this.pois.map((poi) => {
            return poi.location;
          });
          console.log(this.pois);
        },
        error => {
          console.log(error);
        }
      )
    }
    
  }

  tablePOIClicked(item) {
    this.selectedPOI = item;
  }

  closeSelectedPOI() {
    this.selectedPOI = null;
  }

  markerClickedEvent(event) {

  }

  removePOI() {
    console.log("dsa");
    this.poiService.removePOI(this.selectedPOI).subscribe(
      data => {
        this.selectedPOI.removed = true;
        this.selectedPOI = this.selectedPOI;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  restorePOI() {
    this.poiService.restorePOI(this.selectedPOI).subscribe(
      data => {
        this.selectedPOI.removed = false;
        this.selectedPOI = this.selectedPOI;
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

}
