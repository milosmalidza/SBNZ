import { Component, OnInit } from '@angular/core';
import { faPlane, faHouseUser, faGem, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  //ICONS
  faPlane = faPlane;
  faHouseUser = faHouseUser;
  faGem = faGem;
  faShoppingCart = faShoppingCart;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getUrl(): string {
    let temp = this.router.url.split('/');
    return temp[temp.length - 1];
  }

}
