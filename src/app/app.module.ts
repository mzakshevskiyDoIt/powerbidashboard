import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatFormFieldControl } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {Routes, RouterModule} from '@angular/router';
import { AuthInterceptor } from './services/interceptors/auth.service';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AutentificationComponent } from './components/autentification/autentification.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full'},
  { path: 'login', component: AutentificationComponent},
  { path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuardGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AutentificationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GridsterModule,
    FormsModule,
    ReactiveFormsModule,
    MsAdalAngular6Module.forRoot({
      tenant: '2d595d74-e5c3-491a-b1bc-0f04aff3a63c',
      clientId: 'f4d47aca-92ff-406f-a9ff-6b2df64f1893',
      redirectUri: window.location.origin,
      endpoints: {
        'http://localhost': 'http://localhost/4200/login'
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
    })
  ],
  providers: [
    AuthGuardGuard,
    AuthenticationGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
