/**
 * Created by --- on 2/27/2017.
 */
/**
 * Created by --- on 1/17/2017.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule} from '../shared/shared.module';
import { DropdownModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { HomeModule } from './home/home.module';
import { ChartModule } from './charts/chart.module';
// import { BlankPageModule } from './blank-page/blankPage.module';
import { TableModule } from './tables/table.module';
// import { FormModule } from './forms/forms.module';
// import { GridModule } from './grid/grid.module';
import { BSComponentModule } from './bs-component/bsComponent.module';
import { BSElementModule } from './bs-element/bsElement.module';
import {TopNavComponent} from './shared/index';
import {SidebarComponent} from './shared/index';

import { HomeRoutes } from './home/index';
import { ChartRoutes } from './charts/index';
import { TableRoutes } from './tables/index';
import { BSComponentRoutes } from './bs-component/index';
import { BSElementRoutes } from './bs-element/index';



const dashRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      ...HomeRoutes,
      ...ChartRoutes,
      ...BSComponentRoutes,
      ...TableRoutes,
      ...BSElementRoutes
    ]
  }
]);

@NgModule({
  imports: [
    dashRouting,
    SharedModule,
    RouterModule,
    DropdownModule,
    ModalModule,
    HomeModule,
    ChartModule,
    TableModule,
    BSComponentModule,
    BSElementModule
  ],
  declarations: [
    DashboardComponent,
    TopNavComponent,
    SidebarComponent
  ],
  providers: []
})
export class DashboardModule {}
