import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';




@Component({
  selector: 'app-autentification',
  templateUrl: './autentification.component.html',
  styleUrls: ['./autentification.component.scss']
})
export class AutentificationComponent implements OnInit {
  authForm: FormGroup;
  token: string;
  constructor(
    private adalSvc: MsAdalAngular6Service,
    private router: Router,
  ) {   }
   private getQueryParameter(key: string): string {
    const parameters = new URLSearchParams(window.location.search);
    localStorage.setItem(key, parameters.get(key));
    return parameters.get(key);
  }


  ngOnInit() {
    this.adalSvc.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
      localStorage.setItem('embedded', token);
      this.token = token;
      if (token) {
        this.submit();
      }
    });
    this.authForm = new FormGroup({
      authEmail: new FormControl('', [Validators.required, Validators.email]),
      authPassword: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.router.navigate(
      ['dashboard'],
      {queryParams: {
        email: this.adalSvc.LoggedInUserEmail
      }
    });
  }

}
