import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  public navigateTimeout: any = null;
  public entering: boolean = true;

  constructor(private router: Router,
              public homeService: HomeService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.entering = false;
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.homeService.isLeaving = false;
    this.homeService.goingHome = false;
  }

  explore(): void {
    if (this.homeService.isLeaving) return;
    this.homeService.isLeaving = true;
    this.navigateTimeout = setTimeout(() => {
      this.router.navigateByUrl('/destinations');
    }, 1000);
    
  }

  

}
