import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { MsService } from '../../services/ms.service';
import { CodeNode } from 'source-list-map';




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
    private ms: MsService
  ) {   }
   private getQueryParameter(key: string): string {
    const parameters = new URLSearchParams(window.location.search);
    localStorage.setItem(key, parameters.get(key));
    return parameters.get(key);
  }


  ngOnInit() {
    const code = this.getQueryParameter('code');
    if (code) {
      localStorage.setItem('code', code);
    }
    console.log(localStorage);
    this.adalSvc.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
      localStorage.setItem('embedded', token);
      this.token = token;
      if (token) {
       // this.submit();
      }
    });
    this.authForm = new FormGroup({
      authEmail: new FormControl('', [Validators.required, Validators.email]),
      authPassword: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (!localStorage.getItem('code')) {
      this.ms.auth();
    } else {
      this.router.navigate(
        ['dashboard'],
        {queryParams: {
          email: this.adalSvc.LoggedInUserEmail
        }
      });
    }
  }

}
