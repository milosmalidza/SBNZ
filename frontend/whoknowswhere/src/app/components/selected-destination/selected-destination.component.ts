import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selected-destination',
  templateUrl: './selected-destination.component.html',
  styleUrls: ['./selected-destination.component.css']
})
export class SelectedDestinationComponent implements OnInit {

  @Input() selectedDestination;

  constructor() { }

  ngOnInit() {
  }


  getRoundedDistance() {
    return Math.round(this.selectedDestination.expense.distance * 10) / 10;
  }

  getRoundedEstimatedPrice() {
    return Math.round(this.selectedDestination.expense.estimatedPrice * 10) / 10;
  }

}
