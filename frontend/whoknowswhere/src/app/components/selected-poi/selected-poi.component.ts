import { Component, OnInit, Input } from '@angular/core';
import { PointOfInterestService } from 'src/app/services/point-of-interest.service';

@Component({
  selector: 'app-selected-poi',
  templateUrl: './selected-poi.component.html',
  styleUrls: ['./selected-poi.component.css']
})
export class SelectedPoiComponent implements OnInit {

  @Input() selectedPOI;

  public activeInput = -1;
  public poiSearchDTO: any = {};

  constructor(private poiService: PointOfInterestService) { }

  ngOnInit() {
    this.poiService.isLikedPOI(this.selectedPOI.poi).subscribe(
      data => {
        console.log(data);
        this.selectedPOI.isLiked = data.liked;
      },
      error => {
        console.log(error);
      }
    );
  }


  getRoundedDistance() {
    return 0; //Math.round(this.selectedPOI.expense.distance * 10) / 10;
  }

  getRoundedEstimatedPrice() {
    return 0; //Math.round(this.selectedPOI.expense.estimatedPrice * 10) / 10;
  }

  minimumDistanceChanged(event) {

  }

  maximumDistanceChanged(event) {

  }

  search() {
    
  }

  like() {
    console.log(this.selectedPOI);
    this.poiService.likePOI(this.selectedPOI.poi).subscribe(
      data => {
        this.selectedPOI.isLiked = true;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
