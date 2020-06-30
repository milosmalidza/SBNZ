import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'div [app-login-dialog]',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor() { }

  public activeInput: any = -1;
  public activated: boolean = true;

  public loginDTO: any = {};

  @ViewChild("ncf", {static: false}) newCertificateForm: any;

  ngOnInit(): void {
  }

  focusInput(event: FocusEvent, index) {
    this.activeInput = index;
  }

  blurInput(event: FocusEvent, index) {
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

  isEmpty(index: any) {
    let element = (<HTMLInputElement>document.querySelector('.input-holder .input-styled[data-index="'+ index +'"]'));
    if (!element) {
      element = (<HTMLInputElement>document.querySelector('.input-holder .custom[data-index="'+ index +'"]'));
    }
    return element.value == '';
  }


  dsa(username) {
    console.log(username);
  }



}
