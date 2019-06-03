import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService } from '../../services/layout.service';
import { RestService } from '../../services/rest.service';
import { UUID } from 'angular2-uuid';
import * as pbi from 'powerbi-client';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  get options(): GridsterConfig {
    return this.layoutService.options;
  }
  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }
  powerBiSettings: any;
  id: string;
  constructor(
    private layoutService: LayoutService,
    private restService: RestService,
    private adalSvc: MsAdalAngular6Service
  ) { }

  ngOnInit() {
    this.restService.getTokens(this.getQueryParameter('email'))
    .subscribe(data => {
      if (Array.isArray(data)) {
        data.forEach(element => {
          this.addItem(element);
        });
      } else {
        this.addItem(data);
      }
    });
  }
  private buildConfig(configs, id) {
    const powerBiSettings = {
      embedUrl: configs.embedUrl,
      type: 'report',
      tokenType: 1,
      accessToken: configs.embedToken,
      id: configs.reportId,
      dashidboardId: configs.dashboardId
    };
    // Used this hook. Because elements renders to slow
    setTimeout(() => {
      if (document.getElementById(id)) {
        this.showReport(powerBiSettings, document.getElementById(id));
      }
    }, 0);
  }
  private getQueryParameter(key: string): string {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(key);
  }
  addItem(element) {
    this.layoutService.addItem().subscribe(data => {
      this.buildConfig(element, data);
    });
  }
  logOut() {
    this.adalSvc.logout();
  }
  showReport(configs, reportContainer) {
    const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    const report = powerbi.embed(reportContainer , configs);
  }

}
