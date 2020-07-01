import { Component } from '@angular/core';
import { LoginDialogService } from './services/login-dialog.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public loginDialogService: LoginDialogService,
              public router: Router,
              public homeService: HomeService) {}

  private subscription: Subscription;

  title = 'whoknowswhere';

  public loginTeaserActivated: boolean = false;

  ngOnInit() {
    this.subscription = this.loginDialogService.receiveData().subscribe(
      data => {
        this.loginTeaserActivated = data.isOpened;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.homeService.isLeaving = false;
    this.homeService.goingHome = false;
  }


  goHome(): void {
    if (this.homeService.goingHome) return;
    this.homeService.goingHome = true;
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 1000);
  }

  explore(): void {
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

  closeLoginDialog(): void {
    this.loginDialogService.sendData({
      isOpened: false
    });
  }

}
