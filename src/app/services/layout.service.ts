import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    pushItems: true,
    resizable: {
      enabled: true
    }
  };
  public layout: GridsterItem[] = [];

  constructor() { }

  addItem(): Observable<string> {
    const id = UUID.UUID();
    this.layout.push({
      cols: 1,
      id,
      rows: 1,
      x: 0,
      y: 0
    });
    return new Observable<string>((data) => data.next(id));
  }
  deleteItem(id: string): void {
    const item = this.layout.find(d => d.id === id);
    this.layout.splice(this.layout.indexOf(item), 1);
  }
}
