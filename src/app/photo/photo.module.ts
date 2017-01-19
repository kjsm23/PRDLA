/**
 * Created by --- on 1/18/2017.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhotoComponent } from './photo.component';

import { SharedModule } from '../shared';

const photoRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'photo',
    component: PhotoComponent

  }
]);

@NgModule({
  imports: [
    photoRouting,
    SharedModule
  ],
  declarations: [
    PhotoComponent
  ],
  providers: [

  ]
})
export class PhotoModule {}
