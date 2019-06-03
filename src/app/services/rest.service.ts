import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private url = 'http://192.168.88.8:8080/api/powerbi/embed/reports';
  constructor(private http: HttpClient) { }

  public getTokens() {
    return this.http.get(this.url);
  }
}
