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
    ListErrorsComponent,
    PhotoListComponent,
    PhotoMetaComponent,
    PhotoPreviewComponent,
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
    PhotoListComponent,
    PhotoMetaComponent,
    PhotoPreviewComponent,
    ShowAuthedDirective
  ]
})
export class SharedModule {}

