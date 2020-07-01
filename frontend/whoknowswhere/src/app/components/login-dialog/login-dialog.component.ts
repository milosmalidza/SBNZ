import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LoginDialogService } from 'src/app/services/login-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'div [app-login-dialog]',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  constructor(public loginDialogService: LoginDialogService) { }
  
  private subscription: Subscription;

  public activeInput: any = -1;
  public activated: boolean = false;

  public loginDTO: any = {};

  @ViewChild("ncf", {static: false}) newCertificateForm: any;

  ngOnInit(): void {
    this.subscription = this.loginDialogService.receiveData().subscribe(
      data => {
        this.activated = data.isOpened;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  focusInput(event: FocusEvent, element) {
    let index = element.valueAccessor._elementRef.nativeElement.dataset.index;
    this.activeInput = index;
  }

  blurInput(event: FocusEvent, element) {
    let index = element.valueAccessor._elementRef.nativeElement.dataset.index;
    if (event.relatedTarget) {
      
      let relTarget = <HTMLElement>event.relatedTarget;
      if (relTarget.classList.contains('dl-abdtp-date-button') ||
      relTarget.classList.contains('dl-abdtp-right-button') ||
      relTarget.classList.contains('dl-abdtp-left-button')) {
        (<HTMLInputElement>event.target).focus();
        return;
      } 
    }
    
    if (this.activeInput == index || this.isEmpty(index)) {
      this.activeInput = -1;
    }
  }

  isEmpty(el: any) {
    let index = el.valueAccessor._elementRef.nativeElement.dataset.index;
    let element = (<HTMLInputElement>document.querySelector('.input-holder .input-styled[data-index="'+ index +'"]'));
    if (!element) {
      element = (<HTMLInputElement>document.querySelector('.input-holder .custom[data-index="'+ index +'"]'));
    }
    return element.value == '';
  }


  isBlurred(element: any) {
    return this.activeInput != element.valueAccessor._elementRef.nativeElement.dataset.index;
  }

  isFocused(element: any) {
    return this.activeInput == element.valueAccessor._elementRef.nativeElement.dataset.index;
  }



}
