/**
 * Created by --- on 1/17/2017.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PhotoListComponent, PhotoMetaComponent, PhotoPreviewComponent } from './photo-helpers';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import {LeafletMapComponent} from './leaflet-map';
import {NavigatorComponent} from './leaflet-map/navigator';
import {MarkerComponent} from './leaflet-map/marker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    FavoriteButtonComponent,
    FollowButtonComponent,
    LeafletMapComponent,
    ListErrorsComponent,
    MarkerComponent,
    NavigatorComponent,
    PhotoListComponent,
    PhotoMetaComponent,
    PhotoPreviewComponent,
    ShowAuthedDirective,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    FavoriteButtonComponent,
    FollowButtonComponent,
    MarkerComponent,
    NavigatorComponent,
    LeafletMapComponent,
    ListErrorsComponent,
    PhotoListComponent,
    PhotoMetaComponent,
    PhotoPreviewComponent,
    ShowAuthedDirective
  ]
})
export class SharedModule {}

