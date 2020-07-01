import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public isLeaving: boolean = false;
  public goingHome: boolean = false;

  constructor() { }
}
