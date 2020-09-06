import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selected-poi',
  templateUrl: './selected-poi.component.html',
  styleUrls: ['./selected-poi.component.css']
})
export class SelectedPoiComponent implements OnInit {

  @Input() selectedPOI;

  public activeInput = -1;
  public poiSearchDTO: any = {};

  constructor() { }

  ngOnInit() {
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

}
