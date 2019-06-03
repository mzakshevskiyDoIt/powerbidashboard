import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {Routes, RouterModule} from '@angular/router';
import { AuthInterceptor } from './services/interceptors/auth.service';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AutentificationComponent } from './components/autentification/autentification.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorDialogComponent } from './error-handler/error-dialog.component';
import { ErrorDialogService } from './error-handler/error-dialog.service';

import { CONFIG } from '../assets/config/config.dev';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full'},
  { path: 'login', component: AutentificationComponent},
  { path: 'dashboard', component: LayoutComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AutentificationComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GridsterModule,
    FormsModule,
    ReactiveFormsModule,
    MsAdalAngular6Module.forRoot(CONFIG)
  ],
  providers: [
    ErrorDialogService,
    AuthGuardGuard,
    AuthenticationGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
