import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoginDialogService } from 'src/app/services/login-dialog.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  public navigateTimeout: any = null;
  public entering: boolean = true;
  private subscription: Subscription;

  private triedExplore: boolean = false;

  constructor(private router: Router,
              public homeService: HomeService,
              private cdRef: ChangeDetectorRef,
              private loginDialogService: LoginDialogService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscription = this.loginDialogService.receiveData().subscribe(
      data => {
        console.log(data);
        if (!data.isOpened) {
          if (data.login && this.triedExplore) {
            this.triedExplore = false;
            this.explore();
          }
          else {
            this.triedExplore = false;
          }
        }
      }
    )
  }

  ngAfterViewInit() {
    this.entering = false;
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.homeService.isLeaving = false;
    this.homeService.goingHome = false;
    this.subscription.unsubscribe();
  }

  explore(): void {

    if (!this.authenticationService.isRegisteredUser()) {
      this.triedExplore = true;
      this.loginDialogService.sendData({
        isOpened: true
      });
      return;
    }

    if (this.homeService.isLeaving) return;
    this.homeService.isLeaving = true;
    this.navigateTimeout = setTimeout(() => {
      this.router.navigateByUrl('/destinations');
    }, 1000);
    
  }

  

}
