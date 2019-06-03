import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsService {

  constructor() { }

  auth() {
    window.location.href = `https://login.microsoftonline.com/2d595d74-e5c3-491a-b1bc-0f04aff3a63c/oauth2/v2.0/authorize
    ?client_id=f4d47aca-92ff-406f-a9ff-6b2df64f1893&response_type=code&redirect_uri=http://localhost:4200/&scope=openid`;
  }
}
