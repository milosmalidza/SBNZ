import { Component } from '@angular/core';
import { LoginDialogService } from './services/login-dialog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HomeService } from './services/home.service';
import { RegisterDialogService } from './services/register-dialog.service';
import { faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public loginDialogService: LoginDialogService,
              public registerDialogService: RegisterDialogService,
              public router: Router,
              public homeService: HomeService,
              public authenticationService: AuthenticationService) {}

  private subscription: Subscription;
  private registerSubscription: Subscription;

  title = 'whoknowswhere';

  public loginTeaserActivated: boolean = false;
  public registerTeaserActivated: boolean = false;

  //ICONS
  faUser = faUser;
  faGlobe = faGlobe;

  ngOnInit() {
    this.subscription = this.loginDialogService.receiveData().subscribe(
      data => {
        this.loginTeaserActivated = data.isOpened;
      }
    );

    this.registerSubscription = this.registerDialogService.receiveData().subscribe(
      data => {
        this.registerTeaserActivated = data.isOpened;
      }
    )

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.registerSubscription.unsubscribe();
    this.homeService.isLeaving = false;
    this.homeService.goingHome = false;
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/home');
  }


  goHome(): void {
    if (this.homeService.goingHome) return;
    this.homeService.goingHome = true;
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 1000);
  }

  explore(): void {

    if (!this.authenticationService.isRegisteredUser()) {
      this.loginDialogService.sendData({
        isOpened: true
      });
      return;
    }

    if (this.homeService.isLeaving) return;
    this.homeService.isLeaving = true;
    setTimeout(() => {
      this.router.navigateByUrl('/destinations');
    }, 1000);
    
  }

  getUrl(): string {
    return this.router.url.split('/')[1];
  }


  openDialog(): void {
    this.loginDialogService.sendData(
      {
        isOpened: true
      }
    );
  }

  openRegisterDialog(): void {
    console.log('dsa');
    this.registerDialogService.sendData(
      {
        isOpened: true
      }
    );
  }

  openMyProfile(): void {
    this.registerDialogService.sendData(
      {
        isOpened: true,
        user: this.authenticationService.getCurrentUser()
      }
    );
  }

  closeLoginDialog(): void {
    this.loginDialogService.sendData({
      isOpened: false
    });
  }

  closeRegisterDialog(): void {
    this.registerDialogService.sendData({
      isOpened: false
    });
  }

}
